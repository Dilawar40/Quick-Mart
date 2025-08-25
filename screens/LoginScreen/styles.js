import {colors, fonts} from '../../constants/GlobalStyles';

const {StyleSheet, Dimensions} = require('react-native');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  sectionTop: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 190,
    marginTop: 50,
    width: 220,
    bottom: 20,
  },
  sectionMiddle: {
    // flex: 1,
    marginVertical:20,
    marginHorizontal: 20,
  },
  inputItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userIcon: {
    right: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: colors.darkOrange,
  },
  inputTitle: {
    color: '#2A3256',
    fontSize: 16,
    fontFamily: 'Lexend-Medium',
    marginBottom: 5,
  },
  button: {
    backgroundColor: colors.mainButton,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
  },
  loginContainer: {
    // marginHorizontal: 20,
  },
  login: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    color: '#FFFFFF',
  },
  registerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    top:150
    // marginTop:60,
    // marginBottom: 20,
  },
  register: {
    fontSize: 16,
    color: colors.darkOrange,
    fontFamily: 'lexend-medium',
    fontWeight: '700',
  },
  error: {
    fontSize: 14,
    fontFamily: fonts.headerFont,
    color: 'red',
  },
});
export default styles;
