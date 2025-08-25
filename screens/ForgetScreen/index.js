import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { APIKit } from "../../utils/APIKIT";
import styles from "./styles";

const ForgetScreen = ({ navigation }) => {
  const [userMobile, setUserMobile] = useState("");
  const [error, setError] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const TostMessage = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: `Forget successfully...!!!`,
      visibilityTime: 1000,
    });
  };
  const handleSubmitButton = async () => {
    setLoading(true);
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log("fcmToken", fcmtoken);
    var dataToSend = {
      mobile: userMobile,
      password: userPassword,
      device_token: fcmtoken,
    };
    console.log("dataToSend", dataToSend);

    APIKit.post("v1/forget-password", dataToSend)

      .then((response) => {
        console.log("login", response);
        setLoading(false);
        if (response.data.code === 200) {
          setLoading(false);
          TostMessage()

          navigation.push("LoginScreen");
          setUserMobile('')
          setUserPassword('')
          console.log("abc", response.data)
        } else {
          setError(response.data.message);
          console.log("status", response.data);
        }
      })
      .catch((error) => {
        console.log("error221", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionTop}>
        <Image source={require("../../Assets/quick.jpeg")} style={styles.logo} />
        <Text style={styles.title}>Forgot Password</Text>
      </View>
      <View style={styles.sectionMiddle}>
        <View style={styles.inputItem}>
          <TextInput
            placeholder={"MOBILE NUMBER"}
            value={userMobile}
            onChangeText={setUserMobile}
            keyboardType="phone-pad"
            style={{ marginLeft: 10, width: "90%" }}
          />
          <FontAwesome
            name="mobile-phone"
            color={"rgba(59,72,89,0.8)"}
            style={styles.userIcon}
            size={22}
          />
        </View>
        <View style={styles.inputItem}>
          <TextInput
            placeholder={"ENTER NEW PASSWORD"}
            secureTextEntry={data.secureTextEntry}
            value={userPassword}
            onChangeText={setUserPassword}
            style={{ marginLeft: 10, width: "90%" }}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather
                name="eye-off"
                color="grey"
                size={20}
                style={styles.userIcon}
              />
            ) : (
              <Feather
                name="eye"
                color="grey"
                size={20}
                style={styles.userIcon}
              />
            )}
          </TouchableOpacity>
        </View>
        {error ? (
          <View>
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : null}
        {/* <View style={styles.inputItem}>
         
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather
                name="eye-off"
                color="grey"
                size={20}
                style={styles.userIcon}
              />
            ) : (
              <Feather
                name="eye"
                color="grey"
                size={20}
                style={styles.userIcon}
              />
            )}
          </TouchableOpacity>
        </View> */}
        {/* {error ? (
          <View>
            <Text style={styles.error}>{error}</Text>
          </View>
        ) : null} */}
        <View style={styles.loginContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => handleSubmitButton()

            }
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>



    </View>
  );
};

export default ForgetScreen;
