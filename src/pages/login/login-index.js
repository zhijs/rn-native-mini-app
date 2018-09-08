/*
*  登陆首页，登陆方式选择页面
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground} from 'react-native';
import Button from '../../components/button'
import Footer from './footer'
import PhoneInput from './phone-input'
// 点击手机号登陆
// const telLogin = () => {
//   console.log('手机号登陆');
//   console.log(this)
//   const { navigate } = this.props.navigation;
//   navigate('PhoneInput')
// }

export default class LoginIndex extends Component {
  
  render() {
    return(
      <View style={style.container}>
        <View style={style.header}>
          <View style={style.heaerIcon}>
            <Text style={style.headerText}>21</Text>
          </View>
        </View>
        <View style={style.btnContain}>
          <Button
            btnStyle={style.loginBtn}
            title="手机号码登陆"
            onPress = {(() => {
              const { navigate } = this.props.navigation;
              alert(this)
              navigate('PhoneInput')
            }).bind(this)}
            textStyle={style.btnText}
          />
        </View>
        <Footer
          ShowLoginType={true}
        />
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
    heaerIcon: {
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
    },
  btnContain: {
    flex: 2,
    justifyContent: 'center',
  },
    loginBtn: {
      backgroundColor: '#FFD801',
      height: 35,
      margin: 30,
      borderRadius: 7,
    },
    btnText: {
      lineHeight: 35,
      textAlign: 'center',
      color: '#000000'
    }
})