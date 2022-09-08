import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import styles from './SelectionScreenStyles';
import requireImg from './../../../functions/requireImg';

const SelectionScreen = ({navigation}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [userRestaurants, setUserRestaurants] = useState([]);

  const handleCheckboxPress = () => {};

  const toggleRestaurantSelection = async restaurantId => {
    try {
      const response = await fetch(
        'http://192.168.200.138:5000/api/restaurant/toggle',
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({restaurantId}),
        },
      );

      const json = await response.json();
      const {status} = json;

      if (status === 'success') {
        getAllRestaurants();
        getUsersRestaurants();
      }
    } catch (err) {
      console.log('Something went horribly wrong!');
    }
  };

  const getAllRestaurants = async () => {
    try {
      const response = await fetch(
        'http://192.168.200.138:5000/api/restaurant/',
      );
      const json = await response.json();
      const {data, status, message} = json;

      if (status === 'success') {
        setRestaurants(data);
      }
      if (status === 'error') {
        console.log(message);
      }
    } catch (err) {
      console.log('Something went horribly wrong!');
    }
  };

  const getUsersRestaurants = async () => {
    try {
      const response = await fetch(
        'http://192.168.200.138:5000/api/restaurant/user',
      );
      const json = await response.json();
      const {data, status, message} = json;

      if (status === 'success') {
        setUserRestaurants(data);
      }
      if (status === 'error') {
        console.log(message);
      }
    } catch (err) {
      console.log('Something went horribly wrong!');
    }
  };

  useEffect(() => {
    getAllRestaurants();
    getUsersRestaurants();
  }, []);

  return (
    <LinearGradient
      colors={['rgba(0, 0, 0, 1)', 'rgb(50, 0, 0)']}
      style={styles.linearGradient}>
      <LinearGradient
        style={styles.topContainer}
        colors={['rgba(0, 0, 0, 1)', 'rgb(50, 0, 0)']}>
        <Text style={styles.topText}>RESTAURANT SELECTION</Text>
      </LinearGradient>
      <ScrollView style={styles.bottomContainer}>
        {restaurants &&
          restaurants.map(({name, img, category, _id}) => (
            <View style={styles.box}>
              <View style={styles.left}>
                <Image
                  source={requireImg(img)}
                  height={50}
                  width={50}
                  resizeMode="contain"
                  style={styles.img}
                />
              </View>
              <View style={styles.middle}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.categoryWrapper}>
                  {category.map(text => (
                    <Text style={styles.category}>{text}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.right}>
                <Pressable
                  onPress={() => toggleRestaurantSelection(_id)}
                  style={styles.checkbox}>
                  <AnimatedCheckbox
                    checked={userRestaurants.some(el => el === _id)}
                    highlightColor="#4444ff"
                    checkmarkColor="#ffffff"
                    boxOutlineColor="#4444ff"
                  />
                </Pressable>
              </View>
            </View>
          ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default SelectionScreen;
