import React, {createContext, useState} from 'react';
import {kitty} from '../chatkitty';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
      <AuthContext.Provider
          value={{
            user,
            setUser,
            login: async (email, displayName) => {
              let result = await kitty.startSession({
                username: email,
                authParams: {
                  displayName: displayName
                }
              });

              if (result.failed) {
                console.log('Could not login')
              }
            },
            logout: async () => {
              try {
                await kitty.endSession();
              } catch (e) {
                console.error(e);
              }
            }
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};
