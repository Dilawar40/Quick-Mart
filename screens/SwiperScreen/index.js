import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { colors, fonts } from "../../constants/GlobalStyles";

const SwiperScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  console.log("index: ", index);
  return (
    <View style={{ flex: 1 }}>
      <Swiper style={styles.wrapper} loop={false} index={index}>
        <View style={styles.slide1}>
          <Image
            source={require("../../Assets/intro1.jpeg")}
            style={{ height: "30%", width: "100%" }}
            resizeMode="contain"
          />
          <Text>Welcome to</Text>
          <Text style={{ ...styles.text, fontSize: 30 }}>Quick Mart</Text>
          <Text style={styles.text}>Explore the products</Text>
          <View style={{ marginHorizontal: 20, marginTop: 60, width: "90%" }}>
            <PrimaryButton
              title="Next"
              onPress={() => {
                setIndex(index + 1);
              }}
            />
            <SecondaryButton
              title="Skip"
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            />
          </View>
        </View>
        <View style={styles.slide2}>
          <Image
            source={require("../../Assets/intro2.jpeg")}
            style={{ height: "30%", width: "100%" }}
            resizeMode="contain"
          />
          <Text>We'll Provide</Text>
          <Text style={{ ...styles.text, fontSize: 30 }}>Stay On Your Shop</Text>
          <View style={{ marginHorizontal: 20, marginTop: 93, width: "90%" }}>
            <PrimaryButton
              title="Next"
              onPress={() => {
                setIndex(index + 1);
              }}
            />
            <SecondaryButton
              title="Skip"
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            />
          </View>
        </View>
        <View style={styles.slide3}>
          <Image
            source={require("../../Assets/intro3.jpeg")}
            style={{ height: "30%", width: "100%" }}
            resizeMode="contain"
          />
          <Text>Big saving</Text>
          <Text style={{ ...styles.text, fontSize: 30 }}>With Seasonal</Text>
          <Text style={styles.text}>discounts</Text>
          <View style={{ marginHorizontal: 20, marginTop: 60, width: "90%" }}>
            <PrimaryButton
              title="Next"
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            />
            <SecondaryButton
              title="Skip"
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            />
          </View>
        </View>
      </Swiper>
    </View>
  );
};

export default SwiperScreen;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainBackground,
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainBackground,
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainBackground,
  },
  text: {
    color: "#000",
    fontSize: 26,
    fontFamily: fonts.headerFont,
  },
});
