import * as React from 'react';
import { StyleSheet, TouchableOpacity, View ,Image} from 'react-native';
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import { RootStackScreenProps ,AuthStackScreenProps} from '../types';

export default function NotFoundScreen({ navigation }: AuthStackScreenProps<'Login'>) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
       <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
             source={isDarkmode ? require("../assets/images/philippines-night--.png") : require("../assets/images/philippines.png")}
            />
          </View>
      <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
