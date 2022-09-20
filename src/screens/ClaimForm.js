import * as React from 'react';
import { WebView } from 'react-native-webview';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'

import Spacer from '../Spacer';
import { Input } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
const ClaimForm=(props)=>{
   const [policy_number,setPolicy]=useState("")

   const link="http://192.168.3.167:3000/claimform?policy_number=";


  const handleOpenWithWebBrowser = () => {
    // WebBrowser.openBrowserAsync(REACT_APP_BACKEND+`/claimform?policy_number=${policy_number.toUpperCase()}`);
     WebBrowser.openBrowserAsync(link+`${policy_number.toUpperCase()}`);

    setPolicy("")
  };

  React.useEffect((
    )=>{
       async function getValueFor() {
          let policy = await SecureStore.getItemAsync('policy');
          if (policy!==undefined) {
            return(
             WebBrowser.openBrowserAsync(`${link}${policy.toUpperCase()}`)
            )
          }
        }
        getValueFor() 
       }
    ,[])
 

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