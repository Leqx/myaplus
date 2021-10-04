import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

import Settings from '../components/settings/Settings';
import ProfileHeader from '../components/profile/Profile';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>

        <ProfileHeader />
      </View>
      <View style={styles.settings}>
        <Settings />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profile: {
    flex: 1,
    flexDirection: 'row',

  },
  settings: {
    flex: 4
  },
  avatar: {
    marginHorizontal: 10,
  },

});