import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import commonStyle from "../utils/common-style";
import { Api } from "../api/_fetch";
import { getLikeMeList, getFriendList } from "../api/friend";
import { relative } from "path";
import MatchItem from '../components/match/match-item'
export default class matchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myId: 11
    },
    this.timer = null;
  }
  //设置store
  setFrienddStore(dataArr, type) {
    let nowYear = new Date().getFullYear() + 1;
    let user = {};
    let userIds = [];
    dataArr.forEach(item => {
      let itemYear = new Date(item.dob).getFullYear() + 1;
      user[`${item.uid}`] = {
        uid: item.uid,
        nickname: item.nickname === "" ? "未知" : item.nickname,
        phone_number: item.phone_number,
        age: nowYear - itemYear || "18",
        profile_photo_src:
        item.profile_photo_src
            ? "http://211.159.182.124/resource/image/1539702991.jpeg"
            : `${Api.Test}${item.pic_srcs[0]}`,
        gender: item.gender || "male",
        audioSrc:
          item.audio_src === ""
            ? "http://211.159.182.124/resource/audio/1539532499.mp3"
            : `${Api.Test}${item.audio_src}`,
        pics: item.pic_srcs,
        did_at: item.did_at || ''
      };
      if (!this.props.friend[type].includes(item.uid)) {
        userIds.push(item.uid)
      }
    });
    if (type === 'likeMe') {
      this.props.addLikeMe(userIds)
    } else {
      this.props.addMatchFriend(userIds)
    }
    this.props.setFriendAll(user);
  }
  getLikeMeData() {
    getLikeMeList({uid: this.state.myId})
      .then((res) => {
        if (res.data && res.data.result === "ok") {
          this.setFrienddStore(res.data.accounts, 'likeMe')
        }
      })
  }
  
  getMatchData() {
    getFriendList({uid: this.state.myId})
      .then((res) => {
        if (res.data && res.data.result === "ok") {
          this.setFrienddStore(res.data.accounts, 'match')
        }
      })
  }
  componentWillMount() {
    this.getLikeMeData();
    this.getMatchData();
    // 定时获取列表信息
    this.timer = setInterval(() => {
      this.getLikeMeData();
      this.getMatchData();
    }, 3 * 60 * 1000)
  }

  pageToLikeList() {
    const { navigate } = this.props.navigation;
    navigate('linkeMe');
  }
  render() {
    return (
      <View style={[style.container]}>
        <View style={style.linkeMeContainer}>
          <TouchableOpacity 
            style={[{ flex: 1, flexDirection: "row" }]}
            onPress = {this.pageToLikeList.bind(this)}
          >
            <View style={[style.iconContainer]}>
              <Image
                source={require("../assets/images/like-me.png")}
                style={style.likeIcon}
              />
            </View>
            <View style={style.likeTextContainer}>
              <Text style={style.title}>谁喜欢我</Text>
              <Text style={style.likeMeNum}>得到{this.props.friend.likeMe.length}人喜欢</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.matchContainer}>
          <Text style={style.matchNum}> 1个配对</Text>
          <MatchItem/>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  contentBg: {
   backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    marginBottom: 10,
    paddingBottom: 8,
  },
  linkeMeContainer: {
    height: 70,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#ffffff'
  },
  likeIcon: {
    width: 50,
    height: 50
  },
  likeTextContainer: {
    marginLeft: 15
  },
  title: {
    color: "#000000",
    fontWeight: "900",
    fontSize: 16
  },
  likeMeNum: {
    marginTop: 8
  },
  matchContainer: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  matchNum: {
    paddingLeft: 16,
    paddingTop: 10
  }
});
