import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ContactUs from './src/screens/ContactUs';
import AboutUs from './src/screens/AboutUs';
import Webview from './src/screens/WebView';
import Policy from './src/screens/Policy';
import ClaimGuide from './src/screens/ClaimGuide';
import Emergency from './src/screens/Emergency';
import Feedback from './src/feedback';
import Splash from './src/screens/Splash';

import CustomDrawerContent from './drawer/CustomDrawerContent';
import CustomHeader from './drawer/CustomHeader';
import {drawerItemsMain} from './drawer/drawerItemsMain';
import {createDrawerNavigator} from '@react-navigation/drawer';

import { MaterialIcons } from '@expo/vector-icons';
import {DrawerActions} from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 

import { TouchableOpacity } from 'react-native';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();



function MainDrawerNavigation({navigation }) {
  
  const toggleDrawer = () =>
  navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <Drawer.Navigator
    screenOptions={{
      headerLeft: navigation => <AntDesign color="white" style={{marginLeft:20}} size={24} name="menuunfold" onPress={ toggleDrawer} />,
    }
    }
      initialRouteName="Splash"
      drawerContent={(props) => (
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      )}>
      <Stack.Screen name="Splash" component={Splash}  options={{ headerShown: false}}/>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' , headerStyle:{backgroundColor:'#006400'}}}  />
      <Drawer.Screen name="ContactUs" component={ContactUs} options={{ title: 'Contact Us', headerStyle:{backgroundColor:'#006400'} }} />
      <Drawer.Screen name="AboutUs" component={AboutUs} options={{ title: 'About Us' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Drawer.Screen name="Webview" component={Webview}  options={{ title: 'E-claim Portal' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Drawer.Screen name="Policy" component={Policy}   options={{ title: 'Policy Wording' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Drawer.Screen name="ClaimGuide" component={ClaimGuide} options={{ title: 'Claim Guide' , headerStyle:{backgroundColor:'#006400'}}}  />
      <Drawer.Screen name="Emergency" component={Emergency}  options={{ title: 'Emergency Report' , headerStyle:{backgroundColor:'#006400'}}}/>
      <Drawer.Screen name="Feedback" component={Feedback}  options={{ title: 'Feedback' , headerStyle:{backgroundColor:'#006400'}}}/>
      
    </Drawer.Navigator>
  );
}



const App = ({navigation,toggleDrawer}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
        <Stack.Screen name="MainDrawer" component={MainDrawerNavigation}/>
        
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App


