/**
 * 匹配成功列表项组件
 */
import React, { Component } from 'react';
import {
  View,
  Style,
  StyleSheet,
  Image
} from 'react-native'

export default class MatchItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avartar: 'http://211.159.182.124/resource/image/1539702991.jpeg',
      nickName: '刘四六',
      hasUnread: true,
      newMsgContent: '对方想和你一起玩游戏',
      isOnline: true,
      lastMagTime: '星期三'
    }
  }

  // 获取未读消息提示，即是那个小红点
  getUnreadNotice(haveUnread) {
    if (!haveUnread) {
      return ;
    }
    return (
      <View style = {style.unreadNotice}></View>
    )
  }

  // 获取用户是否在线提示
  getOnlineStateView(isOnline) {
    if (!isOnline) {
      return;
    }
    return(
      <View style = {style.lineStateContainer}>
         <View style = {style.onlineNotice}></View>
         <Text style = {style.onlineText}>在线</Text>
      </View>
    )
  }
  render() {
    return(
      <View>
         <View style = {avatarNameContainer}>
            <View style = {style.avatarContainer}>
              <Image
                source = {{uri: this.state.avartar}}
              >
              </Image>
              {
                this.getUnreadNotice(this.state.hasUnread)
              }
            </View>
            <View style = {style.nameContainer}>
              <Text style = {style.nameText}>{this.state.nickName}</Text>
              <Text style = {style.nameText}>{this.state.newMsgContent}</Text>
            </View>
         </View>
         <View style = {dateAndStateContainer}>
            <Text style = {style.dateText}>{this.state.lastMagTime}</Text>
            {
              this.getOnlineStateView(this.state.isOnline)
            }
         </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  btnlikeImg: {
    width: 70,
    height: 50
  },
})