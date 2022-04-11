import React,{useEffect, useState} from 'react';
import { Text, StyleSheet, View ,FlatList, TouchableOpacity,Alert} from 'react-native';
import {REACT_APP_BACKEND} from '@env'
import Spacer from './Spacer';



const ClaimDetail=({navigation})=>{

    const [data,setData]=useState('')
    const axios = require('axios');

    useEffect(()=>{
        axios({
            method: 'get',
            url: REACT_APP_BACKEND+'/claimDetail',
          }).then((response)=>{
            setData(response.data)
          })
          .catch(error=>{
            Alert.alert('Failed to retrieve data','',[])
          })
    },[])

    const renderItem = ({ item }) => (
        <Text style={styles.textStyle}>{item}</Text>
      );



    const styles=StyleSheet.create({
            viewStyle:{
            alignItems:'center',
            flex:0.6,
            margin:10
            },
            textStyle:{
                fontSize:20,
                fontWeight:"400",
            },
            buttonStyle:{
                marginTop:60,
                backgroundColor:"#dcdcdc",
                padding:10,
                width:'75%',
                alignItems:'center',
                borderRadius:11
            }

    }
    )

    return(
    <View style={styles.viewStyle}>
       <Spacer/>
       <Text style={styles.textStyle}>Required Documents:</Text>
       <Spacer/>
       <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
        <Spacer/>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>navigation.navigate("MainDrawer",{ screen: 'Webview' })}>
            <Text style={styles.textStyle} >Thru Online E-claim Portal</Text>
        </TouchableOpacity>
        <Spacer/>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>Alert.alert('Mailing Address'," Ontime Care Worldwide Inc 15 Wertheim Court, Suite 512, Richmond Hill, ON, L4B 3H7",[])}>
            <Text  style={styles.textStyle}>By mailing/Post</Text>
        </TouchableOpacity>
    </View>
    )
}



export default ClaimDetail;