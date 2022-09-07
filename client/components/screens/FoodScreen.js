import * as React from 'react';
import styles from './FoodScreenStyles';
import {Text, View, Pressable} from 'react-native';
import SpinningBtn from '../SpinningBtn/SpinningBtn';
import LinearGradient from 'react-native-linear-gradient';
import RandomRestaurant from '../randomRestaurant/RandomRestaurant';

const FoodScreen = ({navigation}) => {
  const handleClick = () => {};

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 1)', 'rgb(50, 0, 0)']}
        style={styles.linearGradient}>
        <SpinningBtn />
      </LinearGradient>
    </View>
  );
};

export default FoodScreen;
