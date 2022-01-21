import React, { useContext, useCallback, useMemo, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ToastAndroid,
} from 'react-native';
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useThemeColor, View } from '../../components/Themed';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';
import { auth } from '../../initFirebase';
import { signOut } from 'firebase/auth';

export default function Settings() {
  const navigation = useNavigation();

  const { isDarkmode, setTheme } = useTheme();

  const [bannerAdId, setBannerAdId] = React.useState<string>(
    Platform.OS === 'ios'
      ? 'ca-app-pub-3940256099942544/2934735716'
      : 'ca-app-pub-3940256099942544/6300978111'
  );

  const logOut = () => {
    signOut(auth)
      .then(() => {
        alert('Signed out!');
      })
      .catch((err) => console.error(err));
  };

  const showToast = () => {
    ToastAndroid.show('Notification enabled', ToastAndroid.SHORT);
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: themeColor.white,
        padding: 16,
        height: 150,
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: themeColor.primary,
          fontWeight: 'bold',
          paddingVertical: 20,
        }}>
        For ksh.150 per year{' '}
      </Text>
      <Button
        text='Remove Ads'
        size='sm'
        rightContent={
          <Ionicons name='arrow-forward' size={20} color={themeColor.white} />
        }
        status='primary'
        type='TouchableOpacity'
      />
    </View>
  );
  const renderHeader = () => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          padding: 10,
          height: 80,
          alignItems: 'center',
        }}>
        <Feather name='chevrons-up' size={24} color='white' />
        <AdMobBanner
          bannerSize='smartBannerLandscape'
          adUnitID={bannerAdId}
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={(err) => console.error(err)}
        />
      </View>
    );
  };

  let bottomSheetRef = React.createRef<BottomSheet>();
  let fall = new Animated.Value(1);

  return (
    <Section style={styles.container}>
      <Section style={styles.titleWrapper}>
        <Text style={styles.title} size='sm'>
          Account Settings
        </Text>
      </Section>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <Section style={styles.settingsContainer}>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => navigation.navigate('Services')}>
          <Text size='md'>Upgrade to Premium</Text>
          <FontAwesome
            name='handshake-o'
            size={18}
            color={isDarkmode ? themeColor.white : themeColor.black}
          />
        </TouchableOpacity>
        <View
          style={styles.separator}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />

        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => bottomSheetRef.current?.snapTo(0)}>
          <Text size='md'>Remove ads</Text>
          <MaterialCommunityIcons
            name='shield-remove-outline'
            size={18}
            color={isDarkmode ? themeColor.white : themeColor.black}
          />
        </TouchableOpacity>
        <View
          style={styles.separator}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />

        <TouchableOpacity style={styles.wrapper} onPress={() => showToast()}>
          <Text size='md'>Notifications</Text>
          <Ionicons
            name='ios-notifications-outline'
            size={18}
            color={isDarkmode ? themeColor.white : themeColor.black}
          />
        </TouchableOpacity>
        <View
          style={styles.separator}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />

        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            isDarkmode ? setTheme('light') : setTheme('dark');
          }}>
          <Text size='md'>{isDarkmode ? '☀️ Light mode' : '🌑 Dark mode'}</Text>
          <Ionicons
            name={isDarkmode ? 'sunny' : 'moon'}
            size={18}
            color={isDarkmode ? themeColor.white : themeColor.black}
          />
        </TouchableOpacity>
        <View
          style={styles.separator}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />

        <TouchableOpacity style={styles.wrapper} onPress={logOut}>
          <Text size='md'>Sign Out</Text>
          <Ionicons
            name='log-out-outline'
            size={18}
            color={isDarkmode ? themeColor.white : themeColor.black}
          />
        </TouchableOpacity>
      </Section>
      <BottomSheet
        ref={bottomSheetRef}
        initialSnap={0}
        callbackNode={fall}
        snapPoints={[100, 450, 0]}
        enabledGestureInteraction={true}
        renderContent={renderContent}
        renderHeader={renderHeader}
        borderRadius={0}
        enabledBottomInitialAnimation={true}
      />
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: 250,
  },
  titleWrapper: {
    height: 30,
  },
  title: {
    fontWeight: 'normal',
    textTransform: 'uppercase',
    padding: 10,
  },
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
  separator: {
    marginVertical: 10,
    height: 1,
    width: width,
  },
  settingsContainer: {
    height: 250,
    paddingTop: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
