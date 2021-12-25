import * as React from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import Settings from '../components/settings/Settings';
import ProfileHeader from '../components/profile/Profile';
import { Layout, Section } from "react-native-rapi-ui";

const {width,height} = Dimensions.get('window')

export default function SettingsScreen() {
  return (
    <Layout style={styles.container}>
      <Section style={styles.profile}>

        <ProfileHeader />
      </Section>
      <Section style={styles.settings}>
        <Settings />
      </Section>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: width,
    height: height,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0


  },
  settings: {
    flex: 4,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0
  },
});