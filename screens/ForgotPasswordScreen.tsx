import React, { useState } from 'react';

import {
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
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
import { sendPasswordResetEmail } from 'firebase/auth';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email(' Invalid email').required('Email is required'),
});

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>) {
  const { isDarkmode, setTheme } = useTheme();
  // const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = { email: '' };

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then((cred) => {
        console.log(cred);
        alert('Check your email to reset your password!');
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
                  ? require('../assets/images/philippines-night--.png')
                  : require('../assets/images/philippines.png')
              }
            />
          </Section>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // TODO: work on submission
            onSubmit={({ email }) => resetPassword(email)}>
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
                    size='h3'
                    fontWeight='bold'
                    style={{
                      alignSelf: 'center',
                      padding: 30,
                    }}>
                    Forgot Password
                  </Text>
                  <Text>Email</Text>
                  <TextInput
                    containerStyle={{ marginTop: 15 }}
                    placeholder='Enter your email'
                    value={values.email}
                    //  value={email}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
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
                  <Button
                    text={loading ? 'Loading' : 'Send email'}
                    onPress={() => handleSubmit()}
                    // onPress={resetPassword}
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
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                    }}>
                    <Text
                      size='md'
                      style={{
                        color: themeColor.gray,
                      }}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Login');
                      }}>
                      <Text
                        size='md'
                        fontWeight='bold'
                        style={{
                          marginLeft: 5,
                          color: themeColor.primary,
                        }}>
                        Login here
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
                          marginTop: 20,
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
