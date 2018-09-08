/**
 * 手机号输入页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput} from 'react-native';
import Button from '../../components/button'
import Footer from './footer'

// 点击输入手机号后点击下一步
const onPress = () => {
  console.log('....')
}
export default class phoneInput extends Component {
  render() {
    return (
      <View>
        <View>
          <Text>输入手机号码</Text>
          <Text>我们不会泄露您的号码</Text> 
        </View>
        <View>
         <TextInput/>
         <Button
           onPress = {onPress}
           title="下一步"
         >
         </Button>
        </View>
        <Footer
          ShowLoginType={true}
        />
      </View>
    )
  }
}