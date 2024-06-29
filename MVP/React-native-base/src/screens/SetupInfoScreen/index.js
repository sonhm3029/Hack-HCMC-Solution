import React, {useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {URL_SERVER} from '../../utils/axios-utils';
import {DATA_API, LOCATION_API} from '../../constants/api';
import {RouteName} from '../../constants';
import {refModalLoading} from '../../../App';

const SetupInfoScreen = ({navigation}) => {
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [locationList, setLocationList] = useState([]);

  const photoData = useSelector(state => state.data?.currentPhotoPaths);
  const updatePhotoData = useDispatch()['data'].updateData;

  const onChangeLocation = value => {
    console.log('LOCATION', value);
    setLocation(value);
  };

  const onChangeNewLocation = text => {
    setNewLocation(text);
  };

  const handleCreateNewLocation = async () => {
    try {
      if (newLocation.trim() === '') {
        Alert.alert('Error', 'Please enter a valid new location.');
        return;
      }
      refModalLoading.current.show();

      const response = await axios.post(URL_SERVER + LOCATION_API, {
        new_loc: newLocation.trim(),
      });
      if (response?.data?.code !== 200) {
        throw new Error(response?.data?.message);
      }
      getLocationData();

      setNewLocation('');
      setLocation({
        _index: locationList?.length,
        label: newLocation.trim(),
        value: newLocation.trim(),
      });
      refModalLoading.current.hide();
      Alert.alert('Success', 'New location created successfully.');
    } catch (error) {
      refModalLoading.current.hide();

      Alert.alert('Error', error?.message);
    }
  };

  const handleSendData = () => {
    const new_loc = location?.value?.trim();
    if (!new_loc) {
      Alert.alert('ERROR', 'Please select location!');
      return;
    }
    refModalLoading.current.show();

    const formData = new FormData();
    for (const [index, path] of photoData.entries()) {
      console.log(path);
      const file = {
        uri: 'file://' + path,
        type: 'image/jpeg', // or the appropriate type of your image
        name: `image${index}.jpg`,
      };
      formData.append('files', file);
    }
    formData.append('location', new_loc);
    formData.append('note', note);

    axios
      .post(URL_SERVER + DATA_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        // setData(response.data);
        if (response?.data?.code !== 200) {
          throw new Error(response?.data?.message);
        }
        setLocation(null);
        setNote(null);
        updatePhotoData({currentPhotoPaths: null});
        refModalLoading.current.hide();
        Alert.alert('SUCCESS', `Success upload image to location ${new_loc}`, [
          {
            text: 'OK',
            onPress: () => navigation.navigate(RouteName.HomeScreen),
          },
        ]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        Alert.alert('Error', error?.message);
      })
      .finally(() => {
        refModalLoading.current.hide();
      });
  };

  const onChangeNote = text => {
    setNote(text);
  };

  const getLocationData = () => {
    axios
      .get(URL_SERVER + LOCATION_API)
      .then(response => {
        // setData(response.data);
        if (response?.data?.code !== 200) {
          throw new Error(response?.data?.message);
        }
        console.log('RES LOCATION', response);
        setLocationList(response?.data?.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        Alert.alert('Error', error?.message);
      })
      .finally(() => {});
  };
  useEffect(() => {
    getLocationData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please fill in below information</Text>

      {/* Location Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.sectionContent}>
          <DropdownComponent
            data={locationList?.map(item => ({
              label: item?.value,
              value: item?.value,
            }))}
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
            onChangeText={onChangeNote}
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
