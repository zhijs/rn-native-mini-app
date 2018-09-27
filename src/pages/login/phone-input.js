/**
 * 手机号输入页面
 */
import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput, KeyboardAvoidingView  } from 'react-native';
export default class phoneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTelNumber: true,
      telNumber: ''
    }
  }
  render() {
    return (
      <View style={style.container}>
        <View style={style.itemContainer}>
          <Text style={style.opTips}>输入手机号码</Text>
        </View>
          <KeyboardAvoidingView
            behavior="height" 
            enabled
            style ={style.editContainer}
          >
            <TextInput
              maxLength={11}
              style={style.edit}
              keyboardType="numeric"
              autoFocus={true}
              underlineColorAndroid="transparent"
              textContentType="telephoneNumber"
              placeholder="11位手机号码"
              value={this.props.phone_number}
              onChangeText= {(value) => {
                // 检验是否是合法手机号码
                this.props.valueChange(value)

              }}
            />
          </KeyboardAvoidingView>
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
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  edit: {
    flex: 1,
    height: 50,
    backgroundColor: '#f4f4f4',
    textAlign:'center',
    color: '#464646',
    borderRadius: 10
  }
})