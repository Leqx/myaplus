import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Text, View } from '../../components/Themed';

import { useNavigation } from '@react-navigation/native';


export default function Settings() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Account Settings</Text>
            </View>
            <View style={styles.settingsContainer}>

                <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => navigation.navigate('Services')}
                >
                    <Text>Services</Text>
                    <FontAwesome name="handshake-o" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <View style={styles.wrapper}>
                    <Text>Notifications</Text>
                    <Ionicons name="ios-notifications-outline" size={24} color="black" />
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <View style={styles.wrapper}>
                    <Text>Dark Mode</Text>
                    <Ionicons name="ios-moon-outline" size={24} color="black" />
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: 320,
        height: 100,
    },
    titleWrapper: {
        height: 30,
    },
    title: {
        fontSize: 12,
        fontWeight: 'normal',
        textTransform: "uppercase",
        color: "#222",
        padding: 10
    },
    wrapper: {
        flex: 1,
        width: "100%",
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
        width: '100%',
    },
    settingsContainer: {
        height: 150,
        paddingTop: 10
    }
})