import React from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import logo from '../../assets/logo.png'

import * as WebBrowser from 'expo-web-browser';

const HomeScreen = ({ navigation }) => {
  var today = new Date()
  var curHr = today.getHours()


  return (
    <View >
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.text}>{curHr < 12?"Good Morning":"Good Afternoon"}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ClaimGuide')}
      >
        <Text style={styles.buttontext} >Claim Guide</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('')}
      >
        <Text style={styles.buttontext} >Go to List Demo</Text>
      </TouchableOpacity> */}
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Webview')}
      >
        <Text style={styles.buttontext} >E-claim Portal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Agentview')}
      >
        <Text style={styles.buttontext} >Agent Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Emergency')}
      >
        <Text style={styles.buttontext} >Emergency Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color:'black',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize: 35,
  },
  button:{
    
    marginTop: 30,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'hsl(200, 50%, 100%)',
    borderRadius:20,
    padding:3,
    width:300,
    height:80,
    
    borderColor:'black',
    shadowOpacity: 0.7,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2
    }
    
  },
  buttontext:{
    color:'black',
    alignSelf:'center',
    justifyContent:'center',
    fontWeight:'500',
    fontSize:25
  },
  logo:{
    aspectRatio: 3.2, 
    resizeMode: 'contain',
    alignSelf:'center',
  }
});

export default HomeScreen;
