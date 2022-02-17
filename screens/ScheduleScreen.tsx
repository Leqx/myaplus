import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CalendarStrip from 'react-native-calendar-strip';
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

import moment from 'moment';

import { RootTabScreenProps } from '../types';
import {
  useScheduleStore,
  useTodoStore,
} from '../store/schedule/scheduleStore';
import ListItem from '../components/listItem/ListItem';
import { TODOS, ITodo } from '../store/schedule/todo';

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

const TITLES = [
  'Accounting 🎥',
  'Math 👍🏼 ',
  'Economics',
  'Physics 🚀',
  'Statistics ⭐️',
];

interface TaskInterface {
  title: string;
  index: number;
}

const BACKGROUND_COLOR = '#FAFBFF';
const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const ScheduleScreen = ({ navigation }: RootTabScreenProps<'Schedule'>) => {
  ///// Todo ////

  // const [todos, setTodos] = useState(TODOS);
  const todos = useScheduleStore((state) => state.todos);
  const addTodo = useScheduleStore((state) => state.addTodo);
  const removeTodo = useScheduleStore((state) => state.removeTodo);
  const updateTodo = useScheduleStore((state) => state.updateTodo);

  const { state, actions } = useTodoStore();
  ///// End ////

  ///// CalendarStrip ////
  const [markedDate, setMarkedDate] = useState([]);
  const [currentDate, setCurrentDate] = useState<Date>(moment().toDate());
  ///// End ////

  ///// Tasks ////
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback((todos: ITodo) => {
    // setTodos((todo) => todo.filter((item) => item.id !== todos.id));
    removeTodo(todos.id);
  }, []);

  const scrollRef = useRef(null);
  ///// End ////

  return (
    <>
      <Layout>
        {/* <Text style={styles.title}>Schedule Tasks</Text> */}
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
            console.log('date selected');
          }}
        />

        <Section
          style={{
            width: '100%',
            height: Dimensions.get('window').height,
          }}>
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1, height: '100%', paddingVertical: 10 }}>
            {state.todos
              .filter((todo) => todo.isScheduled == true)
              .map((todo) => (
                <ListItem
                  simultaneousHandlers={scrollRef}
                  key={todo.id}
                  todos={todo}
                  onDismiss={onDismiss}
                />
              ))}
          </ScrollView>
        </Section>

        <TouchableOpacity
          onPress={() => navigation.navigate('CreateSchedule')}
          style={styles.viewTask}>
          <Image
            source={require('../assets/images/plus.png')}
            style={{
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
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
    bottom: 20,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: themeColor.gray,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: themeColor.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  title: {
    fontSize: 30,
    marginVertical: 5,
    paddingLeft: '5%',
  },
});
