import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

import React from 'react';
import { Section, themeColor } from 'react-native-rapi-ui';
import Swiper from 'react-native-swiper';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const SPACING = 10;

const { width } = Dimensions.get('screen');

const RADIUS = (1.5 * width) / 2;

export default function SpecialOfferSlider(item: any) {
  return (
    <>
      <Section style={styles.specialOfferContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay={true}
          activeDotColor={themeColor.primary}>
          <View style={styles.slide1}>
            <Image
              style={{ width: width, height: '100%' }}
              source={require('../../assets/products/slider.jpg')}
            />
          </View>
          <View style={styles.slide2}>
            <Image
              style={{ width: width, height: '100%' }}
              source={require('../../assets/products/slider2.jpg')}
            />
          </View>
          <View style={styles.slide3}>
            <Image
              style={{ width: width, height: '100%' }}
              source={require('../../assets/products/slider3.jpg')}
            />
          </View>
        </Swiper>
      </Section>
    </>
  );
}

const styles = StyleSheet.create({
  specialOfferContainer: {
    flex: 0.8,
    width: width,
    backgroundColor: themeColor.white,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },

  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
