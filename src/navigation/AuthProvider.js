import React, {createContext, useState} from 'react';
import {firebase} from '../firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
      <AuthContext.Provider
          value={{
            user,
            setUser,
            login: async (email, password) => {
              // TODO
            },
            register: async (displayName, email, password) => {
              try {
                await firebase.auth().createUserWithEmailAndPassword(email,
                    password)
                .then(credential => {
                  credential.user.updateProfile({displayName: displayName})
                  .then(async () => {
                    // TODO start a user chat session and log the user in
                  })
                });
              } catch (e) {
                console.log(e);
              }
            },
            logout: async () => {
              // TODO
            }
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};
