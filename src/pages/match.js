/**
 * 匹配页面
 */
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { getFriend, dislikeFriend, likeFriend } from "../api/friend";
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
      modalShow: false,
      matchName: '文艺小清新'
    }
    this.state = { myId: 37 };
  }
  componentWillMount() {
    getFriend({ uid:  this.state.myId }).then(res => {
      if (res.data && res.data.result === "ok") {
        console.log("getFriends", res);
        let uids = [];
        let nowYear = new Date().getFullYear() + 1;
        res.data.info.forEach(item => {
          let itemYear = new Date(item.dob).getFullYear() + 1;
          let user = {};
          user[item.uid] = {
            uid: item.uid,
            nickname: item.nickname === "" ? "未知" : item.nickname,
            phone_number: item.phone_number,
            age: nowYear - itemYear || "18",
            profile_photo_src:
            item.pic_srcs.length === 0
                ? "http://211.159.182.124/resource/image/1539702991.jpeg"
                : `${Api.Test}${item.pic_srcs[0]}`,
            gender: item.gender || "male",
            audioSrc:
              item.audio_src === ""
                ? "http://211.159.182.124/resource/audio/1539532499.mp3"
                : `${Api.Test}${item.audio_src}`,
            pics: item.pic_srcs
          };
          this.props.addNewFriend(item.uid);
          this.props.setFriendAll(user);
        });
        this.props.friend;
      }
    });
  }
  handleDisLike(card) {
    this.Card.sound.stop();
    dislikeFriend({ from:  this.state.myId, to: card.uid }).then(res => {
      if (res.data && res.data.result === "ok") {
        console.log("不喜欢成功");
      }
    });
  }
  getCardChild(card) {
    console.log("获取子对象", card.sound);
    this.Card = card;
  }

  handleLike(card) {
    this.Card.sound.stop();
    likeFriend({ from:  tthis.state.myId, to: card.uid }).then(res => {
      if (res.data && res.data.result === "ok") {
        if (res.data.is_friend) {
          this.props.addLikeMe(card.uid);
        }
      }
    });
    console.log("like");
  }
  
  // 关闭浮层
  modalClose() {
    this.setState({
      modalShow: false
    }) 
  }

  // 获取浮层内容元素
  getModalChild(myImg, otherName, otherImg) {
    return(
     <View style = {style.matchSuccessContainer}>
        <View style = {style.titleContainer}>
           <Image
             style = {style.titleBg}
             source = {require('../assets/images/match-success-bg.png')}
           />
        </View>
        <Text style = {style.tips}>你与{otherName}互相喜欢了对方</Text>
        <View style = {style.twoAvatarContainer}>
            <Image
              style = {[style.avatarItem, style.modalAvatarMy]}
              source = {require('../assets/images/user.jpg')}
            />
            <Image
              style = {[style.avatarItem, style.modalAvatarYou]}
              source = {require('../assets/images/user.jpg')}
            />
        </View>
        <View style = {style.modalBtnContainer}>
          <TouchableOpacity 
            style = {[style.modalBtn, style.cancelBtnContainer]}
            onPress = {() => {
              console.log('再看看', this)
              this.setState({modalShow: false})
            }}
          >
             <Text style = {style.modalBtnText}>再看看</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = {[style.modalBtn, style.comfirmBtnContainer]}
            onPress = {() => {
              const { navigate } = this.props.navigation;
              console.log(this.props.navigation)
              navigate('chat')
              this.setState({modalShow: false})
            }}
          >
             <Text style = {style.modalBtnText}>发消息</Text>
          </TouchableOpacity>
        </View>
     </View>
    )  
  }

  render() {
    return (
      <View style={[commonStyle.pageBg, style.container]}>
        <MessageBox
          modalClose = {this.modalClose.bind(this)}
          visiable = {this.state.modalShow}
          contentHeight = {'60%'}
          childView = {this.getModalChild(this)}
        >
        </MessageBox>
        <View style={style.header}>
          <View style={style.avatarContainer}>
            <Image
              style={style.myAvatar}
              source={require("../assets/images/match-active.png")}
            />
          </View>
          <View style={style.titleContainer}>
            <Text style={style.title}>匹配</Text>
          </View>
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
            renderCard={cardData => <Card {...cardData} getCardChild = {this.getCardChild.bind(this)} />}
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  myAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  title: {
    color: "#000000",
    lineHeight: 50,
    fontWeight: "700",
    fontSize: 20,
    marginLeft: -10,
    fontFamily: "PingFangSC-Semibold"
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
    flexDirection: 'column',
  },
  titleContainer: {
    width: '50%',
    marginLeft: '25%',
    height: 30
  },
  titleBg: {
    width: '100%',
    height: 30
  },
  tips: {
    color: '#818182',
    padding: 10,
    textAlign: 'center'
  },
  twoAvatarContainer: {
    margin: 25,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalBtn: {
    width: '40%',
    height: 36,
    borderRadius: 3
  },
  cancelBtnContainer: {
    borderColor: '#818182',
    backgroundColor: '#f8f9fb',
    borderWidth: 1
  },
  comfirmBtnContainer: {
    backgroundColor: '#ffe100'
  },
  modalBtnText:{
    flex: 1, 
    textAlign: 'center', 
    lineHeight: 36
  }
});
