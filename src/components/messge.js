/**
 * 聊天信息组件
 */

import React, { Component } from "react";
import { View, Style, StyleSheet, Image, Text } from "react-native";

// 骰子映射图片
const dicePath = [
  require("../assets/images/sz1.png"),
  require("../assets/images/sz2.png"),
  require("../assets/images/sz3.png"),
  require("../assets/images/sz4.png"),
  require("../assets/images/sz5.png"),
  require("../assets/images/sz6.png")
];
export default class Message extends Component {
  constructor(props) {
    super(props);
  }

  // 根据消息类型获取对应的内容文本或者图片
  getMsgContent() {
    if (
      this.props.msg.msg_type === "chat_text" ||
      this.props.msg.msg_type === "auto_text"
    ) {
      return (
        <Text
          style={[
            this.props.msg.from === this.props.user.uid
              ? style.myMsgContent
              : style.otherContent,
            { padding: 10 }
          ]}
        >
          {this.props.msg.msg_body}
        </Text>
      );
    } else {
      let msgBody = {};
      try {
        msgBody = JSON.parse(this.props.msg.msg_body);
      } catch (e) {}
      return (
        <Image
          style={style.msgImgContent}
          source={dicePath[msgBody.dice - 1]}
        />
      );
    }
  }
  // 根据消息是发送的收到的类型使用不同的视图
  getMsgView() {
    // 自己发的消息
    if (this.props.msg.from === this.props.user.uid) {
      return (
        <View style={[style.myMsg, style.msgContainer]}>
          {this.getMsgContent()}
          <Image
            style={style.userAvatar} //  source = {{uri: this.state.userAvatar}}
            source={{ uri: this.props.user.profile_photo_src }}
          />
        </View>
      );
    } else {
      // 对方发的消息
      return (
        <View style={[style.otherMsg, style.msgContainer]}>
          <Image
            style={style.userAvatar}
            source={
              { uri: this.props.other.profile_photo_src } //  source = {{uri: this.state.userAvatar}}
            }
          />
          {this.getMsgContent()}
        </View>
      );
    }
  }
  render() {
    return this.getMsgView();
  }
}

const style = StyleSheet.create({
  msgContainer: {
    marginBottom: 25,
    flex: 1,
    padding: 10
  },
  myMsg: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  otherMsg: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 4
  },
  myMsgContent: {
    backgroundColor: "#ffe100",
    borderRadius: 4,
    marginRight: 10,
    marginLeft: 20,
    color: "#000000"
  },
  otherContent: {
    marginLeft: 15,
    marginRight: 70,
    padding: 10,
    borderRadius: 4,
    color: "#9b9b9b",
    backgroundColor: "#f9f9f9"
  },
  msgImgContent: {
    width: 50,
    height: 50,
    margin: 8
  }
});
