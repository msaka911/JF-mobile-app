import React, { useState, useEffect } from 'react';
import { Image, View, Platform ,ScrollView,TouchableOpacity,Text,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';


export default function ImagePickerExample({image,setID,fileID,setImage}) {


  async function imageUploadRequest(result){
    var link="https://claim.mmoo.ca/Api/image"
    let token = await SecureStore.getItemAsync('token');
    let api_id = await SecureStore.getItemAsync('api_id');

      var fileName=result.uri.split('/').pop()
      var fileType = fileName.split('.').pop();
      
      var formdata = new FormData();
      formdata.append('userfile',{uri:result.uri,name:fileName,type:fileType})
      formdata.append('token', token);
      formdata.append('api_id', api_id);
      
      var requestOptions = {
        method: 'POST',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data'
        }         
      };
    

      const temData=fetch(link, requestOptions)

      .then(response => {
       return response.json()
      })
      .then((data)=>{
       if(data.status==`OK`){
                return data.file_id
      }
      })
       .catch(error=>
        { console.log(error)
          Alert.alert(
          'Cannot upload file, check your internet','',[]
        )
      }
       )
    
       return temData
    }

  const pickImage = async (image,fileID) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
   
  
    if (!result.cancelled) {
      setImage([...image,result.uri]);
      var returnID=await imageUploadRequest(result)

      setID([...fileID,returnID])
    }
};
 

const takePhotos = async () => {

  let photo = await ImagePicker.launchCameraAsync();
            if (!photo.cancelled) {
              setImage([...image,photo.uri]);
              var returnPhotoID=await imageUploadRequest(photo)
              setID([...fileID,returnPhotoID])
            }

  // if (cameraPermission.status !== 'granted') {
  //     const newPermission = await Permissions.askAsync(Permissions.CAMERA);
  //     if (newPermission.status === 'granted') {
            
  //     }
  // } else {
  //       Alert.alert("Cannot access the camera",'',[])
  // }
};

  return (
    <View style={{ flex:1,alignItems:'center'}}>
      <TouchableOpacity 
        style={{alignItems: 'center',justifyContent: 'center',marginTop:100}} 
        onPress={()=>pickImage(image,fileID)}> 

                <Text style={{fontSize:30,fontWeight:'bold'}}>{image.length>0?'More Images':`Choose Images`}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={{alignItems: 'center',justifyContent: 'center',marginTop:100}} 
        onPress={()=>takePhotos()}> 
                <Text style={{fontSize:30,fontWeight:'bold'}}>Taking Photos</Text>
        </TouchableOpacity>
      <ScrollView horizontal={true} style={{flex: 1,flexDirection:'row',marginTop:30}}>
      {image && 
      image.map((i)=>{
        return <Image  key={i} source={{ uri: i }} style={{marginRight:10,marginTop:15, width: 300, height: 300 }} />
      })
      }
      </ScrollView>
    </View>
  );
}