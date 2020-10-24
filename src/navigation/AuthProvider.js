import React, {createContext, useState} from 'react';

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
              // TODO
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
