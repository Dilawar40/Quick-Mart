/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Register the main component
AppRegistry.registerComponent(appName, () => App);

// Web platform support (if needed)
if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('X');
    AppRegistry.runApplication(appName, { rootTag }); // Use the name from app.json
}
