import React, { Fragment, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Actionsheet, useDisclose, NativeBaseProvider, Modal } from "native-base"
import { Text, View } from '../components/Themed';
import {  CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';

import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Task } from '../components/task/Task';
// import { useStore } from '../store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootTabScreenProps } from '../types';

const datesWhitelist = [
  {
    start: moment(),
    end: moment().add(365, 'days') // total 4 days enabled
  }
];

const ScheduleScreen = ({ navigation }: RootTabScreenProps<'Schedule'>) => {

    const [todoList, setTodoList] = useState([]);
    const [markedDate, setMarkedDate] = useState([]);
    const [currentDate, setCurrentDate] = useState(
    `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD'
    )}`
  );

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
         <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'background',
            duration: 200
          }}
          style={{
            height: 150,
            paddingTop: 20,
            paddingBottom: 20
          }}
          calendarHeaderStyle={{ color: '#000000' }}
          dateNumberStyle={{ color: '#000000', paddingTop: 10 }}
          dateNameStyle={{ color: '#BBBBBB' }}
          highlightDateNumberStyle={{
            color: '#fff',
            backgroundColor: '#2E66E7',
            marginTop: 10,
            height: 35,
            width: 35,
            textAlign: 'center',
            borderRadius: 17.5,
            overflow: 'hidden',
            paddingTop: 6,
            fontWeight: '400',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          highlightDateNameStyle={{ color: '#2E66E7' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey', paddingTop: 10 }}
          datesWhitelist={datesWhitelist}
          iconLeft={require('../assets/images/left-arrow.png')}
          iconRight={require('../assets/images/right-arrow.png')}
          iconContainer={{ flex: 0.1 }}
          // If you get this error => undefined is not an object (evaluating 'datesList[_this.state.numVisibleDays - 1].date')
          // temp: https://github.com/BugiDev/react-native-calendar-strip/issues/303#issuecomment-864510769
          markedDates={markedDate}
          selectedDate={currentDate}
          onDateSelected={(date) => {
            const selectedDate = `${moment(date).format('YYYY')}-${moment(
              date
            ).format('MM')}-${moment(date).format('DD')}`;
            updateCurrentTask(selectedDate);
            setCurrentDate(selectedDate);
          }}
        />

          <TouchableOpacity
          onPress={() =>
            navigation.navigate('CreateSchedule')
          }
          style={styles.viewTask}
        >
          <Image
            source={require('../assets/images/plus.png')}
            style={{
              height: 30,
              width: 30
            }}
          />
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
}

export default ScheduleScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    paddingLeft: 30,
  },
  emptyDateWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  emptyDateText: {
    paddingLeft: 10,
    fontSize: 15
  },
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: '#2E66E7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E66E7',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center'
  },
  updateButton: {
    backgroundColor: '#2E66E7',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19
  },
  taskContainer: {
    height: 475,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22
  }
  
});
