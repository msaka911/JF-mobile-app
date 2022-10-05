import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity,LayoutAnimation,Animated,useWindowDimensions,ScrollView } from 'react-native';
import { useState, useEffect,useRef} from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import uniqueId from 'lodash/uniqueId'
import { CurrentRenderContext } from '@react-navigation/native';


const ClaimItem=({item})=>{
  const[showDetail, setShow]=useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: showDetail?1:0,
          duration: 700,
          useNativeDriver: true,
        },
      ).start();
    }, [showDetail])


  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();



  return(
    <Card  mode="outlined">
    <Card.Content>
    {item.eclaim_no?<Title>{item.eclaim_no}</Title>:null}              
    <Paragraph style={styles.paraStyle}>Claim Number: {item.claim_no}</Paragraph>
    <Paragraph style={styles.paraStyle}>Insured Name: {item.insured_first_name||""} {item.insured_last_name||""}</Paragraph>
    <Paragraph style={styles.paraStyle}>Claimed Amount: ${item.billed||""}</Paragraph>
    <Paragraph style={styles.paraStyle}>Status: {item.status||""}</Paragraph>
    </Card.Content>
    <Card.Cover style={{
            height: 120,
            margin:8
                      }}  source={{ uri: 'https://uconn-today-universityofconn.netdna-ssl.com/wp-content/uploads/2017/04/shutterstock_373492012-health-insurance-e1491415000969.jpg' }} />
    <Card.Actions>
    <Button style={styles.buttonStyle}labelStyle={styles.textStyle} onPress={()=>{setShow(!showDetail)
  
    }}>{showDetail?"Collapse":"Details"}</Button>
    </Card.Actions>
    
    <Animated.View                 // Special animatable View
        style={{
            opacity:fadeAnim,         // Bind opacity to animated value
        }}
        >
        {showDetail?
        (<View>
        <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
                {
                nativeEvent: {
                    contentOffset: {
                    x: scrollX
                    }
                }
                }
            ],{useNativeDriver: false}
            )}
            scrollEventThrottle={1}
            >
            {Object.keys(item.items).map((claimItem)=>{
            return( 
            <View style={{ width: windowWidth}} key={item.items[claimItem].claim_item_no+ uniqueId('id')}>

            <Card   mode="outlined" style={{alginself:'center'}}>
            <Card.Content>
            <Title style={{fontSize:30,fontWeight:'bold'}}>{item.items[claimItem].diagnosis}</Title>

            <View style={styles.container}>
            <Paragraph style={styles.itemStyle}>Service Date: </Paragraph>
            <Paragraph style={styles.itemStyle}>{item.items[claimItem].date_of_service}</Paragraph>
            </View>

            <View style={styles.container}>
            <Paragraph style={styles.itemStyle}>Claimed Amount: </Paragraph>
            <Paragraph style={styles.itemStyle}>${item.items[claimItem].amount_billed}</Paragraph>
            </View>

            <View style={styles.container}>
            <Paragraph style={styles.itemStyle}>Amount Payable: </Paragraph>
            <Paragraph style={styles.itemStyle}>${item.items[claimItem].amt_payable}</Paragraph>
            </View>
            <View style={styles.container}>
            <Paragraph style={styles.itemStyle}>Status:</Paragraph>
            <Paragraph style={styles.itemStyle}>{item.items[claimItem].status}</Paragraph>
            </View>

              {/* {item.items[claimItem].reason_other?
               <View style={styles.container}>
              <Paragraph style={styles.itemStyle}>Reason:</Paragraph>
              <Paragraph style={styles.itemStyle}>{item.items[claimItem].reason_other}</Paragraph>
              </View>
              :null} */}

              {item.items[claimItem].reason!=="Other"&&item.items[claimItem].reason?
              <View style={styles.container}>
              <Paragraph style={styles.itemStyle}>Reason:</Paragraph>
              <Paragraph style={styles.reasonText}>{item.items[claimItem].reason}</Paragraph>
              </View>
              : 
              <View style={styles.container}>

              <Paragraph style={styles.itemStyle}>Reason:</Paragraph>
              <Paragraph style={styles.reasonText}>{item.items[claimItem].reason_other}</Paragraph>
              </View>
            }

            </Card.Content>
            </Card>
            </View>)})}
            </ScrollView>
            <View style={styles.indicatorContainer}>
                {Object.keys(item.items).map((_, index) => {
                    const width = scrollX.interpolate({
                    inputRange: [
                        windowWidth * (index - 1),
                        windowWidth * index,
                        windowWidth * (index + 1)
                    ],
                    outputRange: [8, 16, 8],
                    extrapolate: "clamp"
                    });
                    return (
                    <Animated.View
                        key={index}
                        style={[styles.normalDot, { width }]}
                    />
                    );
                })}
       </View>
       </View>
       ):null}
         
        
           
  </Animated.View>
                
</Card>
  )
}

const styles = StyleSheet.create({
    textStyle:{
      fontSize:20,
      color:"white",
    },
    paraStyle:{
        fontSize:17,
        fontWeight:"500",
        marginBottom:9
    },
    buttonStyle:{
        padding:3,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:"black",
    },
    scrollContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center"
      },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
      },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin:10
      },
      itemStyle:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:6,
        flex:1
      },
      container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start'
      },
      reasonText:{
        fontSize:16,
        flex:1,
        marginTop:6
      }
})

export default ClaimItem