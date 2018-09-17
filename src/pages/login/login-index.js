/*
*  登陆首页，登陆方式选择页面
*/
import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  BackHandler
} 
from 'react-native';

import Footer from './footer'
import IndexHeader from './login-index.header'
import PhoneInput from './phone-input'
import VerifyCode from './verify-code'
import PasswdInput from './passwd-input'
import UserInfo from './user-info'
import commonStyle from '../../utils/common-style'
import SlideAnimation from './animation-view'
console.log(commonStyle)
export default class LoginIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentPage: 0,
      btnState: true,
      telNumber: '15989512453',
      isNumber: true,
      isLoginBtn: true,
      isRegister: false, // 当前用户是否注册
      isSendCode: true, // 是否已经发送验证码
      remainTime: 0, // 验证码倒计时
      passwd: '',
      userInfoBtn: true,
      userName: '', // 用户名
      gender: 0, // 0-男性， 1-女性, 
      birthDay: '',
      direction: 1 // ui切换方向 direction: 1 向前切换， 0 向后切换
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
        },
        pageStyle: {
          flex:1
        }
      },
      {
        name: 'phone-input',
        ShowLoginType: true,
        nextBtn: {
          isActive: true, // 按钮激活条件
          text: '下一步',
          activeByKey: 'isNumber',
        },
        pageStyle: {
          flex:1
        }
      },
      {
        name: 'verify-code',
        ShowLoginType: false,
        nextBtn: {
          isActive: false,
          text: '重发验证码',
          activeByKey: 'isSendCode'
        },
        pageStyle: {
          flex:1
        }
      },
      {
        name: 'passwd-input',
        ShowLoginType: false,
        nextBtn: {
          isActive: false,
          text: this.state.isRegister ? '登录' : '下一步',
          activeByKey: 'passwd'
        },
        pageStyle: {
          flex:1
        }
      },
      {
        name: 'user-info',
        ShowLoginType: false,
        nextBtn: {
          isActive: true,
          text: '确定',
          activeByKey: 'userInfoBtn'
        },
        pageStyle: {
          flex: 3
        }
      }
    ]
  }
  // 监听用户回退事件
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  // }
  // 用户点击回退按钮
  handleBackPress = () => {
    console.log('点击了返回键')
    if (this.state.curentPage === 0) {
      // 直接退出程序
      BackHandler.exitApp();
      return true
    } else {
      let cur = this.state.curentPage;
      this.setState({direction: 0})
      this.setState({curentPage: cur - 1})
      console.log('当前页面', cur)
      return true
    }
    return true
  }
  // 电话号码改变事件
  telChange(value) {
    this.setState({telNumber: value, isNumber: true})
  }

  // 密码框输入改变事件
  pwdChange(value) {
    this.setState({passwd: value})
  }

  // 完善用户信息界面相关监听
  userNameChange(value) {
    this.setState({userName: value})
  }

  // 性别改变
  genderChange(value) {
    this.setState({gender: value})
  }

  // 出生日期改变
  birthDayChange(value) {
    this.setState({birthDay: value})
  }

  // 检测当前用户是否注册
  checkRegister() {

  }
  // 根据当前状态返回特定组件
  getPage(pageIndex, direction) {
    switch(pageIndex) {
      case 0:
        return(
          <IndexHeader />
        )
        break;
      case 1:
        return (
          <SlideAnimation style={style.header} key={`PhoneInput${direction}`} direction={direction}>
            <PhoneInput valueChange={(value) => { this.telChange(value) }}/>
          </SlideAnimation>
        )
        break;
      case 2:
        return (
          <SlideAnimation style={style.header} key={`VerifyCode${direction}`} direction={direction}>
            <VerifyCode 
              verifyCodeChange={(value) => { this.codeChange(value) }} 
              isSendCode={this.state.isSendCode} 
              checkCode={(value) => {this.checkCode(value)}}
            />
          </SlideAnimation>
        )
        break;
      case 3:
        return (
          <SlideAnimation style={style.header} key={`PasswdInput${direction}`} direction={direction}>
            <PasswdInput passwdChange={(value) => { this.pwdChange(value) }}/>
          </SlideAnimation>
        )
        break;
      case 4:
        return (
          <SlideAnimation style={style.header} key={`UserInfo${direction}`} direction={direction}>
            <UserInfo 
              userNameChange={(value) => { this.userNameChange(value) }}
              genderChange={(value) => { this.genderChange(value) }}
              birthDayChange={(value) => {this.birthDayChange(value)}}
            />
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

  // 验证码验证逻辑
  checkCode(value) {
    let cur = this.state.curentPage
    this.setState({ curentPage: cur + 1} );
  }
  render() {
    return(
      <View style={[style.container, commonStyle.pageBg]}>
        <View style={this.pageData[this.state.curentPage].pageStyle}>
          {this.getPage(this.state.curentPage, this.state.direction)}
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
             } else if (this.pageData[cur].name === 'phone-input') {
               // 检测当前用户是否注册
               this.checkRegister()
             }
             if (cur !== this.pageData.length - 1){
               this.setState({direction : 1})
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
