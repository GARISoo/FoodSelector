import React, {useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import styles from './SelectionScreenStyles';
import BASE_URI from './../../../proxy';

const RestaurantForm = ({onClose}) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formStatus, setFormStatus] = useState('');
  const [error, setError] = useState('');
  const backBtnScale = useSharedValue(1);
  const submitBtnScale = useSharedValue(1);

  const availableCategories = [
    'Fast food',
    'Burgers',
    'Kebab',
    'Karbonades',
    'Soup',
    'Pasta',
  ];

  const toggleCategory = name => {
    setError('');
    if (hasBeenSelected(name)) {
      setSelectedCategories(
        selectedCategories.filter(category => category !== name),
      );
    } else {
      setSelectedCategories([...selectedCategories, name]);
    }
  };

  const hasBeenSelected = name => selectedCategories.includes(name);

  const handleSubmit = async () => {
    await buttonScaling('submit');

    if (!restaurantName || !selectedCategories.length) {
      setError('Fill out the name and select at least one category!');
    } else {
      try {
        const response = await fetch(`${BASE_URI}/restaurant`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({restaurantName, selectedCategories}),
        });

        const json = await response.json();
        const {status, message} = json;

        if (status === 'success') {
          setFormStatus(message);
          setTimeout(onClose, 2000);
        } else if (status === 'error') {
          setFormStatus(message);
        }
      } catch (err) {
        setFormStatus('Something went horribly wrong!');
      }
    }
  };

  const buttonScaling = async btn => {
    if (btn === 'back') {
      backBtnScale.value = withSequence(withSpring(1.1), withSpring(1));
    } else if (btn === 'submit') {
      submitBtnScale.value = withSequence(withSpring(1.1), withSpring(1));
    }
  };

  const submitAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: submitBtnScale.value}],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: backBtnScale.value}],
    };
  });

  if (formStatus) {
    return (
      <Animated.View style={styles.formContainer}>
        <Text style={styles.formStatus}>{formStatus}</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={styles.formContainer}>
      <Text style={styles.formTitle}>ADD RESTAURANT</Text>
      <View style={styles.formTop}>
        <TextInput
          placeholder="Restaurant name..."
          placeholderTextColor="black"
          style={styles.textInput}
          onChangeText={text => setRestaurantName(text)}
          value={restaurantName}
        />
      </View>
      <View style={styles.formMiddle}>
        <Text style={styles.inputLabel}>Select categories:</Text>
        <View style={styles.checkboxContainer}>
          {availableCategories.map(category => (
            <View style={styles.checkboxBox}>
              <Pressable
                style={styles.smallCheckbox}
                onPress={() => toggleCategory(category)}>
                <AnimatedCheckbox
                  checked={hasBeenSelected(category)}
                  highlightColor="rgba(246, 190, 0, 0.8)"
                  checkmarkColor="#ffffff"
                  boxOutlineColor="rgba(246, 190, 0, 0.8)"
                />
              </Pressable>
              <Text style={styles.label}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.formBottom}>
        {error && <Text style={styles.formError}>{error}</Text>}
        <View style={styles.buttonWrapper}>
          <Animated.View style={submitAnimatedStyle}>
            <Pressable style={styles.formAddBtn} onPress={handleSubmit}>
              <Text style={styles.addText}>SUBMIT</Text>
            </Pressable>
          </Animated.View>
          <Animated.View style={backAnimatedStyle}>
            <Pressable
              style={styles.formBackBtn}
              onPress={async () => {
                await buttonScaling('back');
                onClose();
              }}>
              <Text style={styles.addText}>BACK</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

export default RestaurantForm;
