import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

const FoodScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
  },
});

export default FoodScreenStyles;
