/** @format */

import {AppRegistry} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';

// 去除调试提醒
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
