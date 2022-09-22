import React,{useState,useRef} from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { ImageBrowser } from 'expo-image-picker-multiple';
import { ScrollView } from 'react-native-gesture-handler';
import InputField from '../subScreens/InputField';

import ProgressBar from '../subScreens/ProgressBar'
import {SignatureScreen} from '../subScreens/Signature'
import { Switch } from 'react-native-paper';
const EclaimSubmit=({ navigation,route })=>{

    const [nextPage,setPage]=useState(1)
    const [firstname,setFirstName]=useState('')
    const [lastname,setLastName]=useState('')
    const [diagnosis,setDx]=useState('')
    const [date_symptoms,setDate]=useState('')
    const [payees_payment_type,setMethod]=useState(false)
    const [payee_email,setEmail]=useState('')
    const [payees_payee_name,setName]=useState('')
    const [payees_address,setAddress]=useState('')
    const [payees_city,setCity]=useState('')
    const [payees_province,setProvince]=useState('')
    const [payees_postcode,setPostcode]=useState('')
    const [date_first_physician,setPhysician]=useState('')
    const [guardian_name,setGuardian]=useState('')
    const [amount,setAmount]=useState(0)
    const [contact,setContact]=useState('')
    const [guardian_contact,setGuardianContact]=useState('')
    const [treatment_before,setTreatment]=useState(false)


    if(route.params){
        var { photos } = route.params;
        console.log(photos)
    }


    
    const onToggleSwitch = () => setMethod(!payees_payment_type);




    return(
      <View style={{flex: 0.95}}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}
        
        persistentScrollbar={true}
        >
        <View >
        {nextPage==1?
        <View>
          <View style={{flexDirection:'row'}}>
            <InputField  style={{width:100}} content="First Name" setValue={setFirstName}/>

            <InputField style={{width:100}} content="Last Name" setValue={setLastName}/>
          </View>
          <InputField style={{width:180}} content="Contact Number" setValue={setContact}/>

          <InputField style={{width:180}} content="Guardian Name" setValue={setGuardian}/>
          
          <InputField style={{width:180}} content="Guardian Contact" setValue={setGuardianContact}/>


          <InputField style={{width:180}} content="Claim Amount $" setValue={setAmount}/>
          <InputField style={{width:180}} content="Symptom" setValue={setDx}/>

          <InputField style={{width:180}} content="Startng Date" setValue={setDate}/>
          <InputField style={{width:180}} content="Date first visit physician" setValue={setPhysician}/>
            
        </View>  
       :null}
         
         {nextPage==2?
        <View>
          <InputField style={{width:180}} content="Claim Amount $" setValue={setAmount}/>
          <InputField style={{width:180}} content="Symptom" setValue={setDx}/>
          <InputField style={{width:180}} content="Symptom Startng Date" setValue={setDate}/>

          <View style={{alignItems:'center',flex:1}}>
            <Text style={{fontSize:20,fontWeight:'bold',flex:1,alignItems:"center",margin:5}}>
                Sought Treatment Before?
            </Text>
            <Switch  style={{margin:10}} value={payees_payment_type} onValueChange={()=>setTreatment(!treatment_before)} />
          
          </View>

          <InputField style={{width:180}} content="Sought Treatment Before?" setValue={setPhysician}/>

          <InputField style={{width:180}} content="Date first visit physician" setValue={setPhysician}/>
            
        </View>  
       :null}



         {nextPage==3?
          <View style={{alignItems:'center',flex:1}}>
            <Text style={{fontSize:20,fontWeight:'bold',flex:1,alignItems:"center",margin:5}}>
              Payee Type:   {!payees_payment_type?'By Cheque':'E-transfer'} 
            </Text>
            <Switch  style={{margin:10}} value={payees_payment_type} onValueChange={onToggleSwitch} />
            {payees_payment_type?
            <View>
              <InputField style={{width:180}} content="Payee Name" setValue={setName}/>
              <InputField style={{width:180}}  content="Payee Email" setValue={setEmail}/>
            </View>
              
              :
              
              <View>
                 <InputField style={{width:180}} content="Payee Name" setValue={setName}/>
                 <InputField style={{width:180}} content="Address" setValue={setAddress}/>
                 <InputField style={{width:180}} content="City" setValue={setCity}/>
                 <InputField style={{width:180}} content="Province" setValue={setProvince}/>
                 <InputField style={{width:180}} content="Postal Code" setValue={setPostcode}/>
              </View>
          }
          </View>:null
         
        }
          

        {nextPage==4?
        <View >
        <TouchableOpacity 
        style={{alignItems: 'center',justifyContent: 'center',marginTop:200}} 
        onPress={()=>{
                navigation.navigate('ImageBrowser')
              }}> 

                <Text style={{fontSize:25,fontWeight:'bold'}}>Choose Images</Text>

        </TouchableOpacity>
        <ScrollView horizontal={true} style={{flex: 1,flexDirection:'row',marginTop:15}}>
        {photos && Object.keys(photos).map((item)=>{
          return(<Image key={photos[item].name} source={{ uri: photos[item].uri }} style={{marginRight:10,marginTop:15, width: 300, height: 300 }} />)
        })}
        </ScrollView> 
        </View>  
       :null}

        </View>

      </ScrollView>
      {nextPage==5?
        <View style={{height:610,marginBottom:40}}>
            <SignatureScreen></SignatureScreen>
          </View>
       :null}


      <TouchableOpacity 
        style={{alignItems: 'center'}}
        onPress={()=>{
          if(nextPage==5){
            setPage(1)
          }
          else{
            setPage(nextPage+1)
          }
        }}> 
        <Text style={{fontSize:30,fontWeight:'bold'}}>Next</Text>
        </TouchableOpacity>

        <ProgressBar style={{alignItems: 'center',height:20,marginTop:50}} progress={Math.floor(nextPage/5*100)/100}></ProgressBar>

      </View>

    )
}


export default EclaimSubmit;