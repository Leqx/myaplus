/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Explore: {
            screens: {
              ExploreScreen: 'explore',
            },
          },
          Schedule: {
            screens: {
              ScheduleScreen: 'schedule',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings',
            },
          },
          Store: {
            screens: {
              StoreScreen: 'store',
            },
          },
        },
      },
      Services: 'services',
      CreateSchedule: 'create_schedule',
      UpdateSchedule: 'update_schedule',
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
