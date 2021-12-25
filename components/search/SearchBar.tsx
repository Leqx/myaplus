import React from "react";
import { VStack, Input, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box } from "native-base";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Layout,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

const { width } = Dimensions.get('screen');





function SearchBar(){
  const { isDarkmode, setTheme } = useTheme();
  return (
    <VStack space={0} width={width}>
      <VStack width={width} space={2}>
        <Input
          placeholder="Search here what to study"
          bg={isDarkmode ? themeColor.gray500 : themeColor.gray500}
          width="80%"
          borderRadius={50}
          py={3}
          px={2}
          mx={10}
          fontSize={14}
           _web={{
            _focus: { borderColor: 'muted.300' }
            }}
          InputLeftElement={<Icon size='sm' m={2}  color="gray.400" as={<Ionicons name="ios-search-outline" />} />}
          InputRightElement={<Icon size='sm' m={2}  color="gray.400" as={<Ionicons name="ios-mic-outline" />} />}
        />
        </VStack>
      </VStack>
  )
}

export default function () {
  return (
    <NativeBaseProvider>
      <Center flex={0.1} px={0}>
        <SearchBar/>
      </Center>
    </NativeBaseProvider>
  );
}