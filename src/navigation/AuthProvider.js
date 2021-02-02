import React, { createContext, useState } from 'react';

import { kitty } from '../chatkitty';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        login: async (email, displayName) => {
          setLoading(true);

          const result = await kitty.startSession({
            username: email,
            authParams: {
              displayName: displayName,
            },
          });

          setLoading(false);

          if (result.failed) {
            console.log('Could not login');
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
