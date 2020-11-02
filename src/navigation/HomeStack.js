import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CreateChannelScreen from '../screens/CreateChannelScreen';
import { IconButton } from 'react-native-paper';
import ChannelScreen from '../screens/ChannelScreen';

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack() {
  return (
      <ModalStack.Navigator mode="modal" headerMode="none">
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
              title: route.params.channel.name
            })}
        />
      </ChatStack.Navigator>
  );
}
