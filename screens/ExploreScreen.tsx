import * as React from 'react';

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
import UnitsSlider from '../components/unitsSlider/UnitsSlider';
import { View } from '../components/Themed';
import { getDocs } from 'firebase/firestore';
import scheduleReducer from '../context/schedule/schedule-reducer';
import unitsReducer from '../context/units/units-reducer';
import { unitsRef } from '../initFirebase';
import { useContext } from 'react';
import SearchHeader from '../components/searchHeader/SearchHeader';
import ModalPage from '../components/modal/ModalPage';

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

  React.useEffect(() => {
    getDocs(unitsRef)
      .then((snapshot) => {
        let units: {
          id: string;
          title: string;
          description: string;
          numberOfChapters: number;
        }[] = [];
        snapshot.docs.forEach((doc) => {
          let id = doc.id;
          let title = doc.data().title;
          let description = doc.data().description;
          let numberOfChapters = doc.data().numberOfChapters;

          units.push({
            ...doc.data(),
            id: id,
            title: title,
            description: description,
            numberOfChapters: numberOfChapters,
          });
          setUnitsData(units);
        });
      })
      .catch((err) => console.error(err));

    // setTestDeviceIDAsync("EMULATOR");

    return () => {
      console.log('clean up');
    };
  }, []);

  return (
    <Layout>
      <>
        <ModalPage modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </>

      <SearchHeader>
        <SearchBar />
      </SearchHeader>

      <Section style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <SearchFilter />
        </TouchableOpacity>
      </Section>

      <Section style={styles.units}>
        <FlatList
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
        />
      </Section>
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
    flex: 1.8,
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
    flexDirection: 'column',
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
