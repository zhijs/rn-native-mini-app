import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Api } from "../api/_fetch";
import { getLikeMeList, getFriendList } from "../api/friend";
import MatchItem from "../components/match/match-item";
import webSocketCla from "../common/web-socket";
import { EventRegister } from 'react-native-event-listeners'
import Spinner from 'react-native-loading-spinner-overlay';

export default class matchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true
    }
    this.timer = null;
    this.webSocket = null;
  }
  //设置store
  setFrienddStore(dataArr = [], type) {
    let nowYear = new Date().getFullYear() + 1;
    let user = {};
    let msgs = {};
    let userIds = [];
    let chatIds = [];
    dataArr.forEach(item => {
      let itemYear = new Date(item.dob).getFullYear() + 1;

      // 取出所有的消息
      let msgIds = (item.msgs || []).map(msg => {
        msgs[`${msg.id}`] = msg;
        return msg.id;
      });

      // 防止消息被覆盖
      if (msgIds.length === 0) {
        if (
          this.props.friend.all[item.uid] &&
          this.props.friend.all[item.uid].msgs
        ) {
          msgIds = this.props.friend.all[item.uid].msgs;
        }
      }
      user[`${item.uid}`] = {
        uid: item.uid,
        nickname: item.nickname === "" ? "未知" : item.nickname,
        phone_number: item.phone_number,
        age: nowYear - itemYear || "18",
        profile_photo_src:
          item.profile_photo_src !== null && item.profile_photo_src !== ""
            ? `${Api.Test}${item.profile_photo_src}`
            : "http://211.159.182.124/resource/image/1539702991.jpeg",
        gender: item.gender || "male",
        audioSrc:
          item.audio_src === ""
            ? "http://211.159.182.124/resource/audio/1539532499.mp3"
            : `${Api.Test}${item.audio_src}`,
        pics: item.pic_srcs,
        did_at: item.did_at || "",
        msgs: msgIds,
        online: item.online || false
      };
      if (!this.props.friend[type].includes(item.uid)) {
        if (type === "match" && item.msgs.length > 2) {
          !this.props.friend.chat.includes(item.uid) && chatIds.push(item.uid);
        } else if (type === "match" && item.msgs.length < 2) {
          userIds.push(item.uid);
        } else {
          userIds.push(item.uid);
        }
      }
    });
    this.props.setMessageAll(msgs);
    this.props.setFriendAll(user);
    if (type === "likeMe") {
      this.props.addLikeMe(userIds);
    } else {
      this.props.addMatchFriend(userIds);
    }

    if (chatIds.length !== 0) {
      this.props.addChatFriend(chatIds);
    }
  }
  getLikeMeData() {
    getLikeMeList({ uid: this.props.user.uid }).then(res => {
      if (res.data && res.data.result === "ok") {
        this.setFrienddStore(res.data.accounts, "likeMe");
      }
    });
  }

  getMatchData() {
    getFriendList({ uid: this.props.user.uid }).then(res => {
      if (res.data && res.data.result === "ok") {
        this.setFrienddStore(res.data.accounts, "match");
      }
    });
  }

  // ws 打开
  handleWsOpen() {
    this.webSocket.send(`${this.props.user.uid}`);
  }

  handleWsMessage(e) {
    try {
      let msg = JSON.parse(e.data);
      let msgObj = {};
      if (msg.id === 0) return;
      msgObj[`${msg.id}`] = msg;
      this.props.setMessageAll(msgObj);
      this.props.addFriendMsg({
        uid: msg.from,
        msgId: [msg.id]
      });
      EventRegister.emit('onmessage', msg)
    } catch (e) {}
  }

  handleWsError(e) {

  }
  componentWillMount() {
    this.getLikeMeData();
    this.getMatchData();
    this.setState({spinner: false});
    // 定时获取列表信息
    this.timer = setInterval(() => {
      this.getLikeMeData();
      this.getMatchData();
    }, 3 * 60 * 1000);

    this.webSocket = webSocketCla.getInstance();
    this.webSocket.onopen = this.handleWsOpen.bind(this);
    this.webSocket.onmessage = this.handleWsMessage.bind(this);
    this.webSocket.onerror = this.handleWsError.bind(this);
  }

  componentWillUnmount() {
    this.webSocket.close();
    clearInterval(this.timer);
    this.timer = null;
  }
  pageToLikeList() {
    const { navigate } = this.props.navigation;
    navigate("linkeMe");
  }

  // 跳转到聊天页面
  pageToChatDetail(uid) {
    const { navigate } = this.props.navigation;
    let user = this.props.friend.all[uid];
    navigate("ChatDetail", { user, type: "match" });
  }
  
  getLoading() {
    return this.refs['loading'];
  }

  render() {
    return (
      <View style={[style.container]}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
        />
        <View style={style.linkeMeContainer}>
          <TouchableOpacity
            style={[{flexDirection: "row" }]}
            onPress={this.pageToLikeList.bind(this)}
          >
            <View style={[style.iconContainer]}>
              <Image
                source={require("../assets/images/like-me.png")}
                style={style.likeIcon}
              />
            </View>
            <View style={style.likeTextContainer}>
              <Text style={style.title}>谁喜欢我</Text>
              <Text style={style.likeMeNum}>
                得到
                {this.props.friend.likeMe.length}
                人喜欢
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView style={style.matchContainer}>
          <Text style={style.matchNum}>
            {" "}
            {this.props.friend.match.length}
            个配对
          </Text>
          {this.props.friend.match.map(item => {
            return (
              <TouchableOpacity
                onPress={this.pageToChatDetail.bind(this, item)}
                key={item}
              >
                <MatchItem
                  item={this.props.friend.all[`${item}`]}
                  messageAll={this.props.message.all}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  contentBg: {
    backgroundColor: "#ffffff"
  },
  container: {
    flex: 1,
    marginBottom: 10,
    paddingBottom: 8
  },
  linkeMeContainer: {
    height: 70,
    marginBottom: 8,
    backgroundColor: "#ffffff"
  },
  likeIcon: {
    marginTop: 10,
    marginLeft: 8,
    width: 50,
    height: 50
  },
  likeTextContainer: {
    marginLeft: 15,
    padding: 10
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
    backgroundColor: "#ffffff",
    marginTop: 10
  },
  matchNum: {
    paddingLeft: 16,
    paddingTop: 10
  },
  spinnerTextStyle: {
    color: '#FFFFFF'
  }
});
