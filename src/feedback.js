import React from 'react';
import { View, Text, StyleSheet, FlatList,Image, ScrollView,TextInput } from 'react-native';
import { RotateInDownLeft } from 'react-native-reanimated';
import { Header,Divider } from 'react-native-elements';
import {REACT_APP_SEND_GRID_API} from '@env'
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { useState } from 'react';



const sgMail = require('@sendgrid/mail');
const API_KEY = REACT_APP_SEND_GRID_API

const Feedback=()=>{
   
    const [content, setContent]=useState("")

    const onButtonClick=()=>{
        sgMail.setApiKey(API_KEY);
        const msg = {
            to: 'zeyu@otcww.com',
            from: '14zx4@queensu.ca', // Use the email address or domain you verified above
            subject: 'Feedback',
            text: content,
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          };
          (async () => {
            try {
              await sgMail.send(msg);
            } catch (error) {
              console.error(error);
              if (error.response) {
                console.error(error.response.body)
              }
            }
          })();
    }

    return(
        <View>
          <Spacer>
        <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Feedback"
        placeholderTextColor="grey"
        numberOfLines={10}
        multiline={true}
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



