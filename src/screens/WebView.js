import * as React from 'react';
import { FontAwesome } from "@expo/vector-icons";

import { Text, StyleSheet, View, Image,Button, TouchableOpacity,Alert } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'
import uniqueId from 'lodash/uniqueId'

import Spacer from '../Spacer';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-date-picker'


const Webview=({navigation})=>{
    const [policy_number,setPolicy]=useState("")
    const [birthday,setBirthday]=useState("")

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

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

    const onButtonClick=()=>{

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
            .then(result => navigation.navigate("ClaimPage",{ data: result,api_id:id}))
            .catch(error => console.log('error', error));
        }
        else{
          Alert.alert(
            "Please input valid info",'',[]
          )
        }

    }

    const styles = StyleSheet.create({
        viewStyle:{
            alignItems:'center',
            justifyContent:'center',
            padding:30
          },
        inputStyle:{
            alignSelf:'center',
            marginTop:40,
            flexDirection: 'row',
            alignItems:'baseline'
        },
        textStyle:{
            fontSize:25,
         },
        buttonStyle:{
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10,
          marginTop:70,
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
       <Input ref={input} style={styles.inputStyle} placeholder="Policy Number" value={policy_number} onChangeText={(inputContent)=>setPolicy(inputContent)}/>
       <Spacer/>
       <Input leftIcon={
       <FontAwesome
          name='birthday-cake'
          size={25}
          color='black'
    />} leftIconContainerStyle={{marginRight:5}} onFocus={() => setOpen(true)} containerStyle={styles.inputStyle}  placeholder="Birthday" value={birthday} onChangeText={(inputContent)=>setBirthday(inputContent)}>
      <DatePicker
        style={{width: 320, backgroundColor: "white"}}
        display="default"
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </Input>
       <TouchableOpacity style={styles.buttonStyle} onPress={onButtonClick}><Text style={styles.textStyle}> Submit</Text></TouchableOpacity>
    </View> 
    )
}


export default Webview;