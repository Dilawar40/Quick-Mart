import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import CartCard from '../components/Home/CartCard';
import OrderFeedback from '../components/Orders/OrderFeedback';
import TrackOrder from '../components/Orders/TrackOrder';
import AddtoWallet from '../components/Profile/AddtoWallet';
import EditProfile from '../components/Profile/EditProfile';
import ViewTransactions from '../components/Profile/ViewTransactions';
import About from '../components/Settings/About';
import AppFeedback from '../components/Settings/AppFeedback';
import PrivacyPolicy from '../components/Settings/PrivacyPolicy';
import Terms from '../components/Settings/Terms';
import TrackOrderSupplier from '../components/SupplierOrder/TrackOrderSupplier';
import Testing from '../components/Testing/Testing';
import Invoice from '../components/invoice/Invoice';
import { colors } from '../constants/GlobalStyles';
import CartScreen from '../screens/CartScreen';
import DetailsDemoScreen from '../screens/DetailsDemoScreen';
import {
    default as ForgetSceen,
    default as ForgetScreen,
} from '../screens/ForgetScreen';
import HomeScreen from '../screens/HomeScreen';
import HomeSupplier from '../screens/HomeSupplier';
import LoginScreen from '../screens/LoginScreen';
import {
    default as OrderDetailScreen,
    default as SupplierOrder,
} from '../screens/OrderDetailScreen';
import Ordercreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import WalletSection from '../components/Profile/WalletSection';
import HistoryItemsSupplier from '../components/SupplierOrder/HistoryItemsSupplier';
import AppNavigator from '../components/Testing/AppNavigator';
import CompanySupplierList from '../components/comapanies/CompanySupplierList';
import SupplierListScreen from '../screens/SupplierListScreen';
import SupplierOrderScreen from '../screens/SupplierOrderScreen';
import SupplierSetting from '../screens/SupplierSettting';
import SwiperScreen from '../screens/SwiperScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackScreen = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="BottomTabScreen"
        component={BottomTabScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BottomTabSupplier"
        component={BottomTabSupplier}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeSupplier"
        component={HomeSupplier}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetScreen"
        component={ForgetSceen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrackOrder"
        component={TrackOrder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderFeedback"
        component={OrderFeedback}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppFeedback"
        component={AppFeedback}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SupplierListScreen1"
        component={SupplierListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerActiveTintColor: 'white', // Set the color for the text of the selected item
        drawerActiveBackgroundColor: '#25bd12',
        // Hide the header
      }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabScreen}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen
        name="About"  
        component={About}
        options={{ title: 'About' }}
      />
      <Drawer.Screen
        name="AppFeedback"
        component={AppFeedback}
        options={{ title: 'Feedback' }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ title: 'Privacy' }}
      />
      <Drawer.Screen
        name="Terms"
        component={Terms}
        options={{ title: 'Terms' }}
      />


    </Drawer.Navigator>
  );
};


const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="CartCard" component={CartCard} />
      <HomeStack.Screen name="TrackOrder" component={TrackOrder} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="SupplierListScreen1"
        component={SupplierListScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="DetailsDemoScreen"
        component={DetailsDemoScreen}
      />
    </HomeStack.Navigator>
  );
};

export const BottomTabScreen = ({ }) => {
  const [cartTotal, setCartTotal] = useState([]);
  useEffect(() => {
    let timer = setInterval(() => {
      async function fetchData() {
        const total = await AsyncStorage.getItem('quantity');
        if (total) {
          setCartTotal(total);
          // console.log('Fetched TOTAL CARD IN MAINSTACKS', cartTotal);
        }
      }
      fetchData();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.mainHeader,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontWeight: '500',
        },
        tabBarStyle: {
          height: 45,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'receipt-sharp' : 'receipt-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-sharp' : 'person-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart-sharp' : 'cart-outline';
          } else if (route.name === 'WalletSection') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }

          // <Icon name="wallet" size={18} />

          return (
            <Ionic
              name={iconName}
              size={22}
              color={focused ? colors.mainButton : 'black'}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Order"
        component={Ordercreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarBadge: cartTotal > 0 ? cartTotal : null,
          tabBarBadgeStyle: {
            backgroundColor: 'blue',
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen
        name="WalletSection"
        component={WalletSection}
        options={{
          title: 'Account',
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      {/* <Tab.Screen
        name="Screen"
        component={SettingScreen}
        options={{
          title: 'Profile',
          headerShown: false,
          unmountOnBlur: true,
        }}
      /> */}
    </Tab.Navigator>
  );
};





// tabBarIcon: ({ focused, color, size, route, iconLibrary }) => {
//   let iconName;
//   let IconComponent;

//   // Choose the icon based on the route name
//   if (route.name === 'Home') {
//     iconName = focused ? 'home-sharp' : 'home-outline';
//   } else if (route.name === 'Order') {
//     iconName = focused ? 'receipt-sharp' : 'receipt-outline';
//   } else if (route.name === 'Shops') {
//     iconName = focused ? 'person-sharp' : 'person-outline';
//   } else if (route.name === 'Cart') {
//     iconName = focused ? 'cart-sharp' : 'cart-outline';
//   } else if (route.name === 'Setting') {
//     iconName = focused ? 'settings-sharp' : 'settings-outline';
//   }

//   // Choose the icon component based on the specified library
//   if (iconLibrary === 'Ionicons') {
//     IconComponent = Ionicons;
//   } else if (iconLibrary === 'FontAwesome') {
//     IconComponent = FontAwesome;
//   }
//   // Add more conditions for other icon libraries as needed

//   return (
//     <IconComponent
//       name={iconName}
//       size={22}
//       color={focused ? colors.mainButton : 'black'}
//     />
//   );
// },


export const BottomTabSupplier = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.mainHeader,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontWeight: '500',
        },
        tabBarStyle: {
          height: 45,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'receipt-sharp' : 'receipt-outline';
          } else if (route.name === 'Shops') {
            iconName = focused ? 'person-sharp' : 'person-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart-sharp' : 'cart-outline';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'settings-sharp' : 'settings-outline';
          }
          return (
            <Ionic
              name={iconName}
              size={22}
              color={focused ? colors.mainButton : 'black'}
            />
          );
        },
      })}
      >
      <Tab.Screen
        name="Home"
        component={HomeSupplier}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Order"
        component={SupplierOrderScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      {/* <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarBadge: cartTotal > 0 ? cartTotal : null,
          tabBarBadgeStyle: {
            backgroundColor: 'blue',
            fontSize: 12,
          },
        }}
      /> */}
      <Tab.Screen
        name="Shops"
        component={CompanySupplierList}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
        <Tab.Screen
        name="shops"
        component={WalletSection}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SupplierSetting}
        options={{
          title: 'Settings',
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export const LoginScreenNavigator = ({ }) => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SwiperScreen"
        component={SwiperScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabScreen"
        // component={BottomTabScreen}
        children={() => {
          return <BottomTabScreen />;
        }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawerNavigator"
        // component={BottomTabScreen}
        children={() => {
          return <DrawerNavigator />;
        }}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="BottomTabSupplier"
        component={BottomTabSupplier}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="BottomTabSupplier"
        // component={BottomTabScreen}
        children={() => {
          return <BottomTabSupplier />;
        }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartCard"
        component={CartCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsDemoScreen"
        component={DetailsDemoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddtoWallet"
        component={AddtoWallet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewTransactions"
        component={ViewTransactions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrackOrderSupplier"
        component={TrackOrderSupplier}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="TrackOrder"
        component={TrackOrder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderFeedback"
        component={OrderFeedback}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppFeedback"
        component={AppFeedback}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SupplierListScreen1"
        component={SupplierListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SupplierOrder"
        component={SupplierOrder}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HistoryItemsSupplier"
        component={HistoryItemsSupplier}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ForgetScreen"
        component={ForgetScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Testing"
        component={Testing}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default MainStackScreen;
