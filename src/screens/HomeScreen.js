import React,{useState} from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import logo from '../../assets/logo.png'

import { ImageBrowser } from 'expo-image-picker-multiple';

const HomeScreen = ({ navigation,route }) => {
  var today = new Date()
  var curHr = today.getHours()
  
  if(route.params){
    var { photos } = route.params;
    console.log(photos)
  }
  


  // ------------image picker test----------
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      allowsMultipleSelection:true,
      quality: 3,
      base64:true
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  return (
    <View >
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.text}>{curHr < 12?"Good Morning":"Good Afternoon"}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ClaimGuide')}
      >
        <Text style={styles.buttontext} >Claim Guide</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('')}
      >
        <Text style={styles.buttontext} >Go to List Demo</Text>
      </TouchableOpacity> */}
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Webview')}
      >
        <Text style={styles.buttontext} >E-claim Portal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Agentview')}
      >
        <Text style={styles.buttontext} >Agent Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Emergency')}
      >
        <Text style={styles.buttontext} >Emergency Report</Text>
      </TouchableOpacity>


      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={()=>{
        navigation.navigate('ImageBrowser')
      }} />
      
    </View>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color:'black',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize: 35,
  },
  button:{
    
    marginTop: 30,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'hsl(200, 50%, 100%)',
    borderRadius:20,
    padding:3,
    width:300,
    height:80,
    
    borderColor:'black',
    shadowOpacity: 0.7,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2
    }
    
  },
  buttontext:{
    color:'black',
    alignSelf:'center',
    justifyContent:'center',
    fontWeight:'500',
    fontSize:25
  },
  logo:{
    aspectRatio: 3.2, 
    resizeMode: 'contain',
    alignSelf:'center',
  }
});

export default HomeScreen;
