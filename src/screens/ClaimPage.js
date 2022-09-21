import * as React from 'react';
import { Text, StyleSheet, View, Modal, TouchableOpacity,LayoutAnimation,Animated,useWindowDimensions,ScrollView, Alert } from 'react-native';
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
    

    const { data } = route.params;
    const {api_id}=route.params;
    


    const [modalVisible, setModalVisible] = useState(true);

    useEffect(()=>{
        
        var parsed= JSON.parse(data)
        if(parsed!==undefined){

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
            {typeof claimData!==`undefined`&&claimData.claims?claimData.claims.map((item)=>{
            return(
                <ClaimItem key={item.claim_no} item={item}/>
            )

            }): <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{  flex:0.6, justifyContent: "center", alignItems: "center", marginTop: 12}}>
            <Text style={{fontSize:20,justifyContent: 'center',alignItems: 'center'}}>No claims can be found at this moment</Text>
            </View>
            </Modal>}
      </ScrollView>
    )
    
}



export default ClaimPage;