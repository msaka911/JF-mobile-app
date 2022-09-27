import * as React from 'react';
import { Text, StyleSheet, View, Modal, TouchableOpacity,LayoutAnimation,Animated,useWindowDimensions,ScrollView, Alert,Pressable } from 'react-native';
import { useState, useEffect,useRef} from 'react';
import {REACT_APP_BACKEND} from '@env'
import { CustomLayoutSpring } from "react-native-animation-layout";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ClaimItem from '../subScreens/ClaimItem';
import Spacer from '../subScreens/Spacer';
import { Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const ClaimPage=({route,navigation})=>{
    
    const[claimData, setData]=useState();
    
    async function extract(key, value) {
      await SecureStore.getItemAsync(key, value);
    }

   
    const [modalVisible, setModalVisible] = useState(true);

    useEffect(async()=>{
      async function getApi(){
          var api=await extract('api_id')
              return api
          }
      const api_id=await getApi()
      var getToken =async()=>{
          var extractToken=await extract('token')
              return extractToken
        }
      
      const token=await getToken()   
        if(typeof token!==`undefined`&&typeof api_id!==`undefined`){

            var formdata = new FormData();
            formdata.append('api_id', api_id);
            formdata.append('token', token);
        
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

    },[])
    //---------------------fetch claim information--------------------------

    ///-------------------------animation--------------------
   

//    if(claimData !== undefined){
//        console.log(claimData)
//     // Object.keys(claimData.claims[0].items).map((index)=>{
//     //     console.log(claimData.claims[0].items[index].claim_item_no)
//     //     console.log(showDetail)
//     // })
//    }
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
  },
  cancelStyle:{
    color: "black",
    fontWeight: "800",
    textAlign: "center",
    fontSize:25,
    marginTop:40,
    shadowOpacity: 0.4,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2
    }
    }
  
  }
  )
    

    return(
        <ScrollView>
            {typeof claimData!==`undefined`&&claimData.claims?claimData.claims.map((item)=>{
            return(
                <ClaimItem key={item.claim_no} item={item}/>
            )

            }): <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{ flex:0.8, justifyContent: "center", alignItems: "center", marginTop: 12}}>
            <Text style={{fontSize:20,justifyContent: 'center',alignItems: 'center'}}>No claims can be found at this moment</Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? 'rgb(105,105,105)'
                    : 'white'
                },
                styles.wrapperCustom
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.cancelStyle}>Cancel</Text>
            </Pressable>
           
            </View>
            </Modal>}
      </ScrollView>
    )
    
}



export default ClaimPage;