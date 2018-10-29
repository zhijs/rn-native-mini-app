/**
 * 匹配页面
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { getFriend, dislikeFriend, likeFriend } from "../api/friend";
import { sendMsg } from "../api/message";
import { logout } from "../api/user";
import commonStyle from "../utils/common-style";
import Card from "../components/card";
import SwipeCards from "react-native-swipe-cards";
import DislikevView from "../components/match/dislike-view";
import LikevView from "../components/match/like-view";
import { Api } from "../api/_fetch";
import MessageBox from "../components/message-box";

export default class Match extends Component {
  constructor(props) {
    super(props);
    this.Card = null;
    this.state = {
      matchSuccess: false,
      modalShow: true,
      matchUserName: "文艺小清新",
      matchUid: 0,
      matchUserImg: "http://211.159.182.124/resource/image/1539702991.jpeg",
      needUpdateNew: 3,
      processModal: false,
    };
    this.state = { myId: 47 };
  }
  componentWillMount() {
    this.getFriends();
  }
  
  // 执行退出操作
  componentWillUnmount () {
    logout({uid: this.props.user.uid})
      .then((res) => {
        // 退出登陆
      })
  }
  // 获取匹配的对象
  getFriends () {
    getFriend({
      uid: this.props.user.uid
    }).then(res => {
      if (res.data && res.data.result === "ok") {
        let user = {};
        let newFriend = [];
        let nowYear = new Date().getFullYear() + 1;
        (res.data.info || []).forEach(item => {
          let itemYear = new Date(item.dob).getFullYear() + 1;
          user[`${item.uid}`] = {
            uid: item.uid,
            nickname: item.nickname === "" ? "未知" : item.nickname,
            phone_number: item.phone_number,
            age: nowYear - itemYear || "18",
            profile_photo_src:
              item.pic_srcs === null || item.pic_srcs.length === 0
                ? "http://211.159.182.124/resource/image/1539702991.jpeg"
                : `${Api.Test}${item.pic_srcs[0]}`,
            gender: item.gender || "male",
            audioSrc:
              item.audio_src === ""
                ? "http://211.159.182.124/resource/audio/1539532499.mp3"
                : `${Api.Test}${item.audio_src}`,
            pics: item.pic_srcs,
            msgs: [],
            online: item.online || false
          };
          if (!this.props.friend.new.includes(item.uid)) {
            newFriend.push(item.uid);
          }
        });
        this.props.setFriendAll(user);
        this.props.addNewFriend(newFriend);
      }
    });
  }

  // 检测是否需要重新拉取用户
  checkGetNewFriends () {
    if (this.props.friend.new < this.state.needUpdateNew) {
      this.getFriends();
    }
  }
  handleDisLike(card) {
    this.Card.sound.stop();
    dislikeFriend({
      from: this.props.user.uid,
      to: card.uid
    }).then(res => {
      if (res.data && res.data.result === "ok") {
        this.props.deleteNewFriend(card.uid);
        this.checkGetNewFriends();
      }
    });
    
  }
  getCardChild(card) {
    this.Card = card;
  }

  handleLike(card) {
    this.Card.sound.stop();
    likeFriend({
      from: this.props.user.uid,
      to: card.uid
    }).then(res => {
      if (res.data && res.data.result === "ok") {
        // console.log('喜欢成功', res.data)
       
        this.props.deleteNewFriend(card.uid);
        if (res.data.is_friend) {
          this.setState({
            matchUserName: card.nickname,
            matchUserImg: card.profile_photo_src,
            matchUid: card.uid,
            modalShow: true
          });
          let msgs = {};
          let msgIds = [];
          (res.data.msgs || []).forEach((msg) => {
            if (this.props.message.all[`${msg.id}`] === undefined) {
              msgIds.push(msg.id);
              msgs[`${msg.id}`] = msg;
            }
          })
          this.props.setMessageAll(msgs);
          this.props.addFriendMsg({
            uid: card.uid,
            msgId: msgIds
          })
          if (!this.props.friend.match.includes(card.uid)) {
            this.props.addMatchFriend([card.uid]);
          }
          this.checkGetNewFriends();
        }
      }
    });
  }

  // 关闭浮层
  modalClose() {
    this.setState({ modalShow: false });
  }
  processModalClose () {
    this.setState({ processModal: false });
  }

  showProcessModal() {
    this.setState({ processModal: true });
  }
  // 跳转到聊天页面
  pageToChatDetail() {
    const { navigate } = this.props.navigation;
    let user = this.props.friend.all[this.state.matchUid];
    navigate("ChatDetail", { user, type: "match" });
    this.modalClose();
  }
  // 获取浮层内容元素
  getModalChild() {
    return (
      <View style={style.matchSuccessContainer}>
        <View style={style.titleContainer}>
          <Image
            style={style.titleBg}
            source={require("../assets/images/match-success-bg.png")}
          />
        </View>
        <Text style={style.tips}>
          你与
          {this.state.matchUserName}
          互相喜欢了对方
        </Text>
        <View style={style.twoAvatarContainer}>
          <Image
            style={[style.avatarItem, style.modalAvatarMy]}
            source={{ uri: this.props.user.profile_photo_src }}
          />
          <Image
            style={[style.avatarItem, style.modalAvatarYou]}
            source={{ uri: this.state.matchUserImg }}
          />
        </View>
        <View style={style.modalBtnContainer}>
          <TouchableOpacity
            style={[style.modalBtn, style.cancelBtnContainer]}
            onPress={this.modalClose.bind(this)}
          >
            <Text style={style.modalBtnText}>再看看</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.modalBtn, style.comfirmBtnContainer]}
            onPress={this.pageToChatDetail.bind(this)}
          >
            <Text style={style.modalBtnText}>发消息</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
 
  //解锁流程
  getModalProcess () {
    return (
      <View style = {style.processContainer}>
        <Text style = {style.lockTitle}>互动解锁</Text>
        <View style = {style.proceeImgContainer}>
          <Image
            style = {style.lockImage}
            source = {require('../assets/images/lock-process.png')}
          />
          </View>
      </View>
    )
  }
  render() {
    return (
      <View style={[commonStyle.pageBg, style.container]}>
        <MessageBox
          modalClose={this.modalClose.bind(this)}
          visiable={this.state.modalShow}
          contentHeight={"60%"}
          childView={this.getModalChild()}
        />
         <MessageBox
          modalClose={this.processModalClose.bind(this)}
          visiable={this.state.processModal}
          contentHeight={"100%"}
          contentWidth = {"100%"}
          marginLeft = {1}
          marginTop = {1}
          childView={this.getModalProcess()}
        />
        <View style={style.header}>
          <View style={style.avatarContainer}>
            <Image
              style={style.myAvatar}
              source={{ uri: this.props.user.profile_photo_src }}
            />
          </View>
          <View style={style.titleContainer}>
            <Text style={style.title}>匹配</Text>
          </View>
          <TouchableOpacity 
            style={style.keyImageContainer}
            onPress={this.showProcessModal.bind(this)}
          >
            <Image
              style={style.keyImage}
              source={require('../assets/images/key.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={style.content}>
          <SwipeCards
            cards={this.props.friend.new.map(uid => {
              return this.props.friend.all[uid];
            })}
            style={{ width: "100%", height: "100%" }}
            showYup={true}
            showNope={true}
            onClickHandler={() => {}}
            noView={<DislikevView />}
            yupView={<LikevView />}
            handleNope={this.handleDisLike.bind(this)}
            handleYup={this.handleLike.bind(this)}
            yupStyle={style.slideIcon}
            nopeStyle={style.slideIcon}
            renderCard={cardData => (
              <Card {...cardData} getCardChild={this.getCardChild.bind(this)} />
            )}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    paddingBottom: 8,
    position: "relative"
  },
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  myAvatar: {
    width: 45,
    height: 45,
    borderRadius: 45
  },
  titleContainer: {
    borderWidth: 1,
    flexDirection: "row",
    borderColor: '#000000'
  },
  title: {
    width: 80,
    color: "#000000",
    lineHeight: 50,
    fontWeight: "700",
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "PingFangSC-Semibold",
  },
  keyImageContainer: {
    width: '30%',
    justifyContent: "flex-end"
  },
  keyImage: {
    width: 40,
    height: 40,
    marginTop: 5,
    marginRight: 10
  },
  content: {
    flex: 1,
    borderRadius: 15,
    overflow: "visible",
    width: "100%"
  },
  othderBg: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    position: "relative",
    overflow: "visible"
  },
  bgImgageStyle: {
    borderRadius: 10
  },
  btnDislikeContainer: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  slideIcon: {
    position: "absolute",
    bottom: 200,
    borderWidth: 0,
    padding: 0
  },
  likeContainer: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  btnlikeImg: {
    width: 70,
    height: 50
  },
  // 浮层样式
  matchSuccessContainer: {
    flex: 1,
    flexDirection: "column"
  },
  titleContainer: {
    width: "50%",
    marginLeft: "25%",
    height: 30
  },
  titleBg: {
    width: "100%",
    height: 30
  },
  tips: {
    color: "#818182",
    padding: 10,
    textAlign: "center"
  },
  twoAvatarContainer: {
    margin: 25,
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 55
  },
  avatarItem: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  modalAvatarMy: {
    marginRight: 10
  },
  modalAvatarYou: {
    marginLeft: 10
  },
  modalBtnContainer: {
    flex: 1
  },
  modalBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  modalBtn: {
    width: "40%",
    height: 36,
    borderRadius: 3
  },
  cancelBtnContainer: {
    borderColor: "#818182",
    backgroundColor: "#f8f9fb",
    borderWidth: 1
  },
  comfirmBtnContainer: {
    backgroundColor: "#ffe100"
  },
  modalBtnText: {
    flex: 1,
    textAlign: "center",
    lineHeight: 36
  },
  // 解锁流程图
  processContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  lockTitle: {
    textAlign: 'center',
    height: 20,
    color: '#000000',
    fontWeight: '600'
  },
  proceeImgContainer: {
    padding: 5,
    marginTop: 20
  },
  lockImage: {
    width: '100%',
    height: '100%'
  }
});
