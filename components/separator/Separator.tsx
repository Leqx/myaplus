import { Dimensions, StyleSheet } from 'react-native';

import React from 'react';

import { View } from '../../components/Themed';
const { width, height } = Dimensions.get('window');

export default function SettingsStrip(item: any) {
  return (
    <>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
    </>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    height: 1,
    width: width,
  },
});
