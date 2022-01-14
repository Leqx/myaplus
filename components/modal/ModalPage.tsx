import { Modal, StyleSheet } from 'react-native';

import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { themeColor } from 'react-native-rapi-ui';

export default function ModalPage(item: any) {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  return (
    <>
      <Modal visible={modalOpen}>
        <LinearGradient
          colors={['#3366FF', '#262834', '#262834']}
          style={styles.modal}>
          <Ionicons
            name='close'
            size={28}
            color={themeColor.danger}
            style={styles.close}
            onPress={() => setModalOpen(false)}
          />
        </LinearGradient>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
  },
  close: {
    marginTop: 50,
  },
});
