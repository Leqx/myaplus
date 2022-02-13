import React, { useState } from 'react';

import {
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { View } from '../components/Themed';
import { AuthStackParamList } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
  Section,
  SectionImage,
} from 'react-native-rapi-ui';
import { auth } from '../initFirebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email(' Invalid email').required('Email is required'),
  password: Yup.string()
    .trim()
    .min(6, 'Password is too short ')
    .required('Password is required'),
});

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'Login'>) {
  const { isDarkmode, setTheme } = useTheme();
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = { email: '', password: '' };

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log(cred.user);
      })
      .catch((err) => console.error(err));
  };

  return (
    <KeyboardAvoidingView behavior='height' enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <Section
            style={{
              flex: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isDarkmode ? '#17171E' : themeColor.white100,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}>
            <SectionImage
              resizeMode='contain'
              style={{
                height: 220,
                width: 220,
              }}
              source={
                isDarkmode
                  ? require('../assets/images/Japan---mt.-fuji-night-.png')
                  : require('../assets/images/Japan---mt.-fuji.png')
              }
            />
          </Section>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // TODO: work on submission
            onSubmit={({ email, password }) => signIn(email, password)}>
            {({
              values,

              errors,

              touched,

              handleChange,

              handleBlur,

              handleSubmit,

              isSubmitting,

              isValid,
            }) => {
              return (
                <View
                  style={{
                    flex: 3,
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    backgroundColor: isDarkmode
                      ? themeColor.dark
                      : themeColor.white,
                  }}>
                  <Text
                    fontWeight='bold'
                    style={{
                      alignSelf: 'center',
                      padding: 30,
                    }}
                    size='h3'>
                    Login
                  </Text>
                  <Text>Email</Text>
                  <TextInput
                    containerStyle={{ marginTop: 15 }}
                    placeholder='Enter your email'
                    value={values.email}
                    // value={email}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    // onChangeText={(text) => setEmail(text)}
                    enablesReturnKeyAutomatically={true}
                    borderColor={
                      touched.email && errors.email
                        ? themeColor.danger
                        : themeColor.primaryTransparent100
                    }
                  />
                  {touched.email && errors.email && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.email}
                    </Text>
                  )}

                  <Text style={{ marginTop: 15 }}>Password</Text>
                  <TextInput
                    containerStyle={{ marginTop: 15 }}
                    placeholder='Enter your password'
                    value={values.password}
                    // value={password}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    // onChangeText={(text) => setPassword(text)}
                    enablesReturnKeyAutomatically={true}
                    borderColor={
                      touched.password && errors.password
                        ? themeColor.danger
                        : themeColor.primaryTransparent100
                    }
                  />
                  {touched.password && errors.password && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.password}
                    </Text>
                  )}
                  <Button
                    text={loading ? 'Loading' : 'Continue'}
                    onPress={() => handleSubmit()}
                    //  onPress={signIn}
                    style={{
                      marginTop: 20,
                    }}
                    disabled={loading || isSubmitting}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 25,
                      marginBottom: 25,
                      justifyContent: 'center',
                      padding: 5,
                      backgroundColor: 'transparent',
                    }}>
                    <Text
                      size='md'
                      style={{
                        color: themeColor.gray,
                      }}>
                      Don't have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Register');
                      }}>
                      <Text
                        size='md'
                        fontWeight='bold'
                        style={{
                          marginLeft: 5,
                          color: themeColor.primary,
                        }}>
                        Create Here
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ForgotPassword');
                      }}>
                      <Text
                        size='md'
                        fontWeight='light'
                        style={{
                          marginLeft: 5,
                          color: themeColor.primary300,
                        }}>
                        Oops!Forgot My Password? Recover Here
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 30,
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        isDarkmode ? setTheme('light') : setTheme('dark');
                      }}>
                      <Text
                        size='md'
                        fontWeight='bold'
                        style={{
                          marginLeft: 5,
                          marginTop: 10,
                          color: themeColor.gray100,
                        }}>
                        {isDarkmode ? '☀️ set light mode' : '🌑 set dark mode'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
