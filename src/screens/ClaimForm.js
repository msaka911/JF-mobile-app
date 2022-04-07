import * as React from 'react';
import { WebView } from 'react-native-webview';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'
import { Fragment } from 'react/cjs/react.production.min';
import Spacer from '../Spacer';
import { Input } from 'react-native-elements';
import Form from './Form';

const ClaimForm=(props)=>{
   const [policy_number,setPolicy]=useState("")
   const [number,setNumber]=useState(0)
   const [pressed, setPress]=useState(false)
   const [link, setLink]=useState("")
   
   
   React.useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
         setNumber(number+1)
      });
      return 
    }, [props.navigation,number]);
    
  const onSubmit=()=>{
    setLink(REACT_APP_BACKEND+`/claimform?policy_number=${policy_number}`)
    setPress(true)
    setPolicy("")
  }

  const styles = StyleSheet.create({
    viewStyle:{
        alignItems:'center',
        justifyContent:'center',
        padding:30
      },
    inputStyle:{
        width:100,
        alignSelf:'center'
    }})


   return(
    <View style={styles.viewStyle}>
   
     <Spacer/>
    <Input style={styles.inputStyle} placeholder="policy number" value={policy_number} onChangeText={(inputContent)=>setPolicy(inputContent)}/>
    <Spacer/>
    <Button title="Submit" onPress={onSubmit}/>
    {pressed?<Form  link={link}/>:null}
   </View> 
   )
}

export default ClaimForm;

{/* {pressed?<WebView source={{uri: link}} key={number} style={{flex:1}}/>:"" } */}