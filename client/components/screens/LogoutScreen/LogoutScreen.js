/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../../../hooks/useAuthContext';
import LinearGradient from 'react-native-linear-gradient';
import styles from './LogoutScreenStyles';
import BASE_URI from './../../../proxy';

const LogoutScreen = () => {
  const {dispatch} = useAuthContext();

  const logout = async () => {
    const response = await fetch(`${BASE_URI}/user/logout`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });

    const {status, message} = await response.json();

    if (status === 'success') {
      await AsyncStorage.removeItem('user');
      dispatch({type: 'LOGOUT'});
    }
    if (status === 'error') {
      console.log(message);
    }
  };

  useEffect(() => {
    logout();
  });

  return (
    <LinearGradient
      colors={['rgba(0, 0, 0, 1)', 'rgb(50, 0, 0)']}
      style={styles.linearGradient}>
      <Text style={styles.logoutText}>Logging out...</Text>
    </LinearGradient>
  );
};

export default LogoutScreen;
