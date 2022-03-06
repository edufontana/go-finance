import React from 'react';
import {ThemeProvider} from 'styled-components';
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {StatusBar} from 'react-native';

import {Dashboard} from './src/screens/Dashboard';
import {CategorySelect} from './src/screens/CategorySelect';
import {Register} from './src/screens/Register';
import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';
import {AppRoutes} from './src/routes/app.routes';
import {SingIn} from './src/screens/SingIn';

import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider, useAuth} from './src/hooks/auth';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <AuthProvider>
          <SingIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
