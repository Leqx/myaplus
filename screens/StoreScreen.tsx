import * as React from 'react';

import {AdMobBanner, setTestDeviceIDAsync} from 'expo-ads-admob'
import {
  Button,
  Layout,
  Section,
  SectionContent,
  Text,
  TextInput,
  themeColor,
  useTheme
} from "react-native-rapi-ui";
import { Dimensions, FlatList, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { animatedStyles, scrollInterpolator } from './utils/Animations';

import Carousel from 'react-native-snap-carousel';
import { FloatingAction } from "react-native-floating-action";
import { Ionicons } from "@expo/vector-icons";
import SearchFilter from '../components/search/SearchFilter';
import {mockData} from './utils/MockData'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const SPACING = 10;



const { width } = Dimensions.get('screen');



const DATA: readonly any[] = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i)
}

const RADIUS = (1.5 * width) / 2;


const actions = [
  {
    text: "Car Pool with friends",
    icon: require("../assets/images/box.png"),
    name: "bt_orders",
    position: 2,
    buttonSize: 55,
    textBackground: '#262834',
    textColor: '#3366FF',
    textStyle: {fontSize: 15},
  },
  {
    text: "Cart",
    icon: require("../assets/images/shopping-cart.png"),
    name: "bt_cart",
    position: 3,
    buttonSize: 55,
    textBackground: '#262834',
    textColor: '#3366FF',
    textStyle: {fontSize: 15}
  },
    {
    text: "Print",
    icon: require("../assets/images/shopping-cart.png"),
    name: "bt_print",
    position: 1,
    buttonSize: 55,
    textBackground: '#262834',
    textColor: '#3366FF',
    textStyle: {fontSize: 15}
  },
      {
    text: "Filter",
    icon: require("../assets/images/shopping-cart.png"),
    name: "bt_filter",
    position: 4,
    buttonSize: 55,
    textBackground: '#262834',
    textColor: '#3366FF',
    textStyle: {fontSize: 15}
  }

];

export default function StoreScreen() {
  const { isDarkmode, setTheme } = useTheme();

  const [index, setIndex] = React.useState(0)


const [bannerAdId,setBannerAdId] = React.useState<string>(Platform.OS === 'ios' ? "ca-app-pub-3940256099942544/2934735716": "ca-app-pub-3940256099942544/6300978111")

  const _renderItem = (item: any) => {

        return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{`Special Offers`}</Text>
      </View>
    )

  }

  const [productData, setProductData] = React.useState([
    {
        name: "pencil",
        desc: "this is a desc",
        category: 'pencil',
        price: 20,
        
    },
    {
        name: "book",
        desc: "this is a desc",
        category: 'book',
        price: 30
    },
    {
        name: "pen",
        desc: "this is a desc",
        category: 'pen',
        price: 25
    },
    {
        name: "set",
        desc: "this is a desc",
        category: 'set',
        price: 100,
    },
])

  return (
    <Layout>
       <Section style={styles.specialOfferContainer}>
           <Carousel
             data={DATA}
             sliderWidth={SLIDER_WIDTH}
             itemWidth={ITEM_WIDTH}
             containerCustomStyle={styles.carouselContainer}
             inactiveSlideShift={0}
             onSnapToItem={(index) => setIndex(index)}
             scrollInterpolator={scrollInterpolator}
             slideInterpolatedStyle={animatedStyles}
             useScrollView={true}
             renderItem={_renderItem}
           />
          </Section>

         <Section style={styles.header}>
       <AdMobBanner
       bannerSize='mediumRectangle'
       adUnitID={bannerAdId} 
       servePersonalizedAds={true} 
       onDidFailToReceiveAdWithError={(err)=> console.error(err)} />
          </Section>

         <Section style={styles.productHeader}>
        <FlatList
        data={productData}
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
            <Text style={styles.title} size='h3'>{item.name} </Text>
            </Section>

            <Section >
            <Text size='sm'>{item.price}</Text>
            </Section>

            <View >
         </View>
          </SectionContent>
        )}
        keyExtractor={item => item.name}
        />
      
          </Section>

          <View style={styles.fab}>
            <FloatingAction
            actions={actions}
            showBackground={true}
            iconWidth={20}
            iconHeight={20}
            buttonSize={50}
            animated={true}
            distanceToEdge={20}
            position='left'
            onPressItem={name => {
            console.log(`selected button: ${name}`);
             }}
             />
          </View>


    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  specialOfferContainer:{
    flex: 0.8,
    width: width,
    backgroundColor: themeColor.white,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20
  },
  header:{
    flex: 0.5,
    width: width,
    backgroundColor: themeColor.white,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20
  },
    productHeader:{
    flex: 1,
    width: width,
    backgroundColor: themeColor.white,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingLeft: 80
  },
  fab:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 10,
    right: 0
  },
    carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
    slider:{
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: 20,
      marginHorizontal: 10,
      width: 200,
      height: 200,
      flex: 0.5,
      justifyContent: "center",
      flexDirection: 'column',
      backgroundColor: themeColor.primary
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
  title1: {
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    paddingHorizontal:  10
  },
  btContainer: {
    position: 'relative',
    zIndex: 0,
    backgroundColor: 'transparent', 
  },
  button: {
    backgroundColor: 'rgba(20,174,255,0.51)',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 3,
    borderRadius: (50 / 2),
    width: 50,
    height: 50,
  },
});


