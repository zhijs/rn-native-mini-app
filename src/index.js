/**
 * 程序入口，用于生成导航栏和导航条
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {Provider} from "react-redux";
import configureStore from './store/index'
import registerScreens from './pages/container/index'

const store = configureStore({});
registerScreens(store, Provider);
import {
  LoginIndex,
  Chat
} from './pages/container/index'


// const App = createStackNavigator({
//   LoginIndex : { screen: LoginIndex},
//   Chat: {screen: Chat},
//   Main: {
//     screen: LoginIndex,
//     navigationOptions: ({navigation})=> ({
//       header: {
//         visible: false
//       }
//     })
//   }
// }, {
//   headerMode: 'screen'
// });

 const App  = Navigation.startSingleScreenApp({
  screen: {
  screen: 'xl_client.Login.Login', // unique ID registered with Navigation.registerScreen
  title: 'Welcome', // title of the screen as appears in the nav bar (optional)
  navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
  navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
});
export default App;


