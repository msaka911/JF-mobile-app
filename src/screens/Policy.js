import * as React from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'
import Spacer from '../Spacer';
import { Input } from 'react-native-elements';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

const Policy=(props)=>{
   const [policy_number,setPolicy]=useState("")

   // const [number,setNumber]=useState(0)

   // const link="http://192.168.3.167:3000/hello?policy_number=JES61000";

   // const link=REACT_APP_BACKEND+'/policyword?policy_number=JFR63100'
   
   // React.useEffect(() => {
   //    const unsubscribe = props.navigation.addListener('focus', () => {
   //       setNumber(number+1)
   //    });
   //    return 
   //  }, [props.navigation,number]);
   const handleOpenWithLinking = () => {
      Linking.openURL(REACT_APP_BACKEND+`/claimform?policy_number=${policy_number}`);
      setPolicy("")
    };
    
   const handleOpenWithWebBrowser = () => {
      WebBrowser.openBrowserAsync(REACT_APP_BACKEND+`/claimform?policy_number=${policy_number.toUpperCase()}`);
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
   buttonStyle:{
      alignItems: "center",
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
export default Policy;