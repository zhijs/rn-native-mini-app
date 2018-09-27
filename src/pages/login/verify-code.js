/**
 * 验证码页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import Footer from './footer'
import commonStyle from '../../utils/common-style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class VerifyCode extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      VerifyCodeArr: ['', '', '', '', '', ''],
      currentIndex: 0
    };
    this.timer = null
  }
  render() {
    return (
      <View style={[style.container, commonStyle.pageBg]}>
        <KeyboardAwareScrollView>
          <View tyle={style.itemContainer}>
            <Text style={style.opTips}>输入验证码</Text>
            <Text style={style.tipPromise}>{this.props.isSendCode ? '验证码已发送至您的手机' : '' }</Text> 
          </View>
          <View style={style.editContainer}>
                {this.state.VerifyCodeArr.map((code, i) => {
                  return(
                    <TextInput
                      key={i}
                      maxLength={1}
                      style={[style.edit, this.state.currentIndex === i ? style.editFocus : '']}
                      keyboardType="numeric"
                      ref={"verifyItem" + i}
                      autoFocus={i === 0 ? true : false}
                      underlineColorAndroid="transparent"
                      value= {code}
                      onChangeText= {(value) => {
                        
                        let arr = this.state.VerifyCodeArr;
                        arr[i] = value
                        this.setState({VerifyCodeArr: arr})
                        if (i < arr.length - 1 && value !== '') {
                          this.refs['verifyItem' +　(i +　1)].focus()
                          this.setState({currentIndex: i + 1})
                        }
                        // 验证码输入完毕
                        if (i === arr.length - 1) {
                          console.log('VerifyCodeArr', this.state.VerifyCodeArr);
                          if (this.state.VerifyCodeArr.every((value) => {
                            return value !== ''
                          })) {
                            this.props.checkCode(this.state.VerifyCodeArr)
                          }
                        }
                      }}
                      onKeyPress= {({nativeEvent}) => {
                        // 这里监听验证码删除
                        console.log('onKeyPress', nativeEvent)

                        if (i > 0 && nativeEvent!== undefined && nativeEvent.key === 'Backspace') {
                          let arr = this.state.VerifyCodeArr;
                          let curent = 0
                          if(arr[i] !== '') {
                            arr[i] = '';
                            this.refs['verifyItem' +　i].focus()
                            curent = i
                          } else {
                            this.refs['verifyItem' +　(i -　1)].focus()
                            // this.refs['verifyItem' +　(i -　1)].value = ''
                            arr[i - 1] = '';
                            curent = i - 1
                          }
                          this.setState({VerifyCodeArr: arr, currentIndex: curent})
                        }
                      }}
                    />
                  )
                })}
            </View>
          </KeyboardAwareScrollView>
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
    flex: 1,
    justifyContent: 'space-around',
    margin: 30,
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 2
  },
  edit: {
    width: 45,
    backgroundColor: '#f4f4f4',
    textAlign:'center',
    color: '#464646',
    borderRadius: 8
  },
  editFocus: {
    borderColor: '#b7b7b7',
    borderWidth: 1,
  }
})