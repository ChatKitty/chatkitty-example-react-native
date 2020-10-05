import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {firebase} from '../firebase/config';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {AuthContext} from './AuthProvider';
import Loading from '../components/Loading';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
      <NavigationContainer>
        {user ? <HomeStack/> : <AuthStack/>}
      </NavigationContainer>
  );
}
