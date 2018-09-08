/*
* android 平台入口文件
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginIndex from './login/login-index'
import PhoneInput from './login/phone-input'
// 导航页
const App = createStackNavigator({
  phoneInput : { screen: PhoneInput },
  LoginIndex : { screen: LoginIndex },
});
export default class AndroidApp extends Component {
  render() {
    return (
      <View style={style.container}>
        <LoginIndex></LoginIndex>
      </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  }
});

