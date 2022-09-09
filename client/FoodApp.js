import React from 'react';
import NavigationBar from './components/NavigationBar';
import LoginScreen from './components/screens/LoginScreen/LoginScreen';
import {useAuthContext} from './hooks/useAuthContext';

const FoodApp = () => {
  const {user} = useAuthContext();

  return !user ? <LoginScreen /> : <NavigationBar />;
};

export default FoodApp;
