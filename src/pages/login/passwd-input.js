/**
 * 手机号输入页面
 */
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import Footer from './footer'
import commonStyle from '../../utils/common-style'

export default class passwordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPwd: false,
    };
}


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[style.container, commonStyle.pageBg]}>
        <View style={style.itemContainer}>
          <Text style={style.opTips}>输入密码</Text>
          <Text style={style.tipPromise}>6-18个字符</Text>
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
            />
            <TouchableOpacity
              style={style.eyeContainer}
              onLongPress={() => {
                console.log('长按眼睛');
                this.setState({showPwd: true});
              }}
            >
              <Image
                style={style.pwdEye}
                source={this.state.showPwd ? require("../../assets/images/eye_open.png") : require("../../assets/images/eye_close.png") }
              />
            </TouchableOpacity>

        </View>
        <View>
          <Text style={style.sBtnText}>忘记密码</Text>
        </View>
          
        <View style={style.btnContain}>
          <TouchableOpacity
           style = {commonStyle.btnDisable}
           activeOpacity={0.5}
          >
            <Text
              style={[commonStyle.btnText ,style.btnText]}
            >
              下一步
            </Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    margin: 30,
    marginTop: 20,
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
  },

  btnText: {
   backgroundColor:'#DADADA',
   color:'#FFFFFF',
   
  },

})




