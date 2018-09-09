/**
 * 程序入口，用于生成导航栏和导航条
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginIndex from './pages/login/login-index'
import PhoneInput from './pages/login/phone-input'
import VerifyCode from './pages/login/verify-code'
// 导航页
// 去除调试提醒
console.ignoredYellowBox = ['Remote debugger']
const App = StackNavigator({
  LoginIndex : { screen: LoginIndex },
  phoneInput : { screen: PhoneInput },
  VerifyCode: {screen: VerifyCode},
  Main: {
    screen: LoginIndex,
    navigationOptions: ({navigation})=> ({
      header: null
    })
  }
}, {
  headerMode: 'screen'
});

export default App;