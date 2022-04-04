import React from "react"
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { Header } from "react-native-elements";

const Emergency=()=>{

    return(
     <View style={styles.viewStyle}>
    <Text style={styles.titleStyle}>Hospital Admission</Text>
    <Text style={styles.textStyle}>In the event of an emergency and hospitalization, please call the 24 hour Ontime Care Worldwide Inc. emergency line IMMEDIATELY:</Text>
    <Text style={styles.telStyle}>
    From Canada or USA: 1-888-988-3268 (TOLL FREE) 
    {"\n"}
    {"\n"}
    From Worldwide: 905-707-9555 (COLLECT CALL)</Text>
    <Text  style={styles.textStyle}>Please ensure that Ontime Care Worldwide Inc. has been contacted prior to receiving any treatments or as soon as reasonably possible.</Text>
    </View>
    
    )
}

const styles = StyleSheet.create({
    viewStyle:{
      backgroundColor:'#F0F8FF',
      borderWidth:2,
      borderRadius:7,
      marginHorizontal:8,
      marginTop:10,
      shadowOpacity: 0.8,
      shadowColor: "#000000",
    },
    textStyle: {
      alignSelf:'center',
      marginHorizontal:10,
      fontSize: 15,
      fontWeight:'600',
      color:'black',
      marginVertical:15
    },
  
    titleStyle:{
      marginVertical:9,
      fontWeight:'900',
      alignSelf:'center',
      fontSize:30,
      fontWeight:'bold',
      color:'black'
    },
    imageStyle:{
      alignSelf:'center',
      justifyContent: 'center',  
      resizeMode: 'contain',
      height:190
    },
    telStyle:{
        alignSelf:'center',
        marginHorizontal:10,
        fontSize: 14,
        fontWeight:'600',
        color:'red',
        marginVertical:15
    }
  });

export default Emergency