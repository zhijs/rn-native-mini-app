/*
*  登陆首页，登陆方式选择页面
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import Footer from './footer'
import IndexHeader from './login-index.header'
import PhoneInput from './phone-input'
import commonStyle from '../../utils/common-style'

console.log(commonStyle)
// 页面信息
const pageData = [
  {
    name: 'login-index',
    ShowLoginType: true, // 是否显示第三方登陆区域
    nextBtn: {
      isActive: true, // 下方按钮是否激活
      text: '手机号登陆' // 按钮显示文本
    }
  },
 {
   name: 'phone-input',
   ShowLoginType: true,
   nextBtn: {
     isActive: false, // 按钮激活条件
     text: '下一步',
     activeByKey: 'telNumber',
     checkActive: (value) => {
       
     }
   }
 }
]
export default class LoginIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentPage: 0,
      btnState: true,
      telNumber: ''
    }
  }
  // 根据当前状态返回特定组件
  getPage(pageIndex) {
    switch(pageIndex) {
      case 0:
        return(
          <IndexHeader/>
        )
        break;
      case 1:
        return (
          <PhoneInput/>
        )
    }
  }

  // 改变当前按钮的状态 激活/禁用
  setActiveValue(value) {
    pageData[this.state.curentPage].isActive = value
  }
  render() {
    return(
      <View style={[style.container, commonStyle.pageBg]}>
        <View style={style.header}>
          {this.getPage(this.state.curentPage)}
        </View>
        <View style={style.btnContain}>
          <TouchableOpacity
           style = {pageData[this.state.curentPage].nextBtn.isActive ? commonStyle.btnStyle : commonStyle.btnDisable}
           activeOpacity={0.5}
           onPress={() => {
             let cur = this.state.curentPage;
             this.setState({curentPage : cur + 1})
           }}
          >
            <Text
              style={commonStyle.btnText}
            >
              {pageData[this.state.curentPage].nextBtn.text}
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
    flex: 1
  },
  btnContain: {
    flex: 1,
    justifyContent: 'center',
  }
})
