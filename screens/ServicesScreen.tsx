import React from 'react';
import * as Clipboard from 'expo-clipboard';
import { VStack, Center, Heading, NativeBaseProvider } from 'native-base';
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';
import { View } from '../components/Themed';
import { Entypo } from '@expo/vector-icons';
export function ServicesScreen() {
  const { isDarkmode, setTheme } = useTheme();

  const [copiedText, setCopiedText] = React.useState('');

  const copyToClipboard = () => {
    Clipboard.setString('myaplus.com');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <Layout>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 30,
          marginVertical: 30,
          backgroundColor: 'transparent',
        }}>
        <Text size='h1'> Our Services </Text>

        <Entypo name='emoji-flirt' size={50} color={themeColor.primary} />

        <Text size='lg' style={{ marginVertical: 10, textAlign: 'center' }}>
          Get rides to school with your friends and never miss a class{' '}
        </Text>

        <Text size='lg' style={{ marginVertical: 10, textAlign: 'center' }}>
          Get premium course content and pass every test in your class{' '}
        </Text>

        <Text size='lg' style={{ marginVertical: 10, textAlign: 'center' }}>
          Learn more:{' '}
        </Text>

        <Button
          style={{ marginVertical: 10 }}
          text='Click here to copy to Clipboard'
          outline
          onPress={copyToClipboard}
        />
        <Button
          style={{ marginVertical: 10 }}
          text='View copied text'
          onPress={fetchCopiedText}
          outline
        />
        <Text>{copiedText}</Text>
      </View>
    </Layout>
  );
}

export default () => {
  return (
    <>
      <ServicesScreen />
    </>
  );
};
