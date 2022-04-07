import * as React from 'react';
import { WebView } from 'react-native-webview';

const Form=({route,navigation})=>{
    const { link } = route.params
    return(
        <WebView  source={{uri:link}} style={{flex:1}}/>
    )
}

export default Form;


//originWhitelist={['intent://']}