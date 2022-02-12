import React, { useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ITodo } from '../../store/schedule/todo';

import {
  Layout,
  Button,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from 'react-native-rapi-ui';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';

interface TaskInterface {
  title: string;
  index: number;
}

interface ListItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  todos: ITodo;
  onDismiss?: (todo: ITodo) => void;
}

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem: React.FC<ListItemProps> = ({
  todos,
  onDismiss,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(todos);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
        <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
          <Ionicons
            name={'trash-outline'}
            size={LIST_ITEM_HEIGHT * 0.4}
            color={'red'}
          />
        </Animated.View>
        <PanGestureHandler
          simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={panGesture}>
          <Animated.View style={[styles.task, rStyle]}>
            <TouchableOpacity onPress={() => onOpen()}>
              <MaterialCommunityIcons
                name='dots-vertical'
                size={24}
                color='white'
              />
            </TouchableOpacity>
            <Text style={styles.taskTitle}>{todos.title}</Text>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>

      <Modalize
        ref={modalizeRef}
        modalHeight={80}
        modalStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: themeColor.white,
          paddingVertical: 1,
        }}>
        <Text style={{ textAlign: 'center', paddingVertical: 5 }}>
          {todos.title} today @ 4.00p.m
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{ marginHorizontal: 4 }}>
            <Button
              text='Update'
              onPress={() => console.log('Update')}
              rightContent={
                <MaterialCommunityIcons
                  name='update'
                  size={20}
                  color={themeColor.primary}
                />
              }
              outline
            />
          </View>
          <View style={{ marginHorizontal: 4 }}>
            <Button
              text={`Study ${todos.title}`}
              onPress={() => console.log('navigate to unit')}
              rightContent={
                <Ionicons
                  name='arrow-forward'
                  size={20}
                  color={themeColor.white}
                />
              }
              status='primary'
              type='TouchableOpacity'
            />
          </View>
        </View>
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#3366FF',
  },
  task: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: '#3366FF',
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
    color: 'white',
    paddingLeft: '4%',
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
