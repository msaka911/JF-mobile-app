// import React, { Component } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator,SafeAreaView} from 'react-native';
// import * as ImageManipulator from 'expo-image-manipulator';
// import {ImageBrowser} from 'expo-image-picker-multiple';
// import * as FileSystem from 'expo-file-system';
// import { Buffer } from "buffer"

// export default class ImageBrowserScreen extends Component {
//   _getHeaderLoader = () => (
//     <ActivityIndicator size='small' color={'#0580FF'}/>
//   );

//   imagesCallback = (callback) => {
//     const { navigation } = this.props;
//     // this.props.navigation.setOptions({
//     //   headerRight: () => this._getHeaderLoader()
//     // });

//     callback.then(async (photos) => {
//       const cPhotos = [];
//       for(let photo of photos) {
//         const pPhoto = await this._processImageAsync(photo.uri);
//         // const converted= await FileSystem.readAsStringAsync(pPhoto.uri, { encoding: FileSystem.EncodingType.Base64 })
//         // const buffer = Buffer.from(converted, 'base64')
   
//         cPhotos.push({
//           uri:  photo.uri,
//           name: photo.filename,
//           type: 'image/PNG'
//         })
//       }
//       navigation.navigate("new E-claim", {photos: cPhotos});
//     })
//     .catch((e) => console.log(e));
//   };

//   async _processImageAsync(uri) {
//     const file = await ImageManipulator.manipulateAsync(
//       uri,
//       [{resize: { width: 1000 }}],
//       { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
//     );
//     return file;
//   };

//   _renderDoneButton = (count, onSubmit) => {
   
//     return <TouchableOpacity title={'Done'} onPress={onSubmit} style={{marginRight:10}}>
//       <Text style={{fontSize:20, fontWeight:'bold'}} onPress={onSubmit}>Done</Text>
//     </TouchableOpacity>
//   }

//   updateHandler = (count, onSubmit) => {
//     this.props.navigation.setOptions({
//       title: `Selected ${count} files`,
//       headerRight: () => this._renderDoneButton(count, onSubmit)
//     });
//   };

//   renderSelectedComponent = (number) => (
//     <View style={styles.countBadge}>
//       <Text style={styles.countBadgeText}>{number}</Text>
//     </View>
//   );

//   render() {
//     const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

//     return (
//       <SafeAreaView style={[styles.flex, styles.container]}>
//         <ImageBrowser
//           max={10}
//           onChange={this.updateHandler}
//           callback={this.imagesCallback}
//           renderSelectedComponent={this.renderSelectedComponent}
//           emptyStayComponent={emptyStayComponent}
//           Base64={true}
//         />
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1
//   },
//   container: {
//     position: 'relative'
//   },
//   emptyStay:{
//     textAlign: 'center',
//   },
//   countBadge: {
//     paddingHorizontal: 8.6,
//     paddingVertical: 5,
//     borderRadius: 50,
//     position: 'absolute',
//     right: 3,
//     bottom: 3,
//     justifyContent: 'center',
//     backgroundColor: '#0580FF'
//   },
//   countBadgeText: {
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     padding: 'auto',
//     color: '#ffffff'
//   }
// });
