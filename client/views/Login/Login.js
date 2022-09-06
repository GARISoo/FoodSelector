import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Keyboard,
  ImageBackground,
} from 'react-native';
import styles from './LoginStyles';
import Svg, {Image} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from './../../hooks/useAuthContext';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const {height, width} = Dimensions.get('screen');
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const {dispatch} = useAuthContext();
  const [error, setError] = useState('');

  const resetInputFields = () => {
    setEmail('');
    setName('');
    setPassword('');
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height, 0],
    );

    return {
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);

    return {
      opacity: withTiming(imagePosition.value, {duration: 500}),
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [0, 360]);

    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 800}),
      transform: [
        {rotate: withTiming(interpolation + 'deg', {duration: 1000})},
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, {duration: 800}))
          : withTiming(0, {duration: 300}),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}],
    };
  });

  const handleBack = () => {
    Keyboard.dismiss();
    imagePosition.value = 1;
    setError('');
  };

  const loginHandler = () => {
    imagePosition.value = 0;
    resetInputFields();

    if (isRegistering) {
      setIsRegistering(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    resetInputFields();

    if (!isRegistering) {
      setIsRegistering(true);
    }
  };

  const handleRegister = async () => {
    setError('');
    console.log(name, password, email);

    try {
      const response = await fetch(
        'http://192.168.200.138:5000/api/user/signup',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, fullName: name, password}),
        },
      );
      const json = await response.json();
      const {status, message} = json;

      if (status === 'success') {
        handleBack();
      } else if (status === 'error') {
        setError(message);
      }
    } catch (err) {
      setError('Something went horribly wrong!');
    }
  };

  const handleLogin = async () => {
    setError('');

    try {
      const response = await fetch(
        'http://192.168.200.138:5000/api/auth/login',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({email, password}),
        },
      );

      const json = await response.json();
      const {status, data, message} = json;

      if (status === 'success') {
        const {userId} = data;

        // save the user to async storage
        await AsyncStorage.setItem('user', JSON.stringify({userId}));

        dispatch({type: 'LOGIN', payload: data});
      } else if (status === 'error') {
        setError(message);
      }
    } catch (err) {
      setError('Something went horribly wrong!');
    }
  };

  const handleButton = () => {
    isRegistering ? handleRegister() : handleLogin();
  };

  return (
    <ImageBackground
      source={require('../../assets/login-bricks.jpg')}
      style={styles.image}
      resizeMode="cover">
      <Animated.View style={styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <Svg height={height} width={width}>
            <Image
              href={require('../../assets/login-background.jpg')}
              width={width}
              height={height}
              preserveAspectRatio="xMidYMid slice"
            />
          </Svg>
          <Animated.View
            style={[styles.closeBtnContainer, closeButtonContainerStyle]}>
            <Pressable style={styles.backButton} onPress={handleBack}>
              <Text style={styles.buttonText}>BACK</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
        <View style={styles.bottomContainer}>
          <Animated.View style={buttonsAnimatedStyle}>
            <Pressable style={styles.button} onPress={loginHandler}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </Pressable>
          </Animated.View>
          <Animated.View style={buttonsAnimatedStyle}>
            <Pressable style={styles.button} onPress={registerHandler}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </Pressable>
          </Animated.View>
          <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="black"
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
              value={email}
            />
            {isRegistering && (
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="black"
                style={styles.textInput}
                onChangeText={text => setName(text)}
                value={name}
              />
            )}
            <TextInput
              placeholder="Password"
              placeholderTextColor="black"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
              <Pressable
                onPress={() =>
                  (formButtonScale.value = withSequence(
                    withSpring(1.2),
                    withSpring(1),
                  ))
                }>
                <Text style={styles.buttonText} onPress={handleButton}>
                  {isRegistering ? 'REGISTER' : 'LOG IN'}
                </Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default Login;
