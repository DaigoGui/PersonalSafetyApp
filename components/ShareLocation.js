import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

const ShareLocation = ({ style }) => {
  const getLocation = async () => {
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Allow the app to use location service.');
      return;
    }

    // Get the current location
    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      // You can log the latitude and longitude like this:
      console.log(`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
      Alert.alert('Location Shared', `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location.');
      console.error(error);
    }
  };

  return (
    <TouchableOpacity style={[styles.baseButton, style]} onPress={getLocation}>
      <Text style={styles.text}>Share Location</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    backgroundColor: '#9AD0C2', // Adjusted to specified color for Add and Save buttons
    borderRadius: 20, // Rounded corners
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    alignItems: 'center',
    justifyContent: 'center', // Center the text inside the button
    marginTop: 20,
    shadowColor: '#000', // Shadow to give depth, works on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#265073', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShareLocation;

