import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/formButton';
import { AuthContext } from '../navigation/authProvider';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
      <View style={styles.container}>
        <Title>ChatKitty Example</Title>
        <FormButton 
          modeValue="contained" 
          title="Logout" 
          onPress={() => logout()}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});