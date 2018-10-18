/**
 * 谁喜欢了我界面-顶部导航条
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
export default class LikeMeTitle extends Component {
  render() {
    return (
      <View style = {style.likeMeContainer}>
        <Text style = {style.likeText}>谁喜欢了我</Text>
        <View style = {style.likeIconContainer}>
           <Text style = {style.likeMeNum}>1344</Text>
           <Image
             style = {style.likeIcon}
             source = {require('../assets/images/like-me-icon.png')}
           />
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  likeMeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  likeText: {
    flex: 1,
    textAlign: 'right',
    color: '#000000',
    fontSize: 14,
    fontWeight: '600'
  },
  likeIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  likeMeNum: {
    paddingRight: 5,
    color: '#000000'
  },
  likeIcon: {
    height: 18,
    width: 20
  }
})