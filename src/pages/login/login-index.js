/*
*  登陆首页，登陆方式选择页面
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import Footer from './footer'
import phoneInput from './phone-input'
import commonStyle from '../../utils/common-style'

//import passwordInput from './passwd-input'




export default class LoginIndex extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={[style.container, commonStyle.pageBg]}>
        <View style={style.header}>

          <View style={style.headerIcon}>

            <Text style={style.headerText}>21</Text>

          </View>
        </View>
        <View style={style.btnContain}>
          <TouchableOpacity
           style = {commonStyle.btnStyle}
           activeOpacity={0.5}
           onPress={() => {
             navigate('passwordInput')
           }}
          >
            <Text
              style={commonStyle.btnText}
            >
              手机号码登陆
            </Text>
          </TouchableOpacity>
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
    },
  btnContain: {
    flex: 2,
    justifyContent: 'center',
  }
})