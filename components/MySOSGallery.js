import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity, ListHeaderComponent, Modal, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For accessing the local storage

// Custom gallery component for displaying SOS photos
const MySOSGallery = ({ reloadTrigger }) => {
  const [photos, setPhotos] = useState([]); // State to store photos
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State to hold the selected photo

  // Effect hook to load photos from AsyncStorage when component mounts or reloadTrigger changes
  useEffect(() => {
    const loadPhotos = async () => {
      const photosJson = await AsyncStorage.getItem('photos'); // Fetch stored photos
      if (photosJson) {
        const photosArray = JSON.parse(photosJson);
        photosArray.sort((a, b) => b.id - a.id); // Sort photos by newest first
        setPhotos(photosArray);
      }
    };

    loadPhotos();
  }, [reloadTrigger]); // Dependency array includes reloadTrigger to re-run effect when it changes

  // Function to render each photo as a touchable element
  const renderPhoto = ({ item }) => (
    <TouchableOpacity style={styles.imageWrapper} onPress={() => {
      setSelectedPhoto(item); // Set selected photo
      setModalVisible(true); // Show modal
    }}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  // Function to delete the selected photo
  const deletePhoto = async () => {
    const updatedPhotos = photos.filter(photo => photo.id !== selectedPhoto.id); // Filter out the selected photo
    await AsyncStorage.setItem('photos', JSON.stringify(updatedPhotos)); // Update stored photos
    setPhotos(updatedPhotos); // Update state
    setModalVisible(false); // Hide modal
  };

  return (
    <View>
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={item => item.id.toString()}
        numColumns={3} // Display photos in a grid layout
        ListHeaderComponent={ListHeaderComponent}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedPhoto && (
              <>
                <Image source={{ uri: selectedPhoto.uri }} style={styles.largeImage} />
                <Text style={styles.lat}>Latitude: {selectedPhoto.latitude}</Text>
                <Text style={styles.lon}>Longitude: {selectedPhoto.longitude}</Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonDelete]} // Define a new buttonDelete style
                    onPress={deletePhoto}
                  >
                    <Text style={styles.textStyle}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the component and subcomponents
const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1 / 3, // Allow three images per row
    flexDirection: 'column',
    margin: 5,
  },
  image: {
    aspectRatio: 1, // Keep the aspect ratio of images consistent
    flex: 1,
  },
  largeImage: {
    width: 200,
    height: 200,
    marginBottom: 20, // Space between image and text
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(38, 80, 115 ,0.8)', // Semi-transparent background
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#9AD0C2', // Color for close button
    marginRight: 10,
  },
  textStyle: {
    color: 'rgb(38, 80, 115)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10, // Space above buttons
  },
  buttonDelete: {
    backgroundColor: '#FA8072', // Color for delete button
  },
  lat: {
    color: 'white', // Color for latitude text
  },
  lon: {
    color: 'white', // Color for longitude text
  },
});

export default MySOSGallery;
