import React from 'react';
import { View, Text, StyleSheet,Image ,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';  
import { Entypo } from '@expo/vector-icons'; 




const ClaimGuide=({navigation})=>{

    return(
        <View style={styles.viewStyle}>

        <Button style={styles.buttonStyle} title="  Claim amount > $1000 "
        titleStyle={styles.titleStyle}
        icon={
      <Entypo
      name="info-with-circle"
      size={30}
      color="white"
     />}>
        </Button>
      <Button style={styles.buttonStyle} title="  Claim amount < $1000" icon={
      <Entypo
      name="info-with-circle"
      size={30}
      color="white"
    />}
    onPress={()=>navigation.navigate("ClaimDetail")}
    titleStyle={styles.titleStyle}
    >
       </Button>
       </View>
    )

}

const styles = StyleSheet.create({
viewStyle:{
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
  },

  buttonStyle:{
    borderRadius:10,
    borderWidth:3,
    shadowRadius:2,
    marginTop:120,
    alignSelf:'center',
    shadowOpacity: 0.6,
    shadowColor: "grey",
    width:350,
    
  },
  titleStyle:{
   fontSize:25,
   marginHorizontal:10,
   color:"black",
   fontWeight:'600',
  },

  });

export default ClaimGuide