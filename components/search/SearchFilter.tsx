import React, { useContext } from 'react'
import { StyleSheet, View, Dimensions,TouchableOpacity } from 'react-native'

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
import { Ionicons } from "@expo/vector-icons";



const {width,height} = Dimensions.get('window')

export default function SearchFilter() {

    const user = useContext(AuthContext);
    

    return (
            <Section style={styles.profileHeader}>
             <View style={styles.favButtonContainer}>
              <Button 
              text='Filter'
              size="sm"  
              outline
              status='primary'
              leftContent={
                <Ionicons
                  name="filter"
                  size={20}
                  color={themeColor.primary}
                />
              }
              />
             
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
    },
   favButtonContainer:{
   borderTopRightRadius: 0,
   borderBottomRightRadius: 0,
   borderTopLeftRadius: 0,
   borderBottomLeftRadius: 0,
   flex: 0.1,
   backgroundColor: 'transparent',
   paddingLeft: 0,
   paddingTop: 0
   
  },
})