import React from "react"
import { VStack, Center, Heading, NativeBaseProvider, Text } from "native-base"
export function ServicesScreen() {
  return (
    <VStack space={4} alignItems="center">
      <Heading textAlign="center" mb="2">
        Our Services
      </Heading>
      <Center w="64" h="300" bg="white" rounded="md" shadow={3} >
        <VStack>
          <Text
            marginTop="5"
            fontSize="lg"
            paddingLeft="2"
            paddingRight="2"
            italic
            highlight
            _dark={{
              color: "coolgray.800",
            }

            }
          >Access to Course Units</Text>

          <Text
            marginTop="5"
            paddingLeft="2"
            paddingRight="2"
            fontSize="lg"
            italic
            highlight
            _dark={{
              color: "coolgray.800",
            }}
          >Schedule Study Time</Text>

          <Text
            marginTop="5"
            paddingLeft="2"
            paddingRight="2"
            fontSize="lg"
            italic
            highlight
            _dark={{
              color: "coolgray.800",
            }}
          >Track Study Time</Text>

          <Text
            marginTop="5"
            paddingLeft="2"
            paddingRight="2"
            fontSize="lg"
            italic
            highlight
            _dark={{
              color: "coolgray.800",
            }}
          >Study Reminders</Text>
        </VStack>
      </Center>
    </VStack>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center marginTop="10" px="3">
        <ServicesScreen />
      </Center>
    </NativeBaseProvider>
  )
}
