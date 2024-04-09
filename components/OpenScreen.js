// components/OpenScreen.js
import React, { useEffect } from 'react';
import { ImageBackground, Image, StyleSheet, View } from 'react-native';

export default function OpenScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main'); // Navigate to 'Main' which is your Tab Navigator
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bgop.jpg')} style={styles.backgroundImage}>
        <Image source={require('../assets/openpage.png')} style={styles.logo} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
  },
});
