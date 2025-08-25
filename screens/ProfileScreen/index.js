import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Toast from 'react-native-toast-message';

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from "../../components/Header";
import ProfileSection from "../../components/Profile/ProfileSection";
import { colors } from "../../constants/GlobalStyles";
import { apiGetProfile } from "../../utils/APIKIT";
import styles from "./styles";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState([]);
  const [loader, setLoader] = useState(false);

  const TostMessage = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: `Logged out successfully...!!!`,
      visibilityTime: 1000,
    });
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          TostMessage();
          AsyncStorage.clear();
          AsyncStorage.removeItem('keepLoggedIn');
          AsyncStorage.removeItem('token');
          navigation.navigate('LoginScreen');
        },
      },
    ]);

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, []);


  const openDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      FetchProfile();
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const FetchProfile = async () => {
    let response = await apiGetProfile()
      .then(function (response) {
        // console.log(response);
        if (response) {
          setLoader(true);
          console.log("responseGetProfile", response.data);
          setProfileData(response.data.result);
        } else {
          console.log("responseProfileError", response.data.message);
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
        title={"Profile"}
        isNavigationRequired={true}
        color={"white"}
        backgroundColor={colors.mainHeader}
        height={50}
        left={7}
      />

      {loader ? (
        <View>
          <ScrollView style={{}}>
            {/* <WalletSection profileData={profileData} /> */}
            <ProfileSection profileData={profileData} />
          </ScrollView>
          <TouchableOpacity
            style={styles.editProfileButton}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("EditProfile", {
                profileData: profileData,
              })
            }
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <Pressable
            activeOpacity={0.6}
            style={styles.editProfileButton2}
            android_ripple={{ color: 'grey', borderless: false }}
            onPress={() => {
              createTwoButtonAlert();
            }}
            >
            <Icon name="power-off" size={18} color={'white'} style={styles.logoutIcon} />
            <Text style={styles.logout}>Logout</Text>
          </Pressable>
        </View>
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
    </View>
  );
};

export default ProfileScreen;
