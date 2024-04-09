import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import MapViewScreen from './components/MapViewScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MapViewScreen" component={MapViewScreen} options={{ title: 'Map View' }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
