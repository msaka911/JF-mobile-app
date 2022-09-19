import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity,LayoutAnimation,Animated,useWindowDimensions,ScrollView, Alert } from 'react-native';
import { useState, useEffect,useRef} from 'react';
import {REACT_APP_BACKEND} from '@env'
import { CustomLayoutSpring } from "react-native-animation-layout";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ClaimItem from './ClaimItem';
import Spacer from '../Spacer';
import { Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const ClaimPage=({route,navigation})=>{
    
    const[claimData, setData]=useState();
    
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }

    const { data } = route.params;
    const {api_id}=route.params;

    useEffect(()=>{
        
        var parsed= JSON.parse(data)
        if(parsed!==undefined){
            save('effective_date',parsed.policy.effective_date)
            save('policy',parsed.policy.policy)
            save('toekn',parsed.token)
    
    
            var formdata = new FormData();
            formdata.append('api_id', api_id);
            formdata.append('token', parsed.token);
        
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            
            fetch("https://claim.otcww.com/Api/claims", requestOptions)
                .then(response => response.text())
                .then((result) => {
                    setData(JSON.parse(result))
                    LayoutAnimation.configureNext(CustomLayoutSpring());
                })
                .catch(error => Alert.alert('Cannot retrieve the info, please try again later'));
        }
        else{
                Alert.alert("cannot retrieve the information, try again later","",[])
        }

    },[route.params])
    //---------------------fetch claim information--------------------------

    ///-------------------------animation--------------------
   

//    if(claimData !== undefined){
//        console.log(claimData)
//     // Object.keys(claimData.claims[0].items).map((index)=>{
//     //     console.log(claimData.claims[0].items[index].claim_item_no)
//     //     console.log(showDetail)
//     // })
//    }
    
    

    return(
        <ScrollView>
            {claimData!==undefined?claimData.claims.map((item)=>{
            return(
                <ClaimItem key={item.claim_no} item={item}/>
            )

            }):null}
            
      </ScrollView>
    )
    
}



export default ClaimPage;