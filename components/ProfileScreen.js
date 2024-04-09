import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert, ImageBackground, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


export default function ProfileScreen() {
  const [personalDetails, setPersonalDetails] = useState({
    fullName: '',
    dob: '',
    address: '',
    nationality: '',
    bloodType: '',
    allergies: '',
    medicalConditions: '',
    physicianContact: '',
  });

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', number: '', relationship: '' });
  const [presetSMS, setPresetSMS] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [sosMessageInput, setSosMessageInput] = useState('');


  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  useEffect(() => {
    const loadData = async () => {
      const detailsJson = await AsyncStorage.getItem('personalDetails');
      const contactsJson = await AsyncStorage.getItem('contacts');
      const sosMessage = await AsyncStorage.getItem('presetSMS');
      if (detailsJson) setPersonalDetails(JSON.parse(detailsJson));
      if (contactsJson) setContacts(JSON.parse(contactsJson));
      if (sosMessage) {
        setPresetSMS(sosMessage); // Displayed SOS message
        setSosMessageInput(sosMessage); // SOS message input field
      }
    };
    loadData();
  }, []);


  const savePersonalDetails = async () => {
    try {
      await AsyncStorage.setItem('personalDetails', JSON.stringify(personalDetails));
      Alert.alert('Success', 'Personal details saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save personal details. Please try again.');
    }
  };

  const addContact = () => {
    const contactWithId = { ...newContact, id: uuid.v4() };
    const updatedContacts = [...contacts, contactWithId];
    setContacts(updatedContacts);
    saveContacts(updatedContacts); // Persist to AsyncStorage
    setNewContact({ name: '', number: '', relationship: '' }); // Reset form
  };


  const saveContacts = async (updatedContacts) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      Alert.alert('Success', 'Contacts updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update contacts. Please try again.');
    }
  };

  const deleteContact = async (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    await saveContacts(updatedContacts); // Save the updated contacts list
  };

  const saveSOSMessage = async () => {
    try {
      await AsyncStorage.setItem('presetSMS', sosMessageInput);
      setPresetSMS(sosMessageInput); // Update the displayed SOS message only here
      Alert.alert('Success', 'SOS message saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save SOS message. Please try again.');
    }
  };


  return (
    <ImageBackground source={require('./../assets/bg.png')} style={styles.backgroundImage}>
      <View style={styles.overlay}>

        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <>
                  <Image source={require('./../assets/logo.png')} style={styles.profilePic} />

              <Text style={styles.header}>Personal Details</Text>
              <View style={styles.card}>

                <Image source={require('../assets/icon.png')} style={styles.icon} />
                <TouchableOpacity style={styles.button} onPress={toggleFormVisibility}>
                  <Text style={styles.buttonText}>{isFormVisible ? "Hide Details" : "Show Personal Details"}</Text>
                </TouchableOpacity>
                {isFormVisible && (
                  <>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setPersonalDetails({ ...personalDetails, fullName: text })}
                      value={personalDetails.fullName}
                      placeholder="Full Name"
                    />
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setPersonalDetails({ ...personalDetails, dob: text })}
                      value={personalDetails.dob}
                      placeholder="Date of Birth"
                    />
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setPersonalDetails({ ...personalDetails, nationality: text })}
                      value={personalDetails.nationality}
                      placeholder="Nationality"
                    />
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setPersonalDetails({ ...personalDetails, bloodType: text })}
                      value={personalDetails.bloodType}
                      placeholder="Blood Type"
                    />
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setPersonalDetails({ ...personalDetails, allergies: text })}
                      value={personalDetails.allergies}
                      placeholder="Allergies"
                    />
                    <TouchableOpacity style={styles.button} onPress={savePersonalDetails}>
                      <Text style={styles.buttonText}>Save Personal Details</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <Text style={styles.header}>Emergency Contacts</Text>
              <View style={styles.card}>

                <TextInput
                  style={styles.input}
                  onChangeText={text => setNewContact({ ...newContact, name: text })}
                  value={newContact.name}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={text => setNewContact({ ...newContact, number: text })}
                  value={newContact.number}
                  placeholder="Number"
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={text => setNewContact({ ...newContact, relationship: text })}
                  value={newContact.relationship}
                  placeholder="Relationship"
                />
                <TouchableOpacity style={styles.button} onPress={addContact}>
                  <Text style={styles.buttonText}>Add Contact</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <Text>{item.name} - {item.number} ({item.relationship})</Text>
              <TouchableOpacity onPress={() => deleteContact(item.id)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={
            <>
              <Text style={styles.header}>Emergency SOS SMS</Text>
              <View style={styles.card}>

                <TextInput
                  style={styles.input}
                  onChangeText={setSosMessageInput}
                  value={sosMessageInput}
                  placeholder="Pre-set SOS Message"
                  multiline
                />

                <TouchableOpacity style={styles.button} onPress={saveSOSMessage}>
                  <Text style={styles.buttonText}>Save SOS Message</Text>
                </TouchableOpacity>
                {presetSMS.length > 0 && (
                  <View style={styles.sosMessageContainer}>
                    <Text style={styles.sosMessageText}>{presetSMS}</Text>
                    <TouchableOpacity onPress={() => { setPresetSMS(''); saveSOSMessage(''); }} style={styles.deleteButton}>
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </>
          }
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust opacity as needed

  },
  scrollContainer: {
    padding: 20,

  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity as needed
  },
  card: {
    backgroundColor: 'rgba(38, 80, 115 ,0.6)', // Unchanged
    borderRadius: 10,
    padding: 10,
    margin: 7,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#265073',
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'rgba(38, 80, 115 ,0.8)', // Adjusted for specified opacity and color
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    color: '#F1FADA', // Adjusted for better visibility
  },
  button: {
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
  buttonText: {
    color: '#265073', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
  contactItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'salmon', // Adjusted to salmon color for the Delete button
    padding: 5,
    borderRadius: 20,
    shadowColor: '#000', // Shadow to give depth, works on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sosMessageContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 10,
    borderRadius: 5,
  },
  sosMessageText: {
    flex: 1,
    marginRight: 10,
    color: '#265073',
  },
  profilePic: {

    width: 400, // Adjust width as needed
    height: 80, // Adjust height as needed
    alignSelf: 'center', // Centers the image
    marginTop: 40,
  },
});

