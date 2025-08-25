import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);
      const value = await AsyncStorage.getItem('token');
      const value2 = await AsyncStorage.getItem('is_supplier');
      console.log('is_supplier', value2, value);
      try {
        console.log('hellloooooHekkiii', value, value2);
        navigation.replace(
          value === null
            ? 'SwiperScreen'
            : value2 === '1' 
              ? 'BottomTabSupplier'
              : 'DrawerNavigator',
        );
      } catch (error) {
        console.log('hellloooooooo', error);
      }

 
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('../../Assets/quick.jpeg')} />
      </View>
    </View>
  );
};

export default SplashScreen;
