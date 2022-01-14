import {
  Button,
  Section,
  SectionContent,
  Text,
  themeColor,
} from 'react-native-rapi-ui';
import {
  Dimensions,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from '../Themed';

type Item = {
  id: string;
  title: string;
  description: string;
  numberOfChapters: number;
};

export default function UnitsCard(item: Item) {
  const showToast = () => {
    ToastAndroid.show('Successfully added to my list', ToastAndroid.SHORT);
  };
  return (
    <>
      <SectionContent style={styles.slider}>
        <Section style={styles.titleContainer}>
          <Text style={styles.title} size='h3'>
            {item.title}{' '}
          </Text>
        </Section>

        <Section style={styles.countContainer}>
          <Text style={styles.count} size='sm'>
            {item.numberOfChapters} Chapters{' '}
          </Text>
        </Section>

        <View style={styles.favButtonContainer}>
          <TouchableOpacity>
            <Ionicons
              name='heart-outline'
              size={20}
              color='white'
              onLongPress={showToast}
            />
          </TouchableOpacity>

          <Button
            text='Study'
            size='md'
            rightContent={
              <Ionicons name='arrow-forward' size={20} color='#262834' />
            }
          />
        </View>
      </SectionContent>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    paddingHorizontal: 10,
  },
  count: {
    fontSize: 12,
    fontWeight: 'normal',
    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },

  units: {
    flex: 1.8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  slider: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
    marginHorizontal: 10,
    width: 200,
    height: 300,
    flex: 0.5,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: themeColor.primary,
  },

  titleContainer: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  favButtonContainer: {
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
    paddingTop: 15,
  },
});
