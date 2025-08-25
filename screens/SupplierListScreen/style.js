import {colors, fonts} from '../../constants/GlobalStyles';
const {StyleSheet, Dimensions} = require('react-native');

const SCREEN_WIDTH = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  innerContainer: {
    // marginTop: 10,
    marginBottom: 10,
  },
  mainContainer: {
    flex: 1,
  },
  mainContainer2: {
    height: 80,
    // width: "100%",
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 10,
    borderColor: '#f4f5f4',
    elevation: 10,
  },
  image: {
    height: 60,
    width: 60,
    marginTop: 9,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  nameText: {
    // flex: 1,
    marginTop: 5,
    marginHorizontal: 10,
    width: SCREEN_WIDTH - 140,
  },
  mainHeader: {
    height: 100,
    width: SCREEN_WIDTH - (120 + 40),
    marginLeft: 10,
    marginTop: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkOrange,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customerOtp: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grey,
    marginTop: 2,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  customerNamemoney: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grey,
    marginTop: 5,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  date: {
    color: colors.darkOrange,
    fontSize: 12,
    marginTop: 5,
  },
  price: {
    color: colors.darkOrange,
    fontWeight: '700',
  },
  NoDataContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
  NoDataText: {
    fontSize: 18,
    marginBottom: 170,
    color: colors.primary,
    fontFamily: fonts.headerFont,
  },
});
export default styles;
