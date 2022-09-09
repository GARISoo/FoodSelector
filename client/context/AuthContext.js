import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, user: action.payload};
    case 'LOGOUT':
      return {user: null};
    default:
      return state;
  }
};

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    let user;

    async () => {
      user = await JSON.parse(AsyncStorage.getItem('user'));
    };

    if (user) {
      dispatch({type: 'LOGIN', payload: user});
    }
  }, []);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
