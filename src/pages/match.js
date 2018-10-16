/**
 * 匹配页面
 */
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { getFriend, dislikeFriend, likeFriend } from "../api/friend";
import commonStyle from "../utils/common-style";
import Card from "../components/card";
import SwipeCards from "react-native-swipe-cards";
import DislikevView from "../components/match/dislike-view";
import LikevView from "../components/match/like-view";
import { Api } from "../api/_fetch";
// userID 11
export default class Match extends Component {
  constructor(props) {
    super(props);
    this.Card = null;
    this.state = { myId: 11 };
  }
  componentWillMount() {
    getFriend({ uid: this.state.myId }).then(res => {
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
              item.profile_photo_src === ""
                ? "http://world.people.com.cn/NMediaFile/2016/1208/MAIN201612081356000022613618149.jpg"
                : `${Api.Test}${item.profile_photo_src}`,
            gender: item.gender || "male",
            audioSrc:
              item.audio_src === ""
                ? "http://211.159.182.124/resource/audio/1539532499.mp3"
                : `${Api.Test}${item.audio_src}`,
            pics: item.pic_srcs,
            getCardChild: this.getCardChild.bind(this)
          };
          this.props.addNewFriend(item.uid);
          this.props.setFriendAll(user);
        });
        this.props.friend;
      }
    });
  }
  handleDisLike(card) {
    console.log("Card,,,", this.Card);
    console.log("card..", card);
    this.Card.sound.stop();
    dislikeFriend({ from: this.state.myId, to: card.uid }).then(res => {
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
    likeFriend({ from: this.state.myId, to: card.uid }).then(res => {
      if (res.data && res.data.result === "ok") {
        if (res.data.is_friend) {
          this.props.addLikeMe(card.uid);
        }
      }
    });
    console.log("like");
  }
  render() {
    return (
      <View style={[commonStyle.pageBg, style.container]}>
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
            renderCard={cardData => <Card {...cardData} />}
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
  }
});
