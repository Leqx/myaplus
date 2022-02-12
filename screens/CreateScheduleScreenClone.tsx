import React, { Fragment, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import DateTimePicker from 'react-native-modal-datetime-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { CreateScheduleParams, RootStackParamList } from '../types';
import useStore from '../store/schedule/store';
import useKeyboardHeight from '../hooks/useKeyboardHeight';
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
  TextInput,
} from 'react-native-rapi-ui';

import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { useScheduleStore } from '../store/schedule/scheduleStore';
import { Picker } from '@react-native-picker/picker';

const { width: vw } = Dimensions.get('window');

export interface CreateScheduleProps {
  navigation: NavigatorScreenParams<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'CreateSchedule'>;
}

const CreateSchedule: React.FC<CreateScheduleParams> = ({
  navigation,
  route,
}: any) => {
  const { updateTodo } = useStore((state: { updateTodo: any }) => ({
    updateTodo: state.updateTodo,
  }));

  const keyboardHeight = useKeyboardHeight();

  const createNewCalendar = route.params?.createNewCalendar ?? (() => null);
  const updateCurrentTask = route.params?.updateCurrentTask ?? (() => null);
  const currentDate = route.params?.currentDate ?? (() => null);

  const [selectedDay, setSelectedDay] = useState({
    [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD'
    )}`]: {
      selected: true,
      selectedColor: '#2E66E7',
    },
  });
  const [currentDay, setCurrentDay] = useState(moment().format());
  const [taskText, setTaskText] = useState('');
  const [notesText, setNotesText] = useState('');
  const [visibleHeight, setVisibleHeight] = useState(
    Dimensions.get('window').height
  );
  const [isAlarmSet, setAlarmSet] = useState(false);
  const [alarmTime, setAlarmTime] = useState(moment().format());
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

  useEffect(() => {
    if (keyboardHeight > 0) {
      setVisibleHeight(Dimensions.get('window').height - keyboardHeight);
    } else if (keyboardHeight === 0) {
      setVisibleHeight(Dimensions.get('window').height);
    }
  }, [keyboardHeight]);

  const handleAlarmSet = () => {
    setAlarmSet(!isAlarmSet);
  };

  const synchronizeCalendar = async () => {
    const calendarId = await createNewCalendar();
    try {
      const createEventId = await addEventsToCalendar(calendarId);
      handleCreateEventData(createEventId);
    } catch (err) {
      Alert.alert(`Error ${err}`);
    }
  };

  const addEventsToCalendar = async (calendarId: {
    toString: () => string;
  }) => {
    const event = {
      title: taskText,
      notes: notesText,
      startDate: moment(alarmTime).add(0, 'm').toDate(),
      endDate: moment(alarmTime).add(5, 'm').toDate(),
      timeZone: Localization.timezone,
    };

    try {
      const createEventAsyncResNew = await Calendar.createEventAsync(
        calendarId.toString(),
        event
      );
      return createEventAsyncResNew;
    } catch (error) {
      console.log(error);
    }
  };

  const showDateTimePicker = () => setDateTimePickerVisible(true);

  const hideDateTimePicker = () => setDateTimePickerVisible(false);

  const handleCreateEventData = async (createEventId: string | undefined) => {
    const creatTodo = {
      key: uuidv4(),
      date: `${moment(currentDay).format('YYYY')}-${moment(currentDay).format(
        'MM'
      )}-${moment(currentDay).format('DD')}`,
      todoList: [
        {
          key: uuidv4(),
          title: taskText,
          notes: notesText,
          alarm: {
            time: alarmTime,
            isOn: isAlarmSet,
            createEventAsyncRes: createEventId,
          },
          color: `rgb(${Math.floor(
            Math.random() * Math.floor(256)
          )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
            Math.random() * Math.floor(256)
          )})`,
        },
      ],
      markedDot: {
        date: currentDay,
        dots: [
          {
            key: uuidv4(),
            color: '#2E66E7',
            selectedDotColor: '#2E66E7',
          },
        ],
      },
    };
    navigation.navigate('Schedule');
    await updateTodo(creatTodo);
    updateCurrentTask(currentDate);
  };

  const handleDatePicked = (date: moment.MomentInput) => {
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute)
      .toString();
    setAlarmTime(newModifiedDay);
    hideDateTimePicker();
  };

  const { isDarkmode, setTheme } = useTheme();

  const todos = useScheduleStore((state) => state.todos);
  let titles = todos.map((x) => x.title);
  let ids = todos.map((x) => x.id);

  const [selectedUnit, setSelectedUnit] = useState('');

  return (
    <Layout>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode='time'
        date={new Date()}
        isDarkModeEnabled
      />

      <Section style={styles.container}>
        <Section
          style={{
            height: visibleHeight,
          }}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100,
            }}>
            <View style={styles.backButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Schedule')}
                style={{ marginRight: vw / 2 - 120, marginLeft: 20 }}>
                <Image
                  style={{ height: 25, width: 40 }}
                  source={require('../assets/images/back.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <Text style={styles.newTask}>Create Task</Text>
            </View>
            <Section style={styles.calenderContainer}>
              <CalendarList
                style={{
                  width: 350,
                  height: 350,
                }}
                // isDarkModeEnable
                current={currentDay}
                minDate={moment().format()}
                horizontal
                pastScrollRange={0}
                pagingEnabled
                calendarWidth={350}
                onDayPress={(day) => {
                  setSelectedDay({
                    [day.dateString]: {
                      selected: true,
                      selectedColor: '#2E66E7',
                    },
                  });
                  setCurrentDay(day.dateString);
                  setAlarmTime(day.dateString);
                }}
                monthFormat='yyyy MMMM'
                hideArrows
                markingType='custom'
                theme={{
                  selectedDayBackgroundColor: themeColor.primary,
                  selectedDayTextColor: themeColor.white,
                  todayTextColor: '#2E66E7',
                  backgroundColor: '#eaeef7',
                  calendarBackground: themeColor.gray100,
                  textDisabledColor: '#d9dbe0',
                }}
                // markedDates={selectedDay}
              />
            </Section>
            <Section style={styles.taskContainer}>
              <Text size='lg' style={{ marginBottom: 10, color: '#9CAAC4' }}>
                Select what to study
              </Text>

              <Picker
                mode='dialog'
                style={{ color: 'white', paddingVertical: 20 }}
                dropdownIconColor={themeColor.primary}
                selectedValue={selectedUnit}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedUnit(itemValue)
                }>
                {todos.map((todo) => (
                  <Picker.Item
                    key={todo.id}
                    label={todo.title}
                    value={todo.title.toLocaleLowerCase()}
                  />
                ))}
              </Picker>

              {/* <TextInput
                style={styles.title}
                onChangeText={setTaskText}
                value={taskText}
                placeholder='Enter Unit to study'
              /> */}
              <Text
                size='sm'
                style={{
                  color: '#BDC6D8',
                  marginVertical: 10,
                }}>
                Suggestion
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.readBook}>
                  <Text style={{ textAlign: 'center', fontSize: 12 }}>
                    Math
                  </Text>
                </View>
                <View style={styles.design}>
                  <Text style={{ textAlign: 'center', fontSize: 12 }}>Phy</Text>
                </View>
                <View style={styles.learn}>
                  <Text style={{ textAlign: 'center', fontSize: 12 }}>Bus</Text>
                </View>
              </View>
              <View style={styles.notesContent} />
              <Section>
                <Text size='lg' style={styles.notes}>
                  Additional info
                </Text>
                <TextInput
                  style={{
                    height: 25,
                    fontSize: 19,
                    marginTop: 3,
                  }}
                  onChangeText={setNotesText}
                  value={notesText}
                  placeholder='Enter more info about the task.'
                />
              </Section>
              <View style={styles.separator} />
              <Section>
                <Text
                  style={{
                    color: '#9CAAC4',
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  Set Times
                </Text>
                <TouchableOpacity
                  onPress={() => showDateTimePicker()}
                  style={{
                    height: 25,
                    marginTop: 3,
                  }}>
                  <Text style={{ fontSize: 19 }}>
                    {moment(alarmTime).format('h:mm A')}
                  </Text>
                </TouchableOpacity>
              </Section>
              <View style={styles.separator} />
              <Section
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Section>
                  <Text
                    size='lg'
                    style={{
                      color: '#9CAAC4',
                      fontWeight: '600',
                    }}>
                    Set Alarm
                  </Text>
                  <View
                    style={{
                      height: 25,
                      marginTop: 3,
                    }}>
                    <Text style={{ fontSize: 19 }}>
                      {moment(alarmTime).format('h:mm A')}
                    </Text>
                  </View>
                </Section>
                <Switch value={isAlarmSet} onValueChange={handleAlarmSet} />
              </Section>
            </Section>
            <TouchableOpacity
              disabled={taskText === ''}
              style={[
                styles.createTaskButton,
                {
                  backgroundColor:
                    taskText === '' ? 'rgba(46, 102, 231,0.5)' : '#2E66E7',
                },
              ]}
              onPress={async () => {
                if (isAlarmSet) {
                  await synchronizeCalendar();
                }
                if (!isAlarmSet) {
                  // TODO: PASS IN DATA
                  handleCreateEventData('');
                }
              }}>
              <Text
                size='md'
                style={{
                  textAlign: 'center',
                  color: '#fff',
                }}>
                ADD YOUR TASK
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Section>
      </Section>
    </Layout>
  );
};

export default CreateSchedule;

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notes: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 50,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 50,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 50,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    height: 500,
    width: 337,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#eaeef7',
    marginTop: 30,
  },
});
