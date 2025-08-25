
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const APIKit = axios.create({
  baseURL: 'https://socialgrades.online/api/',
});

export const setClientToken = token => {
  console.log(`setClientToken -> Bearer ${token}`);
  APIKit.interceptors.request.use(async function (config) {
    const authToken = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  });
};
var getBanner = 'v1/get-banner';
var getProduct = 'v1/get-product';
var getCategory = 'v1/get-all-category';
var getCart = 'v1/get-cart';
var getCurrentOrder = 'v1/current-order';
var getHistory = 'v1/order-history';
var getProfile = 'v1/get-profile';
var placeOrder = 'v1/make-order';
var generalSetting = 'v1/general_setting';
var getTransactions = 'v1/get-transaction';
var getAddProduct = 'v1/add-product';
var getSupplierOrders = 'v1/supplier-orders';
var getOrderStatus = 'v1/status-update';
var getSupplierHistory = 'v1/supplier-history';
var getSuppliersDataHistory = 'v1/company-history';

export const apiGetBanner = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    user_id: id,
  };
  // console.log('dataToSend', dataToSend);
  var url = getBanner;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log("responseBanner", response);
  } else {
    // console.log("responseBannerError", response.data.message);
  }
  return response;
};

export const apiGetAddProduct = async () => {
  let id = await AsyncStorage.getItem('id');
  const authToken = await AsyncStorage.getItem('token');
  console.log('token check in it ', authToken);
  let formData = new FormData();
  formData.append('product_image', {
    uri: imagePick,
  });
  formData.append('user_id', id);
  formData.append('supplier_id', id);
  formData.append('name', name);
  formData.append('description', description1);
  formData.append('category_id', selectCategoryId);
  formData.append('product_status', selectAvabality);
  formData.append('order_cancel_hours', 6);
  formData.append('addmore', varientArray11);
  console.log('dataToSend', formData);
  try {
    const url = 'https://afreststart.com/api/v1/add-product';
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    };

    let response = await fetch(url, options);

    if (response.ok) {
      console.log('Response:', await response.json());
      return await response.json();
    } else {
      console.error('Error Response:', response.status, response.statusText);
      return response;
    }
  } catch (e) {
    console.error('Network request failed:', e.toString());
    return e.toString();
  }
};

export const ApiCallFormData = async paramsBody => {
  const authToken = await AsyncStorage.getItem('token');
  console.log('fjdslkafjkd', paramsBody);
  try {
    const url = `https://afreststart.com/api/v1/add-product`;

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`,
      },
      body: paramsBody,
    };

    console.log('fjdslkafjkd222222');
    let response = await fetch(url, options);
    console.log('fjdslkafjkd233333333');
    if (response) {
      return await response.json();
    } else {

      return response;
    }
  } catch (e) {
    console.log('error', e.toString());
    return e.toString();
  }
};

export const apiGetProduct = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    user_id: id,
    category_id: 7,
  };
  console.log('dataToSend', dataToSend);
  var url = getProduct;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('responseProduct', response);
  } else {
    console.log('responseProductError', response.data.message);
  }
  return response;
};
export const apiGetCategory = async () => {
  var url = getCategory;
  let response = await APIKit.post(url);
  if (response.data.code === 200) {
    // console.log('responseCategory', response.data.code);
  } else {
    console.log('responseCategoryError', response.data.message);
  }
  return response;
};

export const apiGetCart = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    user_id: id,
  };
  console.log('dataToSend', dataToSend);
  var url = getCart;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('responseCart', response.data.code);
  } else {
    console.log('responseCartError', response.data.code);
  }
  return response;
};

export const apiGetCurrentOrder = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    user_id: id,
  };
  console.log('dataToSend', dataToSend);
  var url = getCurrentOrder;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('responseCurrentOrder', response.data.code);
  } else {
    console.log('responseCurrentOrderError', response.data.message);
  }
  return response;
};

export const apiGetHistory = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    user_id: id,
  };
  console.log('dataToSend', dataToSend);
  var url = getHistory;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('responseHistory', response.data.code);
  } else {
    console.log('responseHistoryError', response.data.message);
  }
  return response;
};

export const apiGetProfile = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    id: id,
  };
  console.log('dataToSend', dataToSend);
  var url = getProfile;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('responseProfile', response.data.code);
  } else {
    console.log('responseProfileError', response.data.message);
  }
  return response;
};

export const apiGetPlaceOrder = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    user_id: id,
    order_id: cartID2,
  };
  console.log('dataToSend', dataToSend);
  var url = placeOrder;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('responsePlaceOrder', response.data.code);
  } else {
    // console.log('responsePlaceOrderError', response.data.message);
  }
  return response;
};

export const apiGeneralSetting = async () => {
  var url = generalSetting;
  let response = await APIKit.post(url);
  if (response.data.code === 200) {
    // console.log('responseGeneralSetting', response.data.code);
  } else {
    // console.log('responseGeneralSettingError', response.data.message);
  }
  return response;
};
export const apiGetTransactions = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    user_id: id,
  };
  console.log('dataToSend', dataToSend);
  var url = getTransactions;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log("responseGetTransactions", response);
  } else {
    // console.log("responseGetTransactions", response.data.message);
  }
  return response;
};

export const apiGetSupplierHistory = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    user_id: id,
  };
  console.log('dataToSend', dataToSend);
  var url = getSupplierHistory;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('apiGetSupplierHistory', response);
  } else {
    // console.log('apiGetSupplierHistory', response.data.message);
  }
  return response;
};

export const apiGetSuppliersDataHistory = async () => {
  let id = await AsyncStorage.getItem('id');
  var dataToSend = {
    user_id: id,
    supplier_id : 49
  };
  console.log('dataToSend', dataToSend);
  var url = getSuppliersDataHistory;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('apiGetSupplierHistory', response);
  } else {
    // console.log('apiGetSupplierHistory', response.data.message);
  }
  return response;
};

// v1/supplier-orders

export const apiGetSupplierOrders = async () => {
  let id = await AsyncStorage.getItem('id');
  console.log('Helllo apiGetSupplierOrders', id);
  var dataToSend = {
    supplier_id: id,
  };
  // console.log('dataToSend', dataToSend);
  var url = getSupplierOrders;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('response SupplierOrders', response.data.message);
  } else {
    // console.log('responsSupplierOrderError', response.data.message);
  }
  return response;
};

export const apiGetOrderStatus = async () => {
  // let id = await AsyncStorage.getItem('id');
  console.log('Helllo apiGetOrderStatus', name);
  var dataToSend = {
    status: name,
    order_id: 1,
    supplier_id: supplierID,
    user_id: userID,
  };
  console.log('dataToSend', dataToSend);
  var url = getOrderStatus;
  let response = await APIKit.post(url, dataToSend);
  if (response.data.code === 200) {
    // console.log('response OrderStatus', response);
  } else {
    // console.log('respons OrderStatus', response.data.message);
  }
  return response;
};
