import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, user: action.payload};
    case 'LOGOUT':
      return {user: null};
    case 'GUEST_TOGGLE':
      return {...state, guest: action.payload};
    default:
      return state;
  }
};

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    guest: false,
  });
  console.log(children);

  useEffect(() => {
    let user;
    let guest;

    async () => {
      user = await JSON.parse(AsyncStorage.getItem('user'));
      guest = await JSON.parse(AsyncStorage.getItem('guest'));
    };

    if (user) {
      dispatch({type: 'LOGIN', payload: user});
    }

    if (guest) {
      dispatch({type: 'GUEST_TOGGLE', payload: true});
    }
  }, []);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
