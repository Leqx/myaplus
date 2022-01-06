import React, { useRef, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet,ScrollView, TouchableOpacity,Image,KeyboardAvoidingView, Dimensions } from 'react-native';
import {  View } from '../components/Themed';
import { AuthStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
  Section,
  SectionImage
} from "react-native-rapi-ui";
import { auth } from "../initFirebase";
import {signInWithEmailAndPassword} from "firebase/auth"


const { width } = Dimensions.get('screen');



export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = () => {
    signInWithEmailAndPassword(auth,email,password).then((cred)=>{

      console.log(cred.user)

    }).catch(err => console.error(err))
  }
 
  // async function login() {
  //   setLoading(true);
  //   const { user, error } = await supabase.auth.signIn({
  //     email: email,
  //     password: password,
  //   });
  //   if (!error && !user) {
  //     setLoading(false);
  //     alert("Check your email for the login link!");
  //   }
  //   if (error) {
  //     setLoading(false);
  //     alert(error.message);
  //   }
  // }
        

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Section
            style={{
              flex: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0              

            }}
          >

            <SectionImage
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
            source={isDarkmode ? require("../assets/images/Japan---mt.-fuji-night-.png") : require("../assets/images/Japan---mt.-fuji.png")}
            />
          </Section>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h3"
            >
              Login
            </Text>
            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              text={loading ? "Loading" : "Continue"}
              onPress={signIn}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 25,
                marginBottom: 25,
                justifyContent: "center",
                padding: 5,
                backgroundColor: 'transparent'
              }}
            >
              <Text size="md">Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                    color: themeColor.primary
                  }}
                >
                  Create Here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
                backgroundColor: 'transparent',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgotPassword");
                }}
              >
                <Text size="md" fontWeight='light' style={{
                    marginLeft: 5,
                    color: themeColor.primary300
                  }}>
                  Oops!Forgot My Password? Recover Here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
                backgroundColor: 'transparent'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                    marginTop: 10,
                    color: themeColor.gray100
                  }}
                >
                  {isDarkmode ? "☀️ set light mode" : "🌑 set dark mode"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}

