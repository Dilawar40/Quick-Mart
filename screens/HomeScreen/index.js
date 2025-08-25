import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, FlatList, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import BannerImageCard from '../../components/BannerImageCard';
import Header from '../../components/Header';
import CategoriesList from '../../components/Home/CategoriesList';
import { colors } from '../../constants/GlobalStyles';
import {
    apiGetBanner,
    apiGetCart,
    apiGetCategory,
    setClientToken,
} from '../../utils/APIKIT';
import styles from './styles';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data2, setData2] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1]);
  useEffect(() => {
    async function fetchData() {
      const authToken = await AsyncStorage.getItem('token');
      setClientToken(authToken);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      FetchBanner();
      FetchCategory();
      FetchCart();
    }, 100);
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit your app?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  const FetchBanner = async () => {
    let response = await apiGetBanner()
      .then(function (response) {
        if (response) {
          setLoader(true);
          console.log('responseBanner', response.data);
          setData(response.data.result);
        } else {
          console.log('responseBannerError', response.data.message);
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log('Token Expire goto login screen');
          navigation.navigate('LoginScreen');
        } else {
          console.log('Other error show it to user');
        }
      });
  };

  const FetchCategory = async () => {
    let response = await apiGetCategory()
      .then(function (response) {
        // console.log(response);
        if (response) {
          setLoader(true);
          console.log('responseCategory', response.data);
          setCategoryData(response.data.result);
        } else {
          console.log('responseError', response.data.message);
        }
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 401) {
          console.log('Token Expire goto login screen');
          navigation.navigate('LoginScreen');
        } else {
          console.log('Other error show it to user');
        }
      });
  };

  const FetchCart = async () => {
    let response = await apiGetCart()
      .then(function (response) {
        if (response) {
          setLoader(true);
          console.log('responseGetCart', response.data.total_items);
          AsyncStorage.setItem('quantity', response.data.total_items);
        } else {
          console.log('responsecartError', response.data.message);
        }
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 401) {
          console.log('Token Expire goto login screen');
          navigation.navigate('LoginScreen');
        } else {
          console.log('Other error show it to user');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Madina'}
        isNavigationRequired={false}
        color={'white'}
        backgroundColor={colors.mainHeader}
        height={50}
        left={5}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {loader ? (
            <View>
              <BannerImageCard data={data} />
              <CategoriesList data={categoryData} />
            </View>
          ) : (
            <FlatList
              data={[1, 1, 1, 1, 1, 1, 1, 1, 1]}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      height: 170,
                      borderRadius: 20,
                      marginTop: 15,
                    }}>
                    <ShimmerPlaceHolder
                      shimmerColors={['#ebebeb', '#DBDBDB', '#ebebeb']}
                      style={{
                        width: 150,
                        borderRadius: 20,
                        marginTop: 10,
                        marginHorizontal: 10,
                      }}
                    />
                    <ShimmerPlaceHolder
                      shimmerColors={['#ebebeb', '#DBDBDB', '#ebebeb']}
                      style={{
                        width: '95%',
                        height: 150,
                        borderRadius: 20,
                        marginTop: 10,
                        marginHorizontal: 10,
                      }}></ShimmerPlaceHolder>
                  </View>
                );
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
