import React, { Component } from 'react';
import {
  View,
  Style,
  StyleSheet,
  Image
} from 'react-native'

export default class LikeView extends Component {
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