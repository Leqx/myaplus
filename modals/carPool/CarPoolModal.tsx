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
import { themeColor, Text } from 'react-native-rapi-ui';
import { View } from '../../components/Themed';
import { TabView, SceneMap } from 'react-native-tab-view';
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

const FirstRoute = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <>
        <MapView style={styles.map} />
      </>
    </View>
  );
};

const SecondRoute = () => {
  const [tableHead, setTableHead] = useState([
    'Time',
    'Mon',
    'Tue',
    'Wed',
    'Thur',
    'Fri',
  ]);

  const [tableData, setTableData] = useState([
    ['6.00 a.m', '1', '1', '1', '1', '1'],
    ['9.00 a.m', '1', '2', '1', '1', '1'],
    ['12.00 a.m', '1', '1', '1', '1', '1'],
    ['3.00 p.m', '1', '2', '1', '1', '1'],
    ['6.00 p.m', '1', '1', '1', '1', '1'],
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function CarPoolModal(item: any) {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Pick Up Points' },
    { key: 'second', title: 'Trip Schedule' },
  ]);

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
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
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
  tabs: {
    flex: 1,
    backgroundColor: 'transparent',
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
