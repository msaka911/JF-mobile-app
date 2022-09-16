import { WebView } from 'react-native-webview';
import * as React from 'react';
import { useId } from 'react'

import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'

import Spacer from '../Spacer';
import { Input } from 'react-native-elements';

const Webview=({navigation})=>{
    const [policy_number,setPolicy]=useState("")
    const [birthday,setBirthday]=useState("")

    const axios = require('axios');
    const id = useId();

    const onButtonClick=()=>{
        if(policy_number&&birthday){
          axios({
            method: 'post',
            url: "https://claim.otcww.com/Api/login",
            data: {
              policy:policy_number,
              birthday:birthday,
              api_id: id
            }
          }).then((data)=>{
             navigation.navigate("ClaimPage",{ data: data})
            }
          ).catch(error=>{
            Alert.alert('Authentication Failed, Please check your policy number or birthday','Tyr it later',[])
          })
        }
        else{
          Alert.alert('Please input valid information','',[])
        }
    }
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
       <Input style={styles.inputStyle} placeholder="Birthday" value={birthday} onChangeText={(inputContent)=>setBirthday(inputContent)}/>
       <TouchableOpacity style={styles.buttonStyle} onPress={onButtonClick}><Text style={styles.textStyle}> Submit</Text></TouchableOpacity>
    </View> 
    )
}


export default Webview;