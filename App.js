import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoadingScreen from './src/LoadingScreen';
import RegisterScreen from './src/RegisterScreen';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';

const SwitchNavigator = createSwitchNavigator(
  {
    LoadingRoute: LoadingScreen,
    RegisterRoute: RegisterScreen,
    LoginRoute: LoginScreen,
    HomeRoute: HomeScreen
  },
  {
    initialRouteName: 'LoadingRoute',
    headerMode: 'none'
  }
)

const App = createAppContainer(SwitchNavigator);
export default App