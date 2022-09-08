import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

const FoodScreenStyles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topContainer: {
    flex: 1,
    maxHeight: 75,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
    padding: 10,
    marginTop: 13,
    letterSpacing: 3,
  },
  bottomContainer: {
    flex: 5,
    marginBottom: 100,
    paddingTop: 10,
  },
  box: {
    flexDirection: 'row',
    borderColor: 'rgb(102, 0, 0)',
    height: 100,
    width: width,
    padding: 15,
    borderBottomWidth: 1,
  },
  left: {
    flex: 2,
  },
  img: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  middle: {
    flex: 4,
    paddingLeft: 10,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  categoryWrapper: {
    flexDirection: 'row',
  },
  category: {
    color: 'white',
    padding: 4,
    fontSize: 10,
  },
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 32,
    height: 32,
  },
});

export default FoodScreenStyles;
