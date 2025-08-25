import { colors } from "../../constants/GlobalStyles";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  header2: {
    backgroundColor: "#fff",
    paddingTop: 15,
    borderTopColor: colors.lightgrey,
    borderTopWidth: 1,
  },
  panelHeader: {
    alignItems: "flex-end",
    marginHorizontal: 10,
  },
});
export default styles;
