/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React, { useContext, useEffect} from 'react';
import { FontAwesome,Fontisto,FontAwesome5,MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName, Pressable,StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ServicesScreen from '../screens/ServicesScreen';
import CreateScheduleScreen from '../screens/CreateScheduleScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps,AuthStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import Loading from '../screens/utils/Loading';
import StoreScreen from '../screens/StoreScreen'
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import { AuthContext } from '../auth/context/AuthContext';
import { auth } from "../initFirebase";
import {onAuthStateChanged} from "firebase/auth"

import { Ionicons } from '@expo/vector-icons';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  // const { user} = useContext(AuthContext);
  // {user == null && <Loading />}

  const [loading, setLoading] = React.useState<boolean>(true);
  const user = useContext(AuthContext);
  const { isDarkmode, setTheme } = useTheme();


  useEffect(() => {

    onAuthStateChanged(auth,(user)=> {
      console.log('user status changed:',user)
      setLoading(false)
    })
     
    return () => {
      console.log('unsub')
    }
  }, [user])

  console.log(user)

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
       {loading && <Loading />}
       {!user && !loading && <AuthStackNavigator />}
			 {user && !loading && <RootNavigator  />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} options={{ title: '' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const ScheduleStack = createNativeStackNavigator();

function ScheduleStackNavigator(){
  return(
    <ScheduleStack.Navigator >
       <ScheduleStack.Screen name="Schedule" component={ScheduleScreen}  options={{ headerShown: false }}/>
      <ScheduleStack.Screen name="CreateSchedule" component={CreateScheduleScreen} options={{ headerShown: false }} />
    </ScheduleStack.Navigator>
  )
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

 function AuthStackNavigator(){
   return(
     <AuthStack.Navigator>
       <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
       <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
       <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} /> 
     </AuthStack.Navigator>
   )
 }

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarInactiveBackgroundColor: Colors[colorScheme].background,
        tabBarActiveBackgroundColor: Colors[colorScheme].tint,
        tabBarShowLabel: false
      
      }}
      >
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={({ navigation }: RootTabScreenProps<'Explore'>) => ({
          title: 'Explore',
          headerShown: false,
          tabBarLabelStyle: {color: themeColor.gray500},
          tabBarIcon: ({ color }) => <Ionicons  name="ios-search-outline" size={24} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              {/* ?\
                
                 <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />

                */}

            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Schedule"
        component={ScheduleStackNavigator}
        options={{
          title: 'Schedule',
          headerShown: false,
          tabBarBadge: 3,
          tabBarBadgeStyle:{backgroundColor: themeColor.primary500} ,
          tabBarLabelStyle: {color: themeColor.gray500},
          tabBarIcon: ({ color }) => <Ionicons name="ios-time-outline" size={24} color={color} />,
        }}
      />
        <BottomTab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          title: 'Store',
          headerShown: false,
          tabBarLabelStyle: {color: themeColor.gray500},
          tabBarIcon: ({ color }) => <Fontisto name="shopping-bag-1" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarLabelStyle: {color: themeColor.gray500},
          tabBarIcon: ({ color }) => <Ionicons name="ios-settings-outline" size={24} color={color} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#191921',
  },
  lightThemeText: {
    color: '#191921',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});