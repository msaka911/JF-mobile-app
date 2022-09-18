import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity,LayoutAnimation,Animated,useWindowDimensions,ScrollView } from 'react-native';
import { useState, useEffect,useRef} from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


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
    <Title>{item.eclaim_no||item.claim_no}</Title>
    <Paragraph style={styles.paraStyle}>Claimed Amount: ${item.billed||""}</Paragraph>
    <Paragraph style={styles.paraStyle}>Status: {item.status||""}</Paragraph>
    <Paragraph style={styles.paraStyle}>Insured Name: {item.insured_first_name||""} {item.insured_last_name||""}</Paragraph>
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
            <View style={{ width: windowWidth}} key={item.items[claimItem].claim_item_no}>
            <Card   mode="outlined">
            <Card.Content>
            <Title>{item.items[claimItem].diagnosis}</Title>
            <Paragraph>Service Date: {item.items[claimItem].date_of_service}</Paragraph>
            <Paragraph>Claimed Amount: ${item.items[claimItem].amount_billed}</Paragraph>
            <Paragraph>Amount Payable: ${item.items[claimItem].amt_payable}</Paragraph>
            <Paragraph>Status: {item.items[claimItem].status}</Paragraph>
            <Paragraph>{item.items[claimItem].reason_other||null}</Paragraph>
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
        fontSize:18,
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
      }
})

export default ClaimItem