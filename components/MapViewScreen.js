import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewScreen = () => {
  // Preset markers for police stations in Glasgow
  const policeStations = [
    { latitude: 55.8610, longitude: -4.2567, title: "Glasgow Central Police Station" },
    { latitude: 55.8678, longitude: -4.2575, title: "Glasgow North Police Station" },
    { latitude: 55.8445, longitude: -4.3074, title: "Glasgow South Police Station" },
    { latitude: 55.8729, longitude: -4.2892, title: "Glasgow East Police Station" },
    { latitude: 55.8800, longitude: -4.3405, title: "Glasgow West Police Station" },
    // Add more markers as needed
  ];

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: 55.8609, // Central Glasgow
          longitude: -4.2514,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {policeStations.map((station, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: station.latitude, longitude: station.longitude }}
            title={station.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapViewScreen;

