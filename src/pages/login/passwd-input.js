/**
 * 手机号输入页面
 */
import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import commonStyle from '../../utils/common-style'

export default class passwordInput extends Component {

  constructor(props) {
    super(props);
    this.state ={
      showPwd: false,
      pawIsValid: false
    }
  }
  getForgetPwdView() {
    if (this.props.isRegister) {
      return ( 
        <View>
          <Text style={style.sBtnText}>忘记密码</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.itemContainer}>
          <Text style={style.opTips}>{this.props.isRegister ? '输入密码' : '设置密码'}</Text>
          <Text style={[style.tipPromise, this.state.pawIsValid ? '' : commonStyle.warmText]}>{this.state.pawIsValid ? '6-18个字符' : '请输入6-18个字符'}</Text>
        </View>      
        <View style={style.editContainer}>
          <TextInput
              maxLength={18}
              minLength={6}
              style={style.edit}
              keyboardType="numeric"
              autoFocus={true}
              underlineColorAndroid="transparent"
              textContentType={this.state.showPwd ? 'password' : 'none'}
              placeholder="输入密码"
              secureTextEntry={!this.state.showPwd}
              onChangeText={(value) => {
                if (value.length >= 6 && value.length <= 18) {
                  this.setState({pawIsValid: true})
                  this.props.passwdChange(value)
                } else {
                  this.setState({pawIsValid: false})
                }
              }}
            />
            <TouchableOpacity
              style={style.eyeContainer}
              onLongPress={() => {
                this.setState({showPwd: true});
              }}
              onPressOut={() => {
                this.setState({showPwd: false});
              }}
            >
              <Image
                style={style.pwdEye}
                source={this.state.showPwd ? require("../../assets/images/eye_open.png") : require("../../assets/images/eye_close.png") }
              />
            </TouchableOpacity>

        </View>
        { this.getForgetPwdView()}
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
      marginTop: 30
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
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10
  },
  edit: {
    flex: 1,
    textAlign:'center',
    color: '#464646'
  },
  eyeContainer: {
    width: 50,
    justifyContent: 'center',
  },
  pwdEye: {
    width: 28,
    height: 18,
    marginRight: 15
  },
  sBtnText: {
    textAlign: 'right',
    color: '#444444',
    fontSize: 14,
    marginRight: 30,
  }

})




