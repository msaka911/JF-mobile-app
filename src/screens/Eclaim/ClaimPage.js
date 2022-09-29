import * as React from 'react';
import { Text, StyleSheet, View, Modal, RefreshControl,LayoutAnimation,Animated,useWindowDimensions,ScrollView, Alert,Pressable } from 'react-native';
import { useState, useEffect} from 'react';
import {REACT_APP_BACKEND} from '@env'
import { CustomLayoutSpring } from "react-native-animation-layout";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ClaimItem from '../subScreens/ClaimItem';
import Spacer from '../subScreens/Spacer';
import * as SecureStore from 'expo-secure-store';

const ClaimPage=({route,navigation})=>{
    
    const[claimData, setData]=useState();
    const [refreshing, setRefreshing]=useState(false)



    const onRefresh=React.useCallback(()=>{
      setRefreshing(true);
    }, []);

   
    const [modalVisible, setModalVisible] = useState(true);


async function retrieve(){
  async function extract(key) {
    return await SecureStore.getItemAsync(key);
  }


    var api_id=await extract('api_id')    
    var token=await extract('token')

    if(typeof token!==`undefined`&&typeof api_id!==`undefined`){

        var formdata = new FormData();
        formdata.append('api_id', api_id);
        formdata.append('token', token);
    
        var requestOptions = {
            method: 'POST',
            body: formdata};
        
        fetch("https://claim.mmoo.ca/Api/claims", requestOptions)
            .then(response => response.json())
            .then((result) => {
                setData(result)
                LayoutAnimation.configureNext(CustomLayoutSpring());
            })
            .catch(error => {
              console.log(error)
              Alert.alert('Cannot retrieve the info, please try again later',"",[]);
              return null
            })
    }
    else{ 

            Alert.alert("cannot retrieve the information, try again later","",[])
    }
   }


    useEffect(async()=>{
        await retrieve()
      // setRefreshing(false)
    },[])

    useEffect(async()=>{
      if(refreshing==true){
        await retrieve()
        setRefreshing(false)
      }
  },[refreshing])
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
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

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