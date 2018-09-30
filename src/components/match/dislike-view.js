import React, { Component } from 'react';
import {
  View,
  Style,
  StyleSheet,
  Image
} from 'react-native'

export default class DisLikeView extends Component {
  render() {
    return(
      <Image
        style = {style.btnDislikeImg}
        source ={require('../../assets/images/dislike.png')}
      />
    )
  }
}

const style = StyleSheet.create({
  btnDislikeImg: {
    width: 70,
    height: 50
  },
})
