import { Dimensions, StyleSheet, View } from 'react-native';

import React, { useContext } from 'react';
import {
  Section,
  SectionContent,
  SectionImage,
  useTheme,
  Text,
  themeColor,
} from 'react-native-rapi-ui';
import { AuthContext } from '../../auth/context/AuthContext';

const { width } = Dimensions.get('screen');

export default function SearchHeader({ children }: any) {
  const { isDarkmode, setTheme } = useTheme();

  const user = useContext(AuthContext);

  return (
    <>
      <Section style={styles.header}>
        <Section style={styles.headerImage}>
          <SectionImage
            height={150}
            resizeMode='contain'
            source={
              isDarkmode
                ? require('../../assets/images/Tropical-night-.png')
                : require('../../assets/images/Tropical.png')
            }
          />
          <SectionContent style={styles.headerText}>
            <Text size='lg'>
              {' '}
              {`Hey ${!user?.displayName ? 'there' : user.displayName}, `}
            </Text>
            <Text size='lg'> What would you like to learn today?</Text>
          </SectionContent>
        </Section>
        {children}
      </Section>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: width,
    backgroundColor: themeColor.white,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },

  headerText: {
    position: 'absolute',
    paddingTop: 50,
  },
  headerImage: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
});
