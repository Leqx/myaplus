import React from "react";
import { View, ActivityIndicator,Image, Dimensions} from "react-native";
import { Layout, themeColor } from "react-native-rapi-ui";

const { width ,height} = Dimensions.get('screen');

export default function () {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={themeColor.primary} />
      </View>
    </Layout>
  );
}
