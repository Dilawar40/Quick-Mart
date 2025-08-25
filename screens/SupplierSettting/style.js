import { colors } from "../../constants/GlobalStyles";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  accordion: {
    backgroundColor: colors.mainBackground,
    marginHorizontal: 20,
  },
  accordion2: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    marginHorizontal: 25,
  },
  accordion3: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    marginHorizontal: 20,
  },
  logoutIcon: {
    marginLeft: 3,
  },
  logout: {
    fontSize: 16,
    marginLeft: 10,
  },
  innerContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  text: {
    fontWeight: "500",
  },
  icon: {
    marginRight: 20,
  },
});
export default styles;
