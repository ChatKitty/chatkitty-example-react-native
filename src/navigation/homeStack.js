import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton } from 'react-native-paper';

import BrowseChannelsScreen from '../screens/browseChannelsScreen';
import ChatScreen from '../screens/chatScreen';
import CreateChannelScreen from '../screens/createChannelScreen';
import HomeScreen from '../screens/homeScreen';

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack() {
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

function ChatComponent() {
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