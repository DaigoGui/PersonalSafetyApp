import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';

const EmergencyButton = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchAndSendLocation = async () => {
    // Request permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    // Get location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Here, send the location to your emergency contacts
    // For demonstration, we'll just log it
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Implement the function to send the coordinates to your contacts
    // sendLocationToContacts(latitude, longitude);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/panic-button.mp3'),
      { shouldPlay: true, isLooping: true }
    );
    setSound(sound);
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const handleEmergencyPress = async () => { // Make this function async
    if (isPlaying) {
      await stopSound(); // Wait for the sound to stop
      setIsPlaying(false);
    } else {
      await fetchAndSendLocation(); // Wait for location to be fetched and sent
      await playSound(); // Then start playing the sound
      setIsPlaying(true);
    }
  };

  // Ensure sound is stopped and unloaded when the component unmounts
  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
     <TouchableOpacity
        onPress={handleEmergencyPress}
        style={[styles.button, isPlaying ? styles.buttonPlaying : styles.buttonNotPlaying]}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? "Stop Alarm" : "Emergency Alert"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // Common button styles
  },
  buttonText: {
    color: '#F1FADA', // White text color
    fontSize: 18,
    fontWeight: 'bold', 
  },
  buttonPlaying: {
    backgroundColor: '#FA8072', // Example playing state background color
  },
  buttonNotPlaying: {
    backgroundColor: '#F1432F', // Example not playing state background color
  },
});

export default EmergencyButton;