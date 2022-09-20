import React from 'react';
import { View, Text, StyleSheet,Modal ,TouchableOpacity, Pressable,Alert} from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';  
import { Entypo } from '@expo/vector-icons'; 
import { useState } from 'react';



const ClaimGuide=({navigation})=>{
  const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={styles.viewStyle}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.cancelStyle}>Mailing instruction{"\n"}</Text>
            <Text style={styles.modalText}>
         Mailling following documents {"\n"}
         1. Filled Claim Form{"\n"}
         2.Hospital emergency room records{"\n"}
         3.Receipts or any oustanding bills{"\n"}
         to Ontime Care Worldwide Inc 15 Wertheim Court, Suite 512, Richmond Hill, ON, L4B 3H7"
          </Text>
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
        </View>
      </Modal>
        <TouchableOpacity style={styles.buttonStyle} title="  Claim amount > $1000 "
        titleStyle={styles.titleStyle}
       
        onPress={() => setModalVisible(true)}
    //  onPress={()=>Alert.alert('Mailing instruction',
    //   "Mailling following documents"+"\n"+
    //   "1. Filled Claim Form"+"\n"+
    //   "2.Hospital emergency room records "+"\n"+
    //   "3.Receipts or any oustanding bills"+"\n"+"\n"+
    //  "to Ontime Care Worldwide Inc 15 Wertheim Court, Suite 512, Richmond Hill, ON, L4B 3H7"
      
    //   ,[])}
     >
       <Text style={styles.textStyle}> <Entypo
      name="info-with-circle"
      size={23}
      color="black"
     />   Claim amount {'>'} $1000 </Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} 
    onPress={()=>navigation.navigate("ClaimDetail")}
    titleStyle={styles.titleStyle}
    >
      <Text style={styles.textStyle}> <Entypo
      name="info-with-circle"
      size={23}
      color="black"
     />   Claim amount {'<'} $1000 </Text>
       </TouchableOpacity>
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
    shadowRadius:3,
    marginTop:120,
    alignSelf:'center',
    shadowOpacity: 0.7,
    shadowColor: "grey",
    width:350,
    height:70,    
    justifyContent:'center',
     backgroundColor:"white",
    shadowOffset: {
      width: 0,
      height: 2
    }

  },
  titleStyle:{
   fontSize:30,
   marginHorizontal:10,
   color:"black",
   fontWeight:'600',
  },
  textStyle:{
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:25
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    borderWidth:0.3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    }},
    cancelStyle:{
    color: "black",
    fontWeight: "800",
    textAlign: "center",
    fontSize:25,
    marginTop:10,
    shadowOpacity: 0.4,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2
    }
    },
    modalText: {
      fontSize:15,
      textAlign:"left",
      fontWeight:"bold",
      lineHeight: 23,
      marginBottom:15
    },
    wrapperCustom: {
      borderRadius: 8,
      padding: 6
    }

  });

export default ClaimGuide