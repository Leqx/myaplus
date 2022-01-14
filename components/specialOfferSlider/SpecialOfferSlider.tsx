import { Dimensions, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { Section, themeColor } from 'react-native-rapi-ui';
import Carousel from 'react-native-snap-carousel';
import {
  animatedStyles,
  scrollInterpolator,
} from '../../screens/utils/Animations';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const SPACING = 10;

const { width } = Dimensions.get('screen');

const DATA: readonly any[] = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}

const RADIUS = (1.5 * width) / 2;

export default function SpecialOfferSlider(item: any) {
  const [index, setIndex] = React.useState(0);

  const _renderItem = (item: any) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{`Special Offers`}</Text>
      </View>
    );
  };

  return (
    <>
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

  carouselContainer: {
    marginTop: 50,
  },

  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
  },
  itemLabel: {
    color: 'white',
    fontSize: 24,
  },
});
