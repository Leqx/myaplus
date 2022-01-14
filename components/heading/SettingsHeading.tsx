import { Dimensions, StyleSheet } from 'react-native';

import React from 'react';
import { Section, Text } from 'react-native-rapi-ui';
import Separator from '../separator/Separator';

export default function SettingsHeading(title: string) {
  return (
    <>
      <Section style={styles.titleWrapper}>
        <Text style={styles.title} size='sm'>
          {title}
        </Text>
      </Section>
      <Separator />
    </>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    height: 30,
  },
  title: {
    fontWeight: 'normal',
    textTransform: 'uppercase',
    padding: 10,
  },
});
