import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AuthProvider } from './authProvider';
import { NotificationProvider } from './notificationProvider';
import Routes from './routes';

export default function Providers() {
  return (
      <PaperProvider theme={theme}>
        <AuthProvider>
          <NotificationProvider>
            <Routes />
          </NotificationProvider>
        </AuthProvider>
      </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b3a70',
    accent: '#50c878',
    background: '#f7f9fb'
  }
};
