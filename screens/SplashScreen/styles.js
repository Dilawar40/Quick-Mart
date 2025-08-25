import { colors } from "../../constants/GlobalStyles";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "80%",
    height: "30%",
  },
  title: {
    color: "black",
    textAlign: "center",
    fontSize: 26,
  },
});
export default styles;
