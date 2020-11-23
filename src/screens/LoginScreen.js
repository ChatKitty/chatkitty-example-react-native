import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import Loading from "../components/Loading";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

  const {login, loading} = useContext(AuthContext);

  if (loading) {
    return <Loading/>;
  }

  return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Welcome!</Title>
        <FormInput
            labelName='Display Name'
            value={displayName}
            autoCapitalize='none'
            onChangeText={userDisplayName => setDisplayName(userDisplayName)}
        />
        <FormInput
            labelName='Email'
            value={email}
            autoCapitalize='none'
            onChangeText={userEmail => setEmail(userEmail)}
        />
        <FormButton
            title='Login'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => login(email, displayName)}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 16
  }
});
