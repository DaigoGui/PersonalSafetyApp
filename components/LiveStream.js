import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Alert } from 'react-native'; // Ensure Alert is imported for feedback
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library'; // Keep this import for media library access
import AsyncStorage from '@react-native-async-storage/async-storage';

const LiveStream = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    
    useEffect(() => {
      (async () => {
        // Request camera permissions
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        // Request media library permissions using the corrected function name
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        const locationStatus = await Location.requestForegroundPermissionsAsync();
        
        setHasPermission(cameraStatus === 'granted' && mediaStatus === 'granted' && locationStatus.status === 'granted');
      })();
    }, []);
    
    const takePicture = async () => {
      if (cameraRef) {
        const photo = await cameraRef.takePictureAsync();
        const location = await Location.getCurrentPositionAsync({});
        await savePhotoAndLocation(photo.uri, location);
        setPhoto(photo); // Update the photo state
      }
    };

    const savePhotoAndLocation = async (uri, location) => {
      const newPhoto = { 
        id: Date.now().toString(), // Convert to string for keyExtractor in FlatList
        uri,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
    
      try {
        const photosJson = await AsyncStorage.getItem('photos');
        const photos = photosJson ? JSON.parse(photosJson) : [];
        photos.push(newPhoto); // Add the new photo to the array
        await AsyncStorage.setItem('photos', JSON.stringify(photos));
        setReloadGalleryTrigger(prev => prev + 1); // Update the state to trigger re-render of MySOSGallery
      } catch (e) {
        console.error('Error saving photo and location', e);
        Alert.alert("Error", "Failed to save photo and location.");
      }
    };
    

    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera or media library</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={(ref) => setCameraRef(ref)}>
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <Button title="Take Picture" onPress={takePicture} />
                </View>
                {photo && <Image source={{ uri: photo.uri }} style={{ width: 100, height: 100 }} />}
            </Camera>
        </View>
    );
};

export default LiveStream;



