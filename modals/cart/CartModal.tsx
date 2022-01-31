import {
  Dimensions,
  Modal,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { themeColor, Text, Button } from 'react-native-rapi-ui';
import { View } from '../../components/Themed';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import { useProductStore } from '../../store/product/productStore';

const { width, height } = Dimensions.get('screen');

const element = (data: string, index: number) => {
  const changeQty = useProductStore((state) => state.changeQty);

  const _alertIndex = (index: number) => {
    Alert.alert(`This is row ${index + 1}`);
  };

  return (
    <>
      <TouchableOpacity onPress={() => changeQty(1, 12)}>
        <View
          style={{
            width: 29,
            height: 18,
            backgroundColor: themeColor.primary,
            borderRadius: 2,
            marginVertical: 10,
            marginLeft: 10,
          }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>+</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeQty(1, 12)}>
        <View
          style={{
            width: 29,
            height: 18,
            backgroundColor: themeColor.primary,
            borderRadius: 2,
            marginVertical: 10,
            marginLeft: 10,
          }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>-</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const MyCart = () => {
  const clearCart = useProductStore((state) => state.clearCart);

  const [tableHead, setTableHead] = useState([
    'Name',
    'Desc',
    'Qty',
    '',
    'Sub',
  ]);

  const [tableData, setTableData] = useState([
    ['pen', 'no.2', '1', '', 'ksh.20'],
    ['pencil', 'blue', '2', '', 'ksh.30'],
    ['eraser', 'red', '1', '', 'kdh.40'],
    ['book', 'squared', '2', '', 'kdh.50'],
    ['set', 'oxford', '1', '', 'kdh.100'],
  ]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={styles.container}>
        <Table
          borderStyle={{
            borderWidth: 2,
            borderColor: 'transparent',
          }}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={{
              margin: 6,
              color: themeColor.white,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          />
          {tableData.map((rowData, index) => (
            <TableWrapper
              key={index}
              style={{
                flexDirection: 'row',
                backgroundColor: themeColor.white,
              }}>
              {rowData.map((cellData, cellIndex) => (
                <>
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 3 ? element(cellData, index) : cellData}
                    textStyle={styles.text}
                  />
                </>
              ))}
            </TableWrapper>
          ))}
        </Table>
        <>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginVertical: 10,
              backgroundColor: themeColor.primary,
              paddingVertical: 20,
            }}>
            <TouchableOpacity onPress={() => clearCart()}>
              <Octicons name='trashcan' size={24} color='red' />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'flex-end',
              }}>
              <Text style={{ fontWeight: 'bold' }}>Total</Text>
              <Text>ksh. 1000</Text>
            </View>
          </View>
        </>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            backgroundColor: themeColor.white,
            marginVertical: 10,
          }}>
          <Button
            text='Checkout'
            outline
            size='md'
            width={325}
            rightContent={
              <Ionicons
                name='arrow-forward'
                size={20}
                color={themeColor.primary}
              />
            }
            status='primary'
            type='TouchableOpacity'
          />
        </View>
      </View>
    </ScrollView>
  );
};

const reOrder = (data: string, index: number) => {
  const changeQty = useProductStore((state) => state.changeQty);

  const _alertIndex = (index: number) => {
    Alert.alert(`This is row ${index + 1}`);
  };

  return (
    <>
      <TouchableOpacity onPress={() => _alertIndex(index)}>
        <View
          style={{
            width: 29,
            height: 18,
            backgroundColor: themeColor.primary,
            borderRadius: 2,
            marginVertical: 5,
          }}>
          <Text style={{ textAlign: 'center', color: 'red' }}>ReOrder</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const OrderHistory = () => {
  const [tableHead, setTableHead] = useState([
    'OrderID',
    'Items',
    'Date',
    'Total',
  ]);

  const [tableData, setTableData] = useState([
    ['124d', 'pen, books', '1/2/22', 'ksh.20'],
    ['1qqs', 'pencil, pencil', '30/2/22', 'ksh.30'],
    ['xeews', 'eraser, sharpener,ruler', '1/3/22', 'kdh.40'],
    ['12esd', 'book', '2/3/22', 'kdh.50'],
    ['dws23', 'set', '1/4/22', 'kdh.100'],
  ]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: 'transparent' }}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={{
              margin: 6,
              color: themeColor.white,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </ScrollView>
  );
};

const renderScene = SceneMap({
  first: MyCart,
  second: OrderHistory,
});

type ModalProps = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: themeColor.primary }}
  />
);

export default function CartModal({
  modalOpen,
  setModalOpen,
}: ModalProps): any {
  // const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const removeFromCart = useProductStore((state) => state.removeFromCart);

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
              style={{ backgroundColor: themeColor.white }}
              renderTabBar={renderTabBar}
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
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: themeColor.white,
  },
  head: {
    height: 40,
    backgroundColor: themeColor.primary,
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontSize: 12,
  },
});
