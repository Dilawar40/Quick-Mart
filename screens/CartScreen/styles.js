  import { colors, fonts } from "../../constants/GlobalStyles";

  const { StyleSheet, Dimensions } = require("react-native");

  const SCREEN_WIDTH = Dimensions.get("screen").width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    TotalContainer: {
      borderTopWidth: 1,
      borderTopColor: colors.lightgrey,
    },
    innerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 15,
      marginHorizontal: 20,
    },
    subTotal: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.grey,
    },
    gst: {
      fontSize: 14,
      fontWeight: "600",
      bottom: 15,
      color: colors.grey,
    },
    grandTotal: {
      fontSize: 18,
      fontWeight: "bold",
    },
    buttonContainer: {
      marginHorizontal: 20,
      bottom: 15,
      marginTop: 10,
    },
    bottomline: {
      borderBottomWidth: 2,
      borderBottomColor: colors.lightgrey,
      bottom: 20,
    },
    innerContainer2: {
      flexDirection: "row",
      justifyContent: "space-between",
      bottom: 15,
      marginHorizontal: 20,
    },
    cartCard: {
      height: 110,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: colors.white,
      borderColor: "#f4f5f4",
      marginHorizontal: 10,
      flexDirection: "row",
      marginBottom: 10,
      marginTop: 10,
      elevation: 10,
    },
    Image: {
      height: 100,
      width: 100,
      marginTop: 5,
      marginLeft: 2,
      borderRightWidth: 1,
      borderColor: colors.lightgrey,
      borderRadius: 5,
    },
    rightBorder: {
      borderRightWidth: 1,
      borderRightColor: colors.lightgrey,
      marginVertical: 2,
      marginLeft: 10,
    },
    mainHeader: {
      height: 100,
      marginHorizontal: 10,
      marginTop: 10,
      width: SCREEN_WIDTH - 155,
    },
    inBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      
      // marginHorizontal: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
      textTransform: "capitalize",
      width: 140,
    },
    priceText: {
      fontSize: 12,
      fontWeight: "500",
      color: "grey",
      textTransform: "uppercase",
      width: 50,
      textAlign: "right",
    },
    nameText: {
      fontSize: 8,
      // fontWeight: "500",
      color: "grey",
      bottom: 5,
    },
    removeContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      top: 15,
    },
    removeText: {
      fontSize: 10,
      color: "red",
    },
    priceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      top: 5,
    },
    plusminus: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: colors.lightgrey,
      // marginTop: 5,
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
    rowBack: {
      marginRight: 0,
      top: 15,
      // right: 30,
    },
    backRightBtn: {
      alignItems: "flex-end",
      bottom: 0,
      justifyContent: "center",
      position: "absolute",
      top: 0,
      height: 100,
      // width: 80,
      paddingRight: 17,
    },
    backRightBtnRight: {
      backgroundColor: "#cc3333",
      right: 0,
    },
    trash: {
      height: 40,
      width: 40,
    },
    emptyImage: {
      flex: 1,
      marginBottom: 200,
    },
    NoDataContainer: {
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 100,
      marginHorizontal: 20,
    },
    NoDataText: {
      fontSize: 18,
      marginBottom: 250,
      color: colors.primary,
      fontFamily: fonts.headerFont,
    },
  });
  export default styles;
