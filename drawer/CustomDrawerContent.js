import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';


import { Entypo } from '@expo/vector-icons';


function CustomDrawerContent(props) {
  const onItemPress = (key) => {
    const filteredMainDrawerRoutes = props.drawerItems.find((e) => {
      return e.key === key;
    });
    const selectedRoute = filteredMainDrawerRoutes.route;
    props.navigation.toggleDrawer();
    props.navigation.navigate(selectedRoute.nav, {
      screen: selectedRoute.routeName,
    });
  };

  // const logOut = async () => console.log('log out');

  function renderMainDrawer() {
    return (
      <View>
        {props.drawerItems.map((parent) => (
          <View key={parent.key}>
            <TouchableOpacity
              key={parent.key}
              testID={parent.key}
              onPress={() => {
                onItemPress(parent.key);
              }}>
              <View style={styles.parentItem}>
                <Entypo name="arrow-with-circle-right" size={25}></Entypo>
                <Text style={[styles.icon, styles.title]}>{parent.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {/* {renderLogoutBtn()} */}
      </View>
    );
  }

  // function renderLogoutBtn() {
  //   return (
  //     <View>
  //       <TouchableOpacity testID="customDrawer-logout" >
  //         <View style={styles.parentItem}>
  //           <Text style={styles.title}>{'Log out'}</Text>
            
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.drawerContainer}>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.centered}>
          <Image
            style={styles.logo}
            source={require('../assets/jflogo.png')}
          />

        </View>

        {renderMainDrawer()}


       <TouchableOpacity style={{marginTop:200, justifyContent: 'flex-end'}} onPress={() => {
             props.navigation.navigate("Feedback");}}>
        <Text style={[styles.icon, styles.title]}>Feedback</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
 }

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    flexDirection: 'row',
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  drawerContainer: {
    backgroundColor: '#222222',
  },
  container: {
    flex: 1,
    zIndex: 1000,
    width:270,
  },
  centered: {
    marginBottom:40,
    alignItems: 'center',
  },
  parentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#F0F0F0',
    paddingTop: 9,
    paddingBottom: 9,
  },
  title: {
    margin: 9,
    fontWeight: 'bold',
    color: '#F0F0F0',
    textAlign: 'center',
    alignSelf:'center',
  },
});

export default CustomDrawerContent;