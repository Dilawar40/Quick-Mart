import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    BackHandler,
    FlatList,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { colors } from '../../constants/GlobalStyles';
import {
    ApiCallFormData,
    apiGetAddProduct,
    apiGetCategory,
    setClientToken,
} from '../../utils/APIKIT';

import styles from './styles';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const HomeSupplier = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data2, setData2] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [productId, setProductId] = useState('');
  const [productHours, setProductHours] = useState('');
  const [description, setDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectCategory, setSelectCategory] = useState([]);
  const [productStatus, setProductStatus] = useState('');
  const [selectCategoryItem, setSelectCategoryItem] = useState();
  const [ImgForSelfie, setImgForSelfie] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showVarient, setShowVarient] = useState(false);
  const [showValue, setShowValue] = useState();

  console.log('Helllooooo Image Picker');

  const data22 = [
    { name: 'available', id: 1 },
    { name: 'upcoming', id: 2 },
    { name: 'out-of-stock', id: 3 },
    // Add more items as needed
  ];

  const [selectCategoryDemo, setSelectCategoryDemo] = useState([
    { name: 'mobile', id: 1 },
    { name: 'watch', id: 2 },
    { name: 'glasses', id: 3 },
  ]);

  const checkerrr = () => {
    console.log('Hellloooo', selectCategoryItem, selectedValue);
  };

  const ChooseFromGallery1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImgForSelfie(image.path);
    });
  };

  const handleAddProduct2 = async () => {
    // apiGetAddProduct()
    console.log(
      productName,
      description,
      selectCategoryItem,
      productHours,
      selectCategoryItem,
      variants,
    );
    if (
      !productName ||
      !description ||
      !selectCategoryItem ||
      !productHours ||
      !selectCategoryItem
      //  ||
      // !variants
    ) {
      alert('Please fill in all fields');
      return;
    } else {
      let response = await apiGetAddProduct(
        // (varientArray11 = 'Hwlllooo')
        (name = productName),
        (description1 = description),
        (selectCategoryId = selectCategoryItem),
        (selectAvabality = selectCategoryItem),
        (varientArray11 = variants),
        (imagePick = ImgForSelfie),
      ).then(function (response) {
        // console.log(response);
        if (response) {
          // setLoader(true);
          setModalVisible(true);
          console.log('responce apiGetAddProduct', response.data.success);
          // setSelectCategory(response.data.result)
          setShowValue(response.data.success);
          setTimeout(() => {
            setModalVisible(false);
            setProductHours('');
            setDescription('');
            setProductName('');
            setVariants([{ name: '', unit: '', price: '' }]);
          }, 5000);
        } else {
          console.log('responseError in apiGetAddProduct');
        }
      });
    }
  };

  const UpdateUserProfile = async () => {
    let id = await AsyncStorage.getItem('id');
    console.log(
      productName,
      description,
      selectCategoryItem,
      productHours,
      selectCategoryItem,
      variants,
      selectedValue
    );
    if (
      !productName ||
      !description ||
      !selectCategoryItem ||
      !productHours ||
      !variants 
      // selectedValue
    ) {
      alert('Please fill in all fields');
      return;
    } else {
      try {
        let formData = new FormData();
        formData.append('product_image', {
          uri: ImgForSelfie,
          name: 'profile.jpg',
          fileName: 'profile',
          type: 'profile/jpg',
        });
        formData.append('supplier_id', id);
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('category_id', selectCategoryItem);
        formData.append('product_status', 'available');
        // formData.append('product_image', imagePick);
        formData.append('order_cancel_hours', productHours);

        variants.forEach((item, index) => {
          formData.append(`addmore[${index}][name]`, item.name);
          formData.append(`addmore[${index}][unit]`, item.unit);
          formData.append(`addmore[${index}][price]`, item.price);
        });
        console.log('dataToSend', formData);

        console.log('Form Image', formData);

        const res = await ApiCallFormData(formData);

        console.log('yessssssss', res.status);
        if (res?.status === 200) {
          console.log('yessssssss2', res);
          //  updateUserData(res?.data)
          // UpdateUserData();

          setModalVisible(true);
          setShowValue(res.success);
          setTimeout(() => {
            setModalVisible(false);
            setProductHours('');
            setDescription('');
            setProductName('');
            setVariants([{ name: '', unit: '', price: '' }]);
          }, 5000);

        } else {
          console.log('yessssssss3', res);
        }
      } catch (e) {
        console.log('Error is -- ', e.toString());
      }
    }
  };

  const [variants, setVariants] = useState([{ name: '', unit: '', price: '' }]);

  const handleAddMore = () => {
    setVariants([...variants, { name: '', unit: '', price: '' }]);
  };

  const handleRemove = index => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };
  const saveProduct = () => {
    console.log('Saved Variants:', variants);
    setShowVarient(false);
    TostMessage('hlllooo');
  };

  const TostMessage = item => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: item,
      topOffset: 80,
      visibilityTime: 1000,
    });
  };
  console.log('jjjjjjjjjjjj', variants);
  useEffect(() => {
    async function fetchData() {
      const authToken = await AsyncStorage.getItem('token');
      setClientToken(authToken);
    }
    fetchData();
  }, []);

  const FetchCategory = async () => {
    let response = await apiGetCategory()
      .then(function (response) {
        // console.log(response);
        if (response) {
          setLoader(true);
          console.log('responseCategory', response.data.result);
          setSelectCategory(response.data.result);
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
  console.log('Outher side from the project ');
  useEffect(() => {
    setTimeout(() => {
      FetchCategory();
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
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };
  handleVarientProduct = () => {
    console.log('Helllloooooooooo', showVarient);
    setShowVarient(true);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

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
        {loader ? (
          <View style={styles.container2}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.label}>Product Name:</Text>
            </TouchableOpacity>
            <View style={styles.inBox}>
              <Icon name="user" size={18} style={{ left: 10 }} />
              <Text style={styles.innerText}>Name :</Text>
              {/* <Text style={styles.innerText2} numberOfLines={2}> */}
              <TextInput
                style={styles.innerText2}
                value={productName}
                onChangeText={setProductName}
                placeholder="Enter product name"
              />
            </View>
            <Text style={styles.label}>Product Description:</Text>
            <View style={styles.inBox}>
              <MaterialIcons name="description" size={18} style={{ left: 10 }} />
              <Text style={styles.innerText}>Des:</Text>

              {/* <Text style={styles.innerText2} numberOfLines={2}> */}
              <TextInput
                style={styles.innerText2}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
              />
            </View>

            <Text style={styles.label}>Category:</Text>
            <View style={{ ...styles.input }}>
              <Picker
                selectedValue={selectCategoryItem}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectCategoryItem(itemValue)
                }
                style={{ bottom: 18 }}>
                {/* Render Picker.Item components directly inside Picker */}
                {selectCategory.map(item => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                  // console.log('Hello', item)
                ))}
              </Picker>
            </View>
            <Text style={styles.label}>Select Product Image:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => ChooseFromGallery1()}>
              {ImgForSelfie == '' ? (
                <Text>Select Image</Text>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ width: '50%' }}>
                    <Text>Image Selected</Text>
                  </View>
                  <View style={{}}>
                    <AnimatedLottieView
                      autoPlay
                      loop={false}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                      source={require('../../Assets/lottieFiles/Check.json')}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.label}>Product Status:</Text>
            <View style={{ ...styles.input }}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
                style={{ bottom: 18 }}>
                {/* Render Picker.Item components directly inside Picker */}
                {data22.map(item => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.name}
                  />
                ))}
              </Picker>
            </View>
            <Text style={styles.label}>Order Cancel Hours</Text>
            <TextInput
              style={styles.input}
              value={productHours}
              onChangeText={setProductHours}
              placeholder="Order cancel Hours"
              keyboardType="numeric"
            />
            {showVarient ? (
              <ScrollView contentContainerStyle={styles.containerVarent}>
                <Text style={styles.header}>Product Variant</Text>
                <View style={styles.variantContainer}>
                  <View style={styles.columnVarient}>
                    {variants.map((variant, index) => (
                      <View key={index} style={styles.variantColumn}>
                        <View style={styles.inBoxVarient}>
                          <TextInput
                            style={[styles.inputVarient, styles.innerText2]} // Updated style
                            placeholder="Enter Name"
                            value={variant.name}
                            onChangeText={text => {
                              const updatedVariants = [...variants];
                              updatedVariants[index].name = text;
                              setVariants(updatedVariants);
                            }}
                          />
                        </View>
                        <View style={styles.inBoxVarient}>
                          <TextInput
                            style={[styles.inputVarient, styles.innerText2]} // Updated style
                            placeholder="Enter Unit"
                            value={variant.unit}
                            keyboardType="numerical"
                            onChangeText={text => {
                              const updatedVariants = [...variants];
                              updatedVariants[index].unit = text;
                              setVariants(updatedVariants);
                            }}
                          />
                        </View>
                        <View style={styles.inBoxVarient}>
                          <TextInput
                            style={[styles.inputVarient, styles.innerText2]} // Updated style
                            placeholder="Enter Price"
                            keyboardType="numerical"
                            value={variant.price}
                            onChangeText={text => {
                              const updatedVariants = [...variants];
                              updatedVariants[index].price = text;
                              setVariants(updatedVariants);
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => handleRemove(index)}>
                          <Text style={{ color: 'white' }}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddMore()}>
                    <Text style={{ color: 'white' }}>Add More</Text>
                  </TouchableOpacity>
                  {/* 
                      <TouchableOpacity style={styles.saveButton} onPress={() => saveProduct()}>
                        <Text>Save Product</Text>
                      </TouchableOpacity> */}
                </View>
              </ScrollView>
            ) : (
              <TouchableOpacity
                style={styles.addVairentButton}
                activeOpacity={0.6}
                onPress={() => handleVarientProduct()}>
                <Text style={styles.editProfileButtonText}>Add Varient</Text>
              </TouchableOpacity>
            )}
            {/* <Button title="Add Product" onPress={() => handleAddProduct2()} /> */}
            <TouchableOpacity
              style={styles.editProfileButton}
              activeOpacity={0.6}

              onPress={() =>
                UpdateUserProfile()
              }>
              <Text style={styles.editProfileButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={[1, 1, 1, 1, 1, 1, 1]}
            renderItem={({ item }) => {
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
      </ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  // flexDirection: 'row',
                  width: '100%',
                }}>
                <View
                  style={{
                    width: '100%',
                    marginHorizontal: '20%',
                    marginVertical: '1%',
                    marginBottom: '4%',
                  }}>
                  <AnimatedLottieView
                    autoPlay
                    loop={false}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    source={require('../../Assets/lottieFiles/Check.json')}
                  />
                </View>
              </View>
              <View style={{ marginTop: '5%' }}>
                <Text style={styles.modalText}>{showValue}!</Text>
              </View>
              {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable> */}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default HomeSupplier;



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
// import AnimatedLottieView from 'lottie-react-native';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   BackHandler,
//   FlatList,
//   Modal,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import LinearGradient from 'react-native-linear-gradient';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
// import Toast from 'react-native-toast-message';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Header from '../../components/Header';
// import { colors } from '../../constants/GlobalStyles';
// import {
//   ApiCallFormData,
//   apiGetCategory,
//   setClientToken
// } from '../../utils/APIKIT';

// import styles from './styles';

// const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

// const HomeSupplier = ({navigation}) => {
//   const [data, setData] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [loader, setLoader] = useState(false);
//   const [data2, setData2] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1]);
//   const [productName, setProductName] = useState('');
//   const [category, setCategory] = useState('');
//   const [productId, setProductId] = useState('');
//   const [productHours, setProductHours] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedValue, setSelectedValue] = useState('');
//   const [selectCategory, setSelectCategory] = useState([]);
//   const [productStatus, setProductStatus] = useState('');
//   const [selectCategoryItem, setSelectCategoryItem] = useState();
//   const [ImgForSelfie, setImgForSelfie] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showVarient, setShowVarient] = useState(false);
//   const [showValue, setShowValue] = useState();

//   console.log('Helllooooo Image Picker');

//   const UpdateUserProfile = async () => {
//     let id = await AsyncStorage.getItem('id');
//     console.log('helllo id check',id)
//     try {
//       let formData = new FormData();

//       formData.append('product_image', {
//         uri: ImgForSelfie,
//         name: 'profile.jpg',
//         fileName: 'profile',
//         type: 'profile/jpg',
//       });
//       formData.append('supplier_id', id);
//       formData.append('name', productName);
//       formData.append('description', description);
//       formData.append('category_id', selectCategoryItem);
//       formData.append('product_status', 'available');
//       // formData.append('product_image', imagePick);
//       formData.append('order_cancel_hours', productHours);


//       variants.forEach((item, index) => {
//         formData.append(`addmore[${index}][name]`, item.name);
//         formData.append(`addmore[${index}][unit]`, item.unit);
//         formData.append(`addmore[${index}][price]`, item.price);
//       });
//       console.log('dataToSend', formData);

//       console.log('Form Image', formData);

//       const res = await ApiCallFormData(formData);

//       console.log('yessssssss', res);
//       if (res?.code === 200) {
//         console.log('yessssssss2', res);
//         //  updateUserData(res?.data)
//         UpdateUserData();
//       } else {
//         console.log('yessssssss3', res);
//       }
//     } catch (e) {
//       console.log('Error is -- ', e.toString());
//     }
//   };

//   const data22 = [
//     {name: 'available', id: 1},
//     {name: 'upcoming', id: 2},
//     {name: 'out-of-stock', id: 3},
//     // Add more items as needed
//   ];

//   const [selectCategoryDemo, setSelectCategoryDemo] = useState([
//     {name: 'mobile', id: 1},
//     {name: 'watch', id: 2},
//     {name: 'glasses', id: 3},
//   ]);

//   console.log('Hellloooo', selectCategoryItem, selectedValue);

//   const ChooseFromGallery1 = () => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then(image => {
//       console.log(image);
//       setImgForSelfie(image.path);
//     });
//   };

//   const [variants, setVariants] = useState([{name: '', unit: '', price: ''}]);

//   const handleAddMore = () => {
//     setVariants([...variants, {name: '', unit: '', price: ''}]);
//   };

//   const handleRemove = index => {
//     const updatedVariants = [...variants];
//     updatedVariants.splice(index, 1);
//     setVariants(updatedVariants);
//   };
//   const saveProduct = () => {
//     console.log('Saved Variants:', variants);
//     setShowVarient(false);
//     TostMessage('hlllooo');
//   };

//   const TostMessage = item => {
//     Toast.show({
//       type: 'success',
//       text1: 'Success',
//       text2: item,
//       topOffset: 80,
//       visibilityTime: 1000,
//     });
//   };
//   console.log('jjjjjjjjjjjj', variants);
//   useEffect(() => {
//     async function fetchData() {
//       const authToken = await AsyncStorage.getItem('token');
//       setClientToken(authToken);
//     }
//     fetchData();
//   }, []);

//   const FetchCategory = async () => {
//     let response = await apiGetCategory()
//       .then(function (response) {
//         // console.log(response);
//         if (response) {
//           setLoader(true);
//           console.log('responseCategory', response.data.result);
//           setSelectCategory(response.data.result);
//         } else {
//           console.log('responseError', response.data.message);
//         }
//       })
//       .catch(function (error) {
//         // handle error
//         if (error.response.status === 401) {
//           console.log('Token Expire goto login screen');
//           navigation.navigate('LoginScreen');
//         } else {
//           console.log('Other error show it to user');
//         }
//       });
//   };
//   console.log('Outher side from the project ');
//   useEffect(() => {
//     setTimeout(() => {
//       FetchCategory();
//     }, 100);
//   }, []);

//   const handleBackPress = () => {
//     Alert.alert(
//       'Exit App',
//       'Are you sure you want to exit your app?',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: () => BackHandler.exitApp()},
//       ],
//       {
//         cancelable: false,
//       },
//     );
//     return true;
//   };

//   handleVarientProduct = () => {
//     console.log('Helllloooooooooo', showVarient);
//     setShowVarient(true);
//   };
//   // const handleAddProduct2 = async () => {
//   //   // apiGetAddProduct()
//   //   console.log(
//   //     productName,
//   //     description,
//   //     selectCategoryItem,
//   //     productHours,
//   //     selectCategoryItem,
//   //     variants,
//   //   );
//   //   if (
//   //     !productName ||
//   //     !description ||
//   //     !selectCategoryItem ||
//   //     !productHours ||
//   //     !selectCategoryItem
//   //     //  ||
//   //     // !variants
//   //   ) {
//   //     alert('Please fill in all fields');
//   //     return;
//   //   } else {
//   //     let response = await apiGetAddProduct(
//   //       // (varientArray11 = 'Hwlllooo')
//   //       (name = productName),
//   //       (description1 = description),
//   //       (selectCategoryId = selectCategoryItem),
//   //       (selectAvabality = selectCategoryItem),
//   //       (varientArray11 = variants),
//   //       (imagePick = ImgForSelfie),
//   //     ).then(function (response) {
//   //       // console.log(response);
//   //       if (response) {
//   //         // setLoader(true);
//   //         setModalVisible(true);
//   //         console.log('responce apiGetAddProduct', response.data.success);
//   //         // setSelectCategory(response.data.result)
//   //         setShowValue(response.data.success);
//   //         setTimeout(() => {
//   //           setModalVisible(false);
//   //           setProductHours('');
//   //           setDescription('');
//   //           setProductName('');
//   //           setVariants([{name: '', unit: '', price: ''}]);
//   //         }, 5000);
//   //       } else {
//   //         console.log('responseError in apiGetAddProduct');
//   //       }
//   //     });
//   //   }
//   // };

//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', handleBackPress);

//     return () =>
//       BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Header
//         title={'CB Mart'}
//         isNavigationRequired={false}
//         color={'white'}
//         backgroundColor={colors.mainHeader}
//         height={50}
//         left={5}
//       />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {loader ? (
//           <View style={styles.container2}>
//             <TouchableOpacity onPress={() => setModalVisible(true)}>
//               <Text style={styles.label}>Product Name:</Text>
//             </TouchableOpacity>
//             <View style={styles.inBox}>
//               <Icon name="user" size={18} style={{left: 10}} />
//               <Text style={styles.innerText}>Name :</Text>
//               {/* <Text style={styles.innerText2} numberOfLines={2}> */}
//               <TextInput
//                 style={styles.innerText2}
//                 value={productName}
//                 onChangeText={setProductName}
//                 placeholder="Enter product name"
//               />
//             </View>
//             <Text style={styles.label}>Product Description:</Text>
//             <View style={styles.inBox}>
//               <MaterialIcons name="description" size={18} style={{left: 10}} />
//               <Text style={styles.innerText}>Des:</Text>

//               {/* <Text style={styles.innerText2} numberOfLines={2}> */}
//               <TextInput
//                 style={styles.innerText2}
//                 value={description}
//                 onChangeText={setDescription}
//                 placeholder="Description"
//               />
//             </View>

//             <Text style={styles.label}>Category:</Text>
//             <View style={{...styles.input}}>
//               <Picker
//                 selectedValue={selectCategoryItem}
//                 onValueChange={(itemValue, itemIndex) =>
//                   setSelectCategoryItem(itemValue)
//                 }
//                 style={{bottom: 18}}>
//                 {/* Render Picker.Item components directly inside Picker */}
//                 {selectCategory.map(item => (
//                   <Picker.Item
//                     key={item.id}
//                     label={item.name}
//                     value={item.id}
//                   />
//                   // console.log('Hello', item)
//                 ))}
//               </Picker>
//             </View>
//             <Text style={styles.label}>Select Product Image:</Text>
//             <TouchableOpacity
//               style={styles.input}
//               onPress={() => ChooseFromGallery1()}>
//               {ImgForSelfie == '' ? (
//                 <Text>Select Image</Text>
//               ) : (
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     width: '100%',
//                     justifyContent: 'space-between',
//                   }}>
//                   <View style={{width: '50%'}}>
//                     <Text>Image Selected</Text>
//                   </View>
//                   <View style={{}}>
//                     <AnimatedLottieView
//                       autoPlay
//                       loop={false}
//                       style={{
//                         width: 25,
//                         height: 25,
//                       }}
//                       source={require('../../Assets/lottieFiles/Check.json')}
//                     />
//                   </View>
//                 </View>
//               )}
//             </TouchableOpacity>
//             <Text style={styles.label}>Product Status:</Text>
//             <View style={{...styles.input}}>
//               <Picker
//                 selectedValue={selectedValue}
//                 onValueChange={(itemValue, itemIndex) =>
//                   setSelectedValue(itemValue)
//                 }
//                 style={{bottom: 18}}>
//                 {/* Render Picker.Item components directly inside Picker */}
//                 {data22.map(item => (
//                   <Picker.Item
//                     key={item.id}
//                     label={item.name}
//                     value={item.name}
//                   />
//                 ))}
//               </Picker>
//             </View>
//             <Text style={styles.label}>Order Cancel Hours</Text>
//             <TextInput
//               style={styles.input}
//               value={productHours}
//               onChangeText={setProductHours}
//               placeholder="Order cancel Hours"
//               keyboardType="numeric"
//             />
//             {showVarient ? (
//               <ScrollView contentContainerStyle={styles.containerVarent}>
//                 <Text style={styles.header}>Product Variant</Text>
//                 <View style={styles.variantContainer}>
//                   <View style={styles.columnVarient}>
//                     {variants.map((variant, index) => (
//                       <View key={index} style={styles.variantColumn}>
//                         <View style={styles.inBoxVarient}>
//                           <TextInput
//                             style={[styles.inputVarient, styles.innerText2]} // Updated style
//                             placeholder="Enter Name"
//                             value={variant.name}
//                             onChangeText={text => {
//                               const updatedVariants = [...variants];
//                               updatedVariants[index].name = text;
//                               setVariants(updatedVariants);
//                             }}
//                           />
//                         </View>
//                         <View style={styles.inBoxVarient}>
//                           <TextInput
//                             style={[styles.inputVarient, styles.innerText2]} // Updated style
//                             placeholder="Enter Unit"
//                             value={variant.unit}
//                             keyboardType="numerical"
//                             onChangeText={text => {
//                               const updatedVariants = [...variants];
//                               updatedVariants[index].unit = text;
//                               setVariants(updatedVariants);
//                             }}
//                           />
//                         </View>
//                         <View style={styles.inBoxVarient}>
//                           <TextInput
//                             style={[styles.inputVarient, styles.innerText2]} // Updated style
//                             placeholder="Enter Price"
//                             keyboardType="numerical"
//                             value={variant.price}
//                             onChangeText={text => {
//                               const updatedVariants = [...variants];
//                               updatedVariants[index].price = text;
//                               setVariants(updatedVariants);
//                             }}
//                           />
//                         </View>
//                         <TouchableOpacity
//                           style={styles.removeButton}
//                           onPress={() => handleRemove(index)}>
//                           <Text style={{color: 'white'}}>Remove</Text>
//                         </TouchableOpacity>
//                       </View>
//                     ))}
//                   </View>

//                   <TouchableOpacity
//                     style={styles.addButton}
//                     onPress={() => handleAddMore()}>
//                     <Text style={{color: 'white'}}>Add More</Text>
//                   </TouchableOpacity>
//                   {/*
//                       <TouchableOpacity style={styles.saveButton} onPress={() => saveProduct()}>
//                         <Text>Save Product</Text>
//                       </TouchableOpacity> */}
//                 </View>
//               </ScrollView>
//             ) : (
//               <TouchableOpacity
//                 style={styles.addVairentButton}
//                 activeOpacity={0.6}
//                 onPress={() => handleVarientProduct()}>
//                 <Text style={styles.editProfileButtonText}>Add Varient</Text>
//               </TouchableOpacity>
//             )}
//             {/* <Button title="Add Product" onPress={() => handleAddProduct2()} /> */}
//             <TouchableOpacity
//               style={styles.editProfileButton}
//               activeOpacity={0.6}
//               onPress={async () => {
//                 UpdateUserProfile();
//                 // handleAddProduct2()
//                 //  const chc = {};
//                 //  const res = await ApiCallFormData(chc);
//                 console.log('ressssssssssss');
//               }}>
//               <Text style={styles.editProfileButtonText}>Add Product</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <FlatList
//             data={[1, 1, 1, 1, 1, 1, 1]}
//             renderItem={({item}) => {
//               return (
//                 <View
//                   style={{
//                     width: '100%',
//                     height: 170,
//                     borderRadius: 20,
//                     marginTop: 15,
//                   }}>
//                   <ShimmerPlaceHolder
//                     shimmerColors={['#ebebeb', '#DBDBDB', '#ebebeb']}
//                     style={{
//                       width: 150,
//                       borderRadius: 20,
//                       marginTop: 10,
//                       marginHorizontal: 10,
//                     }}
//                   />
//                   <ShimmerPlaceHolder
//                     shimmerColors={['#ebebeb', '#DBDBDB', '#ebebeb']}
//                     style={{
//                       width: '95%',
//                       height: 150,
//                       borderRadius: 20,
//                       marginTop: 10,
//                       marginHorizontal: 10,
//                     }}></ShimmerPlaceHolder>
//                 </View>
//               );
//             }}
//           />
//         )}
//       </ScrollView>
//       <View style={styles.centeredView}>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           // onRequestClose={() => {
//           //   Alert.alert('Modal has been closed.');
//           //   setModalVisible(!modalVisible);
//           // }}
//         >
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               <View
//                 style={{
//                   // flexDirection: 'row',
//                   width: '100%',
//                 }}>
//                 <View
//                   style={{
//                     width: '100%',
//                     marginHorizontal: '20%',
//                     marginVertical: '1%',
//                     marginBottom: '4%',
//                   }}>
//                   <AnimatedLottieView
//                     autoPlay
//                     loop={false}
//                     style={{
//                       width: 50,
//                       height: 50,
//                     }}
//                     source={require('../../Assets/lottieFiles/Check.json')}
//                   />
//                 </View>
//               </View>
//               <View style={{marginTop: '5%'}}>
//                 <Text style={styles.modalText}>{showValue}!</Text>
//               </View>
//               {/* <Pressable
//                 style={[styles.button, styles.buttonClose]}
//                 onPress={() => setModalVisible(!modalVisible)}>
//                 <Text style={styles.textStyle}>Hide Modal</Text>
//               </Pressable> */}
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </View>
//   );
// };

// export default HomeSupplier;
