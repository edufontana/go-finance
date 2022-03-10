import React, {createContext, ReactNode, useContext} from 'react';

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  const user = {
    id: '1',
    name: 'roftig',
    email: 'edufonta@',
  };

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );

  async function signInWithGoogle() {
    try {
      const CLIENT_ID =
        '336945861358-jq3s80e0dadma018lbqrhrc5oosq5gir.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@edufontana/goFinance';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&responde_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({authUrl});

      console.log(response);
    } catch (e) {
      throw new Error(e);
    }
  }
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export {AuthProvider, useAuth};
