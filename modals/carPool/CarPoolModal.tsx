import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { themeColor, Text } from 'react-native-rapi-ui';
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

const { width, height } = Dimensions.get('screen');

interface MarkerProps {
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface SelectInput {
  markerLocation?: MarkerProps;
  initialRegion?: MapViewProps;
}

interface PickUpPoint {
  username: string;
  description: string;
  icon: string;
  location: MarkerProps;
}

const ASPECT_RATIO = width / height;
const LATITUDE = -1.393864;
const LONGITUDE = 36.744238;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const PickUpPoints = () => {
  const [location, setLocation] = useState<object | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mapRegion, setMapRegion] = useState<MapViewProps>({
    latitude: LATITUDE, // initial location latitude
    longitude: LONGITUDE, // initial location longitude
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [pickUpPoints, setPickUpPoints] = useState<PickUpPoint[]>([
    {
      username: 'bob',
      description: 'school friend',
      icon: 'dog',
      location: {
        longitude: 35,
        latitude: -1.393864,
      },
    },
    {
      username: 'Alex',
      description: 'Childhood friend',
      icon: 'dragon',
      location: {
        longitude: 36,
        latitude: -1.393864,
      },
    },
    {
      username: 'Jack',
      description: 'Business Partner',
      icon: 'dove',
      location: {
        longitude: 37,
        latitude: -1.393864,
      },
    },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setMapRegion({
      //   longitude: location.coords.longitude,
      //   latitude: location.coords.latitude,
      //   longitudeDelta: 0.0992,
      //   latitudeDelta: 0.0421,
      // });
      // setLocation(location);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <>
        <MapView style={styles.map} initialRegion={mapRegion}>
          <Marker coordinate={mapRegion} title='Me' description='MySelf'>
            <View style={{ width: 26, height: 26, borderRadius: 50 }}>
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 50,
                  backgroundColor: themeColor.white,
                }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    position: 'absolute',
                    top: 1,
                    left: 1,
                    right: 1,
                    bottom: 1,
                    backgroundColor: themeColor.danger,
                    zIndex: 2,
                    borderRadius: 50,
                  }}></View>
              </View>
            </View>
          </Marker>

          {pickUpPoints
            ? pickUpPoints.map((point) => {
                return (
                  <Marker
                    coordinate={{
                      longitude: point.location.longitude,
                      latitude: point.location.latitude,
                    }}
                    title={point.username}
                    description={point.description}>
                    <View style={{ width: 26, height: 26, borderRadius: 50 }}>
                      <View
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 50,
                          backgroundColor: themeColor.white,
                        }}>
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            position: 'absolute',
                            top: 1,
                            left: 1,
                            right: 1,
                            bottom: 1,
                            backgroundColor: themeColor.danger,
                            zIndex: 2,
                            borderRadius: 50,
                          }}></View>
                      </View>
                    </View>
                  </Marker>
                );
              })
            : null}
        </MapView>
      </>
    </View>
  );
};

const TripSchedule = () => {
  const [tableHead, setTableHead] = useState([
    'Time',
    'Mon',
    'Tue',
    'Wed',
    'Thur',
    'Fri',
  ]);

  const [tableTitle, setTableTitle] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thur',
    'Fri',
  ]);

  const [tableData, setTableData] = useState([
    ['', '6am', '6am', '6am', '6am', '6am'],
    ['', '9am', '9am', '9am', '9am', '9am'],
    ['', '12', '12', '12', '12', '12'],
    ['', '3pm', '3pm', '3pm', '3pm', '3pm'],
    ['', '7pm', '7pm', '7pm', '7pm', '7pm'],
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={styles.container}>
        <Table
          style={{ flexDirection: 'row' }}
          borderStyle={{ borderWidth: 1, borderColor: 'transparent' }}>
          {/* Left Wrapper */}
          <TableWrapper style={{ width: 80 }}>
            <Cell
              data=''
              style={{
                width: 80,
                height: 40,
                backgroundColor: themeColor.primary200,
              }}
            />
            <TableWrapper style={{ flexDirection: 'row' }}>
              <Col
                data={tableTitle}
                style={{ flex: 2, backgroundColor: themeColor.primary100 }}
                heightArr={[30, 30, 30, 30, 30]}
                textStyle={{ marginRight: 6, textAlign: 'right' }}></Col>
            </TableWrapper>
          </TableWrapper>

          {/* Right Wrapper */}
          <TableWrapper style={{ flex: 1 }}>
            <Cols
              data={tableData}
              heightArr={[40, 30, 30, 30, 30, 30]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  first: PickUpPoints,
  second: TripSchedule,
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

export default function CarPoolModal({
  modalOpen,
  setModalOpen,
}: ModalProps): any {
  //  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

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
    backgroundColor: themeColor.primary,
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
function setErrorMsg(arg0: string) {
  throw new Error('Function not implemented.');
}
