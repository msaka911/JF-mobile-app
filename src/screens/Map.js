import * as React from 'react';
import { useState ,useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { Alert } from 'react-native';
import * as Location from 'expo-location';

export default function Map() {

  const [location, setLocation] = useState(null)

  const mapRef = React.createRef();


  useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            enableHighAccuracy: true,
            timeInterval: 5
        });
        setLocation(location);
    })();
}, []);

useEffect(()=>{
  if(location!==null){
    mapRef.current.animateToRegion({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      longitudeDelta: 0.1,
      latitudeDelta: 0.1,
    },1000)
   }
},[location])



  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map}
      showsUserLocation={true}
      ref={mapRef}
      >
        {location!==null?<Marker
       title='Yor are here'
       coordinate={location.coords}
       />:null}
       </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});