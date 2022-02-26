import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';
import Onboarding from 'react-native-onboarding-swiper';

import { RootStackScreenProps, AuthStackScreenProps } from '../types';

const Dots = ({ selected }: any) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              source={require('../assets/images/Vision.png')}
              style={{ height: 300, width: 300 }}
            />
          ),
          title: 'Study Helper',
          subtitle: 'A New Way To Study With Ease',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              source={require('../assets/images/Management.png')}
              style={{ height: 300, width: 300 }}
            />
          ),
          title: 'Schedule Study Times',
          subtitle: 'Set Reminders On When And What To Study',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              source={require('../assets/images/GetStarted.png')}
              style={{ height: 300, width: 300 }}
            />
          ),
          title: 'Buy Stationary With Free Delivery',
          subtitle: 'Buy What You Need For School With Ease',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
