import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, NativeBaseProvider } from 'native-base';

export default function ProfileHeader() {
    return (
        <NativeBaseProvider>


            <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                    <Avatar
                        size="lg"
                        source={{
                            uri: "https://pbs.twimg.com/profile_images/1320985200663293952/lE_Kg6vr_400x400.jpg",
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Eugene</Text>

                </View>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
        padding: 10,
        height: "20%"
    },
    avatar: {
        marginRight: 10,
    }
})