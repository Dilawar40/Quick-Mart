import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {APIKit, setClientToken} from '../../utils/APIKIT';
import styles from './styles';

const LoginScreen = ({navigation}) => {
  const [userMobile, setUserMobile] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    secureTextEntry: true,
  });
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleSubmitButton = async () => {
    setLoading(true);
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log('fcmToken', fcmtoken);
    var dataToSend = {
      mobile: userMobile,
      password: userPassword,
      device_token: fcmtoken,
    };
    console.log('dataToSend', dataToSend);

    APIKit.post('v1/login', dataToSend)

      .then(response => {
        console.log('login functon data show ', response.data);
        setLoading(false);
        console.log('hekkko', JSON.stringify(response.data.result.is_supplier));
        if (response.data.code === 200) {
          let accessToken = response.data.result.api_token;
          AsyncStorage.setItem('token', accessToken);
          AsyncStorage.setItem('keepLoggedIn', JSON.stringify(true));
          AsyncStorage.setItem('id', JSON.stringify(response.data.result.id));
          AsyncStorage.setItem('is_supplier', response.data.result.is_supplier);
          setClientToken(accessToken);
          setLoading(false);
          {
            response.data.result.is_supplier === '1'
              ? navigation.push('BottomTabSupplier')
              : navigation.push('BottomTabScreen');
          }
          console.log('hELLLo successfully ');
        } else {
          setError(response.data.message);
          console.log('status', response.data);
        }
      })
      .catch(error => {
        console.log('error221', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionTop}>
        <Image source={require('../../Assets/quick.jpeg')} style={styles.logo} />
        <Text style={styles.title}>LOGIN</Text>
      </View>
      <View style={styles.sectionMiddle}>
        <View style={styles.inputItem}>
          <TextInput
            placeholder={'MOBILE NO'}
            value={userMobile}
            onChangeText={setUserMobile}
            // keyboardType="phone-pad"
            style={{marginLeft: 10, width: '90%'}}
          />
          <Icon
            name="user"
            color={'rgba(59,72,89,0.8)'}
            style={styles.userIcon}
            size={22}
          />
        </View>

        <View style={styles.inputItem}>
          <TextInput
            placeholder={'PASSWORD'}
            secureTextEntry={data.secureTextEntry}
            value={userPassword}
            onChangeText={setUserPassword}
            style={{marginLeft: 10, width: '90%'}}
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
        <View style={styles.loginContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => handleSubmitButton()}>
            <Text style={styles.login}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
            {loading ? (
              <ActivityIndicator color="white" style={{marginLeft: 10}} />
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.register}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
      <View style={{bottom: '2%'}}>
        <View style={styles.registerContainer}>
          <Text>Forgot Password : </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ForgetScreen')}>
            <Text style={styles.register}>Forget</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.register}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
