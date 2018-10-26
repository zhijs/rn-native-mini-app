/**
 * svg 组件
 */
import React, { Component } from 'react';
import {
  View,
  Style
} from 'react-native'
import svgs from '.././utils/svgs'
import SvgUri from 'react-native-svg-uri'
export default class Svg extends Component {
  render() {
    const {
      name,
      style,
      size,
      color
    } = this.props
    let svgXmlData = svgs[this.props.name];
    if (!svgXmlData) {
      throw new Error(`${name} svg can not found`);
    }
    return(
      <SvgUri
        width={size}
        height={size}
        color={color}
        svgXmlData={svgXmlData}
      />
    )
  }
}