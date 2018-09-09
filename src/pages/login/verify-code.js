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
      isSendCode: true,
      VerifyCodeArr: ['', '', '', '', '', '']
    }
  }

  render() {
    return (
      <View style={[style.container, commonStyle.pageBg]}>
        <View tyle={style.itemContainer}>
          <Text style={style.opTips}>输入验证码</Text>
          <Text style={style.tipPromise}>验证码已发送至您的手机</Text> 
        </View>
        <View style={style.itemContainer}>
         <View style={style.editContainer}>
            {this.state.VerifyCodeArr.map((code, i) => {
              return(
                <TextInput
                  maxLength={1}
                  style={style.edit}
                  keyboardType="numeric"
                  ref="verifyItem"
                  autoFocus={i === 0 ? true : false}
                  underlineColorAndroid="transparent"
                  onChangeText= {(value) => {
                    let arr = this.state.VerifyCodeArr;
                    arr[i] = value
                    this.setState({VerifyCodeArr: arr})
                    console.log('verify code')
                    console.log(this)
                    // if (i < arr.length - 1 && value !== '') {
                    //   this.refs.verifyItem[i + 1].focus()
                    // }
                  }}
                />
              )
            })}
          </View>
          <View style={style.btnContain}>
              <TouchableOpacity
                style = {this.state.isTelNumber ? commonStyle.btnStyle : commonStyle.btnDisable }
                onPress={() => {
                  console.log('../')
                }}
              >
                <Text
                  style={commonStyle.btnText}
                >
                  下一步
                </Text>
              </TouchableOpacity>
          </View>
        </View>
        <View style={style.itemContainer}>
          <Footer
            ShowLoginType={true}
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