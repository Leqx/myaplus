import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import * as Sentry from 'sentry-expo';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { ThemeProvider } from 'react-native-rapi-ui';

import ScheduleState from './context/schedule/ScheduleState';

// import {AuthProvider} from './provider/AuthProvider'

import { AuthProvider as Auth } from './auth/provider/AuthProvider';

import TodoProvider from './context/todo/todo-context';

// TODO: Remove all unused packages

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme='dark'>
        <Auth>
          <TodoProvider>
            <SafeAreaProvider>
              <ScheduleState>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </ScheduleState>
            </SafeAreaProvider>
          </TodoProvider>
        </Auth>
      </ThemeProvider>
    );
  }
};

export default App;

// Storybook
// export { default } from './storybook';
