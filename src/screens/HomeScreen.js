import React from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import logo from '../../assets/logo.png'
import LiveChat from 'react-native-livechat'

import * as WebBrowser from 'expo-web-browser';

const HomeScreen = ({ navigation }) => {

  const onClick=()=>{
    WebBrowser.openBrowserAsync('https://secure.livechatinc.com/licence/14011275/v2/open_chat.cgi');
  }




  return (
    <View >
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.text}>Good Morning</Text>
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
        onPress={() => navigation.navigate('Emergency')}
      >
        <Text style={styles.buttontext} >Emergency Report</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={onClick}
      >
        <Text style={styles.buttontext} >Live Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color:'black',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize: 30,
  },
  button:{
    
    marginTop: 20,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'hsl(200, 50%, 100%)',
    borderRadius:10,
    padding:3,
    width:200,
    height:50,
    borderWidth:2,
    borderColor:'black'
    
  },
  buttontext:{
    color:'black',
    alignSelf:'center',
    justifyContent:'center',
    fontWeight:'900',
  },
  logo:{
    aspectRatio: 3.2, 
    resizeMode: 'contain',
    alignSelf:'center',
  }
});

export default HomeScreen;
