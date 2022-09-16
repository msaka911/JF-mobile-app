import { WebView } from 'react-native-webview';
import * as React from 'react';
import { useId } from 'react'

import { Text, StyleSheet, View, Image,Button, TouchableOpacity,Alert } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'
import uniqueId from 'lodash/uniqueId'

import Spacer from '../Spacer';
import { Input } from 'react-native-elements';


const Webview=({navigation})=>{
    const [policy_number,setPolicy]=useState("")
    const [birthday,setBirthday]=useState("")

    const id = uniqueId('jfinsurancepolicy')
    var axios = require('axios');
    var FormData = require('form-data');

    // const onButtonClick=()=>{
        
    //     if(policy_number&&birthday){ 
        
    //         var data = new FormData();
    //         data.append('policy', 'JFPL658585');
    //         data.append('birthday', '1998-02-16');
    //         data.append('api_id', 'jfinsurance25');
    //         // data.append('policy', policy_number);
    //         // data.append('birthday', birthday);
    //         // data.append('api_id', id);
    //         var config = {
    //             method: 'post',
    //             url: 'https://claim.otcww.com/Api/login',
    //             data : data
    //           };

    //       axios(config
    //       ).then((response)=>{
    //         Alert.alert("Successful",",[]")
    //          navigation.navigate("ClaimPage",{ data: response})
    //         }
    //       ).catch(error=>{
    //         Alert.alert('Authentication Failed, Please check your policy number or birthday',"",[])
    //         console.log(error.response)
    //       })
    //     }
    //     else{
    //       Alert.alert('Please input valid information','',[])
    //     }
    // }
    const onButtonClick=()=>{

        
        var formdata = new FormData();
        formdata.append('policy', policy_number);
        formdata.append('birthday', birthday);
        formdata.append('api_id', id);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("https://claim.otcww.com/Api/login", requestOptions)
          .then(response => response.text())
          .then(result => navigation.navigate("ClaimPage",{ data: result,api_id:id}))
          .catch(error => console.log('error', error));
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