import React,{ useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,Image, ScrollView,Animated } from 'react-native';
import { RotateInDownLeft } from 'react-native-reanimated';
import { Header,Divider } from 'react-native-elements';

const AboutUs = (props) => {
//----------------------create fade in animation---------------------
  const fadeAnim = useRef(new Animated.Value(-3)).current

  const op=useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();

    Animated.timing(
    op,
    {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }
  ).start();
  }, [fadeAnim,op])

  const yVal = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
    opacity:op
  };

return(
  <ScrollView style={styles.viewStyle}>
    <Animated.View                 // Special animatable View
        style={
          animStyle
              // Bind opacity to animated value
      }
    >
  <Text style={styles.textStyle}>JF Insurance Agency Group Inc. (JF) is a licensed brokerage firm incorporated in 1992. JF specializes in providing Emergency Hospital and Medical coverage for International Visitors to Canada, International Students and Canadian travelers. JF strives to be the leading firm in providing comprehensive medical coverage at unbeatable prices to travelers to Canada. JF has over 3000 active partnerships with insurance agents, financial advisors, travel agencies and insurance agencies selling our policies. JF is also a leading provider for International Student insurance for many private and public schools, language schools and colleges in Canada.
  {"\n"}
  {"\n"}
  Contact a local insurance agent to inquire about our travel products!</Text>
    
  <Image source={require('../../assets/person.jpg')} style={styles.image}></Image>
  </Animated.View>
 </ScrollView>
)
 };

const styles = StyleSheet.create({
  viewStyle:
  {width:350,
  alignSelf:'center',
  flex:1,
},
  textStyle: {
    marginVertical: 25,
    justifyContent: 'center',
    fontWeight:'bold',
  },
  image:{
    flex: 1,
    justifyContent: 'center',
    width: 350,
    height: 220,
    borderRadius:5
  }
});

export default AboutUs;
