import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: -5,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: 'rgba(246, 190, 0, 1)',
  },
  buttonGuest: {
    backgroundColor: 'rgba(246, 190, 0, 0.8)',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginTop: 40,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'rgba(246, 190, 0, 1)',
    maxWidth: 150,
    alignSelf: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  bottomContainer: {
    justifyContent: 'center',
    height: height / 3,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 20,
    color: 'black',
    backgroundColor: 'rgba(255,255, 255, 1)',
    zIndex: -1,
  },
  formButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'rgba(246, 190, 0, 1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 0,
  },
  formInputContainer: {
    marginBottom: 70,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: 'flex-end',
  },
  closeBtnContainer: {
    top: 0,
  },
  closeText: {
    color: 'white',
    fontWeight: '700',
  },
  errorBox: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default LoginStyles;
