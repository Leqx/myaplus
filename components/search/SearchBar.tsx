import React from "react";
import { VStack, Input, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box } from "native-base";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';



function SearchBar(){
  return (
    <VStack space={8} width="90%">
      <VStack width="100%" space={2}>
        <Input
          placeholder="Search for what to buy"
          bg="#fff"
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
      <Center flex={1} px={2}>
        <SearchBar/>
      </Center>
    </NativeBaseProvider>
  );
}