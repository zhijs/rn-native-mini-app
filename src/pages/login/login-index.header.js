/*
*  登陆首页，头部组件
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';

export default class LoginIndex extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={style.header}>
        <View style={style.headerIcon}>
          <Text style={style.headerText}>21</Text>
        </View>
      </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
    headerIcon: {
      height: 60,
      width: 60,
      borderRadius: 45,
      backgroundColor: '#FFD801'
    },
    headerText: {
      lineHeight: 60,
      textAlign: 'center',
      color: '#444444',
      fontSize: 30,
      fontWeight: '900'
    }
})
