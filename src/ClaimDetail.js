import React,{useEffect, useState} from 'react';
import { Text, StyleSheet, View,Image ,ScrollView, TouchableOpacity,Alert} from 'react-native';
import {REACT_APP_BACKEND} from '@env'
import Spacer from './Spacer';



const ClaimDetail=({navigation})=>{
    const [data,setData]=useState([1,2,3,4])
    const axios = require('axios');

    useEffect(()=>{
        axios({
            method: 'get',
            url: REACT_APP_BACKEND+'/claimDetail',
          }).then((response)=>{
            setData(JSON.parse(response.data))
          })
          .catch(error=>{
            Alert.alert('Failed to retrieve data','',[])
          })
    },[])

    console.log(data)
    return(
    <View>
        {data.map((ele)=>{
                <Text>1</Text>
        })}
        <Spacer/>
        <TouchableOpacity onPress={()=>navigation.navigate("WebView")}>
            <Text>Thru Online E-claim Portal</Text>
        </TouchableOpacity>
        <Spacer/>
        <TouchableOpacity onPress={()=>Alert.alert('Mailing Address'," Ontime Care Worldwide Inc 15 Wertheim Court, Suite 512, Richmond Hill, ON, L4B 3H7",[])}>
            <Text>By mailing/Post</Text>
        </TouchableOpacity>
    </View>
    )
}



export default ClaimDetail;