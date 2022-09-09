import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

const LogoutScreenStyles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  logoutText: {
    fontSize: 28,
    color: 'white',
    padding: 25,
  },
});

export default LogoutScreenStyles;
