import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';
import { View } from '../components/Themed';
// import {  CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import Task from '../components/task/Task';
import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { RootTabScreenProps } from '../types';
import useStore from '../store/store';

const datesWhitelist = [
  {
    start: moment(),
    end: moment().add(365, 'days'), // total 4 days enabled
  },
];

type Alarm = {
  time: string;
  isOn: boolean;
  createEventAsyncRes: string;
};

type Task = {
  alarm: Alarm;
  title: string;
  notes: string;
};

interface Todo {
  key: string;
  alarm: Alarm;
  title: string;
  notes: string;
  color: string;
}

const ScheduleScreen = ({ navigation }: RootTabScreenProps<'Schedule'>) => {
  const { updateSelectedTask, deleteSelectedTask, todo } = useStore(
    (state: {
      updateSelectedTask: any;
      deleteSelectedTask: any;
      todo: any;
    }) => ({
      updateSelectedTask: state.updateSelectedTask,
      deleteSelectedTask: state.deleteSelectedTask,
      todo: state.todo,
    })
  );

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [markedDate, setMarkedDate] = useState([]);
  const [currentDate, setCurrentDate] = useState<Date>(moment().toDate());

  const [selectedTask, setSelectedTask] = useState<null | Task>(null);

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isDateTimePickerVisible, setDateTimePickerVisible] =
    useState<boolean>(false);
  const showDateTimePicker = () => setDateTimePickerVisible(true);

  const hideDateTimePicker = () => setDateTimePickerVisible(false);
  const handleDatePicked = (date: moment.MomentInput) => {
    let prevSelectedTask = JSON.parse(JSON.stringify(selectedTask));
    const selectedDatePicked = prevSelectedTask.alarm.time;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    let newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);
    prevSelectedTask.alarm.time = newModifiedDay;
    setSelectedTask(prevSelectedTask);
    hideDateTimePicker();
  };

  useEffect(() => {
    handleDeletePreviousDayTask(todo);
  }, [todo, currentDate]);

  const handleDeletePreviousDayTask = async (oldTodo: any[]) => {
    try {
      if (oldTodo !== []) {
        const todayDate = `${moment().format('YYYY')}-${moment().format(
          'MM'
        )}-${moment().format('DD')}`;
        const checkDate = moment(todayDate);
        await oldTodo.filter(
          (item: { date: moment.MomentInput; todoList: any[] }) => {
            const currDate = moment(item.date);
            const checkedDate = checkDate.diff(currDate, 'days');
            if (checkedDate > 0) {
              item.todoList.forEach(
                async (listValue: {
                  alarm: { createEventAsyncRes: { toString: () => string } };
                }) => {
                  try {
                    await Calendar.deleteEventAsync(
                      listValue.alarm.createEventAsyncRes.toString()
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              );
              return false;
            }
            return true;
          }
        );

        await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        updateCurrentTask(currentDate.toString());
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  const updateCurrentTask = async (currentDate: string) => {
    try {
      if (todo !== [] && todo) {
        const markDot = todo.map((item: { markedDot: any }) => item.markedDot);
        const todoLists = todo.filter((item: { date: any }) => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
        setMarkedDate(markDot);
        if (todoLists.length !== 0) {
          setTodoList(todoLists[0].todoList);
        } else {
          setTodoList([]);
        }
      }
    } catch (error) {
      console.log('updateCurrentTask', error);
    }
  };

  const handleAlarmSet = () => {
    let prevSelectedTask = JSON.parse(JSON.stringify(selectedTask));
    prevSelectedTask.alarm.isOn = !prevSelectedTask.alarm.isOn;
    setSelectedTask(prevSelectedTask);
  };

  const updateAlarm = async () => {
    const calendarId = await createNewCalendar();
    const event = {
      title: selectedTask?.title,
      notes: selectedTask?.notes,
      startDate: moment(selectedTask?.alarm.time).add(0, 'm').toDate(),
      endDate: moment(selectedTask?.alarm.time).add(5, 'm').toDate(),
      timeZone: Localization.timezone,
    };

    if (!selectedTask?.alarm.createEventAsyncRes) {
      try {
        const createEventAsyncRes = await Calendar.createEventAsync(
          calendarId!.toString(),
          event
        );
        let updateTask = JSON.parse(JSON.stringify(selectedTask));
        updateTask.alarm.createEventAsyncRes = createEventAsyncRes;
        setSelectedTask(updateTask);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Calendar.updateEventAsync(
          selectedTask?.alarm.createEventAsyncRes.toString(),
          event
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteAlarm = async () => {
    try {
      if (selectedTask?.alarm.createEventAsyncRes) {
        await Calendar.deleteEventAsync(
          selectedTask?.alarm.createEventAsyncRes
        );
      }
      let updateTask = JSON.parse(JSON.stringify(selectedTask));
      updateTask.alarm.createEventAsyncRes = '';
      setSelectedTask(updateTask);
    } catch (error) {
      console.log('deleteAlarm', error);
    }
  };

  const createNewCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await Calendar.getDefaultCalendarAsync()
        : { isLocalAccount: true, name: 'Google Calendar', sourceId: '' };

    const newCalendar = {
      title: 'Personal',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId: defaultCalendarSource?.sourceId || undefined,
      sourceName: defaultCalendarSource.name || undefined,
      name: 'internal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount: 'personal',
    };

    let calendarId = null;

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (err) {
      Alert.alert(`Error ${err}`);
    }

    return calendarId;
  };

  const getEvent = async () => {
    if (selectedTask?.alarm.createEventAsyncRes) {
      try {
        await Calendar.getEventAsync(
          selectedTask?.alarm.createEventAsyncRes.toString()
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleModalVisible = () => {
    setModalVisible(!isModalVisible);
  };

  const params = {
    updateCurrentTask: updateCurrentTask,
    currentDate,
    createNewCalendar: createNewCalendar,
  };

  return (
    <>
      {selectedTask !== null && (
        <>
          <Layout>
            <Task {...{ setModalVisible, isModalVisible }}>
              <DateTimePicker
                isVisible={isDateTimePickerVisible}
                onConfirm={handleDatePicked}
                onCancel={hideDateTimePicker}
                mode='time'
                date={new Date()}
                isDarkModeEnabled
              />
            </Task>
            <Section style={styles.taskContainer}>
              <TextInput
                style={styles.title}
                onChangeText={(text) => {
                  let prevSelectedTask = JSON.parse(
                    JSON.stringify(selectedTask)
                  );
                  prevSelectedTask.title = text;
                  setSelectedTask(prevSelectedTask);
                }}
                value={selectedTask.title}
                placeholder='What do you need to study?'
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#BDC6D8',
                  marginVertical: 10,
                }}>
                Suggestion
              </Text>
              <Section style={{ flexDirection: 'row' }}>
                <View style={styles.readBook}>
                  <Text style={{ textAlign: 'center', fontSize: 14 }}>
                    {' '}
                    Math{' '}
                  </Text>
                </View>

                <View style={styles.design}>
                  <Text style={{ textAlign: 'center', fontSize: 14 }}>
                    {' '}
                    Physics{' '}
                  </Text>
                </View>

                <View style={styles.learn}>
                  <Text style={{ textAlign: 'center', fontSize: 14 }}>
                    {' '}
                    Learn{' '}
                  </Text>
                </View>
              </Section>
              <View style={styles.notesContent} />
              <Section>
                <Text
                  style={{
                    color: '#9CAAC4',
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                  Business
                </Text>
                <TextInput
                  style={{
                    height: 25,
                    fontSize: 19,
                    marginTop: 3,
                  }}
                  onChangeText={(text) => {
                    let prevSelectedTask = JSON.parse(
                      JSON.stringify(selectedTask)
                    );
                    prevSelectedTask.notes = text;
                    setSelectedTask(prevSelectedTask);
                  }}
                  value={selectedTask.notes}
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
                    {moment(selectedTask?.alarm?.time || moment()).format(
                      'h:mm A'
                    )}
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
                    style={{
                      color: '#9CAAC4',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    Set Alarm
                  </Text>
                  <Section
                    style={{
                      height: 25,
                      marginTop: 3,
                    }}>
                    <Text style={{ fontSize: 19 }}>
                      {moment(selectedTask?.alarm?.time || moment()).format(
                        'h:mm A'
                      )}
                    </Text>
                  </Section>
                </Section>
                <Switch
                  value={selectedTask?.alarm?.isOn || false}
                  onValueChange={handleAlarmSet}
                />
              </Section>

              <Section
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    handleModalVisible();
                    console.log('isOn', selectedTask?.alarm.isOn);
                    if (selectedTask?.alarm.isOn) {
                      await updateAlarm();
                    } else {
                      await deleteAlarm();
                    }
                    await updateSelectedTask({
                      date: currentDate,
                      todo: selectedTask,
                    });
                    updateCurrentTask(currentDate.toString());
                  }}
                  style={styles.updateButton}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      color: '#fff',
                    }}>
                    UPDATE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    handleModalVisible();
                    deleteAlarm();
                    await deleteSelectedTask({
                      date: currentDate,
                      todo: selectedTask,
                    });
                    updateCurrentTask(currentDate.toString());
                  }}
                  style={styles.deleteButton}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      color: '#fff',
                    }}>
                    DELETE
                  </Text>
                </TouchableOpacity>
              </Section>
            </Section>
          </Layout>
        </>
      )}
      <Layout>
        <Section>
          <CalendarStrip
            scrollable={true}
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            daySelectionAnimation={{
              type: 'background',
              duration: 200,
              highlightColor: 'transparent',
            }}
            style={{
              height: 180,
              paddingTop: 20,
              paddingBottom: 20,
            }}
            calendarHeaderStyle={{ color: themeColor.gray200 }}
            dateNumberStyle={{ color: themeColor.gray200, paddingTop: 10 }}
            dateNameStyle={{ color: themeColor.gray100 }}
            highlightDateNumberStyle={{
              color: themeColor.white,
              backgroundColor: themeColor.primary,
              marginTop: 10,
              height: 45,
              width: 35,
              textAlign: 'center',
              borderRadius: 7.5,
              overflow: 'hidden',
              paddingTop: 6,
              fontWeight: '400',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            highlightDateNameStyle={{ color: themeColor.primary }}
            disabledDateNameStyle={{ color: themeColor.gray100 }}
            disabledDateNumberStyle={{
              color: themeColor.gray100,
              paddingTop: 10,
            }}
            datesWhitelist={datesWhitelist}
            iconLeft={require('../assets/images/left-arrow.png')}
            iconRight={require('../assets/images/right-arrow.png')}
            iconContainer={{ flex: 0.1 }}
            markedDates={markedDate}
            selectedDate={currentDate}
            onDateSelected={(date) => {
              const selectedDate = moment().toDate();
              updateCurrentTask(selectedDate.toString());
              setCurrentDate(selectedDate);
            }}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CreateSchedule', {
                updateCurrentTask: updateCurrentTask,
                currentDate,
                createNewCalendar: createNewCalendar,
              })
            }
            style={styles.viewTask}>
            <Image
              source={require('../assets/images/plus.png')}
              style={{
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>

          <Section
            style={{
              width: '100%',
              height: Dimensions.get('window').height,
            }}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 20,
                paddingHorizontal: 20,
              }}>
              {todoList.map((item) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTask(item);
                    setModalVisible(true);
                    getEvent();
                  }}
                  key={item.key}
                  style={styles.taskListContent}>
                  <SectionContent
                    style={{
                      marginLeft: 13,
                      backgroundColor: 'transparent',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                      }}>
                      <View
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor: item.color,
                          marginRight: 8,
                        }}
                      />
                      <Text
                        size='lg'
                        style={{
                          color: '#554A4C',
                          fontWeight: '700',
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 0,
                          backgroundColor: themeColor.primary300,
                        }}>
                        <Text
                          style={{
                            color: themeColor.black,
                            fontSize: 14,
                            marginRight: 5,
                          }}>{`${moment(item.alarm.time).format(
                          'YYYY'
                        )}/${moment(item.alarm.time).format('MM')}/${moment(
                          item.alarm.time
                        ).format('DD')}`}</Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: themeColor.black,
                          }}>
                          {item.notes}
                        </Text>
                      </View>
                    </View>
                  </SectionContent>
                  <View
                    style={{
                      height: 80,
                      width: 5,
                      backgroundColor: item.color,
                      borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Section>
        </Section>
      </Layout>
    </>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  viewTask: {
    position: 'absolute',
    bottom: 250,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: themeColor.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: themeColor.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  taskContainer: {
    height: 475,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: themeColor.primary,
    backgroundColor: themeColor.white,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  title: {
    height: 25,
    borderColor: themeColor.success,
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
    color: themeColor.success,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: themeColor.gray,
    alignSelf: 'center',
    marginVertical: 20,
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: themeColor.gray,
    alignSelf: 'center',
    marginVertical: 20,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: '#2E66E7',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
  },
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#2E66E7',
    backgroundColor: themeColor.primary300,
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function handleDeletePreviousDayTask(todo: any) {
  throw new Error('Function not implemented.');
}

function updateCurrentTask(selectedDate: string) {
  throw new Error('Function not implemented.');
}

function createNewCalendar() {
  throw new Error('Function not implemented.');
}

function updatedList(updatedList: any): string {
  throw new Error('Function not implemented.');
}
