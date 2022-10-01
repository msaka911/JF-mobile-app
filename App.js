import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ContactUs from './src/screens/ContactUs';
import AboutUs from './src/screens/AboutUs';
import Webview from './src/screens/Eclaim/WebView';
import Policy from './src/screens/Policy';
import ClaimGuide from './src/screens/ClaimGuide';
import Emergency from './src/screens/Emergency';
import Feedback from './src/feedback';
import Splash from './src/screens/Splash';
import ClaimForm from './src/screens/ClaimForm';
import ClaimDetail from './src/ClaimDetail';
import Agentview from './src/screens/Agent';
import ClaimPage from './src/screens/Eclaim/ClaimPage'
// import ImageBrowser from './src/screens/Eclaim/ImageUpload';
import User from './src/screens/Eclaim/User';
import EclaimSubmit from'./src/screens/Eclaim/EclaimSubmit'
import Map from './src/screens/Map'

import CustomDrawerContent from './drawer/CustomDrawerContent';
import CustomHeader from './drawer/CustomHeader';
import {drawerItemsMain} from './drawer/drawerItemsMain';
import {createDrawerNavigator} from '@react-navigation/drawer';

import { MaterialIcons } from '@expo/vector-icons';
import {DrawerActions} from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();



function MainDrawerNavigation({navigation }) {
  
  const toggleDrawer = () =>
  navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <Drawer.Navigator
    screenOptions={({navigation: { goBack }}) => ({
      headerLeft: ()=> <AntDesign color="white" style={{marginLeft:20}} size={24} name="menuunfold" onPress={ toggleDrawer} />,
      headerRight: () => (
         <AntDesign name="back"
          size={25}
           style={{marginRight:15}}
           onPress={()=>goBack()}
         />
       )
     })}
      backBehavior="history"
      initialRouteName="HomeScreen"
      drawerContent={(props) => (
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      )}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' , headerStyle:{backgroundColor:'#006400'}, headerRight:()=>null}} />
      <Drawer.Screen name="ContactUs" component={ContactUs} options={{ title: 'Contact Us', headerStyle:{backgroundColor:'#006400'} }} />
      <Drawer.Screen name="AboutUs" component={AboutUs} options={{ title: 'About Us' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Stack.Screen name="Webview" component={Webview}  options={{ title: 'E-claim Portal' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Drawer.Screen name="Policy" component={Policy}   options={{ title: 'Policy Wording' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Drawer.Screen name="ClaimGuide" component={ClaimGuide} options={{ title: 'Claim Guide' , headerStyle:{backgroundColor:'#006400'}}}  />
      <Drawer.Screen name="Emergency" component={Emergency}  options={{ title: 'Emergency Report' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Drawer.Screen name="Feedback" component={Feedback}  options={{ title: 'Feedback' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Drawer.Screen name="ClaimForm" component={ClaimForm}  options={{ title: 'ClaimForm' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Stack.Screen name="ClaimDetail" component={ClaimDetail}  options={{ title: 'ClaimDetail' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Drawer.Screen name="Agentview" component={Agentview}  options={{ title: 'Agent login' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Stack.Screen name="ClaimPage" component={ClaimPage}  options={{ title: 'ClaimPage' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Stack.Screen name="E-claim Portal" component={User}  options={{ title: 'E-claim Portal' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Stack.Screen name="new E-claim" component={EclaimSubmit}  options={{ title: 'new E-claim' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Stack.Screen name="Map" component={Map}  options={{ title: 'Nearest Clinic' , headerStyle:{backgroundColor:'#006400'}}}/>

      {/* <Stack.Screen name="ImageBrowser" component={ImageBrowser}  options={{ headerShown: true}}/> */}

    </Drawer.Navigator>
  );
}



const App = ({navigation,toggleDrawer}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          headerTransparent:true,
          headerMode: 'screen',
          headerTintColor: '#404554',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: navigation => <AntDesign color="white" style={{marginLeft:20}} size={24} name="menuunfold" onPress={ toggleDrawer} />,
          header: (props) => {
            return <CustomHeader {...props} />;
          },          
        }}
        
        >
        <Stack.Screen name="Splash" component={Splash}  options={{ headerShown: false}}/>
        <Stack.Screen name="MainDrawer" component={MainDrawerNavigation}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App


