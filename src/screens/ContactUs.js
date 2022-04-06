import React from 'react';
import { Text, StyleSheet, View,Image ,ScrollView} from 'react-native';
import { WebView } from 'react-native-webview';
import { Fragment } from 'react/cjs/react.production.min';
import vancouver from '../../assets/vancouver.jpg'
import toronto from '../../assets/toronto.jpg'

import { Header,Divider } from 'react-native-elements';
const ContactUs = () => {
  const name = 'Stephen';

  return (
    <Fragment>
    <ScrollView style={styles.viewStyle}>
    <Text style={styles.titleStyle}>Sales Vancouver Office</Text>

    <Image source={vancouver} style={styles.imageStyle}></Image>

    <Text style={styles.textStyle}>
    Address: 128-6061 No. 3 Road Richmond, BC V6Y 2B2 CANADA
    {"\n"}
    Phone:  604-232-0896
    {"\n"}
    Fax:  604-232-0897
    {"\n"}
    Toll Free:  1-877-232-0896
    {"\n"}
    E-mail:  info@jfuinsurance.com
    {"\n"}
    JF Vancouver Website: www.jfuinsurance.com
    </Text>
    <Divider width={3} color={'black'} />
    <Text style={styles.titleStyle}>Sales Toronto Office</Text>
    <Image source={toronto} style={styles.imageStyle} ></Image>
    <Text style={styles.textStyle}>
    Address: 15 Wertheim Court, Suite 501 Richmond Hill, ON L4B 3H7 CANADA
    {"\n"}
    Phone:  905-707-1512
    {"\n"}
    Fax:  905-707-1513
    {"\n"}
    Toll Free:  1-877-832-5541
    {"\n"}
    E-mail: info@jfgroup.ca
    </Text>
    </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  viewStyle:{
    backgroundColor:'#F0F8FF',
    borderWidth:2,
    borderRadius:7,
    marginHorizontal:8,
  },
  textStyle: {
    alignSelf:'center',
    marginHorizontal:10,
    fontSize: 15,
    fontWeight:'600',
    color:'black',
    marginVertical:15
  },

  titleStyle:{
    marginVertical:9,
    fontWeight:'900',
    alignSelf:'center',
    fontSize:30,
    fontWeight:'bold',
    color:'black'
  },
  imageStyle:{
    alignSelf:'center',
    justifyContent: 'center',  
    resizeMode: 'contain',
    height:190
  }
});

export default ContactUs;