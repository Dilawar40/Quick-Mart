import React, { useEffect, useState } from "react";
import { BackHandler, FlatList, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import Header from "../../components/Header";
import OrderButton from "../../components/Orders/OrderButton";
import { colors } from "../../constants/GlobalStyles";
import { apiGetCurrentOrder } from "../../utils/APIKIT";
import styles from "./styles";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Ordercreen = ({ navigation }) => {
  const [orderData, setOrderData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      FetchCurrentOrder();
    }, 100);
  }, []);

  const FetchCurrentOrder = async () => {
    let response = await apiGetCurrentOrder()
      .then(function (response) {
        // console.log(response);
        if (response) {
          setLoader(true);
          console.log("responseGetCurrentOrder", response.data);
          setOrderData(response.data.result);
        } else {
          console.log("responseGetCurrentOrderError", response.data.message);
        }
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 401) {
          console.log("Token Expire goto login screen");
          navigation.navigate("LoginScreen");
        } else {
          console.log("Other error show it to user");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title={"Orders"}
        isNavigationRequired={true}
        color={"white"}
        backgroundColor={colors.mainHeader}
        height={50}
        left={5}
      />
      {loader ? (
        <OrderButton orderData={orderData} />
      ) : (
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1, 1, 1]}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: "100%",
                  // height: 170,
                  borderRadius: 20,
                  marginTop: 10,
                }}
              >
                <ShimmerPlaceHolder
                  shimmerColors={["#ebebeb", "#DBDBDB", "#ebebeb"]}
                  style={{
                    width: "95%",
                    height: 100,
                    borderRadius: 20,
                    marginTop: 10,
                    marginHorizontal: 10,
                  }}
                />
              </View>
            );
          }}
        />
      )}
      {/* <SupplierOrder/> */}
    </View>
  );
};

export default Ordercreen;
