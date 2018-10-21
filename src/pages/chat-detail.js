/**
 * 消息聊天界面
 */

import React, {Component} from 'react';
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
} from 'react-native';
import commonStyle from '../utils/common-style'
import { sendMsg } from "../api/message";
import { getScore } from '../api/friend'
import Message from '../components/messge';
import webSocketCla from '../common/web-socket';
import MessageBox from "../components/message-box";
export default class ChatDeTail extends Component {

  constructor(props) {
    super(props)
    const { params } = props.navigation.state;
    this.ws = webSocketCla.getInstance();
    this.state = {
      modalShow: true,
      myId: 47,
      score: 10,
      otherUser: null,
      routerType: params.type,
      score: 0,
      otherUid: params.user.uid,
      activeTool: 'dice'
    }
  }
  
  // 关闭工具栏
  closeToolView() {
    this.setState({activeTool: null})
  }
  // 选择聊天方式
  chooseTools(type) {
    if (this.state.activeTool === type) {
      this.setState({activeTool: null})
    } else {
      this.setState({activeTool: type})
    }
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    console.log('navigation--state', params)
    return {
      headerTitle: () => {
        return(
          <Text style ={style.headerTitle}>{params.user.nickname}</Text>
        )
      }
    }
  }


  // 发送骰子消息
  sendDiceMsg() {
    console.log('websocket 发送消息', this.ws)
    let num = parseInt(Math.random() * 10) % 6 + 1
    sendMsg({
      from: this.state.myId,
      to: this.state.otherUid,
      msg_type: 'chat_game',
      msg_body: `{"dice": ${num}}`
    }).then((res) => {
      console.log('发送消息成功', res)
      if (res.data && res.data.result === "ok") {
        // 添加消息
        if (!this.props.friend.all[this.state.otherUid].msgs.includes(res.data.msg.id)) {
          let msg = {};
          msg[`${res.data.msg.id}`] = res.data.msg
          this.props.setMessageAll(msg)
          this.props.addFriendMsg({
            uid: this.state.otherUid,
            msgId: res.data.msg.id
          })
        }
        // 添加聊天的朋友
        if (!this.props.friend.chat.includes(this.state.otherUid)) {
          this.props.addChatFriend([this.state.otherUid])
        }
      }
    })
    this.setState({activeTool: null})
  }
  componentWillMount() {
    // 判断分数
    if (this.routerType === 'match') {
      this.setState({score: 0}) // 设置分数为0
    } else {
      // 请求亲密度
      getScore({
        from: this.state.myId,
        to: this.state.otherUid
      }).then((res) => {
        console.log('请求亲密度', res)
      })
    }
  }

  // 根据分数来判断是否是解锁文字聊天
  getTextInput(score = 0) {
    console.log('getTextInput score..', score)
    if (!score) {
      return (
        <View style = {style.textLockContainer}>
          <Image 
            style = {style.lockImg}
            source = {require('../assets/images/lock.png')}
          >
          </Image>
          <Text style = {style.lockText}>文字聊天暂未解锁</Text>
        </View>
      )
    } else {
      return (
        <TextInput
          style = {style.msgInput}
          placeholder="聊一聊"
          underlineColorAndroid="transparent"
        />
      )
    }
  }

  // 获取工具面板展示
  getToolView() {
    if (this.state.activeTool === 'dice') {
      return (
        <View style = {style.piceToolContainer}>
            <TouchableOpacity style = {style.toolItem}>
               <Image
                 style = {style.toolItemImg}
                 source = {require('../assets/images/ask.png')} 
               />
               <Text style = {style.toolItemText}>随便问问</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style = {style.toolItem}
              onPress = {this.sendDiceMsg.bind(this)}
            >
               <Image
                 style = {style.toolItemImg}
                 source = {require('../assets/images/tool-dice.png')} 
               />
               <Text style = {style.toolItemText}>掷骰子</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {style.toolItem}>
               <Image
                 style = {style.toolItemImg}
                 source = {require('../assets/images/tool-five-row.png')} 
               />
               <Text style = {style.toolItemText}>五子棋</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {style.toolItem}>
               <Image
                 style = {style.toolItemImg}
                 source = {require('../assets/images/draw-guess.png')} 
               />
               <Text style = {style.toolItemText}>你画我猜</Text>
            </TouchableOpacity>
        </View>
      )
    }
    return  null;
  }

  // 弹框关闭
  modalClose() {
    this.setState({modalShow: false})
  }

  // 获取弹框内容
  getModalChild() {
    return(
      <View
        style = {style.modalContainer}
      >

      </View>
    )
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity = {1}
        style = {[commonStyle.pageBg, style.container]}
        onPress = {this.closeToolView.bind(this)}
      >  
        <View style = {style.heartContainer}>
           <Image
             source = {require('../assets/images/score.png')}
             style = {style.heartIcon}
           />
           <Text style = {style.scoreText}>{this.state.score}</Text>
        </View>
        <MessageBox
          modalClose = {this.modalClose.bind(this)}
          visiable = {this.state.modalShow}
          contentHeight = {'60%'}
          childView = {this.getModalChild(null, this.state.matchUserName, this.state.matchUserImg)}
        />
        <ScrollView style = {style.msgContainer}>
          {
            
            this.props.friend.all[this.state.otherUid].msgs.map((msgId) => {
              return (
                <Message
                  key = {msgId} 
                  msg = {this.props.message.all[msgId]}
                />
              )
            })
          }
        </ScrollView>
        <View style = {style.chatTypeContainer}>
          <View 
            style = {style.inputContainer}
          >  
            {
              this.getTextInput(this.state.score)
            }
          </View>
           <View style = {style.toolPanelContainer}>
             <View style = {style.toolPanel}>
               <TouchableOpacity
                 style = {style.toolContainer}
                 onPress = {this.chooseTools.bind(this, 'audio')}
               >
                  <Image
                    style = {style.toolIcon}
                    source = {require('../assets/images/chat-audio-lock.png')}
                  />
               </TouchableOpacity>
               <TouchableOpacity
                 style = {style.toolContainer}
                 onPress = {this.chooseTools.bind(this, 'img')}
               >
                  <Image
                    style = {style.toolIcon}
                    source = {require('../assets/images/chat-image-lock.png')}
                  />
               </TouchableOpacity>
               <TouchableOpacity
                 style = {style.toolContainer}
                 onPress = {this.chooseTools.bind(this, 'dice')}
               >
                  <Image
                    style = {style.toolIcon}
                    source = {this.state.activeTool === 'dice' ? require('../assets/images/chat-dice-active.png') : require('../assets/images/chat-dice.png')}
                  />
               </TouchableOpacity>
               <TouchableOpacity
                 style = {style.toolContainer}
                 onPress = {this.chooseTools.bind(this, 'phone')}
               >
                  <Image
                    style = {style.toolIcon}
                    source = {require('../assets/images/chat-phone-lock.png')}
                  />
               </TouchableOpacity>
               <TouchableOpacity
                 style = {style.toolContainer}
                 onPress = {this.chooseTools.bind(this, 'video')}
               >
                  <Image
                    style = {style.toolIcon}
                    source = {require('../assets/images/chat-video-lock.png')}
                  />
               </TouchableOpacity>
             </View>
             <View style = {[style.toolView, {height: this.state.activeTool === 'dice' ? 120 : 0}]}>
                 {
                   this.getToolView()
                 }
             </View>
           </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#000000',
    fontSize: 14,
    fontWeight: '600'
  },
  container: {
    position: 'relative',
    flex: 1
  },
  heartContainer: {
    position: 'absolute',
    top: 12,
    right: 20,
    width: 56,
    height: 56
  },
  heartIcon: {
    position: 'absolute',
    width: 56,
    height: 56
  },
  scoreText: {
    position: 'absolute',
    color: '#ffffff',
    width: 56,
    height: 56,
    textAlign: 'center',
    lineHeight: 50,
    
  },
  msgContainer: {
    padding: 10,
    paddingBottom: 40
  },
  chatTypeContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff'
  },
  inputContainer: {
    height: 50,
    width: '100%',
  },
  textLockContainer: {
    width: '100%',
    flex: 1,
    borderColor: '#e3e3e3',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  lockImg: {
    width: 20,
    height: 20,
    margin: 15
  },
  lockText: {
    lineHeight: 50
  },
  msgInput:{
    height: 42,
    width: '100%',
    borderColor: '#e3e3e3',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 5,
    zIndex: 10,
    backgroundColor: '#ffffff'
  },
  toolPanel: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    flexDirection: 'row',
    // justifyContent: 'space-between',
    height: '100%'
  },
  toolView: {
    flex: 1,
    justifyContent: 'space-around'
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
    textAlign: 'center',
    fontSize: 12
  },
  // 弹窗相关
  modalContainer: {
    
  }
})