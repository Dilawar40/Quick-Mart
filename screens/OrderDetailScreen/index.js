import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/GlobalStyles';
import { apiGetOrderStatus } from '../../utils/APIKIT';

const SupplierOrder = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item2 } = route.params;



  const [productDetail, setProductDetail] = useState(item2.order_details);
  const [modalVisible, setModalVisible] = useState(false);

  const [status, setStatus] = useState(item2.status);






  console.log('ellloooooooo', item2.order_details?.[0].order_id)

  const [selectedOption, setSelectedOption] = useState(status);

  const handleOptionPress = option => {
    setSelectedOption(option);
  };

  // setTimeout(() => {
  //   setProductDetail(item2.order_details)
  // }, 2000);
  // console.log('checkrrrrrrrrrrrrrr', productDetail);
  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);
  const data = [
    {
      key: '1',
      title: 'vigetable Name',
      title1: 'Variant: Vegetable Name',
      quantity: ' 3',
      total: ' $48',
      button: 'Update',
    },
    {
      key: '2',
      title: 'vigetable Name',
      title1: 'Variant: Vegetable Name',
      quantity: ' 3',
      total: ' $48',
      button: 'Update',
    },
    {
      key: '3',
      title: 'vigetable Name',
      title1: 'Variant: Vegetable Name',
      quantity: ' 3',
      total: ' $48',
      button: 'Update',
    },
    // Add more items as needed
  ];

  // const renderview = ({ item }) => (

  // )
  const renderview = ({ item }) => {
    console.log(
      'Gellllllllllllll ----------',
      item.product.product_image[0].image,
    );
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderDetailScreen', { item2: item })
          }
          style={{
            alignSelf: 'center',
            borderWidth: 1,
            marginVertical: '2%',
            borderRadius: 10,
            borderColor: '#DFD9D9',
            height: 90,
            width: '95%',
            backgroundColor: '#F8F6F4',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '3%',
              marginTop: 5,
            }}>
            <View>
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
             
                  source={{ uri: item.product.product_image[0].image }}
                  style={{ height: 58, width: 58, marginRight: '3%', top: '8%' }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', marginTop: 2, }}>
              <Text style={{ color: 'black', marginBottom: 7, left: 2 }}>
                {item.variant_name}
              </Text>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{}}>Status </Text>
                <Text style={{ color: 'black', fontSize: 14 }}>
                  {item.status}
                </Text>
              </View> */}
              <Text style={{ color: 'black', fontSize: 14 }}>
                price : £{item.variant_price}
              </Text>
            </View>
            <View style={{}}>
              <View style={{ flexDirection: 'column' }}>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'flex-end',
                    marginBottom: 3,
                  }}>
                  Qty: {item.product_qty}
                </Text>
                <Text style={{ color: 'black', marginBottom: 3 }}>
                  Total : £{item.total_price}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(249, 184, 22, 1)',
                  borderRadius: 5,
                  height: 23,

                  width: '100%',
                }}>
                <Text style={{ borderRadius: 3, color: 'black' }}>Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                    Detail
                  </Text>
                </View>
                <View>
                  <Image
                    style={{ height: 70, width: 70, borderRadius: 20 }}
                    source={require('../../Assets/4.jpg')}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>product name :</Text>
                <Text
                  style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
                  {item.product.name}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>product varient :</Text>
                <Text
                  style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
                  {item.variant_name}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>product price :</Text>
                <Text
                  style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
                  £{item.product_price}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>product Quantity :</Text>
                <Text
                  style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
                  {item.product_qty}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>product Status :</Text>
                <Text
                  style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>
                  {item.product.product_status}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>product Description :</Text>
                <Text
                  style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
                  {item.product.description}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      // <View>
      //   <Text>Hellooooooooooooooooooooo</Text>
      // </View>
    );
  };

  const statusOrder = async ({ name, orderID = item2.order_details?.[0].order_id }) => {
    console.log('namemeeeeeeeeeee', orderID);
    let response = await apiGetOrderStatus(
      name,
      orderID
    )
      .then(function (response) {
        // console.log(response);
        if (response) {
          // console.log('Helllooooooooooooo123');
          // setLoader(true);
          console.log('response 22  statusOrder ', response.data);
          // setSelectCategory(response.data.result);
          setSelectedOption(response.data.status)
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

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateCurrentTime = () => {
      const today = new Date();
      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const timeString = today.toLocaleTimeString([], timeOptions);
      setCurrentTime(timeString);
    };

    // Update the current time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let today = new Date();
  let date =
    today.getDate() +
    '-' +
    parseInt(today.getMonth() + 1) +
    '-' +
    today.getFullYear();

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Header
        title={'Order Details'}
        isNavigationRequired={true}
        color={'white'}
        backgroundColor={colors.mainHeader}
        height={50}
        left={5}
      />
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '3%',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../Assets/Group.png')}
              style={{ height: 30, width: 30, marginRight: '3%' }}
            />
            <Text style={{ fontSize: 17, color: 'black' }}>
              {item2.created_at.slice(0, 10)}
            </Text>
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 17, marginTop: '10%', color: 'black' }}>
              {item2.created_at.slice(11, 20)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: '2%',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <ImageBackground
                source={require('../../Assets/recTrai.png')}
                style={{
                  marginTop: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '3%',
                  height: 70,
                  width: 70,
                }}>
                <Image
                  source={require('../../Assets/user.png')}
                  style={{ height: 40, width: 33 }}
                />
              </ImageBackground>
            </View>
            <View style={{ marginTop: '5%', left: '15%' }}>
              <Text style={{ color: 'black' }}>User Name</Text>
              <Text style={{ color: 'black' }}>Cell Number</Text>
              <Text style={{ color: 'black' }}>Address</Text>
            </View>
          </View>
          {/* <View style={{justifyContent:'center',alignItems:'center',right:'20%'}}>
            <Text style={{color:'black'}}>
              ce
            </Text>
          </View>
           */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Invoice', { item22: item2 })}
            style={{
              alignItems: 'center',
              backgroundColor: 'rgba(249, 184, 22, 1)',
              borderRadius: 5,
              height: 23,
              width: '20%',
              right: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ borderRadius: 3, color: 'black' }}>Invoice</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{flex: 1}}>
        <ProgressSteps>
          <ProgressStep label="First Step">
            <View style={{alignItems: 'center'}}>
              <Text>This is the content within step 1!</Text>
            </View>
          </ProgressStep>
          <ProgressStep label="Second Step">
            <View style={{alignItems: 'center'}}>
              <Text>This is the content within step 2!</Text>
            </View>
          </ProgressStep>
          <ProgressStep label="Third Step">
            <View style={{alignItems: 'center'}}>
              <Text>This is the content within step 3!</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View> */}

      <View style={styles.container}>
        <TouchableOpacity
          // onPress={() => handleOptionPress('canceled')}
          style={styles.option}>
          <Image
            source={require('../../Assets/cancelled.png')}
            // size={selectedOption === 1 ? 40 : 20}
            style={{
              width: selectedOption === 'canceled' ? 40 : 20,
              height: selectedOption === 'canceled' ? 40 : 20,
            }}
            color="black"
          />
          {selectedOption === 'canceled' && (
            <Text style={styles.selectedText}>canceled</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => handleOptionPress('order')}
          style={styles.option}>
          <Image
            source={require('../../Assets/checkout.png')}
            // size={selectedOption === 1 ? 40 : 20}
            style={{
              width: selectedOption === 'order' ? 40 : 20,
              height: selectedOption === 'order' ? 40 : 20,
            }}
            color="black"
          />
          {selectedOption === 'order' && (
            <Text style={styles.selectedText}>Order</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => handleOptionPress('shipped')}
          style={styles.option}>
          <Image
            source={require('../../Assets/shipped.png')}
            // size={selectedOption === 1 ? 40 : 20}
            style={{
              width: selectedOption === 'shipped' ? 40 : 20,
              height: selectedOption === 'shipped' ? 40 : 20,
            }}
            color="black"
          />
          {selectedOption === 'shipped' && (
            <Text style={styles.selectedText}>Shipping</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => handleOptionPress('delivered')}
          style={styles.option}>
          <Image
            source={require('../../Assets/shipped.png')}
            // size={selectedOption === 1 ? 40 : 20}
            style={{
              width: selectedOption === 'delivered' ? 40 : 20,
              height: selectedOption === 'delivered' ? 40 : 20,
            }}
            color="black"
          />
          {selectedOption === 'delivered' && (
            <Text style={styles.selectedText}>Deliver</Text>
          )}
        </TouchableOpacity>


      </View>
      <ScrollView>
        <FlatList
          data={productDetail}
          contentContainerStyle={{ flex: 1 }}
          renderItem={renderview}
          keyExtractor={item => item.key}
        />
      </ScrollView>

      {/* <Text style={{alignSelf: 'flex-end', marginBottom: '60%'}}>
        Total Amount: $126
      </Text> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '5%',

          bottom: '10%',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => statusOrder((name = 'canceled'))}>
          <View
            style={{
              backgroundColor: 'rgba(249, 22, 22, 1)',
              width: '100%',
              height: 25,
              borderRadius: 3,
              marginHorizontal: 7,
              justifyContent: 'center',

              alignItems: 'center',
            }}>
            <Text style={{ backgroundColor: '', color: 'white' }}>cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => statusOrder((name = 'order'))}>
          <View
            style={{
              backgroundColor: 'rgba(155, 83, 23, 1)',
              width: '100%',
              height: 25,
              borderRadius: 3,
              marginHorizontal: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white' }}>Order</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => statusOrder((name = 'shipped'))}
          >
          <View
            style={{
              backgroundColor: 'rgba(249, 22, 22, 1)',
              width: '100%',
              height: 25,
              borderRadius: 3,
              marginHorizontal: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ backgroundColor: '', color: 'white' }}>
              Ship Order
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => statusOrder((name = 'delivered'))}
          activeOpacity={0.8}>
          <View
            style={{
              backgroundColor: 'rgba(10, 50, 80, 1)',
              width: '100%',
              height: 25,
              borderRadius: 3,
              marginHorizontal: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ backgroundColor: '', color: 'white' }}>
              Deliver Order
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default SupplierOrder;

const { StyleSheet } = require('react-native');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: '5%',
    backgroundColor: 'white',
  },
  option: {
    alignItems: 'center',
  },
  selectedText: {
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

// DynamicBar.js
// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const DynamicBar = () => {
//   const [selectedOption, setSelectedOption] = useState(1);

//   const handleOptionPress = (option) => {
//     setSelectedOption(option);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => handleOptionPress(1)} style={styles.option}>
//         <Icon name="image" size={selectedOption === 1 ? 40 : 20} color="black" />
//         {selectedOption === 1 && <Text style={styles.selectedText}>Option 1</Text>}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => handleOptionPress(2)} style={styles.option}>
//         <Icon name="image" size={selectedOption === 2 ? 40 : 20} color="black" />
//         {selectedOption === 2 && <Text style={styles.selectedText}>Option 2</Text>}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => handleOptionPress(3)} style={styles.option}>
//         <Icon name="image" size={selectedOption === 3 ? 40 : 20} color="black" />
//         {selectedOption === 3 && <Text style={styles.selectedText}>Option 3</Text>}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => handleOptionPress(4)} style={styles.option}>
//         <Icon name="image" size={selectedOption === 4 ? 40 : 20} color="black" />
//         {selectedOption === 4 && <Text style={styles.selectedText}>Option 4</Text>}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#eee',
//   },
//   option: {
//     alignItems: 'center',
//   },
//   selectedText: {
//     marginTop: 5,
//     fontWeight: 'bold',
//   },
// });

// export default DynamicBar;
