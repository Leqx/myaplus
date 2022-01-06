import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { FontAwesome, Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
import { View } from '../../components/Themed';

import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get('window')

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
import { auth } from '../../initFirebase';
import {signOut} from "firebase/auth"



export default function Settings() {

    const navigation = useNavigation();

    const { isDarkmode, setTheme } = useTheme();

    const logOut =  () => {

  signOut(auth).then(()=>{
    alert("Signed out!");

  }).catch(err => console.error(err))

  };

    return (
        <Section style={styles.container}>
            <Section style={styles.titleWrapper}>
                <Text style={styles.title} size='sm' >Account Settings</Text>
            </Section>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Section style={styles.settingsContainer}>

                <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => navigation.navigate('Services')}
                >
                    <Text size='md' >Upgrade to Premium</Text>
                    <FontAwesome name="handshake-o" size={18} color={isDarkmode ? themeColor.white : themeColor.black}  />
                </TouchableOpacity>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


                <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => navigation.navigate('Services')}
                >
                    <Text size='md' >Remove ads</Text>
                    <MaterialCommunityIcons name="shield-remove-outline" size={18} color={isDarkmode ? themeColor.white : themeColor.black}  />
                </TouchableOpacity>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <TouchableOpacity style={styles.wrapper}>
                    <Text size='md'>Notifications</Text>
                    <Ionicons name="ios-notifications-outline" size={18} color={isDarkmode ? themeColor.white : themeColor.black} />
                </TouchableOpacity>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <TouchableOpacity style={styles.wrapper}
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
                >
                    <Text size='md'>{isDarkmode ? "☀️ Light mode" : "🌑 Dark mode"}</Text>
                    <Ionicons name={isDarkmode ? "sunny" : "moon"} size={18} color={isDarkmode ? themeColor.white : themeColor.black} />
                </TouchableOpacity>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <TouchableOpacity style={styles.wrapper}
                onPress={logOut}
                >
                    <Text size='md'>Sign Out</Text>
                    <Ionicons name="log-out-outline" size={18} color={isDarkmode ? themeColor.white : themeColor.black} />
                </TouchableOpacity>

            </Section>
        </Section>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: width,
        height: 250,
    },
    titleWrapper: {
        height: 30,
    },
    title: {
        fontWeight: 'normal',
        textTransform: "uppercase",
        padding: 10
    },
    wrapper: {
        flex: 1,
        width: width,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: width,
    },
    settingsContainer: {
        height: 250,
        paddingTop: 0
    }
})