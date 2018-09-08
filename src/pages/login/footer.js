/**
 * 底部 第三放登陆组件footer
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground} from 'react-native';
import Svg from '../../components/svg'
export default class footer extends Component {
  render() {
    return(
      <View style={style.footer}>
      <Text style={style.footerTitle}>- - - - - - - - - - - -第三方账号快速登陆- - - - - - - - - - - -</Text>
      <View style={style.svgContent}>
        <View style={style.svgTab}>
          <Svg
            style={style.svgStyle}
            name='weixin'
            size="50"
          />
        </View>
        <View style={style.svgTab}>
          <Svg
            style={style.svgStyle}
            name='qq'
            size="50"
          />
        </View>
      </View>
      <ImageBackground 
        style={style.footerTips}
        width="100"
        height="50"
        source={require("../../assets/images/Group.png")}
      >
        <Text>登陆即表明您同意我们的</Text><Text style={style.protocolText}>&lt;&lt;用户协议&gt;&gt;</Text>
      </ImageBackground>
    </View>
    )
  }
}
const style = StyleSheet.create({
  footer: {
    flex: 2,
    justifyContent: 'space-between'
  },
  footerTitle: {
    flex: 1,
    lineHeight: 40,
    textAlign: 'center',
    color: '#c0c0c0'
  },
  svgContent: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
    svgTab: {
      width: 80,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10
    },
  footerTips: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
    protocolText: {
      color: '#cdcdcd'
    }
})