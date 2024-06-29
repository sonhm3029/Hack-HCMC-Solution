import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useCallback, useEffect, useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import SetupInfoScreen from './src/screens/SetupInfoScreen';
import {RouteName} from './src/constants';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={RouteName.HomeScreen} component={HomeScreen} />
          <Stack.Screen
            name={RouteName.CameraScreen}
            component={CameraScreen}
          />
          <Stack.Screen
            name={RouteName.SetupInfoScreen}
            component={SetupInfoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
