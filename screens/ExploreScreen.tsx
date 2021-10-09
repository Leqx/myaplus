import * as React from 'react';
import { StyleSheet,FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Container, Heading, NativeBaseProvider, Center,Button } from 'native-base';
import SearchBar from '../components/search/SearchBar';
import UnitsSlider from '../components/unitsSlider/UnitsSlider';
import { borderRadius } from 'styled-system';


export default function ExploreScreen({ navigation }: RootTabScreenProps<'Explore'>) {

  const [sliderData, setSliderData] = React.useState([
    {
        title: "Accounting",
        chapterCount: "10",
    },
    {
        title: "Management",
        chapterCount: "7",
    },
    {
        title: "Math",
        chapterCount: "12",
    },
    {
        title: "Microeconomics",
        chapterCount: "9",
    },
])
  return (
    <View style={styles.container}>

      <View style={styles.header}>
      <SearchBar/>
      </View>

      <View style={styles.units}>
        <FlatList
        data={sliderData}
        horizontal
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false} 
        snapToEnd={true}
        renderItem={({ item }) => (
          <View style={styles.slider}>
            <View >
            <Text style={styles.title}>{item.title} </Text>
            </View>

            <View>
            <Text style={styles.count}>{item.chapterCount} </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.title}
        />
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 10 ,
  },
  count: {
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 10 ,
    paddingTop: 10,
    paddingBottom: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
   header:{
    flex: 1,
    backgroundColor: 'white'
  },
  units:{
    flex: 1
  },
   itemContainer: {
        width: 50,
        height: 50 ,
        padding: 20,
        borderRadius: 16
    },
    itemText:{
        color: "#000"
    },
    slider:{
      padding: 10,
      backgroundColor: 'blue',
      borderRadius: 10,
      margin: 10,
      width: 300,
      height: 300,
      flex: 0.5,
      justifyContent: "center",
      flexDirection: 'column'
    }
});
