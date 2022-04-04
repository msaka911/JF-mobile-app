import React from 'react';
import { View, Text, StyleSheet, FlatList,Image, ScrollView } from 'react-native';
import { RotateInDownLeft } from 'react-native-reanimated';
import { Header,Divider } from 'react-native-elements';

const AboutUs = () => {

//   return (
//     <FlatList
//       keyExtractor={friend => friend.name}
//       data={friends}
//       renderItem={({ item }) => {
//         return (
//           <Text style={styles.textStyle}>
//             {item.name} - Age {item.age}
//           </Text>
//         );
//       }}
//     />
//   );

return(
  <ScrollView style={styles.viewStyle}>
  <Text style={styles.textStyle}>JF Insurance Agency Group Inc. (JF) is a licensed brokerage firm incorporated in 1992. JF specializes in providing Emergency Hospital and Medical coverage for International Visitors to Canada, International Students and Canadian travelers. JF strives to be the leading firm in providing comprehensive medical coverage at unbeatable prices to travelers to Canada. JF has over 3000 active partnerships with insurance agents, financial advisors, travel agencies and insurance agencies selling our policies. JF is also a leading provider for International Student insurance for many private and public schools, language schools and colleges in Canada.
  {"\n"}
  {"\n"}
  Contact a local insurance agent to inquire about our travel products!</Text>
    
  <Image source={require('../../assets/person.jpg')} style={styles.image}></Image>
 </ScrollView>
)
 };

const styles = StyleSheet.create({
  viewStyle:
  {width:350,
  alignSelf:'center',
  flex:1,
},
  textStyle: {
    marginVertical: 25,
    justifyContent: 'center',
    fontWeight:'bold',
  },
  image:{
    flex: 1,
    justifyContent: 'center',
    width: 350,
    height: 220,
    borderRadius:5
  }
});

export default AboutUs;
