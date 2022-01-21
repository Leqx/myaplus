import {
  Dimensions,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import MapView from 'react-native-maps';

import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { themeColor, Text, Picker, CheckBox } from 'react-native-rapi-ui';
import { View } from '../../components/Themed';
import { TabView, SceneMap } from 'react-native-tab-view';
import Slider from '@react-native-community/slider';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

const { width, height } = Dimensions.get('screen');

export default function UnitsFilterModal(item: any) {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Pick Up Points' },
    { key: 'second', title: 'Trip Schedule' },
  ]);

  const [pickerValue, setPickerValue] = React.useState('');
  const items = [
    { label: 'Front-end Developer', value: 'FED' },
    { label: 'Back-end Developer', value: 'BED' },
    { label: 'Full-stack Developer', value: 'FSD' },
  ];

  const [checkBox, setCheckbox] = React.useState(false);

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

          <View style={styles.tabs}>
            <Text>Sort by</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
                backgroundColor: 'transparent',
              }}>
              <CheckBox
                value={checkBox}
                onValueChange={(val) => setCheckbox(val)}
              />
              <Text size='md' style={{ marginLeft: 15, color: 'white' }}>
                {'    '}
                Scheduled
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              <CheckBox
                value={checkBox}
                onValueChange={(val) => setCheckbox(val)}
              />
              <Text size='md' style={{ marginLeft: 10, color: 'white' }}>
                Unscheduled
              </Text>
            </View>
          </View>
          <View style={styles.tabs}>
            <>
              <Text style={{ marginBottom: 10 }}>Subjects </Text>
            </>
            <>
              <Picker
                items={items}
                value={pickerValue}
                placeholder='Select a Subject'
                onValueChange={(val) => setPickerValue(val)}
              />
            </>
          </View>
          <View style={styles.tabs}>
            <Text>Select by</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <CheckBox
                value={checkBox}
                onValueChange={(val) => setCheckbox(val)}
              />
              <Text
                size='md'
                style={{
                  marginLeft: 10,
                  color: 'white',
                  backgroundColor: 'transparent',
                }}>
                {'    '}
                Read
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              <CheckBox
                value={checkBox}
                onValueChange={(val) => setCheckbox(val)}
              />
              <Text size='md' style={{ marginLeft: 10, color: 'white' }}>
                Unread
              </Text>
            </View>
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
  tabs: {
    flex: 0.2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: width,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
