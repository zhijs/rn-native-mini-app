/**
 * button 组件
 * 
 */

import React, { Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Button extends Component {
  render() {
    const {
      title,
      btnStyle,
      textStyle,
      onPress
    } = this.props
    if (!onPress) {
      console.log('button shoud need onpress')
      throw new Error('button shoud need onpress')
    }
    return(
      <TouchableOpacity
        style = {btnStyle}
        onPress={onPress}
      >
        <Text
          style={textStyle}
        >
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}
