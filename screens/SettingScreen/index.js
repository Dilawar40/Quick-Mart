import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, List } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import { colors } from '../../constants/GlobalStyles';
import { apiGeneralSetting } from '../../utils/APIKIT';
import styles from './styles';

const SettingScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      GeneralSetting();
    }, 100);
  }, []);

  const GeneralSetting = async () => {
    let response = await apiGeneralSetting();
    if (response.error) {
      console.log('responseGeneralSetting11', response.data.code);
      navigation.navigate('LoginScreen');
    } else {
      console.log('responseGeneralSetting22', response.data.result);
      setData(response.data.result);
    }
  };

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

  return (
    <View style={styles.container}>
      <Header
        title={'Settings'}
        isNavigationRequired={true}
        color={'white'}
        backgroundColor={colors.mainHeader}
        height={50}
      />
      <List.Section title="">
        <Pressable
          activeOpacity={0.6}
          style={styles.accordion3}
          android_ripple={{color: 'gray', borderless: false}}
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          <Ionic name="person-sharp" size={18} style={styles.logoutIcon} />
          <Text style={styles.logout}>Your Profile</Text>
        </Pressable>

        <Pressable
          activeOpacity={0.6}
          style={styles.accordion3}
          android_ripple={{color: 'gray', borderless: false}}
          onPress={() => {
            navigation.navigate('AppFeedback');
          }}>
          <Icon name="comments" size={18} style={styles.logoutIcon} />
          <Text style={styles.logout}>App Feedback</Text>
        </Pressable>
        <Divider />
        <View style={{}}>
          <List.Accordion
            style={styles.accordion}
            title="About Us"
            titleStyle={{color: 'black'}}
            expanded={expanded}
            onPress={handlePress}
            left={props => (
              <Icon {...props} name="info-circle" size={18} color="black" />
            )}>
            <Divider />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.innerContainer}
              onPress={() => {
                navigation.navigate('About', {
                  data: data,
                });
              }}>
              <Text style={styles.text}>About</Text>
              <Icon name="chevron-right" size={14} style={styles.icon} />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.innerContainer}
              onPress={() =>
                navigation.navigate('PrivacyPolicy', {
                  data: data,
                })
              }>
              <Text style={styles.text}>Privacy Policy</Text>
              <Icon name="chevron-right" size={14} style={styles.icon} />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.innerContainer}
              onPress={() =>
                navigation.navigate('Terms', {
                  data: data,
                })
              }>
              <Text style={styles.text}>Terms & Conditions</Text>
              <Icon name="chevron-right" size={14} style={styles.icon} />
            </TouchableOpacity>
            <Divider />
          </List.Accordion>
        </View>
        <Divider />
        <Pressable
          activeOpacity={0.6}
          style={styles.accordion2}
          android_ripple={{color: 'grey', borderless: false}}
          onPress={() => {
            createTwoButtonAlert();
          }}>
          <Icon name="power-off" size={18} style={styles.logoutIcon} />
          <Text style={styles.logout}>Logout</Text>
        </Pressable>
        <Pressable
          activeOpacity={0.6}
          style={styles.accordion2}
          android_ripple={{color: 'grey', borderless: false}}
          onPress={() => {
            navigation.navigate('Testing');
          }}>
          <Icon name="power-off" size={18} style={styles.logoutIcon} />
          <Text style={styles.logout}>Logout</Text>
        </Pressable>

        <Divider />
      </List.Section>
    </View>
  );
};

export default SettingScreen;
