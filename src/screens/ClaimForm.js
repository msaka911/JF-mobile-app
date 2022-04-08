import * as React from 'react';
import { WebView } from 'react-native-webview';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'
import { Fragment } from 'react/cjs/react.production.min';
import Spacer from '../Spacer';
import { Input } from 'react-native-elements';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

const ClaimForm=(props)=>{
   const [policy_number,setPolicy]=useState("")


    

  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync(REACT_APP_BACKEND+`/claimform?policy_number=${policy_number}`);
    setPolicy("")
  };

  const styles = StyleSheet.create({
    viewStyle:{
        alignItems:'center',
        justifyContent:'center',
        padding:30
      },
    inputStyle:{
        width:100,
        alignSelf:'center',
        marginTop:100
    },
    textStyle:{
        fontSize:25,
     }})


   return(
    <View style={styles.viewStyle}>
     <Spacer/>
    <Input style={styles.inputStyle} placeholder="policy number" value={policy_number} onChangeText={(inputContent)=>setPolicy(inputContent)}/>
    <Spacer/>
    <TouchableOpacity style={styles.buttonStyle} onPress={handleOpenWithWebBrowser}><Text style={styles.textStyle}> Submit</Text></TouchableOpacity>
   </View> 
   )
}

export default ClaimForm;