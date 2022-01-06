import React, { useRef, useState } from "react";
import { ScrollView, TouchableOpacity,Image,KeyboardAvoidingView } from 'react-native';
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
import {createUserWithEmailAndPassword} from "firebase/auth"


export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const createAccount = ()=> {

    createUserWithEmailAndPassword(auth,email,password).then((cred)=> {

      console.log(cred.user)
       alert("Check your email for the login link!");

    }).catch(err => console.error(err))

  }

 


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
             source={isDarkmode ? require("../assets/images/Sea-with-the-ship-night-.png") : require("../assets/images/Sea-with-the-ship.png")}
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
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
             Create an Account
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
              text={loading ? "Loading" : "Create an account"}
              onPress={createAccount}
              style={{
                marginTop: 20,
              }}
              disabled={loading} 
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
                backgroundColor: 'transparent'
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
                backgroundColor: 'transparent',
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

