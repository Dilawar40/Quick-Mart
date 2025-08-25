import PushNotification from 'react-native-push-notification';

// const createChannels = () => {
//   PushNotification.createChannel({
//     channelId: 'test-channel',
//     channelName: 'Test Channel',
//   });
// };
const showNotification = (title, message) => {
  PushNotification.localNotification({
    // channelId: 'test-channel',
    title: title,
    message: message,
  });
};

const handleScheduleNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    title: title,
    message: message,
    date: new Date(Date.now() + 5 * 1000),
  });
};

const handleCancelAllNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {
  showNotification,
  handleScheduleNotification,
  handleCancelAllNotification,
};
