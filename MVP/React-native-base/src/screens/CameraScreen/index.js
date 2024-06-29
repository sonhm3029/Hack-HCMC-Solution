import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import axios from 'axios';
import {RouteName} from '../../constants';
import {useDispatch} from 'react-redux';

const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [photoPath, setPhotoPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const camera = useRef();
  const device = useCameraDevice('back');

  const updatePhotoData = useDispatch()['data'].updateData;

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      console.log(permission);
      setHasPermission(permission === 'granted');
    };

    requestCameraPermission();
  }, []);

  if (device == null)
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>No camera device found</Text>
      </View>
    );

  if (!hasPermission)
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>No camera permission</Text>
      </View>
    );

  const onTakingPhoto = async () => {
    let file = await camera.current.takePhoto();
    console.log(file.path);
    setPhotoPath(file.path);
    updatePhotoData({currentPhotoPath: file.path});
    await CameraRoll.save(`file://${file.path}`, {
      type: 'photo',
    });
  };

  const onBackToCamera = () => {
    setPhotoPath(null);
  };

  const uploadImage = async () => {
    navigation.navigate(RouteName.SetupInfoScreen);
  };

  return (
    <View style={styles.container}>
      {photoPath ? (
        <View style={styles.previewContainer}>
          <Image
            source={{uri: 'file://' + photoPath}}
            style={styles.imagePreview}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onBackToCamera}>
              <Text style={styles.buttonText}>Back to Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={uploadImage}>
              <Text style={styles.buttonText}>Send to Server</Text>
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" color="#007bff" />}
        </View>
      ) : (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            ref={camera}
            photo={true}
          />
          <TouchableOpacity
            style={styles.captureButton}
            onPress={onTakingPhoto}>
            <View style={styles.captureButtonInner}>
              <View style={styles.captureButtonCircle} />
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    color: '#000',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#000',
  },
  imagePreview: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginHorizontal: 10,
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
  captureButton: {
    position: 'absolute',
    bottom: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
  },
});

export default CameraScreen;
