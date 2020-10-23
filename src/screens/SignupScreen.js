import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, IconButton} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function SignupScreen({navigation}) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
      <View style={styles.container}>
        <Title style={styles.titleText}>Let's get started!</Title>
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
        <FormInput
            labelName='Password'
            value={password}
            secureTextEntry={true}
            onChangeText={userPassword => setPassword(userPassword)}
        />
        <FormButton
            title='Signup'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
              // TODO
            }}
        />
        <IconButton
            icon='keyboard-backspace'
            size={30}
            style={styles.navButton}
            color='#5b3a70'
            onPress={() => navigation.goBack()}
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
    fontSize: 18
  },
  navButton: {
    marginTop: 10
  }
});
