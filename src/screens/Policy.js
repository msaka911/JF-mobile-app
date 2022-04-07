import * as React from 'react';
import { WebView } from 'react-native-webview';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'


const Policy=(props)=>{
    // async function pdfFile(){
    //         await fetch('http://10.0.2.2:3000/hello?policy_number=JES61000',{
    //         method:'GET',
    //         headers:{
    //         'Content-Type': 'application/json',
    //       },
    //       }

    //     ).then((res) => {
    //        console.log(res)
    //        return response.blob()
    //     })
    //   }

    
    // const blob= await pdfFile()

   const [number,setNumber]=useState(0)

   // const link="http://192.168.3.167:3000/hello?policy_number=JES61000";

   const link=REACT_APP_BACKEND+'/policyword?policy_number=JFR63100'
   
   React.useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
         setNumber(number+1)
      });
      return 
    }, [props.navigation,number]);
   
   return(    
      <WebView 
      source={{uri: link}}
      key={number}
      style={{flex:1}}
      >
      </WebView>
   )
}

export default Policy;