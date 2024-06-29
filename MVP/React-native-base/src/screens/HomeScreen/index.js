import {RouteName} from '../../constants';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';

const HomeScreen = ({navigation}) => {
  const updatePhotoData = useDispatch()['data'].updateData;
  const selectImagesFromGallery = () => {
    const options = {
      title: 'Select Images',
      mediaType: 'photo',
      allowsEditing: false,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: false,
      selectionLimit: 0, // 0 means no limit
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const selectedImages = response.assets.map(asset =>
          asset.uri?.replace('file://', ''),
        );
        // setImages(selectedImages);
        updatePhotoData({currentPhotoPaths: [...selectedImages]});
        navigation.navigate(RouteName.SetupInfoScreen);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Processing App</Text>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(RouteName.CameraScreen)}>
          <Text style={styles.buttonText}>Capture Image</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          Capture a new image to upload or make a prediction
        </Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.button}
          onPress={selectImagesFromGallery}>
          <Text style={styles.buttonText}>Upload from Gallery</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          Select images from gallery to upload to server
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  section: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
});

export default HomeScreen;
