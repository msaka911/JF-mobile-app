import { StyleSheet, View,LayoutAnimation, Alert, ActivityIndicator,Image} from 'react-native';
import * as SecureStore from 'expo-secure-store';
// import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import { useState} from 'react';
import * as React from 'react';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Spacer from '../subScreens/Spacer';


const Policycard=()=>{
    const [loading, setLoading]=useState(true)
    const [sum_insured, setSum]=useState(0)
    const [expiry_date, setExpire]=useState()
    const [effective_date, setEffective]=useState()
    const [name, setName]=useState("")
    const [agent,setAgent]=useState()
    const [policy,setPolicy]=useState()
    const [deductible,setDeductible]=useState()
    const [stable,setStable]=useState()
    const [product,setProduct]=useState("")

    async function getPolicyIno(){
        let data = await SecureStore.getItemAsync('data');
        let converted=JSON.parse(data)
        setSum(converted.policy.sum_insured)
        setExpire(converted.policy.expiry_date)
        setEffective(converted.policy.effective_date)
        setName(converted.policy.firstname+" "+converted.policy.lastname)
        setAgent(converted.policy.agent_firstname+ " "+converted.policy.agent_lastname)
        setPolicy(converted.policy.policy)
        setDeductible(converted.policy.deductible_amount)
        
        if(converted.policy.product_short){
            if(converted.policy.product_short=="JES"){
                setProduct("JF Elite Plus International Student")
            }
            else if(converted.policy.product_short=="JFPL"){
                setProduct("JF Student Insurance Platimum")
            }
            else if(converted.policy.product_short=="JESP"){
                setProduct("JF Elite Plus Parent")
            }
            else if(converted.policy.product_short=="JFC"){
                setProduct("JF Care International Student")
            }
            else if(converted.policy.product_short=="JFP"){
                setProduct("JF Protection International Student")
            }
            else if(converted.policy.product_short=="JFVTC"){
                setProduct("JF Visitor to Canada")
            }
            else if(converted.policy.product_short=="TOP"){
                setProduct("JF Canadian Travel Insurance")
            }
            else if(converted.policy.product_short=="JFS"){
                setProduct("JF Standard International Student")
            }
            else if(converted.policy.product_short=="JFE"){
                setProduct("JF Elite Enhanced Interal Student")
            }
            else if(converted.policy.product_short=="JFGD"){
                setProduct("JF Student Insurance Gold")
            }
            else if(converted.policy.product_short=="JFSL"){
                setProduct("JF Student Insurance Silver")
            }

        }
        if(converted.policy.stable_condition==1){
            setStable("No")
        }
        else{
            setStable("Yes")
        }
        setLoading(false)
    }

   
    React.useEffect(()=>{
        getPolicyIno()
    },[])

    return(
            <>           
            {loading?<ActivityIndicator size="large" color="#0000ff"/>:
        //     <Card mode="outlined" elevation={5}>
        //         <Card.Content>
        //         <Paragraph style={{fontSize:20,fontWeight:'bold',alignItems:"center",marginTop:10}}>{product}</Paragraph>

        //             <Card.Cover source={require('../../../assets/jflogo.png')} />
        //              <View style={{ flexDirection:'row',flexWrap: 'wrap', alignItems:'center', justifyContent:'space-between',marginTop:15}}>
        //             <Paragraph style={{fontSize:17,fontWeight:'bold',alignItems:"center"}}>Your Agent/Broker:</Paragraph>
        //             <Paragraph style={{fontSize:17}}>{agent}</Paragraph>
        //             <Paragraph style={{fontSize:17,fontWeight:'bold',alignItems:"center", flexBasis: '50%',marginTop:10}}>Insured:</Paragraph>
        //             <Paragraph style={{fontSize:17}}>{name}</Paragraph>
        //             <Paragraph style={{fontSize:17,fontWeight:'bold',alignItems:"center", flexBasis: '50%',marginTop:10}}>Policy Number:</Paragraph>
        //             <Paragraph style={{fontSize:17}}>{policy}</Paragraph>
        //             <Paragraph style={{fontSize:17,fontWeight:'bold',alignItems:"center", flexBasis: '50%',marginTop:10}}>Effective Date:</Paragraph>
        //             <Paragraph style={{fontSize:17}}>{effective_date}</Paragraph>
        //             <Paragraph style={{fontSize:17,fontWeight:'bold',alignItems:"center", flexBasis: '50%',marginTop:10}}>Expire Date:</Paragraph>
        //             <Paragraph  style={{fontSize:17}}>{expiry_date}</Paragraph>
        //             <Paragraph style={{fontSize:17,fontWeight:'bold',alignItems:"center", flexBasis: '50%',marginTop:10}}>Sum Insured:</Paragraph>
        //             <Paragraph style={{fontSize:17}}>${sum_insured}</Paragraph>
        //             <Paragraph style={{fontSize:17,fontWeight:'bold',alignItems:"center", flexBasis: '70%',marginTop:10}}>Deductible Amount:</Paragraph>
        //             <Paragraph style={{fontSize:17}}>${deductible}</Paragraph>
        //             <Paragraph style={{fontSize:17,fontWeight:'bold',alignItems:"center", flexBasis: '90%',marginTop:10}}>Include stable pre-existing condition</Paragraph>
        //             <Paragraph style={{fontSize:17}}>{stable}</Paragraph>
        //             </View>
        //         </Card.Content>
        //    </Card>
        <Card>
             <Card.Title style={{fontSize:20, marginTop:10}}>{product}</Card.Title>
             <Card.Divider/>
                <View style={{position:"relative",alignItems:"center"}}>
                <Image
                    style={{width:"100%",height:100}}
                    resizeMode="contain"
                    source={require('../../../assets/jflogo.png')}
                    />
                    <View style={{flexDirection:'row',flexWrap: 'nowrap',marginTop:5,alignItems:'center'}}>
                    <Text style={[styles.fonts,styles.container]} h4>
                    Insured Name:
                    </Text>
                    <Text style={styles.fields} >
                    {name}
                    </Text>
                    </View>

                   

                    <View style={{flexDirection:'row',flexWrap: 'nowrap',alignItems:'center'}}>
                    <Text style={[styles.fonts,styles.container]} h4>
                    Your Agent/Broker:
                    </Text>
                    <Text style={styles.fields} >
                    {agent}
                    </Text>
                    </View>
                    
                    <View style={{alignItems: 'center',marginTop:5}}>
                    <Text style={styles.fonts} h4>
                    Policy Number:
                    </Text>
                    <Text style={styles.fields}>
                    {policy}
                    </Text>
                    </View>

                    <Spacer/>
                    <Text style={styles.fonts} h4>
                    Effective Date:
                    </Text>
                    
                    <Text style={styles.fields} >
                    {effective_date}
                    </Text>
                    <Spacer/>

                    <Text style={styles.fonts} h4>
                    Expire Date:
                    </Text>
                    <Text style={styles.fields} >
                    {expiry_date}
                    </Text>
                    <Spacer/>

                    <View style={{alignItems: 'center',marginTop:5}}>
                    <Text style={styles.fonts} h4>
                    Sum Insured:
                    </Text>
                    <Text style={styles.fields} >
                    ${sum_insured}
                    </Text>
                    </View>
                    <Spacer/>

                   <View style={{alignItems: 'center',marginTop:5}}>
                    <Text style={styles.fonts} h4>
                     Deductible Amount:
                    </Text>
                    <Text style={styles.fields} >
                    ${deductible}
                    </Text>
                    </View>
                    
                    <View style={{alignItems: 'center',marginTop:5}}>
                    <Text style={styles.fields}>
                    Include stable pre-existing condition
                    </Text>
                    <Text style={styles.fields}>
                    {stable}
                    </Text>
                    </View>

            </View>

         </Card>

            }

             
     </> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fonts: {
      marginBottom: 5,   
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    fields:{
        fontSize: 18,
        fontWeight:'bold',
          }
    });

export default Policycard;