import { createContext, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { chatkitty } from '../chatkitty';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

    responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

    return () => {
      Notifications.removeNotificationSubscription(
          notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
      <NotificationContext.Provider
          value={{
            notification,
            sendNotification: async (content) => {
              await Notifications.scheduleNotificationAsync({
                content,
                trigger: null
              });
            },
            registerForPushNotifications: async () => {
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
                token = (await Notifications.getExpoPushTokenAsync()).data;
                console.log(token);
              } else {
                alert('Must use physical device for Push Notifications');
              }

              if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                  name: 'default',
                  importance: Notifications.AndroidImportance.MAX,
                  vibrationPattern: [0, 250, 250, 250],
                  lightColor: '#FF231F7C'
                });
              }

              await chatkitty.updateCurrentUser((user) => {
                user.properties = {
                  ...user.properties,
                  'expo-push-token': token
                };
                return user;
              });
            }
          }}
      >
        {children}
      </NotificationContext.Provider>
  );
};
