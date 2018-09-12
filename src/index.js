/**
 * 程序入口，用于生成导航栏和导航条
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginIndex from './pages/login/login-index'
import PhoneInput from './pages/login/phone-input'
import VerifyCode from './pages/login/verify-code'
import UserInfo from './pages/login/user-info'
import passwordInput from './pages/login/passwd-input'
// 导航页

const App = StackNavigator({
  LoginIndex : { screen: LoginIndex },
  phoneInput : { screen: PhoneInput },
  passwordInput : { screen: passwordInput},
  VerifyCode: {screen: VerifyCode},
  UserInfo: {screen: UserInfo},
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


