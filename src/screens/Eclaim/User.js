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


    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }

    async function extract(key, value) {
        await SecureStore.getItemAsync(key, value);
      }

    
    

    useEffect(()=>{
      
        async function saveInStore(){
            async function getApi(){
                var api=await extract('api_id')
                if(typeof api=='undefined'){
                    return route.params.api_id
                }
                else{
                    return api
                }
            }
    
            const api_id=await getApi()
            
            var getData =async()=>{
                var extractData=await extract('data')
                if(typeof extractData=='undefined'){
                    return route.params.data
                }
                else{
                    return extractData
                }
            }
            
            const data=await getData()
    
    
    
            var parsed= data
            if(typeof parsed!==`undefined`&&typeof parsed.policy!=='undefined'){
                save('data',JSON.stringify(data))
                save('effective_date',parsed.policy.effective_date)
                save('policy',parsed.policy.policy)
                save('plan_id',parsed.policy.plan_id)
                save('token',parsed.token)
                save('arrival_date',parsed.policy.arrival_date)
                save('api_id',api_id)
                save('gender',parsed.policy.gender)
                save('suite_number',parsed.policy.suite_number||' ')
                save('street_number',parsed.policy.street_number||' ')
                save('street_name',parsed.policy.street_name)
                save('city',parsed.policy.city)
                save('province',parsed.policy.province2)
                save('postcode',parsed.policy.postcode)
                save('birthday',parsed.birthday)
                save('email',parsed.policy.contact_email)
                save('firstname',parsed.policy.firstname)
                save('lastname',parsed.policy.lastname)
                save('phone',parsed.policy.phone1)
                //________________________________________________________
                save('product_short',parsed.policy.product_short)
    
            }
            else(
                Alert.alert("please try again later")
            )
        }
        saveInStore()
    },[])

    return(
        <View style={{flex:0.7, alignSelf:'center',justifyContent: 'center'}}>
        <Button  
        color='black'
        labelStyle={{fontSize:18}}
        onPress={() => navigation.navigate("new E-claim")}
        style={{height:60,width:250,alignSelf:'center',justifyContent: 'center',marginTop:40,borderRadius:25}} mode="contained" >
            Submit E-Claim
        </Button>
        <Spacer/>
        <Button
         color='black'
         labelStyle={{fontSize:18}}
         style={{height:60,width:250,alignSelf:'center',justifyContent: 'center',marginTop:40,borderRadius:25}}
         mode='contained' onPress={() => navigation.navigate('ClaimPage')}>
            Checking Claims
        </Button>
        <Spacer/>
        <Button  
        color='black'
        labelStyle={{fontSize:18}}
        onPress={() => navigation.navigate("Policycard")}
        style={{height:60,width:250,alignSelf:'center',justifyContent: 'center',marginTop:40,borderRadius:25}} mode="contained" >
            Check Policy Info
        </Button>
       </View>
    )
}

export default User;