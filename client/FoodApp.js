import React, {useEffect} from 'react';
import NavigationBar from './components/NavigationBar';
import LoginScreen from './components/screens/LoginScreen/LoginScreen';
import {useAuthContext} from './hooks/useAuthContext';
import BASE_URI from './proxy';

const FoodApp = () => {
  const {user, dispatch} = useAuthContext();

  useEffect(() => {
    fetch(`${BASE_URI}/user/is-authorized`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
      .then(response => response.json())
      .then(({status, error, data}) => {
        if (status === 'success') {
          console.log(data);
          dispatch({type: 'LOGIN', payload: data});
        } else {
          dispatch({type: 'LOGOUT'});
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch]);

  return !user ? <LoginScreen /> : <NavigationBar />;
};

export default FoodApp;
