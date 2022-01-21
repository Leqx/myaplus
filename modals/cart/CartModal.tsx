import {
  Dimensions,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

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
  const [tableHead, setTableHead] = useState([
    'Image',
    'Name',
    'Qty',
    'Price',
    'Add',
  ]);

  const [tableData, setTableData] = useState([
    ['1', 'pen', '1', 'ksh.20', '+'],
    ['2', 'pencil', '2', 'kdh.30', '+'],
    ['3', 'eraser', '1', 'ksh.10', '+'],
    ['4', 'book', '2', 'ksh.40', '+'],
    ['5', 'set', '1', 'ksh.100', '+'],
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

const SecondRoute = () => {
  const [tableHead, setTableHead] = useState([
    'Image',
    'Name',
    'Qty',
    'Price',
    'Re-Order',
  ]);

  const [tableData, setTableData] = useState([
    ['1', 'pen', '1', 'ksh.20', '+'],
    ['2', 'pencil', '2', 'kdh.30', '+'],
    ['3', 'eraser', '1', 'ksh.10', '+'],
    ['4', 'book', '2', 'ksh.40', '+'],
    ['5', 'set', '1', 'ksh.100', '+'],
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

export default function CartModal(item: any) {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'My Cart' },
    { key: 'second', title: 'Order History' },
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
});
