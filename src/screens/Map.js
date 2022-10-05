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
    "BRIMLEY FAMILY CLINIC":[{latitude:43.821265135759774, longitude:-79.28361932304638},"3333 Brimley Rd,Scarborough 416-412-3333"],
    "MCI Royal Bank Plaza":[{latitude:43.64673893879095,longitude:-79.38007007305204},"200 Bay St,Toronto 416-368-6787"],
    "MCI First Canadian Place":[{latitude:43.64933853695942,longitude:-79.38222440185243},"100 King St. West,Toronto 416-867-1200"],
    "MCI Atrium":[{latitude:43.656221035869606,longitude:-79.38353823068853},"595 Bay St.,Toronto 416-598-1703"],
    "MCI Bloor":[{latitude:43.67150072617695,longitude:-79.37804084417905},"345 Bloor St. East,Toronto 416-515-0590"],
    "MCI Mount Pleasant":[{latitude:43.70847536691856,longitude:-79.38943705766908},"245 Eglington Ave. East,Toronto 416-488-1455"],
    "MCI Main Exchange":[{latitude:43.79263933748097,longitude:-79.44827275766679},"4A-800 Steeles Ave. West,Toronto 905-738-6699"],
    "MCI Thornhill":[{latitude:43.822120602954755,longitude:-79.4004644902112},"8 Green Lane, Units 1-3,Thornhill 905-764-0188"],
    "MCI Woodbridge":[{latitude:43.791796765616176,longitude:-79.5540709460303},"700-200 Windflower Gate,Woodbridge 905-856-2100"],
    "MCI Bramalea":[{latitude:43.71511825501549,longitude: -79.7212920327964},"387-25 Peel Centre Dr.,Brampton 905-793-7077"],
    "MCI Morningside Crossing":[{latitude:43.76975607327365,longitude: -79.18520613735447},"255 Morningside Ave.,Scarborough 416-284-1020"],
    "MCI Scarborough":[{latitude:43.81462613210471, longitude:-79.32375140184789},"325 Bamburgh Circle,Scarborough 416-492-8068"],
    "MCI Whitby":[{latitude:43.88293473711888,longitude:-78.91247837300975},"80 Thickson Rd. South,Whitby 905-668-6448"],
    "MCI Six Points Plaza":[{latitude:43.64056377938459,longitude: -79.53797032883452},"5230 Dundas St. West,Etobicoke 416-234-8668"],
    "MCI Jane Street":[{latitude:43.75610971533968,longitude:-79.51479151725881},"3869 Jane St.,Toronto 416-636-7077"],
    "MCI Oakville":[{latitude:43.482198305832455,longitude:-79.69621643069318},"1011 Upper Middle Road East,Oakville 905-849-7007"],
    "MCI McLaughlin":[{latitude:43.63639677023713 ,longitude:-79.71892275952541},"7070 McLaughlin Rd.,Mississauga 905-795-2873"],
    "MCI Hess Village":[{latitude:43.264199762105115,longitude: -79.8785386730263},"340 York Blvd.,Hamilton 905-525-1677"],
    "Waterloo Walk In Clinic":[{latitude:43.47210789966872,longitude: -80.5390279019214},"170 University Ave. West,Waterloo 519-725-1514"],
    "MCI Nose Hill":[{latitude:51.12316996411835, longitude:-114.19738492861774},"137-1829 Ranchlands Blvd.NW 403-239-8888"],
    "MCI Beacon Hill":[{latitude:51.15784734639664, longitude:-114.16182811697999},"11718 Sarcee Trail. NW 403-274-1864"],
    "MCI Beddington":[{latitude:51.127232780096655,  longitude:-114.07337307094483},"207-8120 Beddington Blvd.NW 403-275-4611"],
    "MCI Midtown":[{latitude:51.04342421872101,  longitude:-114.08663162862007},"1110-11 Ave.SW 403-269-9488"],
    "Rockland MD":[{latitude:45.5199653458538, longitude: -73.62611904419042},"100 Rockland Road #110,Mont-Royal 514-667-3383"],
    "Stein Medical Clinic":[{latitude:49.283171241797454, longitude:-123.12163461518283},"777 Hornby St #800,Vancouver 604-637-8777"],
    "Mainland Medical Clinic":[{latitude:49.276716970343706,  longitude:-123.1208204458737},"1061 Hamilton Street,Vancouver 604-683-3973"]

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
       description={clinicCoord[i][1]}
       coordinate={clinicCoord[i][0]}
       height={300}       
       >
       </Marker>
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