import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import Header from "../../components/Header";
import PrimaryInputForm from "../../components/PrimaryInputForm";
import { colors } from "../../constants/GlobalStyles";
import { APIKit, setClientToken } from "../../utils/APIKIT";
import styles from "./styles";
import { launchImageLibrary } from "react-native-image-picker";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState(null);

  const ErrorMessage = (item) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: item,
      topOffset: 80,
    });
  };

  const handleSubmitButton = async () => {
    var dataToSend = {
      name: userName,
      mobile: userPhoneNumber,
      password: userPassword,
      address: userAddress,
      email: userEmail,
      image: userImage,
    };

    console.log("dataToSend", dataToSend);

    APIKit.post("v1/register", dataToSend)
      .then((response) => {
        console.log("register", response.data);
        if (response.data.code === 200) {
          let accessToken = response.data.result.api_token;
          AsyncStorage.setItem("token", accessToken);
          AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
          AsyncStorage.setItem("id", JSON.stringify(response.data.result.id));
          setClientToken(accessToken);
          navigation.push("BottomTabScreen");
        } else {
          ErrorMessage(response.data.message);
          console.log("status", response.data);
        }
      })
      .catch((error) => {
        console.log("error221", error);
      });
  };

  const handleImagePick = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.assets) {
        setUserImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title={"Register"}
        isNavigationRequired={true}
        color={"white"}
        backgroundColor={colors.mainHeader}
        height={50}
      />
      <ScrollView style={styles.sectionMiddle}>
        {/* Profile Image */}
        {userImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: userImage }} style={styles.profileImage} />
          </View>
        )}

        {/* Input Fields */}
        <View style={styles.inputItem}>
          <Text style={styles.inputTitle}>Name</Text>
          <PrimaryInputForm
            placeHolderText={"Type name..."}
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputTitle}>Phone Number</Text>
          <PrimaryInputForm
            placeHolderText={"Type number..."}
            value={userPhoneNumber}
            onChangeText={setUserPhoneNumber}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputTitle}>Email</Text>
          <PrimaryInputForm
            placeHolderText={"Type Email..."}
            value={userEmail}
            onChangeText={setUserEmail}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputTitle}>Password</Text>
          <PrimaryInputForm
            placeHolderText={"Type password..."}
            value={userPassword}
            onChangeText={setUserPassword}
          />
        </View>

        <View>
          <Text style={styles.inputTitle}>Address</Text>
          <TextInput
            style={styles.inputAddress}
            placeholder="Type address..."
            value={userAddress}
            multiline={true}
            onChangeText={setUserAddress}
          />
        </View>

        {/* Image Picker */}
        <View style={styles.inputItem}>
          <Text style={styles.inputTitle}>Upload Image</Text>
          <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
            <Text style={styles.save}>Pick Image</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.inputItem}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => handleSubmitButton()}
        >
          <Text style={styles.save}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
