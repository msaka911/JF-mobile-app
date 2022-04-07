import React, { useCallback, useEffect, useState } from 'react';
import { Text, View,ImageBackground,StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

export default function Splash({navigation}) {
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
      setTimeout(() => navigation.navigate("HomeScreen"), 2000);
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
        opacity:0.7,
    },
    theText:{
        color:"black",
        fontSize:40,
        fontWeight:"100",
    }
})
  return (
      <ImageBackground  source={require('../../assets/splash.png')}  style={styles.theImage}>
      <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
      <Text style={styles.theText}>JF insurance 👋</Text>
      <Entypo name="rocket" size={30} />
      </View>
      </ImageBackground >
    
  );
}