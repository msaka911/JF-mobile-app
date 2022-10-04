import React,{useState} from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-paper';

const InputField=(props)=>{
 

 return(
    <View style={{
        margin:5,
        height: 75,
        alignItems:'center',
        justifyContent:"space-between"
    }}>
    <TextInput mode='outlined' label={props.content} style={[styles.input, props.style]} keyboardType={props.keyboardType||`default`} onChangeText={(value)=>props.setValue(value)}></TextInput>
    </View> 
 )
}

const styles = StyleSheet.create({
    input: {
      fontSize:18,
      borderRadius:5
    },
    textInput:{
        fontSize:17,
        fontWeight:'bold',
    }
  });
  

export default InputField;