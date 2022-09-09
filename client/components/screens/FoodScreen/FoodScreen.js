/* eslint-disable react-hooks/exhaustive-deps */
import styles from './FoodScreenStyles';
import {Text, View, Pressable, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import requireImg from '../../../functions/requireImg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBurger,
  faThermometer,
  faCow,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import BASE_URI from '../../../proxy';

const FoodScreen = () => {
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [error, setError] = useState('Waiting for your command!');
  const rotation = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const imgOpacity = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  const filterBtns = [
    {
      id: 1,
      text: 'All',
      icon: faStar,
      onPress: () => {
        if (!activeFilters.includes('All')) {
          setActiveFilters(['All', 'Burgers', 'Kebab', 'Karbonades']);
        } else {
          setActiveFilters([]);
        }
      },
    },
    {
      id: 2,
      text: 'Burgers',
      icon: faBurger,
      onPress: () => {
        if (!activeFilters.includes('Burgers')) {
          setActiveFilters([...activeFilters, 'Burgers']);
        } else {
          setActiveFilters(activeFilters.filter(el => el !== 'Burgers'));
        }
      },
    },
    {
      id: 3,
      text: 'Kebab',
      icon: faThermometer,
      onPress: () => {
        if (!activeFilters.includes('Kebab')) {
          setActiveFilters([...activeFilters, 'Kebab']);
        } else {
          setActiveFilters(activeFilters.filter(el => el !== 'Kebab'));
        }
      },
    },
    {
      id: 4,
      text: 'Karbonades',
      icon: faCow,
      onPress: () => {
        if (!activeFilters.includes('Karbonades')) {
          setActiveFilters([...activeFilters, 'Karbonades']);
        } else {
          setActiveFilters(activeFilters.filter(el => el !== 'Karbonades'));
        }
      },
    },
  ];

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      500,
    );
  }, []);

  const spinnerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: buttonScale.value}],
    };
  });

  const imgOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: imgOpacity.value,
    };
  });

  const buttonScaling = async () => {
    buttonScale.value = withSequence(
      withSpring(1.4),
      withSpring(0.7),
      withSpring(1),
    );
  };

  const animateButton = async () => {
    imgOpacity.value = 0;

    await getRestaurant();
    await buttonScaling();

    imgOpacity.value = withTiming(1, {
      duration: 2000,
      easing: Easing.linear,
    });
  };

  const determineIfActive = filter => {
    let opacity = 0.7;

    if (activeFilters.includes(filter)) {
      opacity = 1;
    }

    return opacity;
  };

  const getRestaurant = async () => {
    if (!activeFilters.length) {
      setError('No filters selected');
    } else {
      try {
        const response = await fetch(
          `${BASE_URI}/restaurant/random/${activeFilters}`,
        );
        const json = await response.json();
        const {data, status, message} = json;

        if (status === 'success') {
          setError('');
          setActiveRestaurant(data);
        }
        if (status === 'error') {
          setError(message);
        }
      } catch (err) {
        console.log('Something went horribly wrong!');
      }
    }
  };

  return (
    <LinearGradient
      colors={['rgba(0, 0, 0, 1)', 'rgb(50, 0, 0)']}
      style={styles.linearGradient}>
      <View style={styles.top}>
        <Animated.View style={[styles.topContainer, spinnerAnimatedStyle]}>
          <Animated.View style={[styles.spinner, animatedStyles]} />
          <Pressable style={styles.button} onPress={animateButton}>
            <LinearGradient
              colors={['rgb(102, 0, 0)', 'rgb(60, 0, 0)', 'rgb(102, 0, 0)']}
              style={styles.buttonGradient}>
              <Text style={styles.text}>FOOD ME</Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
        <View style={styles.filterBtnContainer}>
          {filterBtns.map(({id, text, icon, onPress}) => (
            <Pressable
              style={[styles.filterBtn, {opacity: determineIfActive(text)}]}
              key={id}
              onPress={onPress}>
              <FontAwesomeIcon
                icon={icon}
                color="white"
                size="12"
                style={{marginRight: 5}}
              />
              <Text style={styles.filterBtnText}>{text}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      {error && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {activeRestaurant && !error && (
        <Animated.View style={[styles.bottomContainer, imgOpacityStyle]}>
          <Image
            source={requireImg(activeRestaurant?.img)}
            height={200}
            width={300}
            resizeMode="contain"
            style={styles.img}
          />
          <View style={styles.imgTextBox}>
            <Text style={styles.imgText}>{activeRestaurant?.name}</Text>
          </View>
        </Animated.View>
      )}
    </LinearGradient>
  );
};

export default FoodScreen;
