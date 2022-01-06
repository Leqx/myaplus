import React, { useRef, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet,ScrollView, TouchableOpacity,Image,KeyboardAvoidingView } from 'react-native';
import { View } from '../components/Themed';
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
import {sendPasswordResetEmail} from "firebase/auth"

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "ForgotPassword">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

 const resetPassword = () => {

   sendPasswordResetEmail(auth,email).then((cred)=> {

    console.log(cred)
    alert("Check your email to reset your password!");

   }).catch(err => console.error(err))

 }

  // async function forget() {
  //   setLoading(true);
  //   const { data, error } = await supabase.auth.api.resetPasswordForEmail(
  //     email
  //   );
  //   if (!error) {
  //     setLoading(false);
  //     alert("Check your email to reset your password!");
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
             source={isDarkmode ? require("../assets/images/philippines-night--.png") : require("../assets/images/philippines.png")}
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
              size="h3"
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Forgot Password
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
            <Button
              text={loading ? "Loading" : "Send email"}
              onPress={resetPassword}
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
                justifyContent: "center",
                backgroundColor: "transparent"
              }}
            >
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
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
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
                backgroundColor: "transparent"
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
                    marginTop: 20,
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
