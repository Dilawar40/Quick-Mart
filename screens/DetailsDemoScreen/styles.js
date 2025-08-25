import { colors } from "../../constants/GlobalStyles";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  carousalDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: colors.primary,
  },
  customStyle: {
    flexGrow: 0,
    marginTop: 10,
  },
  HeaderText: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 10,
    textTransform: "capitalize",
  },
  buttonsContainer: {
    alignItems: "center",
    width: "95%",
    margin: 5,
  },
  buttonsRowView: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
  },
  rippleView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttontitle: {
    fontSize: 16,
    color: colors.grey,
    fontFamily: "Lexend-Medium",
    fontWeight: "700",
    textTransform: "uppercase",
    padding: 5,
    textAlign: "center",
  },
  pressedButtontitle: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: "Lexend-Medium",
    fontWeight: "700",
    textTransform: "uppercase",
    padding: 5,
    textAlign: "center",
  },
  desText: {
    fontSize: 16,
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "800",
    color: colors.primary,
  },
  labelText: {
    fontSize: 12,
    marginTop: 12,
    textTransform: "uppercase",
  },
  pressedButtonRipple: {
    width: 80,
    height: 35,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRipple: {
    width: 80,
    height: 35,
    borderWidth: 1,
    borderColor: colors.grey,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
    marginBottom:15

  },
  qtyContainer2: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 80,
  },
  plusminus: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "lightgrey",
    width: 152.5,
    marginTop: 15,
    marginLeft: 35,
  },
  actionBtn: {
    width: 50,
    height: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn2: {
    width: 50,
    height: 30,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  variant: {
    fontWeight: "600",
    marginTop: 10,
  },
});
export default styles;
