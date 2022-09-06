import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

const NavigationBarStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'rgba(246, 190, 0, 1)',
  },
});

export default NavigationBarStyles;
