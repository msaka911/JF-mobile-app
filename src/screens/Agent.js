import { WebView } from 'react-native-webview';
import * as React from 'react';

const Agentview=()=>{
    return(
        <WebView
    source={{ uri: 'https://agent.jfgroup.ca/user/login' }}
/>
    )
}


export default Agentview;