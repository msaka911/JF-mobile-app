import * as React from 'react';
import { WebView } from 'react-native-webview';

const Form=(props)=>{

    return(
        <WebView originWhitelist={['intent://']} source={{uri:props.link}} style={{flex:1}}/>
    )
}

export default Form;