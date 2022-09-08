import React from 'react';
import Login from './views/Login/Login';
import NavigationBar from './components/NavigationBar';
import {useAuthContext} from './hooks/useAuthContext';

const FoodApp = () => {
  const {user} = useAuthContext();

  return !user ? <Login /> : <NavigationBar />;
};

export default FoodApp;
