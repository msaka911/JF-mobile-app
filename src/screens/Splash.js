import React, { useCallback, useEffect, useState } from 'react';
import { Text, View,ImageBackground,StyleSheet ,Image} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import logo from '../../assets/logo.png';
import { AntDesign } from '@expo/vector-icons'; 
import Spacer from '../Spacer';



export default function Splash({navigation},props) {

 


  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
      setTimeout(() => navigation.navigate("HomeScreen"), 2200);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const styles = StyleSheet.create({
    theImage: {
        width: "100%",
        height: "101%",
        resizeMode: "cover",
    },
    theText:{
        color:"black",
        fontSize:32,
        fontWeight:"400",
    },
    logo:{
      aspectRatio: 3.2, 
      resizeMode: 'contain',
      alignSelf:'center',
    }
})

  return (
      <ImageBackground source={require('../../assets/splash.png')} style={styles.theImage} imageStyle={{opacity:0.5, resizeMode: "cover" }}>
      <View
      style={{ alignItems: 'center', justifyContent: 'center',padding:5, marginTop:220 }}
      onLayout={onLayoutRootView}>

       <Image source={logo} style={styles.logo}/>
      <Text style={styles.theText}>Welcome to JF insurance </Text>
      <Spacer/>
      <AntDesign name="facebook-square" size={24} color="black">
      <Text style={{fontWeight:"100",fontSize:10,}}>@JFinsurnce  · Insurance company</Text>
      </AntDesign>
      </View>
      </ImageBackground >
    
  );
}