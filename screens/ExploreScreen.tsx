import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useContext } from 'react';
import {  View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
  SectionImage
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from '../components/search/SearchBar';
import UnitsSlider from '../components/unitsSlider/UnitsSlider';
import ScheduleContext from '../context/schedule/schedule-context';
import UnitsContext from '../context/units/units-context';
import scheduleReducer from '../context/schedule/schedule-reducer';
import unitsReducer from '../context/units/units-reducer';
import { AuthContext } from '../auth/context/AuthContext';
import SearchFilter from '../components/search/SearchFilter';
import Ads from '../components/ads/Ads';

import {unitsRef} from '../initFirebase'
import {getDocs} from "firebase/firestore"


const { width } = Dimensions.get('screen');

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.66;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;



export default function ExploreScreen({ navigation }: RootTabScreenProps<'Explore'>) {

  const schedule = React.useContext(ScheduleContext)

  const units = React.useContext(UnitsContext)

  const { isDarkmode, setTheme } = useTheme();

   const user = useContext(AuthContext);



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

const [unitsData, setUnitsData] = React.useState<Array<{id: string; title: string; description: string; numberOfChapters: number;}>>([])

React.useEffect(() => {

   getDocs(unitsRef).then((snapshot)=>{
      let units: { id: string; title: string; description: string; numberOfChapters: number; }[] = []
      snapshot.docs.forEach((doc)=> {

        let id = doc.id
        let title = doc.data().title
        let description = doc.data().description
        let numberOfChapters = doc.data().numberOfChapters

          units.push({...doc.data(),id: id, title: title, description: description,numberOfChapters: numberOfChapters })
          setUnitsData(units)
      })
      
   }).catch((err)=> console.error(err))

  
  return () => {
    console.log('clean up')
  }
}, [])

  return (
    
    <Layout>

      <Section style={styles.header}>
          <Section  style={styles.headerImage} >
    <SectionImage  height={150}  resizeMode='contain' source={isDarkmode ? require("../assets/images/Tropical-night-.png") : require("../assets/images/Tropical.png")} />
    <SectionContent style={styles.headerText} >
       <Text size='lg'> {`Hey ${!user?.displayName ? "there" : user.displayName}, `}</Text>
            <Text size='lg'> What would you like to learn today?</Text>
    </SectionContent>
</Section>
          <SearchBar/>
      </Section>

      <Section style={styles.filterContainer}>
        <SearchFilter/>
      </Section>

      <Section style={styles.units}>
        <FlatList
        data={unitsData}
        horizontal
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false} 
        snapToEnd={true}
        contentContainerStyle={{
              padding: SPACING * 2,
              marginTop: 5,
            }}
        removeClippedSubviews={false}
        renderItem={({ item }) => (
          
          <SectionContent style={styles.slider}>
            <Section  style={styles.titleContainer} >
            <Text style={styles.title} size='h3'>{item.title} </Text>
            </Section>

            <Section style={styles.countContainer}>
            <Text style={styles.count} size='sm'>{item.numberOfChapters} Chapters </Text>
            </Section>

            <View style={styles.favButtonContainer}>

              <TouchableOpacity>
                <Ionicons
                name='heart-outline'
                size={20}
                color='white'
                />
              </TouchableOpacity>

              <Button 
              text='Study'
              size="md"  
              rightContent={
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color='white'
                />
              }
              />
             
            </View>
          </SectionContent>
        )}
        keyExtractor={item => item.id}
        />
      </Section>
      <Section  style={styles.adsContainer}>
       <Ads/>
      </Section>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    paddingHorizontal:  10
  },
  count: {
    fontSize: 12,
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
    width: width,
    backgroundColor: themeColor.white,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  },
  units:{
    flex: 1.8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    
  },
   itemContainer: {
        width: 50,
        height: 50 ,
        padding: 20,
        borderRadius: 0,
    },
    itemText:{
        color: themeColor.black
    },
    slider:{
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: 20,
      marginHorizontal: 10,
      width: 200,
      height: 300,
      flex: 0.5,
      justifyContent: "center",
      flexDirection: 'column',
      backgroundColor: themeColor.primary
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
   borderTopRightRadius: 0,
   borderBottomRightRadius: 0,
   borderTopLeftRadius: 0,
   borderBottomLeftRadius: 0,
   flex: 0.2,
   justifyContent: 'center',
   alignItems: 'center'
  },
  countContainer:{
   borderTopRightRadius: 0,
   borderBottomRightRadius: 0,
   borderTopLeftRadius: 0,
   borderBottomLeftRadius: 0,
   flex: 0.2,
   justifyContent: 'center',
   alignItems: 'center'
  },
  headerText:{
    position: 'absolute',
    paddingTop: 50

  },
  headerImage: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  },
  filterContainer:{
   borderTopRightRadius: 0,
   borderBottomRightRadius: 0,
   borderTopLeftRadius: 0,
   borderBottomLeftRadius: 0,
   flex: 0.2,
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column'
  },
  favButtonContainer:{
   borderTopRightRadius: 0,
   borderBottomRightRadius: 0,
   borderTopLeftRadius: 0,
   borderBottomLeftRadius: 0,
   flex: 0.2,
   justifyContent: 'space-between',
   alignItems: 'center',
   flexDirection: 'row',
   backgroundColor: themeColor.primary,
   paddingLeft: 10,
   paddingTop: 15
   
  },
  adsContainer:{
   borderTopRightRadius: 0,
   borderBottomRightRadius: 0,
   borderTopLeftRadius: 0,
   borderBottomLeftRadius: 0,
   flex: 0.1,
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',
   paddingVertical: 20
  },
  
});
