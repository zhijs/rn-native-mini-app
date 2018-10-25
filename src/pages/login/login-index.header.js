/*
*  登陆首页，头部组件
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image } from 'react-native';

export default class LoginIndex extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={style.header}>
         <Image
           style = {style.logoImg}
           source = {require('../../assets/images/logo.png')}
         />
      </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    marginTop: 30,
    height: 150,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoImg: {
    width: 72,
    height: 100
  }
})
