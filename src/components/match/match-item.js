/**
 * 匹配成功列表项组件
 */
import React, { Component } from "react";
import { View, Style, StyleSheet, Image, Text } from "react-native";
import { date2str } from "../../utils/tool";

export default class MatchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avartar: "http://211.159.182.124/resource/image/1539770238.jpeg",
      nickName: "刘四六",
      hasUnread: true,
      newMsgContent: "对方想和你一起玩游戏",
      isOnline: true,
      lastMagTime: "星期三"
    };
  }

  // 获取未读消息提示，即是那个小红点
  getUnreadNotice(haveUnread) {
    if (!haveUnread) {
      return;
    }
    return <View style={style.unreadNotice} />;
  }

  // 获取用户是否在线提示
  getOnlineStateView(isOnline) {
    if (!isOnline) {
      return;
    }
    return (
      <View style={style.lineStateContainer}>
        <View style={style.onlineNotice} />
        <Text style={style.onlineText}>在线</Text>
      </View>
    );
  }

  // 获取时间文本
  getDayText(dateStr) {
    let date = new Date(dateStr);
    let now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return "今天";
    } else if (
      now.getFullYear() === date.getFullYear() &&
      now.getMonth() === date.getMonth() &&
      now.getDate() - date.getDate() === 1
    ) {
      return "昨天";
    }
    return dateStr;
  }

  // 获取对话文本
  getContentText() {
    let msgId = 0;
    if (this.props.item.msgs.length === 0) return "";
    if (this.props.item.msgs.length === 2) {
      msgId = this.props.item.msgs[0];
    } else {
      msgId = this.props.item.msgs[this.props.item.msgs.length - 1];
    }
    if (this.props.messageAll[msgId].msg_type === "chat_game") {
      return "[游戏结果]";
    } else if(this.props.messageAll[msgId].msg_type === "chat_image"){
      return "[图片]"
    } else {
      return this.props.messageAll[msgId].msg_body;
    }
  }
  render() {
    return (
      <View style={style.container}>
        <View style={style.avatarNameContainer}>
          <View style={style.avatarContainer}>
            <Image
              style={style.avatar}
              source={{
                uri: this.props.item.profile_photo_src
              }}
            />
            {this.getUnreadNotice(this.props.item.hasUnread)}
          </View>
          <View style={style.nameContainer}>
            <Text style={style.nameText}>{this.props.item.nickname}</Text>
            <Text style={style.contentText} numberOfLines = {1} ellipsizeMode = {'tail'}>{this.getContentText()}</Text>
          </View>
        </View>
        <View style={style.dateAndStateContainer}>
          <Text style={style.dateText}>
            {this.getDayText(date2str(new Date(this.props.item.did_at)))}
          </Text>
          {this.getOnlineStateView(this.props.item.isOnline)}
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    padding: 6,
    borderColor: "#f3f3f3"
  },
  avatarNameContainer: {
    height: 60,
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 1
  },
  avatarContainer: {
    position: "relative",
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
    position: "absolute",
    width: 8,
    height: 8,
    top: -4,
    right: -4,
    borderRadius: 4,
    backgroundColor: "#ff3030"
  },
  nameContainer: {
    paddingLeft: 10,
    height: "100%",
    padding: 5
  },
  nameText: {
    padding: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#000000"
  },
  contentText: {
    padding: 5,
    fontSize: 12,
    flexGrow: 0
    
  },
  dateAndStateContainer: {
    marginRight: 10,
    justifyContent: "center"
  },
  dateText: {
    padding: 5,
    fontSize: 12,
    color: "#eaeaea"
  },
  lineStateContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  onlineNotice: {
    width: 6,
    height: 6,
    margin: "auto",
    backgroundColor: "#00d3be",
    borderRadius: 3
  },
  onlineText: {
    padding: 5,
    fontSize: 12
  }
});
