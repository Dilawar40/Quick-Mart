import React, {useEffect} from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {colors, fonts} from '../../constants/GlobalStyles';
import styles from './style';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const SupplierListScreen = ({route, navigation}) => {
  const {data} = route.params;
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);
  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  const ItemView = ({item, onPress}) => {
    return (
      <View style={styles.innerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.mainContainer2}
          onPress={onPress}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              style={styles.image}
              source={
                item.image
                  ? {uri: item.image}
                  : require('../../Assets/logo.png')
              }
              resizeMode="contain"
            />
            <View style={styles.nameText}>
              <View style={styles.header}>
                <Text style={styles.customerName}>{item.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.customerNamemoney}>
                  {/* order status:{" "} */}
                  Phone no : {item.mobile}
                </Text>
              </View>
              <Text style={styles.date}>
                {item.address}
                {/* date */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderView = ({item}) => {
    return (
      <ItemView
        item={item}
        onPress={() => {
          navigation.navigate('CartCard', {
            data: item,
          });
        }}
      />
    );
  };
  return (
    <View>
      <Header
        title={'Suppliers List'}
        isNavigationRequired={true}
        color={'white'}
        backgroundColor={colors.mainHeader}
        height={50}
      />
      {data.Result === 'No Suppliers Found' ? (
        <View style={styles.NoDataContainer}>
          <Image
            source={require('../../Assets/history.jpg')}
            resizeMode="center"
            style={{height: '100%', width: '100%'}}
          />
          <Text style={styles.NoDataText}>The product is not available</Text>
        </View>
      ) : (
        <View style={{marginTop: '5%'}}>
          <FlatList data={data?.Result} renderItem={renderView} />
        </View>
      )}
    </View>
  );
};
export default SupplierListScreen;
