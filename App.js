import React, { useState, useEffect } from 'react';
import { ImageBackground, Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Navigation container for the app navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Bottom tabs navigator
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Icon set for the tab bar

// Import screen components
import HomeScreen from './components/HomeScreen';
import TipsScreen from './components/TipsScreen';
import ProfileScreen from './components/ProfileScreen';
import MapViewScreen from './components/MapViewScreen';

const Tab = createBottomTabNavigator(); // Initialize bottom tab navigator

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading indicator

  // Simulate loading (e.g., fetching data) on app start
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Hide loading screen after 3 seconds
    }, 3000);
  }, []);

  // Show splash screen while loading
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/bgop.jpg')} style={styles.backgroundImage}>
          <Image source={require('./assets/openpage.png')} style={styles.logo} />
        </ImageBackground>
      </View>
    );
  }

  // App navigation structure
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#F1FADA', // Color for active tab
          tabBarInactiveTintColor: '#F1FADA', // Color for inactive tab
          tabBarStyle: {
            backgroundColor: '#265073', // Background color of the tab bar
            borderTopWidth: 1, // Border top width
            borderTopColor: '#F1FADA', // Border top color
          },
          tabBarItemStyle: {
            borderRightWidth: 1, // Border right width for each tab item
            borderRightColor: '#F1FADA', // Border right color
          },
          tabBarIcon: ({ focused, color, size }) => { // Custom icon for each tab
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Tips') {
              iconName = focused ? 'lightbulb' : 'lightbulb-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
            } else if (route.name === 'Finder') {
              iconName = focused ? 'map-search' : 'map-search-outline';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {/* Tab screens */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tips" component={TipsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Finder" component={MapViewScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// StyleSheet for splash screen and app styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center splash logo
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain', // Keep the logo aspect ratio
  },
});

