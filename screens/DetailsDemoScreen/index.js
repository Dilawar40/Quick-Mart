import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImageSection from "../../components/Details/ImageSection";
import Header from "../../components/Header";
import { colors } from "../../constants/GlobalStyles";
import { APIKit } from "../../utils/APIKIT";
import styles from "./styles";

const DetailsDemoScreen = ({ route, navigation, index }) => {
  const { data } = route.params;

  console.log('waooooooooooooooooooooooooooooo', data)

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
    setStatus(data.variant[0]);
  }, []);
  const [status, setStatus] = useState(data.name);
  const [selected, setSelected] = useState(data.variant[0]);
  let [num, setNum] = useState(0);

  const setStatusFilter = (status) => {
    setStatus(status);
  };
  const AddCart = async () => {
    let id = await AsyncStorage.getItem("id");
    console.log('errerere', id)
    var dataToSend = {
      supplier_id: data.supplier_id,
      user_id: id,
      product_id: status.product_id,
      product_variant_id: status.id,
      qty: status.qty,
    };
    console.log("dataToSend", dataToSend);
    APIKit.post("v1/add-cart", dataToSend)
      .then((response) => {
        TostMessage(response.data.message);
        AsyncStorage.setItem("quantity", response.data.total_items);
        // console.log("addcart2", response.data);
        if (response) {
          // console.log("responseAddCart", response.data);
        }
      })
      .catch((error) => {
        console.log("error222", error);
      });
  };
  const TostMessage = (item) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: item,
      topOffset: 80,
      visibilityTime: 1000,
    });
  };
  const incNum = (type, value, index) => {

    console.log('weuwieu', typeof (status.qty))
    // cartData[index].qty = parseInt(cartData[index].qty) + 1;
    // const int status.qty 
    setNum(num + 1);
    status.qty = parseInt(status.qty) + 1
  };
  const decNum = (type, value, index) => {
    setNum(num - 1);
    if (status.qty > 0) {
      status.qty -= 1;
    }
  };
  const RenderItem = ({ item, index }) => {
    return (
      <View key={index} style={{}}>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsRowView}>
            <TouchableOpacity
              style={
                item === selected
                  ? styles.pressedButtonRipple
                  : styles.buttonRipple
              }
              onPress={() => {
                setStatusFilter(item), setSelected(item);
              }}
            >
              <View style={styles.rippleView}>
                <Text
                  style={
                    item === selected
                      ? styles.pressedButtontitle
                      : styles.buttontitle
                  }
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={"Details"}
        isNavigationRequired={true}
        color={"white"}
        backgroundColor={colors.mainHeader}
        height={50}
        left={5}
      />

      <ScrollView>
        <ImageSection data={data} />
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <Text style={styles.HeaderText}>{data.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>£{status.price}</Text>
            <Text style={styles.labelText}> / {status.name}</Text>
          </View>
          <Text style={styles.labelText}>
            {/* {status.gst_price > 0 ? "£" + status.gst_price : "No"} GST included */}
          </Text>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          {/* <Text style={styles.variant}>Variant</Text> */}
          <FlatList
            horizontal
            data={data.variant}
            keyExtractor={(item) => item.id}
            renderItem={RenderItem}
          />
        </View>
        <Divider bold />

        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.desText} numberOfLines={12}>
            {data.description}
          </Text>
        </View>
        <View>
          <View style={styles.qtyContainer}>
            <Text style={styles.desText}>Quantity</Text>
            <View style={styles.plusminus}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.actionBtn}
                onPress={(text) => {
                  decNum("qty", text, index);
                  AddCart(data);
                }}
              >
                <Icon name="remove" size={25} color={colors.white} />
              </TouchableOpacity>
              <View style={styles.actionBtn2}>
                <Text style={{ fontWeight: "600" }}>{status.qty}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.actionBtn}
                onPress={(text) => {
                  incNum("qty", text, index);
                  AddCart(data);
                }}
              >
                <Icon name="add" size={25} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsDemoScreen;
