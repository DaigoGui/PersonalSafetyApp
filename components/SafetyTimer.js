// components/SafetyTimer.js
import React from 'react';
import { View, Button } from 'react-native';

const SafetyTimer = () => (
  <View style={{ marginVertical: 10 }}>
    <Button title="Set Safety Timer" onPress={() => alert('Safety Timer Activated')} />
  </View>
);

export default SafetyTimer;