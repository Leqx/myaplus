import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View
} from 'react-native';

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

const styles = StyleSheet.create({
  cardMain: {
    position: 'absolute',
    top: 100,
    width: 327,
    alignSelf: 'center',
    zIndex: 1000,
    elevation: 1000,
    paddingBottom: 54
  },
  card: {
    width: 327,
    borderRadius: 20,
    backgroundColor: themeColor.white,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: themeColor.black
  },
  btnContainer: ({ pressed }) => ({
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: themeColor.white,
    height: 44,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: pressed ? 0.5 : 1
  }),
  textContainer: { textAlign: 'center', fontSize: 17, fontWeight: '500' }
});

// = ({ isModalVisible, children }) =>
export default class Task extends React.Component {
  render() {
    const { isModalVisible, children, setModalVisible } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Section
          style={[
            styles.container,
            {
              ...Platform.select({
                android: {
                  // paddingTop: shouldMove ? 240 : null,
                }
              })
            }
          ]}
        >
          <Section style={styles.cardMain}>
            <Section style={styles.card}>{children}</Section>
            <Pressable
              style={styles.btnContainer}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textContainer}>Cancel</Text>
            </Pressable>
          </Section>
        </Section>
      </Modal>
    );
  }
}