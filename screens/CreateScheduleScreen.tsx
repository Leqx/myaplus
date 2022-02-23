import React, { Fragment, useEffect, useState, useCallback } from 'react';
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
  Platform,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import DateTimePicker from '@react-native-community/datetimepicker';
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

import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {
  useScheduleStore,
  useTodoStore,
} from '../store/schedule/scheduleStore';
import { Picker } from '@react-native-picker/picker';

import { TODOS, ITodo } from '../store/schedule/todo';
import { useIsMounted } from 'usehooks-ts';

import { useTodoAppContext } from '../context/todo/todo-context';
import { addTodoItem } from '../context/todo/todo-funtions';
import { ItodoDataType } from '../context/todo/todo-state';

const { width: vw } = Dimensions.get('window');

export interface CreateScheduleProps {
  navigation: NavigatorScreenParams<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'CreateSchedule'>;
}

const CreateSchedule = () => {
  const keyboardHeight = useKeyboardHeight();
  const isMounted = useIsMounted();
  const [isCreateTodo, setIsCreateTodo] = useState(false);

  const { todoDispatch } = useTodoAppContext();
  const [title, setTitle] = useState<ItodoDataType['title']>('');
  const [additionalInfo, setAdditionalInfo] =
    useState<ItodoDataType['additionalInfo']>('');
  const [day, setDay] = useState<ItodoDataType['day']>(moment().format('LL'));
  const [time, setTime] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});

  const handleSubmit = () => {
    if (!title) return;
    // const id = parseInt(
    //   Math.random().toFixed(3).split('.').join().replace(',', '')
    // );
    const id = uuidv4();
    const todoItem: ItodoDataType = {
      id,
      title,
      additionalInfo,
      day,
      time: moment(time).format('hh:mm A'),
      isScheduled: true,
      isCompleted: false,
    };
    addTodoItem(todoDispatch, todoItem);
    setTitle('');
    setAdditionalInfo('');
    setDay('');
    setTime(new Date());
    navigation.navigate({ name: 'Root', key: 'Schedule' });
  };

  const [taskText, setTaskText] = useState('');

  const [visibleHeight, setVisibleHeight] = useState(
    Dimensions.get('window').height
  );
  const [isAlarmSet, setAlarmSet] = useState(false);
  const [alarmTime, setAlarmTime] = useState(moment().format());

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
  const navigation = useNavigation();

  const [show, setShow] = useState(false);

  const { isDarkmode, setTheme } = useTheme();

  const todos = useScheduleStore((state) => state.todos);
  const markAsComplete = useScheduleStore((state) => state.markAsCompleted);
  const units = useScheduleStore((state) => state.units);
  const [currentDay, setCurrentDay] = useState(moment().format());
  const [selectedUnit, setSelectedUnit] = useState('');
  const [notesText, setNotesText] = useState('');
  // const [time, setTime] = useState(moment(new Date()).toDate());

  const { state, actions } = useTodoStore();

  // const createNewTodo = useCallback(async () => {
  //   let newTodo: ITodo = {
  //     id: uuidv4(),
  //     title: selectedUnit,
  //     additionalInfo: notesText,
  //     day: currentDay,
  //     time: moment(time).format('hh:mm A'),
  //     isScheduled: true,
  //     isCompleted: false,
  //   };

  //   // await actions.addTodo(newTodo);

  //   navigation.navigate({ name: 'Root', key: 'Schedule' });
  // }, []);

  // useEffect(() => {
  //   if (isCreateTodo) {
  //     const effect = async () => {
  //       await createNewTodo();
  //       if (!isMounted()) return;
  //       setIsCreateTodo(false);
  //     };
  //     effect();
  //   }
  // }, [isCreateTodo, isMounted, createNewTodo]);

  return (
    <Layout>
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
                onPress={() => navigation.goBack()}
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
                current={day}
                minDate={moment().format()}
                horizontal
                pastScrollRange={0}
                pagingEnabled
                calendarWidth={350}
                onDayPress={(day) => {
                  setMarkedDates({
                    [day.dateString]: {
                      selected: true,
                      selectedColor: themeColor.white,
                      selectedTextColor: themeColor.primary,
                    },
                  });

                  setDay(day.dateString);
                }}
                monthFormat='MMMM yyyy'
                hideArrows
                markingType='custom'
                theme={{
                  selectedDayBackgroundColor: themeColor.primary,
                  selectedDayTextColor: themeColor.white,
                  todayTextColor: themeColor.white,
                  backgroundColor: '#eaeef7',
                  calendarBackground: themeColor.primary,
                  textDisabledColor: themeColor.gray300,
                  monthTextColor: themeColor.white,
                  textMonthFontWeight: 'bold',
                  dayTextColor: themeColor.white,
                  textDayFontWeight: 'normal',
                  textDayHeaderFontWeight: 'bold',
                }}
                markedDates={markedDates}
                showScrollIndicator={true}
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
                selectedValue={title}
                onValueChange={(itemValue, itemIndex) => setTitle(itemValue)}>
                {units.map((unit) => (
                  <Picker.Item
                    key={unit.id}
                    label={unit.title}
                    value={unit.title}
                  />
                ))}
              </Picker>

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
                  value={additionalInfo}
                  onChangeText={setAdditionalInfo}
                  placeholder='Enter more info about the task.'
                  enablesReturnKeyAutomatically={true}
                  borderColor={themeColor.primaryTransparent100}
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

                {show && (
                  <DateTimePicker
                    testID='dateTimePicker'
                    value={time}
                    mode='time'
                    is24Hour={true}
                    display='default'
                    onChange={(event: any, selectedDate: any) => {
                      let currentDate = selectedDate || Date;
                      setShow(Platform.OS === 'ios');
                      // set time
                      setTime(selectedDate);
                    }}
                  />
                )}

                <TouchableOpacity
                  onPress={() => setShow(!show)}
                  style={{
                    height: 25,
                    marginTop: 3,
                  }}>
                  <Text style={{ fontSize: 19 }}>
                    {moment(time).format('h:mm A')}
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
                      {moment(time).format('h:mm A')}
                    </Text>
                  </View>
                </Section>
                <Switch value={isAlarmSet} onValueChange={handleAlarmSet} />
              </Section>
            </Section>
            <TouchableOpacity
              //disabled={taskText === ''}
              style={[
                styles.createTaskButton,
                {
                  backgroundColor:
                    taskText === '' ? 'rgba(46, 102, 231,0.5)' : '#2E66E7',
                },
              ]}
              onPress={() => {
                // setIsCreateTodo(true);
                handleSubmit();
                // createNewTodo(selectedUnit, notesText, currentDay, time);
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
