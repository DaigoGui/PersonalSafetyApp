import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LocalServices = ({ style }) => {
  // Declare the navigation constant outside the return statement
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.baseButton, style]}
      onPress={() => navigation.navigate('MapViewScreen')} // Navigate when the button is pressed
    >
      <Text style={styles.text}>Local Emergency Services</Text>
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

export default LocalServices;
