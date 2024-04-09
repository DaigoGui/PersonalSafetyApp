import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const ComingSoonScreen = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require('./../assets/ComingSoon.mp4')} // The video file
        style={styles.backgroundVideo}
        muted={true} // Mutes the video
        repeat={true} // Loop the video
        resizeMode="cover" // Cover the whole screen
        rate={1.0} // Play at normal speed
        ignoreSilentSwitch={'obey'}
      />
      {/* You can place other content here that you want to show on top of the video */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default ComingSoonScreen;
