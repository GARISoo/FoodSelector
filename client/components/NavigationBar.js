import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDrumstickBite,
  faBookSkull,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

// Screens
import FoodScreen from './screens/FoodScreen/FoodScreen';
import SelectionScreen from './screens/SelectionScreen/SelectionScreen';
import LogoutScreen from './screens/LogoutScreen/LogoutScreen';

// Screen names
const eatName = 'EAT';
const selectionName = 'SELECTION';
const logoutName = 'LOGOUT';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={eatName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName = 20;
            let size = 20;
            let color = 20;

            if (route.name === eatName) {
              iconName = faDrumstickBite;
              focused ? (size = 25) : (size = 20);
            } else if (route.name === selectionName) {
              iconName = faBookSkull;
              focused ? (size = 25) : (size = 20);
            } else if (route.name === logoutName) {
              iconName = faRightFromBracket;
            }

            focused ? (color = 'white') : (color = 'rgba(255, 255, 255, 0.7)');

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
            borderTopWidth: 0,
            position: 'absolute',
            bottom: 0,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
          },
          unmountOnBlur: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name={eatName} component={FoodScreen} />
        <Tab.Screen name={selectionName} component={SelectionScreen} />
        <Tab.Screen name={logoutName} component={LogoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBar;
