/**
 * 消息聊天界面
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import commonStyle from "../utils/common-style";
import { sendMsg, uploadFile } from "../api/message";
import { getScore } from "../api/friend";
import Message from "../components/messge";
import webSocketCla from "../common/web-socket";
import MessageBox from "../components/message-box";
import { Api } from "../api/_fetch";
import ImagePicker from "react-native-image-crop-picker";

// 分数对应的爱心图片
const score2SmallImgs = [
  `${Api.Test}/resource/small-heart/heart-small-0.png`,
  `${Api.Test}/resource/small-heart/heart-small-10.png`,
  `${Api.Test}/resource/small-heart/heart-small-20-30.png`,
  `${Api.Test}/resource/small-heart/heart-small-30-40.png`,
  `${Api.Test}/resource/small-heart/heart-small-50.png`,
  `${Api.Test}/resource/small-heart/heart-small-60-70.png`,
  `${Api.Test}/resource/small-heart/heart-small-70-80.png`,
  `${Api.Test}/resource/small-heart/heart-small-90.png`,
  `${Api.Test}/resource/small-heart/heart-small-100.png`
];

// 弹窗大爱心对应的图片
const score2BigImgs = [
  `${Api.Test}/resource/big-heart/heart-big-0.png`,
  `${Api.Test}/resource/big-heart/heart-big-10.png`,
  `${Api.Test}/resource/big-heart/heart-big-20-30.png`,
  `${Api.Test}/resource/big-heart/heart-big-30-40.png`,
  `${Api.Test}/resource/big-heart/heart-big-50.png`,
  `${Api.Test}/resource/big-heart/heart-big-60-70.png`,
  `${Api.Test}/resource/big-heart/heart-big-70-80.png`,
  `${Api.Test}/resource/big-heart/heart-big-90.png`,
  `${Api.Test}/resource/big-heart/heart-big-100.png`
];

export default class ChatDeTail extends Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.ws = webSocketCla.getInstance();
    this.score2text = {
      "20": "你问我答",
      "40": "爆照时刻",
      "60": "闻声识人"
    };
    this.state = {
      modalShow: false,
      myId: 47,
      otherUser: null,
      routerType: params.type,
      score: 0,
      otherUid: params.user.uid,
      activeTool: null,
      index: 0,
      inputText: ''
    };
  }

  // 关闭工具栏
  closeToolView() {
    this.setState({ activeTool: null });
  }
  // 选择聊天方式
  chooseTools(type) {
    if (this.state.activeTool === type) {
      this.setState({ activeTool: null });
    } else {
      this.setState({ activeTool: type });
    }

    // 选择图片
    if (type === "img" && this.state.source >= 40) {
      imgs = [];
      ImagePicker.openPicker({ multiple: true }).then(images => {
        console.log("获取图片", images);
        if (images !== null || images.length !== 0) {
          // images.forEach((item) => {
          //   uploadFile()
          // })
        }
      });
    }
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    console.log("navigation--state", params);
    return {
      headerTitle: () => {
        return <Text style={style.headerTitle}>{params.user.nickname}</Text>;
      }
    };
  };
  

  // 发送骰子消息
  sendDiceMsg() {
    let num = (parseInt(Math.random() * 10) % 6) + 1;
    let data = {
      from: this.props.user.uid,
      to: this.state.otherUid,
      msg_type: "chat_game",
      msg_body: `{"dice": ${num}}`
    }
    this.sendeMsg(data)
  }
  sendeMsg(data) {
    sendMsg(data).then(res => {
      console.log("发送消息成功", res);
      if (res.data && res.data.result === "ok") {
        // 添加消息
        if (
          !this.props.friend.all[this.state.otherUid].msgs.includes(
            res.data.msg.id
          )
        ) {
          let msg = {};
          msg[`${res.data.msg.id}`] = res.data.msg;
          this.props.setMessageAll(msg);
          this.props.addFriendMsg({
            uid: this.state.otherUid,
            msgId: res.data.msg.id
          });
        }
        // 添加聊天的朋友
        if (!this.props.friend.chat.includes(this.state.otherUid)) {
          this.props.addChatFriend([this.state.otherUid]);
        }
      }
    });
    this.setState({ activeTool: null });
  }
  
  // 获取最后一条消息
  getLastMsg () {
    let msgs = this.props.friend.all[this.state.otherUid].msgs;
    return this.props.message.all[msgs[msgs.length - 1]]
  }
  // 获取分数
  getScore() {
    let msgContent = this.getLastMsg()
    return msgContent.score || 0
  }

  componentWillMount() {
    // 判断分数
    if (this.routerType === "match") {
      this.setState({ score: 0 }); // 设置分数为0
    } else {
      // 根据最后一条消息拿到亲密度
      this.getScore()
    }
  }
  
  // 文本框输入改变事件
  handleTextChange (value) {
    this.setState({inputText: value})
  }

  // 文本输入发送键监听
  handleSubmit() {
    if (this.state.inputText === '') return;
    let data = {
      from: this.props.user.uid,
      to: this.state.otherUid,
      msg_type: "chat_text",
      msg_body: this.state.inputText
    }
    this.sendeMsg(data)
    this.setState({inputText: '', inputVlaue: ''})
  }
  // 根据分数来判断是否是解锁文字聊天
  getTextInput() {
    let score = this.getScore()
    if (!score) {
      return (
        <View style={style.textLockContainer}>
          <Image
            style={style.lockImg}
            source={require("../assets/images/lock.png")}
          />
          <Text style={style.lockText}>文字聊天暂未解锁</Text>
        </View>
      );
    } else {
      return (
        <TextInput
          style={style.msgInput}
          placeholder="聊一聊"
          underlineColorAndroid="transparent"
          multiline = {false}
          value = {this.state.inputVlaue}
          onSubmitEditing  = {this.handleSubmit.bind(this)}
          onChangeText = {this.handleTextChange.bind(this)}
        />
      );
    }
  }

  // 获取工具面板展示
  getToolView() {
    if (this.state.activeTool === "dice") {
      return (
        <View style={style.piceToolContainer}>
          <TouchableOpacity style={style.toolItem}>
            <Image
              style={style.toolItemImg}
              source={require("../assets/images/ask.png")}
            />
            <Text style={style.toolItemText}>随便问问</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.toolItem}
            onPress={this.sendDiceMsg.bind(this)}
          >
            <Image
              style={style.toolItemImg}
              source={require("../assets/images/tool-dice.png")}
            />
            <Text style={style.toolItemText}>掷骰子</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.toolItem}>
            <Image
              style={style.toolItemImg}
              source={require("../assets/images/tool-five-row.png")}
            />
            <Text style={style.toolItemText}>五子棋</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.toolItem}>
            <Image
              style={style.toolItemImg}
              source={require("../assets/images/draw-guess.png")}
            />
            <Text style={style.toolItemText}>你画我猜</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  // 弹框关闭
  modalClose() {
    this.setState({ modalShow: false });
  }

  // 弹窗打开
  openModal () {
    this.setState({ modalShow: true });
    this.closeToolView()
  }

  // 获取弹框内容
  getModalChild() {
    return (
      <View style={style.modalContainer}>
        <View style={style.bigHeartContainer}>
          <Image
            source={{ uri: score2BigImgs[this.getScoreImageIndex(this.getScore())] }}
            style={style.bigHeartImg}
          />
          <Text style={style.heartScore}>{this.getScore()}</Text>
        </View>
        <Text style={style.titleText}>恭喜你们！</Text>
        <Text style={style.titleTipText}>
          亲密度达
          {this.getScore()}
          %，解锁
          {this.score2text[this.getScore()]}
        </Text>
        <View style={style.featureCotainer}>
          <View style={style.firstLineFeatureContianer}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.boxFeatureIcon}
                source={require("../assets/images/box-message-active.png")}
              />
              <Text style={style.featureText}>你问我答</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.arrow}
                source={require("../assets/images/box-arrow-right.png")}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.boxFeatureIcon}
                source={
                  this.state.score >= 40
                    ? require("../assets/images/box-img-active.png")
                    : require("../assets/images/box-img.png")
                }
              />
              <Text style={style.featureText}>爆照时刻</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.arrow}
                source={require("../assets/images/box-arrow-right.png")}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.boxFeatureIcon}
                source={
                  this.state.score >= 60
                    ? require("../assets/images/box-audio-active.png")
                    : require("../assets/images/box-audio.png")
                }
              />
              <Text style={style.featureText}>闻声识人</Text>
            </View>
          </View>
          <View style={style.middleLineContainer}>
            <Image
              style={style.arrowDown}
              source={require("../assets/images/box-arrow-down.png")}
            />
          </View>
          <View style={style.endLineContainer}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.boxFeatureIcon}
                source={require("../assets/images/box-heart.png")}
              />
              <Text style={style.featureText}>心心相印</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.arrow}
                source={require("../assets/images/box-arrow-left.png")}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.boxFeatureIcon}
                source={require("../assets/images/box-garden.png")}
              />
              <Text style={style.featureText}>秘密花园</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.arrow}
                source={require("../assets/images/box-arrow-left.png")}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Image
                style={style.boxFeatureIcon}
                source={
                  this.state.score >= 80
                    ? require("../assets/images/box-video-active.png")
                    : require("../assets/images/box-video.png")
                }
              />
              <Text style={style.featureText}>来视频吧</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  // 获取分数对应的图片
  getScoreImageIndex(score) {
    if (score === 0) {
      return 0;
    } else if (score <= 10) {
      return 1;
    } else if (score <= 30) {
      return 2;
    } else if (score <= 40) {
      return 3;
    } else if (score <= 50) {
      return 4;
    } else if (score <= 70) {
      return 5;
    } else if (score <= 80) {
      return 6;
    } else if (score < 100) {
      return 7;
    } else {
      return 8;
    }
  }

  render() {
    return (
      <View
        activeOpacity={1}
        style={[commonStyle.pageBg, style.container]}
      >
        <TouchableOpacity 
          style={style.heartContainer}
          onPress = {this.openModal.bind(this)}
        >
          <Image
            source={{ uri: score2SmallImgs[this.getScoreImageIndex(this.getScore())] }}
            style={style.heartIcon}
          />
          <Text style={style.scoreText}>{this.getScore()}</Text>
        </TouchableOpacity>
        <MessageBox
          modalClose={this.modalClose.bind(this)}
          visiable={this.state.modalShow}
          contentHeight={"70%"}
          childView={this.getModalChild(
            null,
            this.state.matchUserName,
            this.state.matchUserImg
          )}
        />
        <TouchableOpacity
          style = {{flex: 1}}
          onPress={this.closeToolView.bind(this)}
        >
          <ScrollView style={style.msgContainer}>
            {this.props.friend.all[this.state.otherUid].msgs.map(msgId => {
              return (
                <Message
                  key={msgId}
                  other={this.props.friend.all[this.state.otherUid]}
                  msg={this.props.message.all[msgId]}
                  user={this.props.user}
                />
              );
            })}
          </ScrollView>
        </TouchableOpacity>
        <View style={style.chatTypeContainer}>
          <View style={style.inputContainer}>
            {this.getTextInput(this.getScore())}
          </View>
          <View style={style.toolPanelContainer}>
            <View style={style.toolPanel}>
              <TouchableOpacity
                style={style.toolContainer}
                onPress={this.chooseTools.bind(this, "audio")}
              >
                <Image
                  style={style.toolIcon}
                  source={require("../assets/images/chat-audio-lock.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.toolContainer}
                onPress={this.chooseTools.bind(this, "img")}
              >
                <Image
                  style={style.toolIcon}
                  source={
                    this.state.score >= 40
                      ? require("../assets/images/chat-image-lock.png")
                      : require("../assets/images/chat-image.png")
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.toolContainer}
                onPress={this.chooseTools.bind(this, "dice")}
              >
                <Image
                  style={style.toolIcon}
                  source={
                    this.state.activeTool === "dice"
                      ? require("../assets/images/chat-dice-active.png")
                      : require("../assets/images/chat-dice.png")
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.toolContainer}
                onPress={this.chooseTools.bind(this, "phone")}
              >
                <Image
                  style={style.toolIcon}
                  source={require("../assets/images/chat-phone-lock.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.toolContainer}
                onPress={this.chooseTools.bind(this, "video")}
              >
                <Image
                  style={style.toolIcon}
                  source={require("../assets/images/chat-video-lock.png")}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                style.toolView,
                { height: this.state.activeTool === "dice" ? 120 : 0 }
              ]}
            >
              {this.getToolView()}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#000000",
    fontSize: 14,
    fontWeight: "600"
  },
  container: {
    position: "relative",
    flex: 1
  },
  heartContainer: {
    position: "absolute",
    top: 12,
    right: 20,
    width: 68,
    height: 68,
    zIndex: 2
  },
  heartIcon: {
    position: "absolute",
    width: 68,
    height: 68
  },
  scoreText: {
    position: "absolute",
    color: "#ffffff",
    width: 68,
    height: 68,
    textAlign: "center",
    lineHeight: 60
  },
  msgContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 100
  },
  chatTypeContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ffffff"
  },
  inputContainer: {
    height: 50,
    width: "100%"
  },
  textLockContainer: {
    width: "100%",
    flex: 1,
    borderColor: "#e3e3e3",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff"
  },
  lockImg: {
    width: 20,
    height: 20,
    margin: 15
  },
  lockText: {
    lineHeight: 50
  },
  msgInput: {
    height: 42,
    width: "100%",
    borderColor: "#e3e3e3",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 5,
    zIndex: 10,
    backgroundColor: "#ffffff"
  },
  toolPanel: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  toolContainer: {
    padding: 10
  },
  toolIcon: {
    width: 30,
    height: 30
  },
  piceToolContainer: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: 'space-between',
    height: "100%"
  },
  toolView: {
    flex: 1,
    justifyContent: "space-around"
  },
  toolItem: {
    flex: 1,
    height: 90
  },
  toolItemImg: {
    flex: 1,
    width: 79,
    height: 90,
    borderRadius: 10
  },
  toolItemText: {
    width: 75,
    padding: 5,
    textAlign: "center",
    fontSize: 12
  },
  // 弹窗相关
  modalContainer: {
    flex: 1
  },
  bigHeartContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center"
  },
  bigHeartImg: {
    height: 90,
    width: 90
  },
  heartScore: {
    position: "absolute",
    marginLeft: "auto",
    top: 35
  },
  titleText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    color: "#FF465E",
    padding: 5
  },
  titleTipText: {
    textAlign: "center",
    fontSize: 12
  },
  featureCotainer: {
    flex: 1,
    margin: 10
  },
  firstLineFeatureContianer: {
    flexDirection: "row"
  },
  boxFeatureIcon: {
    height: 60,
    width: 60,
    padding: 5
  },
  arrow: {
    width: 40,
    height: 10,
    marginLeft: 5
  },
  featureText: {
    fontSize: 12,
    width: 60,
    textAlign: "center"
  },
  middleLineContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  arrowDown: {
    width: 10,
    height: 50,
    marginRight: 11
  },
  endLineContainer: {
    flex: 1,
    flexDirection: "row"
  }
});
