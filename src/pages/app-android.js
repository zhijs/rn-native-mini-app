/*
* android 平台入口文件
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import LoginIndex from './login/login-index'
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

