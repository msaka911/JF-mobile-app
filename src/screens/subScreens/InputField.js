import React,{useState} from 'react';
import { Text, StyleSheet, View, Image,TextInput, TouchableOpacity } from 'react-native';

const InputField=(props)=>{
 

 return(
    <View style={{
        marginLeft:5,
        height: 80,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between"
    }}>
    <Text style={[styles.textInput]}>{props.content}</Text>
    <TextInput style={[styles.input, props.style]}  onChangeText={(value)=>props.setValue(value)}></TextInput>
    </View>
 )
}

const styles = StyleSheet.create({
    input: {
      marginLeft:10,
      borderTopWidth:0,
      borderRightWidth:0,
      borderLeftWidth:0,
      borderWidth: 1,
      fontSize:18
    },
    textInput:{
        fontSize:15,
        fontWeight:'bold',
    }
  });
  

export default InputField;