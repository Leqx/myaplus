import React, { useContext } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import {  NativeBaseProvider } from 'native-base';

import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
  Avatar
} from "react-native-rapi-ui";
import { AuthContext } from '../../auth/context/AuthContext';



const {width,height} = Dimensions.get('window')

export default function ProfileHeader() {

    const user = useContext(AuthContext);
    

    return (
            <Section style={styles.profileHeader}>
                <View style={styles.avatar}>
                    <Avatar
                        source={{
                            uri: `${user?.photoURL}`,
                        }}
                        size="xl"
                        shape="round"
                    />
                </View>
                <View>
                    <Text size="lg">{!user?.displayName ? user?.email: user.displayName }</Text>

                </View>
            </Section>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
    },
    profileHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        width: width,
        padding: 10,
        height: 200,      
    },
    avatar: {
        marginRight: 0,
    }
})