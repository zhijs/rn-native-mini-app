/**
 * 手机号输入页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import Button from '../../components/button'
import Footer from './footer'
import commonStyle from '../../utils/common-style'
import { checkTelNumber } from '../../utils/tool'

export default class passwordInput extends Component {
  constructor(props) {
    super(props);
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
              textContentType="password"
              placeholder="输入密码"

            />
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
  }
})




