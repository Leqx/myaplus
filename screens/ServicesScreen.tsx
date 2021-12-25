import React from "react"
import { VStack, Center, Heading, NativeBaseProvider} from "native-base"
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
export function ServicesScreen() {

  const { isDarkmode, setTheme } = useTheme();

  return (
      <Layout>

        <Section>
          <Text size='h3'> Our Services </Text>

        </Section>

        <Section>

          <Text size="md">Access to Course Units</Text>

          <Text size="md">Schedule Study Time</Text>

          <Text size="md" >Track Study Time</Text>

          <Text size="md" >Study Reminders</Text>
          
        </Section>

        </Layout>

  )
}

export default () => {
  return (
    <>
    <ServicesScreen />
    </>
  )
}
