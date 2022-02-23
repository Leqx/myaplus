import * as React from 'react';
import * as Speech from 'expo-speech';
import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Button,
  Layout,
  Section,
  SectionContent,
  SectionImage,
  Text,
  TopNav,
  themeColor,
  useTheme,
  TextInput,
} from 'react-native-rapi-ui';

import Ads from '../components/ads/Ads';
import { AuthContext } from '../auth/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootTabScreenProps } from '../types';
import ScheduleContext from '../context/schedule/schedule-context';
import SearchBar from '../components/search/SearchBar';
import SearchFilter from '../components/search/SearchFilter';
import UnitsCard from '../components/unitsCard/UnitsCard';
import UnitsContext from '../context/units/units-context';

import { View } from '../components/Themed';
import { getDocs } from 'firebase/firestore';

import unitsReducer from '../context/units/units-reducer';
import { unitsRef } from '../initFirebase';
import { useContext } from 'react';
import SearchHeader from '../components/searchHeader/SearchHeader';
import ModalPage from '../components/modal/ModalPage';
import UnitsFilterModal from '../modals/unitsFilter/UnitsFilterModal';
import { Modalize } from 'react-native-modalize';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('screen');

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.66;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

// TODO: PASS PROPS OR MAKE GLOBAL STATE TO MODALPAGE AND UNITSCARD

export default function ExploreScreen({
  navigation,
}: RootTabScreenProps<'Explore'>) {
  const schedule = React.useContext(ScheduleContext);

  const units = React.useContext(UnitsContext);

  const { isDarkmode, setTheme } = useTheme();

  const user = useContext(AuthContext);

  const [unitsData, setUnitsData] = React.useState<
    Array<{
      id: string;
      title: string;
      description: string;
      numberOfChapters: number;
    }>
  >([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const showToast = () => {
    ToastAndroid.show('Successfully added to my list', ToastAndroid.SHORT);
  };

  const [bannerAdId, setBannerAdId] = React.useState<string>(
    Platform.OS === 'ios'
      ? 'ca-app-pub-3940256099942544/2934735716'
      : 'ca-app-pub-3940256099942544/6300978111'
  );

  const [text, setText] = React.useState('');
  const [inputHeight, setInputHeight] = React.useState(0);
  const [inProgress, setInProgress] = React.useState<boolean>(false);
  const [paused, setPaused] = React.useState<boolean>(false);
  const [pitch, setPitch] = React.useState<number>(1.5);
  const [pitchState, setPitchState] = React.useState<string>('Inactive');
  const [rate, setRate] = React.useState<number>(0.7);
  const [rateState, setRateState] = React.useState<string>('Inactive');
  const [volume, setVolume] = React.useState<number>(0.1);
  const [volumeState, setVolumeState] = React.useState<string>('Inactive');

  const listAllVoiceOptions = async () => {
    let voices = await Speech.getAvailableVoicesAsync();
    // console.log(voices);
  };

  React.useEffect(() => {
    (async () => {
      await listAllVoiceOptions();
    })();
  }, []);

  const speakStudy = () => {
    const study = `Let's begin ${text}`;
    const options = {
      voice: 'com.apple.speech.synthesis.voice.Fred',
      pitch: 1.5,
      rate: 0.7,
    };
    Speech.speak(study, options);
  };

  const _stop = () => {
    Speech.stop();
  };

  // const _pause = async () => {
  //   await Speech.pause();

  //   setPaused(true);
  // };

  // const _resume = () => {
  //   Speech.resume();

  //   setPaused(false);
  // };

  // const _increasePitch = () => {
  //   setPitch(pitch + 0.1);
  // };

  // const _increaseRate = () => {
  //   setRate(rate + 0.1);
  // };

  // const _decreasePitch = () => {
  //   setPitch(pitch - 0.1);
  // };

  // const _decreaseRate = () => {
  //   setRate(rate - 0.1);
  // };

  const modalizeRef = React.useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  // React.useEffect(() => {
  //   getDocs(unitsRef)
  //     .then((snapshot) => {
  //       let units: {
  //         id: string;
  //         title: string;
  //         description: string;
  //         numberOfChapters: number;
  //       }[] = [];
  //       snapshot.docs.forEach((doc) => {
  //         let id = doc.id;
  //         let title = doc.data().title;
  //         let description = doc.data().description;
  //         let numberOfChapters = doc.data().numberOfChapters;

  //         units.push({
  //           ...doc.data(),
  //           id: id,
  //           title: title,
  //           description: description,
  //           numberOfChapters: numberOfChapters,
  //         });
  //         setUnitsData(units);
  //       });
  //     })
  //     .catch((err) => console.error(err));

  //   // setTestDeviceIDAsync("EMULATOR");

  //   return () => {
  //     console.log('clean up');
  //   };
  // }, []);

  return (
    <Layout>
      <>
        {/* <UnitsFilterModal modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}
      </>

      <SearchHeader>
        <SearchBar />
      </SearchHeader>

      <>
        <Section style={styles.filterContainer}>
          {/* <TouchableOpacity onPress={() => setModalOpen(true)}>
          <SearchFilter />
        </TouchableOpacity> */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={() => speakStudy()}>
                <Ionicons
                  name='play-circle'
                  size={30}
                  color={themeColor.white}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={() => _stop()}>
                <Ionicons
                  name='close-circle'
                  size={30}
                  color={themeColor.white}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={() => onOpen()}>
                <Ionicons
                  name='funnel-outline'
                  size={24}
                  color={themeColor.white}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={() => console.log('pause')}>
                <Ionicons name='scan' size={30} color={themeColor.white} />
              </TouchableOpacity>
            </View>
          </View>
        </Section>

        <Section style={styles.units}>
          {/* <FlatList
          data={unitsData}
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          snapToEnd={true}
          contentContainerStyle={{
            padding: SPACING * 2,
            marginTop: 5,
          }}
          removeClippedSubviews={false}
          renderItem={({ item }) => <UnitsCard {...item} />}
          keyExtractor={(item) => item.id}
        /> */}

          <TextInput
            placeholder='Copy and paste what to study here'
            value={text}
            onChangeText={(val) => setText(val)}
            multiline={true}
            numberOfLines={10}
            editable={true}
            textAlign='center'
            onContentSizeChange={(e) => {
              let inputH = Math.max(e.nativeEvent.contentSize.height, 50);
              if (inputH > 120) inputH = 100;
              setInputHeight(inputH);
            }}
          />
        </Section>
        <>
          <Modalize
            ref={modalizeRef}
            modalHeight={200}
            modalStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: themeColor.white,
              paddingVertical: 1,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <>
                <Text
                  style={{
                    color: themeColor.primary,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Speed{' '}
                </Text>
              </>
              <Slider
                style={{ width: 255, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                value={rate}
                minimumTrackTintColor={themeColor.primary}
                maximumTrackTintColor={themeColor.primary}
                onValueChange={() => setRate(rate + 0.1)}
                onSlidingStart={() => setRateState('Sliding')}
                onSlidingComplete={() => setRateState('Inactive')}
                step={10}
                thumbTintColor={themeColor.primary}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <>
                <Text
                  style={{
                    color: themeColor.primary,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Pitch{' '}
                </Text>
              </>
              <Slider
                style={{ width: 260, height: 40 }}
                minimumValue={1}
                maximumValue={9}
                value={pitch}
                minimumTrackTintColor={themeColor.primary}
                maximumTrackTintColor={themeColor.primary}
                onValueChange={() => setPitch(pitch + 1.5)}
                onSlidingStart={() => setPitchState('Sliding')}
                onSlidingComplete={() => setPitchState('Inactive')}
                step={10}
                thumbTintColor={themeColor.primary}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <>
                <Text
                  style={{
                    color: themeColor.primary,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Volume{' '}
                </Text>
              </>
              <Slider
                style={{ width: 245, height: 40 }}
                minimumValue={0}
                maximumValue={10}
                value={volume}
                minimumTrackTintColor={themeColor.primary}
                maximumTrackTintColor={themeColor.primary}
                onValueChange={() => setVolume(volume + 1)}
                onSlidingStart={() => setVolumeState('Sliding')}
                onSlidingComplete={() => setVolumeState('Inactive')}
                step={10}
                thumbTintColor={themeColor.primary}
              />
            </View>
          </Modalize>
        </>
      </>
      <Section style={styles.adsContainer}>
        <AdMobBanner
          bannerSize='smartBannerLandscape'
          adUnitID={bannerAdId}
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={(err) => console.error(err)}
        />
      </Section>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    paddingHorizontal: 10,
  },
  count: {
    fontSize: 12,
    fontWeight: 'normal',
    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header: {
    flex: 1,
    width: width,
    backgroundColor: themeColor.white,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  units: {
    flex: 2,
    // flex: 1.8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  itemContainer: {
    width: 50,
    height: 50,
    padding: 20,
    borderRadius: 0,
  },
  itemText: {
    color: themeColor.black,
  },
  slider: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
    marginHorizontal: 10,
    width: 200,
    height: 300,
    flex: 0.5,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: themeColor.primary,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    borderRadius: 20,
  },
  titleContainer: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    position: 'absolute',
    paddingTop: 50,
  },
  headerImage: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  filterContainer: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
    flexDirection: 'row',
  },
  favButtonContainer: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: themeColor.primary,
    paddingLeft: 10,
    paddingTop: 15,
  },
  adsContainer: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
  },
  close: {
    marginTop: 50,
  },
});
