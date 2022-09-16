import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity,LayoutAnimation } from 'react-native';
import { useState, useEffect } from 'react';
import {REACT_APP_BACKEND} from '@env'
import { CustomLayoutSpring } from "react-native-animation-layout";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import Spacer from '../Spacer';
import { Input } from 'react-native-elements';

const ClaimPage=({route,navigation})=>{
    const[claimData, setData]=useState();
    const[showDetail, setShow]=useState(false);

    const { data } = route.params;
    const {api_id}=route.params;

    var parsed= JSON.parse(data)
    
    useEffect(()=>{
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
            .catch(error => console.log('error', error));
    },[])
   if(claimData){
    for(const claim in claimData.claims){
        console.log(claim)
    }
   }

    return(
        <View>
            {claimData?.claims.map((item)=>{
            return(
                <Card key={item.eclaim_no} mode="outlined">
                <Card.Content>
                <Title>{item.eclaim_no||" "}</Title>
                <Paragraph>Claimed Amount: ${item.billed||" "}</Paragraph>
                <Paragraph>Status: {item.status||" "}</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                <Button  onPress={(item)=>{setShow(!showDetail)
              
                }}>Details</Button>
                <Button>Ok</Button>
                {showDetail?
                    item.items.map((claimItem)=>{
                        <Card key={claimItem.claim_item_no} mode="outlined">
                        <Card.Content>
                        <Title>{claimItem.diagnosis}</Title>
                        <Paragraph>Claimed Amount: ${claimItem.amount_billed}</Paragraph>
                        <Paragraph>Amount Payable: ${claimItem.amt_payable}</Paragraph>
                        <Paragraph>Status: {claimItem.status}</Paragraph>
                        <Paragraph>{claimItem.reason}</Paragraph>
                        </Card.Content>
                        </Card>
                    })
                    :null}
                </Card.Actions>
          </Card>
            )

            })}
            
        
      </View>
    )
}

export default ClaimPage;