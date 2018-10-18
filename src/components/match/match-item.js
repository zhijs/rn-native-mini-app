/**
 * 匹配成功列表项组件
 */
import React, { Component } from 'react';
import {
  View,
  Style,
  StyleSheet,
  Image,
  Text
} from 'react-native'

export default class MatchItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avartar: 'http://211.159.182.124/resource/image/1539770238.jpeg',
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
      <View style = {style.container}>
         <View style = {style.avatarNameContainer}>
              <View style = {style.avatarContainer}>
                <Image
                  style = {style.avatar}
                  source = {{uri: this.state.avartar}}
                >
                </Image>
                {
                  this.getUnreadNotice(this.state.hasUnread)
                }
              </View>
              <View style = {style.nameContainer}>
                <Text style = {style.nameText}>{this.state.nickName}</Text>
                <Text style = {style.contentText}>{this.state.newMsgContent}</Text>
              </View>
         </View>
          <View style = {style.dateAndStateContainer}>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 6,
    borderColor: '#f3f3f3'
  },
  avatarNameContainer: {
    height: 60,
    flexDirection: 'row',
  },
  avatarContainer: {
    position: 'relative',
    height: 60,
    width: 60,
    marginLeft: 10
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 4
  },
  unreadNotice: {
    position: 'absolute',
    width: 8,
    height: 8,
    top: -4,
    right: -4,
    borderRadius: 4,
    backgroundColor: '#ff3030'
  },
  nameContainer: {
    paddingLeft: 10,
    height: '100%'
  },
  nameText: {
    padding: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#000000'
  },
  contentText: {
    padding: 5,
    fontSize: 12
  },
  dateAndStateContainer: {
    fontSize: 12,
    marginRight: 10,
    justifyContent: 'center'
  },
  dateText: {
    padding: 5,
    fontSize: 12,
    color: '#eaeaea'
  },
  lineStateContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  onlineNotice: {
    width: 6,
    height: 6,
    margin: 'auto',
    backgroundColor:'#00d3be',
    borderRadius: 3
  },
  onlineText: {
    padding: 5,
    fontSize: 12,
  }
})