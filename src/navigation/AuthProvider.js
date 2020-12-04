import React, { createContext, useState } from 'react';

import { kitty } from '../chatkitty';
import { firebase } from '../firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          let result = await kitty.startSession({
            username: email,
            authParams: {
              password: password,
            },
          });

          if (result.failed) {
            console.log('Could not login');
          }
        },
        register: async (displayName, email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((credential) => {
                credential.user
                  .updateProfile({ displayName: displayName })
                  .then(async () => {
                    let result = await kitty.startSession({
                      username: email,
                      authParams: {
                        password: password,
                      },
                    });

                    if (result.failed) {
                      console.log('Could not login');
                    }
                  });
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await kitty.endSession();
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
