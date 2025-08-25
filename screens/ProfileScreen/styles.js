import { colors, fonts } from "../../constants/GlobalStyles";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  editProfileButton: {
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  editProfileButton2: {
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    marginTop:'5%',
    flexDirection:"row"
  },
  editProfileButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.headerFont,
  },
  accordion2: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    marginHorizontal: 25,
  },
  logoutIcon: {
    marginLeft: 3,
  },
  logout: {
    fontSize: 16,
    color:'white',
    marginLeft: 10,
  },
});
export default styles;
