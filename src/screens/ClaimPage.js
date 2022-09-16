import * as React from 'react';
import { Text, StyleSheet, View, Image,Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {REACT_APP_BACKEND} from '@env'

import Spacer from '../Spacer';
import { Input } from 'react-native-elements';

const ClaimPage=({route,navigation})=>{
    
    const { data } = route.params;
    
    console.log(data)

    return(
        <View >
      </View>
    )
}

export default ClaimPage