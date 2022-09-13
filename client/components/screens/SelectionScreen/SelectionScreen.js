/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import styles from './SelectionScreenStyles';
import requireImg from './../../../functions/requireImg';
import RestaurantForm from './RestaurantForm';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {useAuthContext} from '../../../hooks/useAuthContext';
import BASE_URI from './../../../proxy';

const SelectionScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const addBtnScale = useSharedValue(1);
  const {user} = useAuthContext();
  console.log(user);
  const isGuest = 'Guest' in user.roles;

  const buttonScaling = async () => {
    addBtnScale.value = withSequence(withSpring(1.1), withSpring(1));
  };

  const submitAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: addBtnScale.value}],
    };
  });

  const restaurantAlreadyChecked = id => userRestaurants.includes(id);

  const handleCheckboxPress = id => {
    if (!restaurantAlreadyChecked(id)) {
      setUserRestaurants([...userRestaurants, id]);
    } else {
      setUserRestaurants(userRestaurants.filter(el => el.toString() !== id));
    }
  };

  const toggleAllRestaurantsSelection = async () => {
    try {
      const response = await fetch(`${BASE_URI}/restaurant/toggleAll`, {
        method: 'PATCH',
      });
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

  const toggleRestaurantSelection = async restaurantId => {
    handleCheckboxPress(restaurantId);

    try {
      await fetch(`${BASE_URI}/restaurant/toggle`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({restaurantId}),
      });
    } catch (err) {
      console.log('Something went horribly wrong!');
    }
  };

  const getAllRestaurants = async () => {
    try {
      const response = await fetch(`${BASE_URI}/restaurant/`);
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
      const response = await fetch(`${BASE_URI}/restaurant/user`);
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

  const closeForm = () => {
    setFormActive(false);
    getAllRestaurants();
  };

  const openForm = () => {
    buttonScaling();
    setFormActive(true);
  };

  useEffect(() => {
    getAllRestaurants();
    getUsersRestaurants();
  }, []);

  return (
    <LinearGradient
      colors={['rgb(82, 0, 0)', 'rgb(82, 0, 0)']}
      style={styles.linearGradient}>
      {formActive && <RestaurantForm onClose={closeForm} />}
      {formActive && <ScrollView style={styles.blur} />}
      <LinearGradient
        style={styles.topContainer}
        colors={['rgba(0, 0, 0, 1)', 'rgb(50, 0, 0)']}>
        <Text style={styles.topText}>RESTAURANT SELECTION</Text>
      </LinearGradient>
      <ScrollView style={styles.middleContainer}>
        {restaurants &&
          restaurants.map(({name, img, category, _id}) => (
            <Pressable
              style={styles.box}
              key={_id}
              onPress={() => toggleRestaurantSelection(_id)}>
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
                    <Text style={styles.category} key={Math.random() * 158654}>
                      {text}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.right}>
                <Pressable
                  onPress={() => toggleRestaurantSelection(_id)}
                  style={styles.checkbox}>
                  <AnimatedCheckbox
                    checked={restaurantAlreadyChecked(_id)}
                    highlightColor="rgba(246, 190, 0, 0.7)"
                    checkmarkColor="#ffffff"
                    boxOutlineColor="rgba(246, 190, 0, 0.7)"
                  />
                </Pressable>
              </View>
            </Pressable>
          ))}
      </ScrollView>
      <LinearGradient
        style={styles.bottomContainer}
        colors={['rgba(0, 0, 0, 1)', 'rgb(50, 0, 0)']}>
        {!isGuest && (
          <Animated.View style={submitAnimatedStyle}>
            <Pressable style={styles.addBtn} onPress={openForm}>
              <Text style={styles.addText}>ADD NEW</Text>
            </Pressable>
          </Animated.View>
        )}
        <View style={styles.bottomRight}>
          <Pressable
            style={styles.allCheckbox}
            onPress={() => toggleAllRestaurantsSelection()}>
            <AnimatedCheckbox
              checked={userRestaurants.length}
              highlightColor="rgba(246, 190, 0, 0.8)"
              checkmarkColor="#ffffff"
              boxOutlineColor="rgba(246, 190, 0, 0.8)"
            />
          </Pressable>
          <Text style={styles.selectedText}>
            {`Selected: ${userRestaurants.length}`}
          </Text>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

export default SelectionScreen;
