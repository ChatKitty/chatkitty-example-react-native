import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { IconButton } from 'react-native-paper';

import { chatkitty, channelDisplayName } from '../chatkitty';

import { NotificationContext } from './notificationProvider';

import BrowseChannelsScreen from '../screens/browseChannelsScreen';
import ChatScreen from '../screens/chatScreen';
import CreateChannelScreen from '../screens/createChannelScreen';
import HomeScreen from '../screens/homeScreen';

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack() {
  const { registerForPushNotifications, sendNotification } = useContext(NotificationContext);

  useEffect(() => {
    registerForPushNotifications();

    chatkitty.onNotificationReceived(async (notification) => {
      await sendNotification({
        title: notification.title,
        body: notification.body
      });
    });
  }, []);

  return (
      <ModalStack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
        <ModalStack.Screen name='ChatApp' component={ChatComponent} />
        <ModalStack.Screen name='CreateChannel' component={CreateChannelScreen} />
      </ModalStack.Navigator>
  );
}

function ChatComponent() {
  return (
      <ChatStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#5b3a70'
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 22
            }
          }}
      >
        <ChatStack.Screen
            name='Home'
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                  <IconButton
                      icon='plus'
                      size={28}
                      iconColor='#ffffff'
                      onPress={() => navigation.navigate('BrowseChannels')}
                  />
              )
            })}
        />
        <ChatStack.Screen
            name='BrowseChannels'
            component={BrowseChannelsScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                  <IconButton
                      icon='plus'
                      size={28}
                      iconColor='#ffffff'
                      onPress={() => navigation.navigate('CreateChannel')}
                  />
              )
            })}
        />
        <ChatStack.Screen
            name='Chat'
            component={ChatScreen}
            options={({ route }) => ({
              title: channelDisplayName(route.params.channel)
            })}
        />
      </ChatStack.Navigator>
  );
}
