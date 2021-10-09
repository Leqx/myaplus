import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Actionsheet, useDisclose, NativeBaseProvider, Modal } from "native-base"

import { Text, View } from '../components/Themed';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { paddingLeft } from 'styled-system';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const ScheduleScreen = () => {

  const { isOpen, onOpen, onClose } = useDisclose()

  const [items, setItems] = React.useState(

    {
      '2021-09-22': [{ name: 'item 1 - any js object' }],
      '2021-09-23': [{ name: 'item 2 - any js object', height: 80 }],
      '2021-09-24': [],
      '2021-09-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
    }
  )

  const [markedDates, setMarkedDates] = React.useState(

    {
      '2021-09-16': { selected: true, marked: true },
      '2021-09-17': { marked: true },
      '2021-09-18': { disabled: true }
    }

  )

  /*  
  
  const loadItems = (day: any) => {

    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < numItems; j++) {
          items[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150))
          });
        }
      }
    }

    const newItems = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
    setItems({
      items: newItems
    });

  }

    */

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => console.log(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <TouchableOpacity style={styles.emptyDateWrapper} onPress={() => alert('Schedule Unit')} >
          <MaterialCommunityIcons name="plus-box-multiple-outline" size={24} color="black" />
          <Text style={styles.emptyDateText}>Schedule Study Sessions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const rowHasChanged = (r1: any, r2: any) => {
    return r1.name !== r2.name;
  }

  const timeToString = (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Agenda
          items={items}
          renderItem={renderItem}
          rowHasChanged={rowHasChanged}
          renderEmptyData={renderEmptyDate}
          selected={'2021-09-16'}
          showClosingKnob={true}
          pastScrollRange={24}
          style={styles.agenda}
          refreshControl={null}
          refreshing={false}
          markedDates={markedDates}

        />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
  agenda: {

  }
});
