import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { Section, Text, themeColor, useTheme } from 'react-native-rapi-ui';
import Separator from '../separator/Separator';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function SettingsStrip(title: string) {
  const navigation = useNavigation();

  const { isDarkmode, setTheme } = useTheme();
  return (
    <>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => navigation.navigate('Services')}>
        <Text size='md'>{title}</Text>
        <FontAwesome
          name='handshake-o'
          size={18}
          color={isDarkmode ? themeColor.white : themeColor.black}
        />
      </TouchableOpacity>
      <Separator />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
});
