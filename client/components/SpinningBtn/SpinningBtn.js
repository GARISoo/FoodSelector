/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import RandomRestaurant from '../randomRestaurant/RandomRestaurant';
import {useState} from 'react';
import requireImg from './requireImg';

const SpinningBtn = () => {
  const [activeRestaurant, setActiveRestaurant] = useState(null);
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

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      500,
    );
    return () => cancelAnimation(rotation);
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
      withSpring(1.5),
      withSpring(0.5),
      withSpring(1),
    );
  };

  const animateButton = async () => {
    imgOpacity.value = 0;
    await getRestaurant();
    await buttonScaling();
    imgOpacity.value = withTiming(1, {
      duration: 4000,
      easing: Easing.linear,
    });
  };

  const getRestaurant = async () => {
    try {
      const response = await fetch(
        'http://192.168.200.138:5000/api/restaurant/random',
      );
      const json = await response.json();
      const {data, status, message} = json;

      if (status === 'success') {
        setActiveRestaurant(data);
      }
      if (status === 'error') {
        console.log(message);
      }
    } catch (err) {
      console.log('Something went horribly wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, spinnerAnimatedStyle]}>
        <Animated.View style={[styles.spinner, animatedStyles]} />
        <Pressable style={styles.button} onPress={animateButton}>
          <LinearGradient
            colors={['rgb(102, 0, 0)', 'rgb(102, 0, 0)', 'rgb(102, 0, 0)']}
            style={styles.linearGradient}>
            <Text style={styles.text}>FOOD ME</Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
      {activeRestaurant ? (
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
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  spinner: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderTopColor: '#F0C400',
    borderRightColor: '#444',
    borderBottomColor: '#F0C400',
    borderLeftColor: '#444',
    textAlign: 'center',
    position: 'absolute',
    top: '30%',
    marginLeft: -52,
    left: 0,
  },
  button: {
    position: 'absolute',
    top: '30%',
    left: 0,
    height: 96,
    width: 96,
    borderRadius: 100,
    marginTop: 2,
    marginLeft: -50,
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F0C400',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.75,
    shadowRadius: 30,
    elevation: 50,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  text: {
    color: 'rgba(255,255,255, 0.8)',
    fontWeight: '700',
  },
  img: {
    borderRadius: 20,
    maxWidth: 300,
    height: 200,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'rgba(246, 190, 0, 1)',
  },
  imgTextBox: {
    padding: 10,
    borderColor: 'red',
    borderRadius: 10,
    marginTop: 10,
  },
  imgText: {
    color: 'white',
    fontWeight: '700',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default SpinningBtn;
