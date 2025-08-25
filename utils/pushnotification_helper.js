import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    getFCMToken();
  }
}

export async function setupNotificationEvent() {
  onNotificationOpenedApp();
  getInitialNotification();
  ForegroundHandler();
  RemotePushController();
}

const getFCMToken = async () => {
  let fcmtoken = await AsyncStorage.getItem("fcmtoken");
  console.log("old Token:", fcmtoken);
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log("new Token:", fcmtoken);
        await AsyncStorage.setItem("fcmtoken", fcmtoken);
      }
    } catch (error) {
      console.log("error in fcmtoken: ", error);
    }
  }
};

const onNotificationOpenedApp = async () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });
};

// const notificationListener = async () => {
//   messaging().onNotificationOpenedApp((remoteMessage) => {
//     console.log(
//       "Notification caused app to open from background state:",
//       remoteMessage.notification
//     );
//   });
const getInitialNotification = async () => {
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
};

const ForegroundHandler = () => {
  const unsubscribe = messaging().onMessage((remoteMessage) => {
    console.log("received in foreground state:", remoteMessage);
    const { notification, messageId } = remoteMessage;
    PushNotification.localNotification({
      channelId: "your-channelId",
      id: messageId,
      title: notification.title,
      message: notification.body,
      soundName: "default",
      vibrate: true,
      playSound: true,
    });
  });
  return unsubscribe;
};

const RemotePushController = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log("token: ", token);
    },

    onNotification: function (notification) {
      console.log("Remote controller: ", notification);
      // Vibration.vibrate();
    },
    senderID: "1011384573477",
    popInitialNotification: true,
    requestPermissions: true,
  });
};
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const pushnotification_helper = () => {
//   return (
//     <View>
//       <Text>pushnotification_helper</Text>
//     </View>
//   )
// }

// export default pushnotification_helper

// const styles = StyleSheet.create({})
