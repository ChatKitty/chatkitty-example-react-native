import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CreateChannelScreen from '../screens/CreateChannelScreen';
import { IconButton } from 'react-native-paper';
import ChannelScreen from '../screens/ChannelScreen';
import BrowseChannelsScreen from '../screens/BrowseChannelsScreen';
import { kitty } from '../chatkitty';
import { withInAppNotification } from '@chatkitty/react-native-in-app-notification';

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack() {
  return (
      <ModalStack.Navigator mode="modal" headerMode="none">
        <ModalStack.Screen
            name="ChatApp"
            component={withInAppNotification(ChatComponent)}
        />
        <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen} />
      </ModalStack.Navigator>
  );
}

function ChatComponent({ navigation, showNotification }) {
  useEffect(() => {
    return kitty.onNotificationReceived((notification) => {
      showNotification({
        title: notification.title,
        message: notification.body,
        onPress: () => {
          switch (notification.data.type) {
            case 'USER:SENT:MESSAGE':
            case 'SYSTEM:SENT:MESSAGE':
              kitty.getChannel(notification.data.channelId).then((result) => {
                navigation.navigate('Channel', { channel: result.channel });
              });
              break;
          }
        },
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
                      color="#ffffff"
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
                      color="#ffffff"
                      onPress={() => navigation.navigate('CreateChannel')}
                  />
              ),
            })}
        />
        <ChatStack.Screen
            name="Channel"
            component={ChannelScreen}
            options={({ route }) => ({
              title: route.params.channel.name,
            })}
        />
      </ChatStack.Navigator>
  );
}
