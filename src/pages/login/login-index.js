/*
*  登陆首页，登陆方式选择页面
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import Footer from './footer'
import IndexHeader from './login-index.header'
import PhoneInput from './phone-input'
import VerifyCode from './verify-code'
import commonStyle from '../../utils/common-style'
import SlideAnimation from './animation-view'
console.log(commonStyle)
export default class LoginIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentPage: 0,
      btnState: true,
      telNumber: '',
      isNumber: false,
      isLoginBtn: true,
      isRegister: false, // 当前用户是否注册
      isSendCode: true, // 是否已经发送验证码
      remainTime: 0 // 验证码倒计时
    }
    this.timer = null; // 用于验证码倒计时
    // 页面信息
    this.pageData = [
      {
        name: 'login-index',
        ShowLoginType: true, // 是否显示第三方登陆区域
        nextBtn: {
          isActive: true, // 下方按钮是否激活
          text: '手机号登陆', // 按钮显示文本
          activeByKey: 'isLoginBtn'
        }
      },
      {
        name: 'phone-input',
        ShowLoginType: true,
        nextBtn: {
          isActive: true, // 按钮激活条件
          text: '下一步',
          activeByKey: 'telNumber',
        }
      },
      {
        name: 'verify-code',
        ShowLoginType: false,
        nextBtn: {
          isActive: false,
          text: '重发验证码',
          activeByKey: 'isSendCode'
        }
      }
    ]
  }
  // 电话号码改变事件
  telChange(value) {
    this.setState({telNumber: value, isNumber: true})
  }
  // 根据当前状态返回特定组件
  getPage(pageIndex) {
    switch(pageIndex) {
      case 0:
        return(
          <IndexHeader />
        )
        break;
      case 1:
        return (
          <SlideAnimation style={style.header}>
            <PhoneInput valueChange={(value) => { this.telChange(value) }}/>
          </SlideAnimation>
        )
        break;
      case 2:
      return (
        <SlideAnimation style={style.header}>
          <VerifyCode verifyCodeChange={(value) => { this.codeChange(value) }} isSendCode={this.state.isSendCode}/>
        </SlideAnimation>
      )
      break;
    }
  }

  // 改变当前按钮的状态 激活/禁用
  setActiveValue(value) {
    this.pageData[this.state.curentPage].isActive = value
  }
  // 设置定时器
  setTimer() {
    if (this.timer !== null) return
    this.setState({
      isSendCode: false
    })
    let count = 0
    this.timer = setInterval( () => {
      count++
      this.setState({remainTime: 60 - count})
      if (count === 60) {
        clearInterval(this.timer)
        this.setState({
          remainTime: 0,
          isSendCode: true
        })
        this.timer = null
      }
     }, 1000)
  }
  //发送验证码逻辑
  sendCode() {
    if (this.state.remainTime > 0) return
    this.setTimer();
  }
  render() {
    return(
      <View style={[style.container, commonStyle.pageBg]}>
        <View style={style.header}>
          {this.getPage(this.state.curentPage)}
        </View>
        <View style={style.btnContain}>
          <TouchableOpacity
           style = {this.state[this.pageData[this.state.curentPage].nextBtn.activeByKey] ? commonStyle.btnStyle : commonStyle.btnDisable}
           activeOpacity={0.5}
           onPress={() => {
             let cur = this.state.curentPage;

             // 当前显示的是验证码页面
             if (this.pageData[cur].name === 'verify-code') {
               this.sendCode()
             } else {
               this.setState({curentPage : cur + 1})
             }
           }}
          >
            <Text
              style={commonStyle.btnText}
            >
              {this.pageData[this.state.curentPage].nextBtn.text + (this.pageData[this.state.curentPage].name === 'verify-code' ? (this.state.remainTime === 0 ? '' : `${this.state.remainTime}S`) : '')}
            </Text>
          </TouchableOpacity>
        </View>
        <Footer
          ShowLoginType={this.pageData[this.state.curentPage].ShowLoginType}
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
    flex: 1
  },
  btnContain: {
    flex: 1,
    justifyContent: 'center',
  }
})
