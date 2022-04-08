import React from 'react';
import { View, Text, StyleSheet, FlatList,Image, ScrollView,TextInput ,Alert } from 'react-native';
import { RotateInDownLeft } from 'react-native-reanimated';
import { Header,Divider } from 'react-native-elements';
import {REACT_APP_BACKEND} from '@env'
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { useState } from 'react';

//send email in backend instead frontend

// const sgMail = require('@sendgrid/mail');
// const API_KEY = REACT_APP_SEND_GRID_API


const Feedback=()=>{
   
    const [content, setContent]=useState("")
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")

    
    const axios = require('axios');
    
    const onButtonClick=()=>{
        axios({
          method: 'post',
          url: REACT_APP_BACKEND+'/feedback',
          data: {
            name,
            email,
            content
          }
        }).then(()=>{
          Alert.alert('Email sent','',[])}
        ).catch(error=>{
          Alert.alert('Failed to send','',[])
        })
        setContent("")
        setName("")
        setEmail("")
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
      <Spacer>
          <Button title="Submit" onPress={onButtonClick} />
      </Spacer>
        </View>
    )
}

const styles = StyleSheet.create({
    textAreaContainer: {
     
    },
    textArea: {
      borderColor:"black",
      borderWidth: 1,
      padding: 5,
      height: 200,
      justifyContent: "flex-start",
      marginTop:30
    }
  })

export default Feedback;



