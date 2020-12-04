import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';

import { kitty } from '../chatkitty';
import Loading from '../components/Loading';

import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    return kitty.onCurrentUserChanged((currentUser) => {
      setUser(currentUser);

      if (initializing) {
        setInitializing(false);
      }

      setLoading(false);
    });
  }, [initializing, setUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
