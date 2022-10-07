import * as React from 'react';
import { Text, StyleSheet, View, Button,LayoutAnimation,ActivityIndicator,ScrollView, ActionSheetIOS,Pressable } from 'react-native';
import { useState, useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';


const Certification=(props)=>{
    const [insure,setInsure]=useState("")
    
    async function getInsure(){

        let data = await SecureStore.getItemAsync('data');
        let converted=JSON.parse(data)
        if(typeof converted.policy.product_short!="undefined"){
            if(converted.policy.product_short=="JES"){
                setInsure("Berkley")
            }
            else if(converted.policy.product_short=="JFPL"){
                setInsure("Old Republic")
            }
            else if(converted.policy.product_short=="JESP"){
                setInsure("Berkley")
            }
            else if(converted.policy.product_short=="JFP"){
                setInsure("Berkley")
            }
            else if(converted.policy.product_short=="JFVTC"){
                setInsure("Old Republic")
            }
            else if(converted.policy.product_short=="TOP"){
                setInsure("Berkley")
            }
            else if(converted.policy.product_short=="JFS"){
                setInsure("Berkley")
            }
            else if(converted.policy.product_short=="JFE"){
                setProduct("Berkley")
            }
            else if(converted.policy.product_short=="JFGD"){
                setProduct("Old Republic")
            }
            else if(converted.policy.product_short=="JFSL"){
                setProduct("Old Republic")
            }
        }
        
    }

    React.useEffect(()=>{
        getInsure()
    },[])

    const onPress = () =>
        ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ["Cancel", "Agree", "Disagree"],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
        },
        buttonIndex => {
            if (buttonIndex === 1) {
               props.setPage(props.nextPage+1)
            } 
        }
        );

    return(
        <ScrollView style={styles.container}>
           <Text  style={styles.container}>{insure} Canada (“{insure}”) and OTC, are committed to protecting the privacy, conﬁdentiality and security of the personal information we collect, use, retain and disclose. Your personal information will be used only for the purposes of providing you with the requested insurance services.​</Text>
           <Text  style={styles.container}>I authorize any doctor, hospital or facility providing medical or health-related services, third-party administrator, and any other insurer to release and exchange with {insure}, OTC, or its representatives, any information that is required to process this claim.​</Text>
           <Text  style={styles.container}>I assign to {insure} and OTC any beneﬁts payable from any other sources for losses covered under this policy, and I authorize and direct such payors to forward payment directly to {insure} and OTC​</Text>
           <Text  style={styles.container}>I also authorize any third party providing me with assistance in this claims process to have access to any and all relevant claims information related to the processing of my claim with {insure} and OTC.​</Text>
           <Text  style={styles.container}>I conﬁrm that I am authorized to act on behalf of my dependents for these purposes.​</Text>
           <Pressable style={styles.button} onPress={onPress}>
               <Text style={styles.textStyle}>Continue</Text>
           </Pressable>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      margin:10,
      fontSize:16
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginTop:30
    },
    textStyle:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
  });


export default Certification;