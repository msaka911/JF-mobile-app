import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity,LayoutAnimation,Animated,useWindowDimensions,ScrollView, Alert } from 'react-native';
import { useState, useEffect,useRef} from 'react';
import {REACT_APP_BACKEND} from '@env'
import Spacer from '../subScreens/Spacer';
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
        var parsed= data
        if(typeof parsed!==`undefined`&&typeof parsed.policy!=='undefined'){
            save('effective_date',parsed.policy.effective_date)
            save('policy',parsed.policy.policy)
            save('plan_id',parsed.policy.plan_id)
            save('toekn',parsed.token)
            save('arrival_date',parsed.policy.arrival_date)
            save('api_id',api_id)
            save('gender',parsed.policy.gender)
            save('suite_number',parsed.policy.suite_number)
            save('street_number',parsed.policy.street_number)
            save('street_name',parsed.policy.street_name)
            save('city',parsed.policy.city)
            save('province',parsed.policy.province2)
            save('postcode',parsed.policy.postcode)
        }
        else(
            Alert.alert("please try again later")
        )
    },[route.params])

    return(
        <View style={{flex:0.6, alignSelf:'center',justifyContent: 'center'}}>
        <Button
         color='black'
         labelStyle={{fontSize:18}}
         style={{height:60,width:250,alignSelf:'center',justifyContent: 'center',borderRadius:25}}
         mode='contained' onPress={() => navigation.navigate('ClaimPage',{ data: data,api_id:api_id})}>
            Checking Claims
        </Button>
        <Spacer/>
        <Button  
        color='black'
        labelStyle={{fontSize:18}}
        onPress={() => navigation.navigate("new E-claim",{ data: data,api_id:api_id})}
        style={{height:60,width:250,alignSelf:'center',justifyContent: 'center',marginTop:40,borderRadius:25}} mode="contained" >
            Submit E-Claim
        </Button>
       </View>
    )
}

export default User;