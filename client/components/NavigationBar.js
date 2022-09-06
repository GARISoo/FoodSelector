import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDrumstickBite, faBookSkull} from '@fortawesome/free-solid-svg-icons';
import styles from './NavigationBarStyles';

// Screens
import FoodScreen from './screens/FoodScreen';
import SelectionScreen from './screens/SelectionScreen';

//Screen names
const eatName = 'EAT';
const selectionName = 'SELECTION';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={eatName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            let size;
            let color;

            if (route.name === eatName) {
              iconName = faDrumstickBite;
              focused ? (size = 25) : (size = 20);
            } else if (route.name === selectionName) {
              iconName = faBookSkull;
              focused ? (size = 25) : (size = 20);
            }

            focused ? (color = 'white') : (color = 'rgb(255, 255, 255, 0.7)');

            return (
              <FontAwesomeIcon icon={iconName} color={color} size={size} />
            );
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'rgb(102, 0, 0)',
            height: 50,
            padding: 5,
          },
          tabBarItemStyle: {
            marginBottom: 5,
          },
          unmountOnBlur: false,
          headerShown: false,
        })}>
        <Tab.Screen name={eatName} component={FoodScreen} />
        <Tab.Screen name={selectionName} component={SelectionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBar;
