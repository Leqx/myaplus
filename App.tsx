import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { ThemeProvider } from "react-native-rapi-ui";

import ScheduleState from './context/schedule/ScheduleState';

import { supabase } from "./initSupabase";

// import {AuthProvider} from './provider/AuthProvider'

import { AuthProvider as Auth } from './auth/provider/AuthProvider';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme="dark">
        <Auth>

       
      <SafeAreaProvider>
        <ScheduleState>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        </ScheduleState>
      </SafeAreaProvider>
       

        </Auth>
      </ThemeProvider>
    );
  }
}
