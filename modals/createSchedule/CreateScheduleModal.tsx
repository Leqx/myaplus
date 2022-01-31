import {
  Dimensions,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { themeColor, Text, Picker, CheckBox } from 'react-native-rapi-ui';
import { View } from '../../components/Themed';

const { width, height } = Dimensions.get('screen');

type ModalProps = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

export default function ModalPage({
  modalOpen,
  setModalOpen,
}: ModalProps): any {
  // const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  return (
    <>
      <Modal visible={modalOpen}>
        <LinearGradient
          colors={['#3366FF', '#262834', '#262834']}
          style={styles.modal}>
          <View style={styles.close}>
            <Ionicons
              name='close'
              size={28}
              color={themeColor.danger}
              onPress={() => setModalOpen(false)}
            />
          </View>
        </LinearGradient>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'transparent',
  },
  close: {
    paddingTop: 10,
    flex: 0.05,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
});
