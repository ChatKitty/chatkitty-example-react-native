import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/formButton.js';
import FormInput from '../components/formInput.js';
import Loading from '../components/loading.js';
import { AuthContext } from '../context/authProvider.js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Welcome!</Title>
        <FormInput
            labelName='Email'
            value={email}
            autoCapitalize='none'
            onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <FormInput
            labelName='Password'
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
        />
        <FormButton
            title='Login'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
              login(email, password);
            }}
        />
        <FormButton
            title='Sign up here'
            modeValue='text'
            uppercase={false}
            labelStyle={styles.navButtonText}
            onPress={() => navigation.navigate('Signup')}
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
