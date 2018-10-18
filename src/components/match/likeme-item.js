/**
 * 谁喜欢了我用户列表组件
 */
import React, { Component } from 'react';
import {
  View,
  Style,
  StyleSheet,
  Image
} from 'react-native'

export default class LikeView extends Component {
  constructor(props) {
    super(props)
    this.state
  }
  render() {
    return(
      <Image
        source ={require('../../assets/images/like.png')}
        style = {style.btnlikeImg}
      />
    )
  }
}

const style = StyleSheet.create({
  btnlikeImg: {
    width: 70,
    height: 50
  },
})