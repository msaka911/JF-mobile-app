import React,{useEffect, useState,useRef} from 'react';
import { Text, StyleSheet, View ,FlatList, TouchableOpacity,Alert,Animated} from 'react-native';
import {REACT_APP_BACKEND} from '@env'
import Spacer from './screens/subScreens/Spacer';

import { ListItem } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';


const ClaimDetail=({navigation})=>{
  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    }]

    const [data,setData]=useState(["1. Fill E-claim Form","2.Upload Clinic medical records/Hospital emergency room records/Doctor notes","3.Upload Doctor referral letter for lab text/paramedical service","4. Upload Receipts or any oustanding bills","5. Upload Official prescription for your prescribed drug" ])
    const axios = require('axios');
     
    const posAnim = useRef(new Animated.Value(400)).current
    const fadAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
      Animated.timing(
        posAnim,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver:true
        }
      ).start();
      Animated.timing(
        fadAnim,{
          toValue: 1,
          duration: 1000,
          useNativeDriver:true
        }
      ).start();

    }, [posAnim,fadAnim])
  
    // useEffect(()=>{
    //     axios({
    //         method: 'get',
    //         url: REACT_APP_BACKEND+'/claimDetail',
    //       }).then((response)=>{
    //         setData(response.data)

    //       })
    //       .catch(error=>{
    //         Alert.alert('Failed to retrieve data','',[])
    //       })
    // },[])

    const styles=StyleSheet.create({
        viewStyle:{
        flex:1,
        margin:10
        },
        textStyle:{
            marginBottom:10,
            fontSize:20,
            fontWeight:"400"
        },
        buttonStyle:{
            backgroundColor:"#dcdcdc",
            padding:15,
            width:'75%',
            alignItems:'center',
            borderRadius:11,
            marginBottom:35,
            alignSelf:'center'
        },
        buttontextStyle:{
          fontSize:20,
          fontWeight:"700",
          
      },
      itemStyle:{
        fontSize:18,
        fontWeight:"600",
        marginBottom:20,

      }
      
      }
      )



    return(
    <View style={styles.viewStyle}>
       <Spacer/>
       <Animated.View                 // Special animatable View
      style={{
        opacity: fadAnim,
        transform: [{
          translateY: posAnim
        }],       
      }}
    >
      <View style={{}}>
        
       <Text style={styles.textStyle}>Required Documents:</Text>
       
       <View style={{width:'100%'}}>
          {
            data.map((l) => (
              
              <ListItem
                key={l}
                title={l}
                bottomDivider
              >
                <AntDesign name="pushpino" size={20} color="black" />
                <ListItem.Content>
                <ListItem.Title>{l}</ListItem.Title>
              </ListItem.Content>
              </ListItem>
            ))
          }
        </View>






      </View>
      </Animated.View>
        <Spacer/>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>navigation.navigate("MainDrawer",{ screen: 'Webview' })}>
            <Text style={styles.buttontextStyle} >Thru Online E-claim Portal</Text>
        </TouchableOpacity>
        <Spacer/>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>Alert.alert('Mailing Address'," Ontime Care Worldwide Inc 15 Wertheim Court, Suite 512, Richmond Hill, ON, L4B 3H7",[])}>
            <Text  style={styles.buttontextStyle}>By mailing/Post</Text>
        </TouchableOpacity>
    </View>
    )
}



export default ClaimDetail;