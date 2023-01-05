import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import chatkitty from "../chatkitty";

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
        login: async (email, password) => {
          setLoading(true);
          signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
              // Signed in 
              const currentUser = userCredential.user;
              const result = await chatkitty.startSession({
                username: currentUser.uid,
                authParams: {
                  idToken: await currentUser.getIdToken()
                }
              });
              if (result.failed) {
                console.log('could not login')
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error);
            });
          setLoading(false);
        },

        register: (displayName, email, password) => {
          setLoading(true);
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const currentUser = userCredential.user;
              updateProfile(auth.currentUser, {
                displayName: displayName
              }).then(async () => {
                const result = await chatkitty.startSession({
                  username: currentUser.uid,
                  authParams: {
                    idToken: await currentUser.getIdToken()
                  }
                });
                if (result.failed) {
                  console.log('Could not sign up');
                }
              })
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error(error);
            });
          setLoading(false)
        },
        logout: async () => {
          try {
            await chatkitty.endSession();
          } catch (error) {
            console.error(error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};