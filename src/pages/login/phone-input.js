/**
 * 手机号输入页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import Button from '../../components/button'
import Footer from './footer'
import commonStyle from '../../utils/common-style'
import { checkTelNumber } from '../../utils/tool'

export default class phoneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTelNumber: true,
      telNumber: ''
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[style.container, commonStyle.pageBg]}>
        <View tyle={style.itemContainer}>
          <Text style={style.opTips}>输入手机号码</Text>
          <Text style={style.tipPromise}>我们不会泄露您的号码</Text> 
        </View>
        <View style={style.itemContainer}>
         <View style={style.editContainer}>
            <TextInput
              maxLength={11}
              style={style.edit}
              keyboardType="numeric"
              autoFocus={true}
              underlineColorAndroid="transparent"
              textContentType="telephoneNumber"
              placeholder="11位手机号码"
              onChangeText= {(value) => {
                // 检验是否是合法手机号码
                if (checkTelNumber(value)) {
                  this.setState({isTelNumber: true})
                } else {
                  this.setState({isTelNumber: false})
                }
              }}
            />
          </View>
          <View style={style.btnContain}>
              <TouchableOpacity
                style = {this.state.isTelNumber ? commonStyle.btnStyle : commonStyle.btnDisable }
                onPress={() => {
                  if (this.state.isTelNumber) {
                    navigate('VerifyCode')
                  }
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
        <View style={[style.itemContainer]}>
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
    justifyContent: 'center',
    margin: 30,
    marginTop: 20,
    marginBottom: 10
  },
  edit: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    textAlign:'center',
    color: '#464646',
    borderRadius: 10
  },
  footerContainer: {
    flexDirection: 'row'

  }
})