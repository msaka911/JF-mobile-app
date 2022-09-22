import * as React from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'
import Spacer from './subScreens/Spacer';
import { Input } from 'react-native-elements';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { uniqueId } from 'lodash';

const Policy=(props)=>{
   const [policy_number,setPolicy]=useState("")
   const [birthday,setDOB]=useState("")

   const [number,setNumber]=useState(0)

   const link="http://192.168.3.167:3000/policyword";

   // const link=REACT_APP_BACKEND+'/policyword?policy_number=JFR63100'
   
   // React.useEffect(() => {
   //    const unsubscribe = props.navigation.addListener('focus', () => {
   //       setNumber(number+1)
   //    });
   //    return 
   //  }, [props.navigation,number]);

   
   // (async()=>{
   //    const effective_date=await SecureStore.getItemAsync('effective_date');

   //    const policy=await SecureStore.getItemAsync('policy');
   //     setPolicy(policy)
   //     return(effective_date,policy)

   //       }).then((effective_date,policy)=>{
   //       console.log(effective_date)
   //       console.log(policy)
   //     }
   //     )
   



   React.useEffect((
   )=>{
      async function getValueFor() {
         let policy = await SecureStore.getItemAsync('policy');
         let effectiveDate=await SecureStore.getItemAsync('effective_date');
         if (policy&&effectiveDate) {
            console.log(policy)
           return(
            WebBrowser.openBrowserAsync(`${link}?policy_number=${policy.toUpperCase()}&effectiveDate=${effectiveDate}`)
           )
         } else {
           alert('No values stored under that key.');
         }
       }

       getValueFor() 
      }
   ,[])

   
   // const handleOpenWithLinking = () => {
   //    Linking.openURL(REACT_APP_BACKEND+`/claimform?policy_number=${policy_number}`);
   //    setPolicy("")
   //  };

   // console.log(`${link+policy_number.toUpperCase()}`)

   const handleOpenWithWebBrowser = () => {
      const id = uniqueId('jfinsurancepolicy')
      var FormData = require('form-data');

         if(policy_number.length>6&birthday.length>8){
           var formdata = new FormData();
           formdata.append('policy', policy_number.toUpperCase());
           formdata.append('birthday', birthday);
           formdata.append('api_id', id);
           
           var requestOptions = {
             method: 'POST',
             body: formdata,
             redirect: 'follow'
           };
           
           fetch("https://claim.otcww.com/Api/login", requestOptions)
             .then(response => response.text())
             .then((result) => {
               var parsed= JSON.parse(result)
               return WebBrowser.openBrowserAsync(`${link}?policy_number=${parsed.policy.policy.toUpperCase()}&effectiveDate=${parsed.policy.effectiveDate}`)
             })
             .catch(error => console.log('error', error));
         }
         else{
           Alert.alert(
             "Please input valid info",'',[]
           )
         }
 



      // WebBrowser.openBrowserAsync(REACT_APP_BACKEND+`/claimform?policy_number=${policy_number.toUpperCase()}`);
      // console.log(`${link+policy_number?.toUpperCase()}`)
      // WebBrowser.openBrowserAsync(`${link+policy_number.toUpperCase()}`);
    };
  

  const styles = StyleSheet.create({
   viewStyle:{
       alignItems:'center',
       justifyContent:'center',
       padding:30
     },
   inputStyle:{
       width:100,
       alignSelf:'center',
       marginTop:100
   },
   buttonStyle:{
      alignItems: "center",
   },
   textStyle:{
      fontSize:25,
   }})

   return(    
      <View style={styles.viewStyle}>
      <Spacer/>
     <Input style={styles.inputStyle} placeholder="policy number" value={policy_number} onChangeText={(inputContent)=>setPolicy(inputContent)}/>
     <Spacer/>
     <Input style={styles.inputStyle} placeholder="birthday" value={birthday} onChangeText={(inputContent)=>setDOB(inputContent)}/>
     <Spacer/>
     <TouchableOpacity style={styles.buttonStyle} onPress={()=>handleOpenWithWebBrowser()}><Text style={styles.textStyle}> Submit</Text></TouchableOpacity>
    </View>
   )
}
export default Policy;