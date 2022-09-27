import * as React from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { Text, StyleSheet, View, Image,Button, TouchableOpacity,Alert, Pressable,Keyboard } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'
import uniqueId from 'lodash/uniqueId'

import Spacer from '../subScreens/Spacer';
import { Input } from 'react-native-elements';
import DateTimePicker  from '@react-native-community/datetimepicker';
import { max } from 'lodash';


const Webview=({navigation})=>{
    const [policy_number,setPolicy]=useState("")

    const [date, setDate] = useState(new Date("2000-01-01T00:00:00"))
    const [open, setOpen] = useState(true)

    const id = uniqueId('jfinsurancepolicy')
    var axios = require('axios');
    var FormData = require('form-data');
    

    const input = React.createRef();

    // const onButtonClick=()=>{
        
    //     if(policy_number&&birthday){ 
        
    //         var data = new FormData();
    //         data.append('policy', 'JFPL658585');
    //         data.append('birthday', '1998-02-16');
    //         data.append('api_id', 'jfinsurance25');
    //         // data.append('policy', policy_number);
    //         // data.append('birthday', birthday);
    //         // data.append('api_id', id);
    //         var config = {
    //             method: 'post',
    //             url: 'https://claim.otcww.com/Api/login',
    //             data : data
    //           };

    //       axios(config
    //       ).then((response)=>{
    //         Alert.alert("Successful",",[]")
    //          navigation.navigate("ClaimPage",{ data: response})
    //         }
    //       ).catch(error=>{
    //         Alert.alert('Authentication Failed, Please check your policy number or birthday',"",[])
    //         console.log(error.response)
    //       })
    //     }
    //     else{
    //       Alert.alert('Please input valid information','',[])
    //     }
    // }

    React.useEffect(()=>{
      input.current.focus();
    },[])

    // React.useEffect(()=>{
    //   const focused=input2?.current.isFocused()

    //   console.log(input2.current.isFocused())
      
    //   if(input2.current.isFocused()){
        
    //   }
    // },[input2])
    
    async function save(key, value) {
      await SecureStore.setItemAsync(key, value);
    }

    


    const onButtonClick=()=>{

        if(policy_number.length>6&&date.toString().length>35){
          var formdata = new FormData();
          var combinedID= id+(Math.random() * 1001).toString()
          formdata.append('policy', policy_number.toUpperCase());
          formdata.append('birthday', date.toISOString().split('T')[0]);
          formdata.append('api_id',combinedID);

          
          var requestOptions = {
            method: 'POST',
            body: formdata,
            withCredentials:false          
          };
          
          fetch("https://claim.mmoo.ca/Api/login", requestOptions)

//---------------------url="https://claim.otcww.com/Api/login"----------------------------------------


           .then(response => {
            

            // for(let entry of response.headers.entries()) {
            //   if(typeof entry.set-cookie!==`undefined`){
            //         // save('Cookie',entry.set-cookie)
            //         console.log(entry.set-cookie)
            //   }
            //   else{
            //     console.log('cannot set up cookie')
            //   }
            // }
            for(let entry of response.headers.entries()) {
              // if(entry[1].includes('jf_claim')){
              //   console.log(entry['set-cookie']);
              //   console.log(entry[1])
              // }
              // console.log(entry[0]);
              // console.log(entry[1])
              // console.log(entry.cookie)
              // console.log( entry[1])

            }
            // console.log(response.type)
            // console.log(response.status)


 
            return response.json()
           })
           .then((data)=>{
            if(data.status==`OK`){

              navigation.navigate("E-claim Portal",{ data: data,api_id:combinedID})
            }
            else{
              return Promise.reject(response)
            }
           })
          //  .then((data)=>navigation.navigate("E-claim Portal",{ data: data,api_id:id}))
          //  .then(()=>console.log("here"))

            .catch(error=>{  
              Alert.alert(
              'Incorrect Policy Information','',[]
            )
              console.log(error)
          }
            )
          }
        else{
          return Alert.alert(
            "Please input valid info",'',[]
          )
        }

    }
    
    const onChange = (event, selectedValue) => {
          const currentDate = selectedValue || new Date();
          setDate(currentDate);
          Keyboard.dismiss()

      } 
   

    const focusEvent=()=>{
      setOpen(!open)
      Keyboard.dismiss()
    }
    



    const styles = StyleSheet.create({
        viewStyle:{
            alignItems:'center',
            justifyContent:'center',
            padding:30,
          },
        inputStyle:{
            marginTop:25,
            color:'black',
            fontSize:25,
            width:300
             }
            ,
        textStyle:{
            fontSize:25,
         },
        buttonStyle:{
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10,
          marginTop:50,
          borderRadius:10,
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.7,
          shadowColor: "grey",
        }})

    return(   
    <View style={styles.viewStyle}>
       <Spacer/>
       <Input ref={input} leftIcon={
            <MaterialCommunityIcons
              name='tag-text'
              size={25}
              color='black'

        />} leftIconContainerStyle={{marginRight:5}} containerStyle={styles.inputStyle} placeholder="Policy Number" value={policy_number} onChangeText={(inputContent)=>setPolicy(inputContent)}/>
       <Spacer/>
       <TouchableOpacity onPress={focusEvent} style={{
            width:200,
            height:100,
            alignContent:'center',
            flexDirection: 'row',
            alignItems:'baseline',}}>
       <FontAwesome
              name='birthday-cake'
              size={25}
              color='black'
              style={{marginRight:15}}

         /> 
          <Text placeholder="Birthday" style={styles.inputStyle} >
           
         {date.toISOString().split('T')[0]}
        </Text>
        
   </TouchableOpacity>

    {open?<DateTimePicker  mode="date" display='spinner' value={new Date(date)} onChange={onChange} style={{width:400,height:200}} />:null}

       <TouchableOpacity style={styles.buttonStyle} onPress={onButtonClick}><Text style={styles.textStyle}> Submit</Text></TouchableOpacity>
    </View> 
    )
}


export default Webview;