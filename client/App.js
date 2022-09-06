import React from 'react';
import {AuthContextProvider} from './context/AuthContext';
import FoodApp from './FoodApp';

const App = () => {
  return (
    <AuthContextProvider>
      <FoodApp />
    </AuthContextProvider>
  );
};

export default App;
