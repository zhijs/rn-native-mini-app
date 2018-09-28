/**
 * 底部导航条图标
 */
import React, { Component } from 'react';
import {
  Style,
  Image,
  StyleSheet
} from 'react-native'
import svgs from '.././utils/svgs'
import SvgUri from 'react-native-svg-uri'
export default class TabIcon extends Component {
  constructor(props) {
    super(props);
    console.log('TabIcon', props)
  }
  render() {
    const {
      isActive,
      activeImg,
      defaultImg
    } = this.props
    return(
      <Image
        source = {isActive ? require(`${activeImg}`) : require(`${defaultImg}`)}
        style = {isActive ? style.tabItem : tabItem}
      />
    )
  }
}
const style = StyleSheet.create({
  tabItemActive: {
    width: 40,
    height: 49
  },
  tabItem: {
    width: 30,
    height: 30
  }
})