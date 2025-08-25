import { colors } from "../../constants/GlobalStyles";
const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  sectionMiddle: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 20,
  },
  inputItem: {
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  inputTitle: {
    color: colors.darkOrange,
    fontSize: 16,
    fontFamily: "Lexend-Medium",
    marginBottom: 5,
  },
  inputAddress: {
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 10,
    height: 100,
    paddingLeft: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: colors.mainButton,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  save: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    color: "#FFFFFF",
  },
  imagePickerButton: {
    backgroundColor: colors.mainButton,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  // Profile image styling
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.darkOrange,
  },
});

export default styles;
