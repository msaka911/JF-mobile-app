import React from 'react';
import { View, Text, StyleSheet, FlatList,Image, ScrollView,TextInput ,Alert } from 'react-native';

import {REACT_APP_BACKEND} from '@env'
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

//send email in backend instead frontend

// const sgMail = require('@sendgrid/mail');
// const API_KEY = REACT_APP_SEND_GRID_API


const Feedback=()=>{
   
    const [content, setContent]=useState("")
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")

    
    const axios = require('axios');
    
    const onButtonClick=()=>{
        if(name&&email&&content){
          axios({
            method: 'post',
            url: REACT_APP_BACKEND+'/feedback',
            data: {
              name,
              email,
              content
            }
          }).then(()=>{
            Alert.alert('Thanks for your feedback','',[])}
          ).catch(error=>{
            Alert.alert('Failed to send','Tyr it later',[])
          })
          setContent("")
          setName("")
          setEmail("")
        }
        else{
          Alert.alert('Input corret information','',[])
        }
    }
    return(
        <View>
          <Spacer>
          <Input placeholder="name" value={name} onChangeText={(inputContent)=>setName(inputContent)} />
          <Input placeholder="contact email" value={email} onChangeText={(inputContent)=>setEmail(inputContent)} keyboardType={'email-address'} />
        <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Feedback"
        placeholderTextColor="grey"
        numberOfLines={10}
        multiline={true}
        value={content}
        onChangeText={(inputContent)=>setContent(inputContent)}
        />
      </Spacer>
      <Spacer/>
        <TouchableOpacity onPress={onButtonClick} style={styles.buttonStyle}><Text style={styles.textStyle}>Submit</Text></TouchableOpacity>
        
        </View>
    )
}

const styles = StyleSheet.create({
    textArea: {
      borderColor:"black",
      borderWidth: 1,
      padding:5,
      height: 200,
      justifyContent: "flex-start",
      marginTop:30
    },
    buttonStyle:{
      alignSelf:'center',
      
    },
    textStyle:{
      fontSize:20,
      fontWeight:"500"
    }
  })

export default Feedback;



