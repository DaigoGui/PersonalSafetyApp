import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Image, Alert, Flat
} from 'react-native';
import EmergencyButton from './EmergencyButton'; // Custom component for emergency actions
import ShareLocation from './ShareLocation'; // Custom component to share location
import MySOSGallery from './MySOSGallery' // Custom gallery component
import * as Location from 'expo-location'; // For accessing device location
import AsyncStorage from '@react-native-async-storage/async-storage'; // Local storage for React Native
import { Camera } from 'expo-camera'; // Camera functionality from expo-camera
import LiveStream from './LiveStream'; // Custom component for live streaming


export default function HomeScreen() {
  const [photoUri, setPhotoUri] = useState(null); // State to hold the URI of the captured photo
  const [reloadGalleryTrigger, setReloadGalleryTrigger] = useState(0); // Trigger for refreshing the gallery view
  const [hasPermission, setHasPermission] = useState(null); // Permission state for camera, microphone, and location
  const cameraRef = useRef(null); // Reference to the camera component

  // Effect hook to request permissions on component mount
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: microphoneStatus } = await Camera.requestMicrophonePermissionsAsync();
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(cameraStatus === 'granted' && microphoneStatus === 'granted' && locationStatus === 'granted');

      if (locationStatus !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }
    })();
  }, []);

  // Function to take a picture and obtain the current location
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const location = await Location.getCurrentPositionAsync({});
        savePhotoAndLocation(photo.uri, location); // Save photo URI and location
        setPhotoUri(photo.uri); // Update state with the new photo URI
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to take picture.');
      }
    }
  };

  // Function to save the photo URI and location to AsyncStorage
  const savePhotoAndLocation = async (uri, location) => {
    const newPhoto = { id: Date.now(), uri, latitude: location.coords.latitude, longitude: location.coords.longitude };
    const photosJson = await AsyncStorage.getItem('photos');
    const photos = photosJson ? JSON.parse(photosJson) : [];
    photos.push(newPhoto);
    await AsyncStorage.setItem('photos', JSON.stringify(photos));
    setReloadGalleryTrigger(prev => prev + 1); // Increment to trigger gallery refresh
  };

  // Render nothing if permissions are still being requested
  if (hasPermission === null) {
    return <View />;
  }

  // Inform the user if camera or location permissions are denied
  if (hasPermission === false) {
    return <Text>No access to camera or location</Text>;
  }

  // Main component render
  return (
    <ImageBackground source={require('./../assets/bg.png')} style={styles.backgroundImage}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.overlay}>
        <Image source={require('./../assets/logo.png')} style={styles.profilePic} />
          <Text style={styles.headerText}>Stay Safe Everywhere!</Text>
          <View style={styles.card}>
            <View style={styles.features}>
              <EmergencyButton style={[styles.SOSButton]} />
              <ShareLocation style={styles.baseButton} />
            </View>
          </View>
          <Text style={styles.headerText}>This feels unsettling...</Text>
          <View style={styles.cameraContainer}>
            <Camera style={styles.preview} type={Camera.Constants.Type.back} ref={cameraRef} />
            <TouchableOpacity onPress={takePicture} style={styles.takephoto}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.galleryTitle}>Just In Case Gallery:</Text>
          <MySOSGallery reloadTrigger={reloadGalleryTrigger} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// StyleSheet for component styling
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'rgba(38, 80, 115 ,0.6)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  features: {
    marginVertical: 10,
  },
  headerText: {
    fontSize: 33,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop:5,
    marginBottom:10,
    color: '#265073',
  },
  baseButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  SOSButton: {
    // Inherits styles from baseButton, additional styles could be added
  },
  takephoto: {
    backgroundColor: '#2D9596',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  galleryTitle: {
    fontSize: 33,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    marginBottom:10,
    color: '#265073',
  },
  preview: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  cameraContainer: {
    backgroundColor: 'rgba(38, 80, 115 ,0.6)',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  profilePic: {

    width: 400, // Adjust width as needed
    height: 80, // Adjust height as needed
    alignSelf: 'center', // Centers the image
marginTop:40,
  },
});

