/**
 * 聊天页面-登陆成功后页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import commonStyle from '../utils/common-style'
export default class Chat extends Component {
  render() {
    return (
      <View style = {[commonStyle.pageBg]}>
        <Text>聊天页面</Text>
      </View>
    )
  }
}