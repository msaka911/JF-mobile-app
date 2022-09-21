import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity,LayoutAnimation,Animated,useWindowDimensions,ScrollView, Alert } from 'react-native';
import { useState, useEffect,useRef} from 'react';
import {REACT_APP_BACKEND} from '@env'
import Spacer from '../Spacer';
import { Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { Button  } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 

const User=({route,navigation})=>{
   
    const { data } = route.params;
    const {api_id}=route.params;


    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }

    useEffect(()=>{
        var parsed= JSON.parse(data)
        if(parsed!==undefined&&parsed){
            save('effective_date',parsed.policy.effective_date)
            save('policy',parsed.policy.policy)
            save('toekn',parsed.token)
            save('api_id',api_id)}
        else(
            Alert.alert("please try again later")
        )
    },[route.params])

    return(
        <View>
         <Button  mode="contained" onPress={() => navigation.navigate('ClaimPage',{ data: data,api_id:api_id})}>
            Checking Claims
        </Button>
        <Spacer/>
        <Button  mode="contained" >
            Submit E-Claim
        </Button>
       </View>
    )
}

export default User;