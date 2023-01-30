import { createStackNavigator } from '@react-navigation/stack';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import React, { useState, useEffect, useRef } from 'react';
import { IconButton } from 'react-native-paper';

import chatkitty from '../chatkitty';
import BrowseChannelsScreen from '../screens/browseChannelsScreen';
import ChatScreen from '../screens/chatScreen';
import CreateChannelScreen from '../screens/createChannelScreen';
import HomeScreen from '../screens/homeScreen';

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(message) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export default function HomeStack() {
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      chatkitty.updateCurrentUser((user) => {
        user.properties = {
          ...user.properties,
          'expo-push-token': token,
        };
        return user;
      });
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ModalStack.Navigator screenOptions={{
      headerShown: false,
      presentation: "modal"
    }}>
      <ModalStack.Screen name="ChatApp" component={ChatComponent} />
      <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen} />
    </ModalStack.Navigator>
  );
}

function ChatComponent( { navigation }) {
  useEffect(() => {
    return chatkitty.onNotificationReceived((notification) => {
      const user = chatkitty.currentUser;
      const token = user.properties["expo-push-token"]

      console.log("hi i am " + token )
     
      sendPushNotification({
        to: token, 
        sound: 'default', 
        title: notification.title,
        body: notification.body,
        data: notification.data,
      });
    });
  }, []);

  return (
    <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5b3a70',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}
    >
      <ChatStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="plus"
              size={28}
              iconColor="#ffffff"
              onPress={() => navigation.navigate('BrowseChannels')}
            />
          ),
        })}
      />
      <ChatStack.Screen
        name="BrowseChannels"
        component={BrowseChannelsScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="plus"
              size={28}
              iconColor="#ffffff"
              onPress={() => navigation.navigate('CreateChannel')}
            />
          ),
        })}
      />

      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.channel.name,
        })}
      />
    </ChatStack.Navigator>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      experienceId: '@nushk98/chatkitty-react-native-example',
    })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}