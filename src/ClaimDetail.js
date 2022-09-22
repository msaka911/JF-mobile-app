import React,{useEffect, useState,useRef} from 'react';
import { Text, StyleSheet, View ,FlatList, TouchableOpacity,Alert,Animated} from 'react-native';
import {REACT_APP_BACKEND} from '@env'
import Spacer from './screens/subScreens/Spacer';



const ClaimDetail=({navigation})=>{

    const [data,setData]=useState(["1.Filled Claim Form","2.Clinic medical records/Hospital emergency room records/Doctor notes","3.Doctor referral letter","4.Receipts or any oustanding bills" ])
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

    const renderItem = ({ item }) => (
        <Text style={styles.textStyle}>{item}</Text>
      );

    const styles=StyleSheet.create({
        viewStyle:{
        alignItems:'center',
        flex:0.4,
        margin:10
        },
        textStyle:{
            margin:5,
            fontSize:20,
            fontWeight:"400"
        },
        buttonStyle:{
            backgroundColor:"#dcdcdc",
            padding:10,
            width:'75%',
            alignItems:'center',
            borderRadius:11,
            marginBottom:35
        },
        buttontextStyle:{
          fontSize:20,
          fontWeight:"400"
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
       <Text style={styles.textStyle}>Required Documents:</Text>
       <Spacer/>
       <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
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