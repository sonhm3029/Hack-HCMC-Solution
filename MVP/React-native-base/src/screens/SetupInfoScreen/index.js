import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import DropdownComponent from '../../components/DropDown';

const SetupInfoScreen = () => {
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const dataLocations = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const onChangeLocation = value => {
    console.log('LOCATION', value);
    setLocation(value);
  };

  const onChangeNewLocation = text => {
    setNewLocation(text);
  };

  const handleCreateNewLocation = () => {
    if (newLocation.trim() === '') {
      Alert.alert('Error', 'Please enter a valid new location.');
      return;
    }
    // Placeholder logic for adding a new location item to dataLocations
    const newLocationItem = {
      label: newLocation,
      value: Date.now().toString(),
    };
    const updatedLocations = [...dataLocations, newLocationItem];
    // You can handle how to use updatedLocations as needed
    // setLocations(updatedLocations);
    setNewLocation('');
    Alert.alert('Success', 'New location created successfully.');
  };

  const handleSendData = async () => {
    // Implement sending data to server logic here
    // Example using axios:
    // try {
    //   const response = await axios.post('your-server-endpoint', { location, note });
    //   console.log('Response:', response.data);
    //   // Handle success or show message to user
    // } catch (error) {
    //   console.error('Error sending data:', error);
    //   // Handle error or show message to user
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please fill in below information</Text>

      {/* Location Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.sectionContent}>
          <DropdownComponent
            data={dataLocations}
            onChange={onChangeLocation}
            value={location}
          />
          <View style={styles.createNewContainer}>
            <Text style={styles.orText}>Or</Text>
            <TextInput
              style={styles.newLocationInput}
              placeholder="Enter new location"
              value={newLocation}
              onChangeText={onChangeNewLocation}
            />
            <TouchableOpacity
              style={styles.createNewButton}
              onPress={handleCreateNewLocation}>
              <Text style={styles.createNewButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Note Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Note</Text>
        <View style={styles.sectionContent}>
          <TextInput
            style={[styles.input, styles.noteInput]}
            placeholder="Enter note"
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={text => setNote(text)}
          />
        </View>
      </View>

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendData}>
        <Text style={styles.sendButtonText}>Send to Server</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: 'center',
  },
  sectionContent: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  noteInput: {
    height: 100,
    marginBottom: 10,
  },
  orText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    marginRight: 8,
  },
  createNewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  newLocationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  createNewButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  createNewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SetupInfoScreen;
