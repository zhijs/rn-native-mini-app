/**
 * 验证码页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import Button from '../../components/button'
import Footer from './footer'
import commonStyle from '../../utils/common-style'
import { checkTelNumber } from '../../utils/tool'

export default class VerifyCode extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hadSendCode: true,
      remainTime: 0,
      canRendCode: true,
      VerifyCodeArr: ['', '', '', '', '', ''],
    };
    this.timer = null
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[style.container, commonStyle.pageBg]}>
        <View tyle={style.itemContainer}>
          <Text style={style.opTips}>输入验证码</Text>
          <Text style={style.tipPromise}>{this.state.hadSendCode ? '验证码已发送至您的手机' : '' }</Text> 
        </View>
        <View style={style.itemContainer}>
         <View style={style.editContainer}>
            {this.state.VerifyCodeArr.map((code, i) => {
              return(
                <TextInput
                  key={i}
                  maxLength={1}
                  style={style.edit}
                  keyboardType="numeric"
                  ref={"verifyItem" + i}
                  autoFocus={i === 0 ? true : false}
                  underlineColorAndroid="transparent"
                  onChangeText= {(value) => {
                    let arr = this.state.VerifyCodeArr;
                    arr[i] = value
                    this.setState({VerifyCodeArr: arr})
                    if (i < arr.length - 1) {
                      this.refs['verifyItem' +　(i +　1)].focus()
                    }
                  }}
                  onKeyPress= {(event) => {
                    // 这里监听验证码删除
                    console.log('verify code onKeyPress i', event);
                  }}
                />
              )
            })}
          </View>
          <View style={style.btnContain}>
              <TouchableOpacity
                style = {this.state.canRendCode ? commonStyle.btnStyle : commonStyle.btnDisable }
                onPress={() => {
                  console.log(navigate)
                  navigate('UserInfo')
                  return;
                   // 这里执行重发验证码操作
                  if (this.timer !== null) return
                  this.setState({
                    canRendCode: false
                  })
                  let count = 0
                  this.timer = setInterval( () => {
                    count++
                    this.setState({remainTime: 60 - count})
                    if (count === 60) {
                      clearInterval(this.timer)
                      this.setState({
                        remainTime: 0,
                        canRendCode: true
                      })
                      this.timer = null
                    }
                   }, 1000)
                }}
              >
                <Text
                  style={commonStyle.btnText}
                >
                  {this.state.canRendCode ? '重发验证码' : `重发验证码${this.state.remainTime !== 0 ? this.state.remainTime + 's' : ''}`}
                </Text>
              </TouchableOpacity>
          </View>
        </View>
        <View style={style.itemContainer}>
          <Footer
            ShowLoginType={false}
          />
          </View>
      </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  },
    itemContainer: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 15
    },
    opTips: {
      textAlign: 'center',
      color: '#444444',
      fontSize: 25,
      fontWeight: '900'
    },
    tipPromise: {
      color: '#c9c9c9',
      fontSize: 15,
      marginTop: 10,
      textAlign: 'center'
    },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 30,
    marginTop: 20,
    marginBottom: 10
  },
  edit: {
    width: 45,
    backgroundColor: '#f4f4f4',
    textAlign:'center',
    color: '#464646',
    borderRadius: 8
  }
})