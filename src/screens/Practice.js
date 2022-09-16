import React from "react";

import { useState } from "react";
import { Text, FlatList, View, StyleSheet,SafeAreaView,Alert  } from 'react-native';


const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  item: {
    fontSize: 80,    
  },
});

const Practice=()=>{
    const [data,setData]=useState([{name:"Michael"},{name:"L"},{name:"Foo"},{name:"a"},{name:"b"},{name:"c"},{name:"d"},{name:"e"}])
        


    // const data=[{name:"Michael"},{name:"L"},{name:"Foo"},{name:"a"},{name:"b"},{name:"c"},{name:"d"},{name:"e"},{name:"f"},{name:"g"}]
    //,{name:"g"},{name:"h"},{name:"i"}



    const fetchMoreData = () => {


      console.log("reached bottom")
      if (data.length>30){
        return
      }
      console.log("reached bottom")
      setTimeout(()=>{
        setData(data.concat({name:"good"},{name:"dummy"},{name:"Alex"},{name:"Maria"},{name:"Jason"}))
      },1000)
      };

    
    const onEnd = (distanceFromEnd) => {
      
        console.log(distanceFromEnd)
        // console.log("reached")
        Alert.alert('onEndReached Called...');

        if (distanceFromEnd <= 0)
        {return}
          
      }

    const listItem=(item)=>{
      return (
        <View style={{borderBottomWidth:1, marginTop: 20}}>
          <Text key={item.name} style={styles.item}>{item.name}</Text>
      </View>
      )
    }
    
    return(
        <FlatList
          style={{width:'100%',flexGrow:1}}
          keyExtractor={item => item.name.toString()}
          data={data}
          renderItem={({item}) =>listItem(item)}
          onEndReached={({distanceFromEnd})=>fetchMoreData(distanceFromEnd)}
          onEndReachedThreshold={0.1}
        />
    )

    // const DATA = [
    //   {
    //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    //     title: "First Item",
    //   },
    //   {
    //     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    //     title: "Second Item",
    //   },
    //   {
    //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
    //     title: "Third Item",
    //   },
    // ];
    
    // const Item = ({ item, onPress, backgroundColor, textColor }) => (
    //   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    //     <Text style={[styles.title, textColor]}>{item.title}</Text>
    //   </TouchableOpacity>
    // );
    

    //   const [selectedId, setSelectedId] = useState(null);
    
    //   const renderItem = ({ item }) => {
    //     const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    //     const color = item.id === selectedId ? 'white' : 'black';
    
    //     return (
    //       <Item
    //         item={item}
    //         onPress={() => setSelectedId(item.id)}
    //         backgroundColor={{ backgroundColor }}
    //         textColor={{ color }}
    //       />
    //     );
    //   };
    
    //   return (
    //     <SafeAreaView style={styles.container}>
    //       <FlatList
    //         data={DATA}
    //         renderItem={renderItem}
    //         keyExtractor={(item) => item.id}
    //         extraData={selectedId}
    //       />
    //     </SafeAreaView>
    //   );
}

export default Practice;