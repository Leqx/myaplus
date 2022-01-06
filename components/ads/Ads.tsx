import React, { useContext } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

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

export default function Ads() {

    const user = useContext(AuthContext);
    

    return (
            <Section style={styles.profileHeader}>
                <View style={styles.avatar}>
                   <Text>
                     Display Ads
                   </Text>
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
        padding: 0,
        height: 200,     
    },
    avatar: {
        marginRight: 0,
    }
})