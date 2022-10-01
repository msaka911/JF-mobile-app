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

  const clinicCoord={
    "BRIMLEY FAMILY CLINIC":{latitude:43.821265135759774, longitude:-79.28361932304638},
    "MCI Royal Bank Plaza":{latitude:43.64673893879095,longitude:-79.38007007305204},
    "MCI First Canadian Place":{latitude:43.64933853695942,longitude:-79.38222440185243},
    "MCI Atrium":{latitude:43.656221035869606,longitude:-79.38353823068853},
    "MCI Bloor":{latitude:43.67150072617695,longitude:-79.37804084417905},
    "MCI Mount Pleasant":{latitude:43.70847536691856,longitude:-79.38943705766908},
    "MCI Main Exchange":{latitude:43.79263933748097,longitude:-79.44827275766679},
    "MCI Thornhill":{latitude:43.822120602954755,longitude:-79.4004644902112},
    "MCI Woodbridge":{latitude:43.791796765616176,longitude:-79.5540709460303},
    "MCI Bramalea":{latitude:43.71511825501549,longitude: -79.7212920327964},
    "MCI Morningside Crossing":{latitude:43.76975607327365,longitude: -79.18520613735447},
    "MCI Scarborough":{latitude:43.81462613210471, longitude:-79.32375140184789},
    "MCI Whitby":{latitude:43.88293473711888,longitude:-78.91247837300975},
    "MCI Six Points Plaza":{latitude:43.64056377938459,longitude: -79.53797032883452},
    "MCI Jane Street":{latitude:43.75610971533968,longitude:-79.51479151725881},
    "MCI Oakville":{latitude:43.482198305832455,longitude:-79.69621643069318},
    "MCI McLaughlin":{latitude:43.63639677023713 ,longitude:-79.71892275952541},
    "MCI Hess Village":{latitude:43.264199762105115,longitude: -79.8785386730263},
    "Waterloo Walk In Clinic":{latitude:43.47210789966872,longitude: -80.5390279019214},
    "MCI Nose Hill":{latitude:51.12316996411835, longitude:-114.19738492861774},
    "MCI Beacon Hill":{latitude:51.15784734639664, longitude:-114.16182811697999},
    "MCI Beddington":{latitude:51.127232780096655,  longitude:-114.07337307094483},
    "MCI Midtown":{latitude:51.04342421872101,  longitude:-114.08663162862007},
    "Rockland MD":{latitude:45.5199653458538, longitude: -73.62611904419042},
    "Stein Medical Clinic":{latitude:49.283171241797454, longitude:-123.12163461518283},
    "Mainland Medical Clinic":{latitude:49.276716970343706,  longitude:-123.1208204458737},



    }

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
      <MapView  style={styles.map}
      showsUserLocation={true}
      ref={mapRef}
      >
        {/* {location!==null?<Marker
       title='Yor are here'
       coordinate={location.coords}
       />:null} */}
       {Object.keys(clinicCoord).map((i)=>
       <Marker
       title={i}
       key={i}
       coordinate={clinicCoord[i]}
       />
       )}
       


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