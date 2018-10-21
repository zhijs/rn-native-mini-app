/**
 * 聊天页面-登陆成功后页面
 */
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
import { Ip } from "../api/_fetch";
import { getLikeMeList, getFriendList } from "../api/friend";
import MatchItem from '../components/match/match-item'
export default class matchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myId: 47
    },
    this.timer = null;
    console.log('webaosket', `ws://${Ip['Test']}/push/recv`)
    // this.ws = new WebSocket(`ws://${Ip['Test']}/push/recv`);
  }

  // componentWillMount() {
  //   this.ws.onopen = () => {
  //     console.log('WebSocket open')
  //   };

  //   // 有消息到来
  //   this.ws.onmessage = this.handleMsgCome

  //   // 出错
  //   this.ws.onerror = this.handleWsError

  //   // 关闭
  //   this.ws.onclose =  this.handleWsClose
  // }
  
  // 消息到来
  handleMsgCome(e) {
    console.log('WebSocket 收到消息', e)
  }

  // webSocket 出错
  handleWsError(e) {
    console.log('WebSocket 出错', e.message)
  }
  
  // websocket 关闭
  handleWsClose(e) {
    console.log('WebSocket 关闭', e)
  }
  
  // 跳转到聊天页面
  pageToChatDetail(uid) {
    const { navigate } = this.props.navigation;
    let user =  this.props.friend.all[uid];
    console.log('pageToChatDetail--', {user, type: 'match'});
    navigate('ChatDetail', {user, type: 'match'})
  }

  render() {
    return (
      <View style={[style.container]}>
        <ScrollView style={style.matchContainer}>
          <Text style={style.matchNum}> {this.props.friend.chat.length}个聊天</Text>
          { 
            this.props.friend.chat.map((uid) => {
              return (
                <TouchableOpacity
                  onPress = {this.pageToChatDetail.bind(this, uid)}
                  key = {uid}
                >
                  <MatchItem 
                    messageAll = {this.props.message.all}
                    item = {this.props.friend.all[`${uid}`]}
                  />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
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
