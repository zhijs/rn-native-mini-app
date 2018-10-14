/**
 * 匹配页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { getFriend } from '../api/friend'
import commonStyle from '../utils/common-style'
import Card from '../components/card'
import SwipeCards from 'react-native-swipe-cards';
import DislikevView from '../components/match/dislike-view'
import LikevView from '../components/match/like-view'
import { Api } from '../api/_fetch';
// userID 11
export default class Match extends Component {
  constructor(props) {
    super(props);
    this.imgPre = 'http://'
    this.state = {
      myId: 11,
      card: [
        {img: 'http://world.people.com.cn/NMediaFile/2016/1208/MAIN201612081356000022613618149.jpg'},
        {img: 'http://seopic.699pic.com/photo/40006/5720.jpg_wh1200.jpg'},
        {img: 'http://world.people.com.cn/NMediaFile/2016/1208/MAIN201612081356000022613618149.jpg'},
        {img: 'http://seopic.699pic.com/photo/40006/5720.jpg_wh1200.jpg'},
      ]
    }
  }
  componentWillMount() {
    console.log('Match componentWillMount --', this.state.myId)
    getFriend({uid: this.state.myId})
      .then((res) => {
        console.log('get friend success', res)
        if (res.data && res.data.result === 'ok') {
          let uids = [];
          let nowYear = (new Date).getFullYear + 1
          let usersInfo = res.data.info.map((item) => {
            let itemYear = (new Date(item.dob)).getFullYear + 1
            let user = {
              uid: item.uid,
              nickname: item.nickname,
              phone_number: item.phone_number,
              age: nowYear -  itemYear,
              profile_photo_src: `${Api}${item.profile_photo_src}`,
              gender: item.gender,
              audioSrc: item.audio_src
            }
          })
        }
      })
  }
  handleDisLike() {
    console.log('不喜欢')
  }

  handleLike() {
    console.log('like')
  }
  render() {
    return (
      <View style={[commonStyle.pageBg, style.container]}>
        <View style={style.header}>
          <View style= {style.avatarContainer}>
            <Image
              style = {style.myAvatar}
              source ={require('../assets/images/match-active.png')}
            />
          </View>
          <View style = {style.titleContainer}>
            <Text style={style.title}>匹配</Text>
          </View>
        </View>
        <View style={style.content}>
            <SwipeCards
              cards={this.state.card}
              style = {{width: '100%', height: '100%'}}
              showYup={true}
              showNope = {true}
              noView = {<DislikevView/>}
              yupView = {<LikevView/>}
              yupStyle = {style.slideIcon}
              nopeStyle = {style.slideIcon}
              renderCard={(cardData) => <Card {...cardData} />}
            >
            </SwipeCards>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    paddingBottom: 8,
    position: 'relative'
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  myAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  title: {
    color: '#000000',
    lineHeight: 50,
    fontWeight: '700',
    fontSize: 20,
    marginLeft: -10,
    fontFamily: 'PingFangSC-Semibold'
  },
  content: {
    flex: 1,
    borderRadius: 15,
    overflow: 'visible',
    width: '100%'
  },
  othderBg: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    position: 'relative',
    overflow: 'visible'
  },
  bgImgageStyle: {
    borderRadius: 10
  },
  imgBtn: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50
  },
  btnDislikeContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  slideIcon: {
    position: 'absolute',
    bottom: 200,
    borderWidth: 0,
    padding: 0
  },
  likeContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btnlikeImg: {
    width: 70,
    height: 50
  }
})