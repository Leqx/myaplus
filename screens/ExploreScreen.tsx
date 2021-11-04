import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

import SearchBar from '../components/search/SearchBar';
import UnitsSlider from '../components/unitsSlider/UnitsSlider';
import ScheduleContext from '../context/schedule/schedule-context';
import UnitsContext from '../context/units/units-context';
import scheduleReducer from '../context/schedule/schedule-reducer';
import unitsReducer from '../context/units/units-reducer';

const { width } = Dimensions.get('screen');

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.66;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;


export default function ExploreScreen({ navigation }: RootTabScreenProps<'Explore'>) {

  const schedule = React.useContext(ScheduleContext)

  const units = React.useContext(UnitsContext)

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
        contentContainerStyle={{
              padding: SPACING * 2,
              marginTop: 10,
            }}
        removeClippedSubviews={false}
        renderItem={({ item }) => (
          
          <View style={styles.slider}>
             <LinearGradient
               colors={['rgba(0,0,0,0.8)', 'transparent']}
               style={styles.background}
               />
            <View  style={styles.titleContainer} >
            <Text style={styles.title}>{item.title} </Text>
            </View>

            <View style={styles.countContainer}>
            <Text style={styles.count}>{item.chapterCount} Chapters </Text>
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
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    paddingHorizontal:  10
  },
  count: {
    fontSize: 18,
    fontWeight: 'normal',
    paddingLeft: 12 ,
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
        borderRadius: 26
    },
    itemText:{
        color: "#000"
    },
    slider:{
      padding: 10,
      borderRadius: 20,
      margin: 10,
      width: 300,
      height: 300,
      flex: 0.5,
      justifyContent: "center",
      flexDirection: 'column',
    },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    borderRadius: 20,
  },
  titleContainer:{
   borderTopRightRadius: 10,
   borderTopLeftRadius: 10,
   flex: 0.2,
   justifyContent: 'center',
   alignItems: 'center'
  },
  countContainer:{
   borderBottomRightRadius: 10,
   borderBottomLeftRadius: 10,
   flex: 0.2,
   justifyContent: 'center',
   alignItems: 'center'
  }
});
