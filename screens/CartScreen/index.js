import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { SwipeListView } from 'react-native-swipe-list-view';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PrimaryButton } from '../../components/Button';
import Header from '../../components/Header';
import { colors } from '../../constants/GlobalStyles';
import { APIKit, apiGetCart, apiGetPlaceOrder } from '../../utils/APIKIT';
import styles from './styles';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const CartScreen = ({ navigation }) => {
  const [cartData, setCartData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  let [num, setNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cartID, setCartId] = useState();



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
      FetchCart();
    }, 100);
  }, []);

  const FetchCart = async () => {
    let response = await apiGetCart()
      .then(function (response) {
        console.log('reponce show ', response.data.total_items);
        if (response) {
          setLoader(true);
          console.log('responseGetCart', response.data.total_items);
          setCartData(response.data.result);
          setCartId(response.data.result[0].id);

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
  const PlaceOrder = async () => {
    console.log('e3333333332222222222222', cartID)
    let response = await apiGetPlaceOrder(
      (cartID2 = cartID)
    )
    if (response.data.code === 200) {
      TostMessage(response.data.message);
      console.log('responseGetPlaceOrder', response.data);
      navigation.navigate('Order');
      AsyncStorage.setItem('quantity', JSON.stringify(0));
    } else {
      WarningAlert(response.data.message);
      console.log('responseGetPlaceOrderError', response.data.message);
    }
  };
  const WarningAlert = item =>
    Alert.alert(
      'Warning',
      item,
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {
        cancelable: true,
      },
    );
  const cancelAlert = index => {
    console.log('cancelAlert', index);
    Alert.alert('Remove Item', 'Are you sure you want to remove your item?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setIsLoading(true);
          deleteCart(index);
          setTimeout(() => {
            setIsLoading(false);
            FetchCart();
          }, 800);
        },
      },
    ]);
  };
  const createTwoButtonAlert = () =>
    Alert.alert('Place Order', 'Are you sure you want to place your order?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => PlaceOrder({}) },
    ]);
  const AddCart = async selected => {
    let id = await AsyncStorage.getItem('id');
    console.log('selectedItem', selectedItem);
    var dataToSend = {
      user_id: id,
      product_id: selected.product_id,
      product_variant_id: selected.product_variant_id,
      qty: selected.qty,
    };
    console.log('dataToSend', dataToSend);
    APIKit.post('v1/add-cart', dataToSend)
      .then(response => {
        console.log('addcart2', response.data);

        if (response) {
          console.log('responseAddCart', response.data);
          setIsLoading(false);
          AsyncStorage.setItem('quantity', response.data.total_items);
        }
      })
      .catch(error => {
        console.log('error222', error);
      });
  };
  const deleteCart = async index => {
    console.log('deleteCart1', index);
    var dataToSend = {
      id: index,
    };
    console.log('dataToSend', dataToSend);
    APIKit.post('v1/delete-cart', dataToSend)
      .then(response => {
        console.log('deleteCart', response.data);
        if (response.data.code === 200) {
          console.log('responsedeleteCart', response.data);
          DeleteMessage(response.data.message);
          FetchCart();
        }
      })
      .catch(error => {
        console.log('error444', error);
      });
  };




  const incNum = (type, value, index) => {
    console.log('inc', index);
    setNum(num + 1);
    console.log('check number ', num)
    cartData[index].qty = parseInt(cartData[index].qty) + 1;
    console.log('cartData[index].qty', cartData[index].qty)
  };
  const decNum = (type, value, index) => {
    console.log('dec', index);
    setNum(num - 1);
    if (cartData[index].qty > 0) {
      cartData[index].qty -= 1;
    }
  };
  const TostMessage = item => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: item,
      topOffset: 80,
      visibilityTime: 8000,
    });
  };
  const ErrorMessage = item => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: item,
      topOffset: 80,
    });
  };
  const DeleteMessage = item => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: item,
      topOffset: 80,
    });
  };

  const RenderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.container}>
        <View style={styles.cartCard}>
          <Image
            source={{
              uri:
                item.product > [0]
                  ?
                  item.product[0].product_image[0].image
                  : null,
            }}

            style={styles.Image}
            resizeMode="contain"
          />
          <View style={styles.rightBorder} />
          <View style={styles.mainHeader}>
            <View style={styles.inBox}>
              <Text style={styles.title} numberOfLines={1}>
                {item.product > [0] ? item.product[0].name : null}
              </Text>
              <Text style={styles.priceText} numberOfLines={1}>
                {"\u00A3"}
                {item.product_variant > [0]
                  ? item.product_variant[0].price
                  //  +
                  // ' / ' +
                  // [item.product_variant[0].name]
                  : null}
              </Text>
            </View>
            {/* <View style={{flexDirection: 'row-reverse', top: 4}}>
              <Text style={styles.nameText}>
                {item.product_variant[0].gst_price > 0
                  ? '₹' + item.product_variant[0].gst_price
                  : 'No'}{' '}
                GST included
              </Text>
            </View> */}
            <View style={styles.priceContainer}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                {"\u00A3"}
                {item.product_variant > [0]
                  ? item.product_variant[0].price * item.qty
                  : null}
              </Text>
              <View style={styles.plusminus}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.actionBtn}
                  onPress={text => {
                    // setSelectedItem(item),
                    setIsLoading(true);
                    decNum('qty', text, index);
                    AddCart(item);
                  }}>
                  {/* {item.qty < 2 ? (
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={20}
                    color={colors.white}
                  />
                ) : ( */}
                  <Icon name="remove" size={25} color={colors.white} />
                  {/* )} */}
                </TouchableOpacity>

                <View style={styles.actionBtn2}>
                  {/* {item.qty < 1 ? (
                  deleteCart(selectedItem.id)
                ) : ( */}
                  <Text style={{ fontWeight: '600' }}>{item.qty}</Text>
                  {/* )} */}
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.actionBtn}
                  onPress={text => {
                    setIsLoading(true);
                    incNum('qty', text, index);
                    AddCart(item);
                  }}>
                  <Icon name="add" size={25} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row-reverse' }}>
              <TouchableOpacity
                style={styles.removeContainer}
                onPress={() => cancelAlert(item.id)}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={12}
                  color={'red'}
                />
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const deleteRow = (rowMap, rowKey, index) => {
    const newData = [...cartData];
    const prevIndex = cartData.findIndex(item => item.id === rowKey);
    deleteCart(rowKey);
    newData.splice(prevIndex, 1);
    setCartData(newData);
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    const HiddenItemWithActions = props => {
      const {
        swipeAnimatedValue,
        leftActionActivated,
        rightActionActivated,
        rowActionAnimatedValue,
        rowHeightAnimatedValue,
        onDelete,
      } = props;

      if (rightActionActivated) {
        Animated.spring(rowActionAnimatedValue, {
          toValue: 500,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(rowActionAnimatedValue, {
          toValue: 75,
          useNativeDriver: false,
        }).start();
      }

      return (
        <Animated.View
          style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
          {/* <Text>Left</Text> */}

          {!leftActionActivated && (
            <Animated.View
              style={[
                styles.backRightBtn,
                styles.backRightBtnRight,
                {
                  flex: 1,
                  width: rowActionAnimatedValue,
                },
              ]}>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                // onPress={onDelete}
                onPress={() => cancelAlert(data.item.id)}>
                <Animated.View
                  style={[
                    styles.trash,
                    {
                      transform: [
                        {
                          scale: swipeAnimatedValue.interpolate({
                            inputRange: [-90, -45],
                            outputRange: [1, 0],
                            extrapolate: 'clamp',
                          }),
                        },
                      ],
                    },
                  ]}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={40}
                    color="#fff"
                  />
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      );
    };
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onDelete={() => deleteRow(rowMap, data.item.id)}
      // onDelete={() => deleteCart(rowMap, data.item.id)}
      />
    );
  };
  let totalQuantity = 0;
  let totalGst = 0;
  let totalPrice = 0;
  {
    cartData === undefined
      ? null
      : cartData.forEach(item => {
        totalQuantity += item.qty;
        totalGst +=
          item.qty *
          (item.product_variant > [0]
            ? item.product_variant[0].gst_price
            : null);

        totalPrice +=
          item.qty *
          (item.product_variant > [0] ? item.product_variant[0].price : null);
      });
  }

  return (
    <View style={styles.container}>
      <Header
        title={'Cart'}
        isNavigationRequired={true}
        color={'white'}
        backgroundColor={colors.mainHeader}
        height={50}
        left={7}
      />
      {loader ? (
        <SwipeListView
          // showsVerticalScrollIndicator={false}
          data={cartData}
          renderItem={RenderItem}
          keyExtractor={item => item.id}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-80}
          disableRightSwipe
        />
      ) : (
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1, 1, 1]}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: '100%',
                  // height: 170,
                  borderRadius: 20,
                  marginTop: 10,
                }}>
                <ShimmerPlaceHolder
                  shimmerColors={['#ebebeb', '#DBDBDB', '#ebebeb']}
                  style={{
                    width: '95%',
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
      {cartData === undefined ? (
        // <View style={styles.emptyImage}>
        <View style={styles.NoDataContainer}>
          <Image
            source={require('../../Assets/emptycart.jpg')}
            resizeMode="center"
            style={{ height: '100%', width: '100%' }}
          />
          <Text style={styles.NoDataText}>Your cart is empty.</Text>
        </View>
      ) : // </View>
        null}
      {loader && cartData ? (
        <View style={styles.TotalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.subTotal}>SubTotal</Text>
            <Text style={styles.subTotal}>
              {"\u00A3"}{(totalPrice - totalGst).toFixed(2)}
            </Text>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.gst}>VAT</Text>
            <Text style={styles.gst}>{"\u00A3"}{totalGst.toFixed(2)}</Text>
          </View>
          <View style={styles.bottomline} />
          <View style={styles.innerContainer2}>
            <Text style={styles.grandTotal}>Grand Total</Text>
            <Text style={styles.grandTotal}>{"\u00A3"}{totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Place Order"
              onPress={() => {
                createTwoButtonAlert(), FetchCart();
              }}
            />
          </View>
        </View>
      ) : null}
      {isLoading && (
        <Modal animationType="fade" transparent={true}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <View>
              <ActivityIndicator size={60} color={colors.primary} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CartScreen;
