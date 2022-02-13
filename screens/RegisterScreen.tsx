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
  CheckBox,
} from 'react-native-rapi-ui';
import { auth } from '../initFirebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email(' Invalid email').required('Email is required'),
  password: Yup.string()
    .trim()
    .min(6, 'Password is too short ')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    )
    .required('Password is required'),

  confirmPassword: Yup.string()
    .when('password', {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
    })
    .required('Confirm Password is required'),
  agreeToTerms: Yup.boolean().required(
    'You must agree to the terms of service'
  ),
});

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'Register'>) {
  const { isDarkmode, setTheme } = useTheme();
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [checkBox, setCheckbox] = React.useState(false);

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };

  const createAccount = (
    email: string,
    password: string,
    confirmPassword: string,
    agreeToTerms: boolean
  ) => {
    if (agreeToTerms == true) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log(cred.user);
          alert('Check your email for the login link!');
        })
        .catch((err) => console.error(err));
    }
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
                  ? require('../assets/images/Sea-with-the-ship-night-.png')
                  : require('../assets/images/Sea-with-the-ship.png')
              }
            />
          </Section>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // TODO: work on submission
            onSubmit={({ email, password, confirmPassword, agreeToTerms }) =>
              createAccount(email, password, confirmPassword, agreeToTerms)
            }>
            {({
              values,

              errors,

              touched,

              handleChange,

              handleBlur,

              handleSubmit,

              isSubmitting,

              isValid,

              setFieldValue,
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
                    size='h3'
                    style={{
                      alignSelf: 'center',
                      padding: 30,
                    }}>
                    Create an Account
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
                    //  onChangeText={(text) => setEmail(text)}
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
                  <Text style={{ marginTop: 15 }}>Confirm Password</Text>
                  <TextInput
                    containerStyle={{ marginTop: 15 }}
                    placeholder='Confirm Password'
                    value={values.confirmPassword}
                    // value={password}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    // onChangeText={(text) => setPassword(text)}
                    enablesReturnKeyAutomatically={true}
                    borderColor={
                      touched.confirmPassword && errors.confirmPassword
                        ? themeColor.danger
                        : themeColor.primaryTransparent100
                    }
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 20,
                      backgroundColor: 'transparent',
                    }}>
                    <CheckBox
                      value={values.agreeToTerms}
                      // value={checkBox}
                      uncheckedColor={themeColor.gray}
                      // TODO: handle with formik
                      onValueChange={(val) =>
                        setFieldValue('agreeToTerms', val)
                      }
                      // onValueChange={(val) => setCheckbox(val)}
                    />
                    <Text
                      size='md'
                      style={{
                        marginLeft: 10,
                        color: themeColor.gray,
                      }}>
                      I agree with the Terms & Conditions
                    </Text>
                  </View>
                  <Button
                    text={loading ? 'Loading' : 'Create an account'}
                    onPress={() => handleSubmit()}
                    //  onPress={createAccount}
                    style={{
                      marginTop: 20,
                    }}
                    disabled={loading || isSubmitting}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 15,
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

//     <Formik
//       initialValues={initialValues}
//       validate={validationSchema}
//       onSubmit={(values) => console.log(values)}
//       render={props => {
// return (

// )}}
//       />
