/**
 * 匹配页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import commonStyle from '../utils/common-style'
import Card from '../components/card'
import SwipeCards from 'react-native-swipe-cards';
import DislikevView from '../components/match/dislike-view'
import LikevView from '../components/match/like-view'
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: [
        {img: 'http://world.people.com.cn/NMediaFile/2016/1208/MAIN201612081356000022613618149.jpg'},
        {img: 'http://seopic.699pic.com/photo/40006/5720.jpg_wh1200.jpg'},
        {img: 'http://world.people.com.cn/NMediaFile/2016/1208/MAIN201612081356000022613618149.jpg'},
        {img: 'http://seopic.699pic.com/photo/40006/5720.jpg_wh1200.jpg'},
      ]
    }
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
            {/* <View style={style.imgBtn}>
                <TouchableOpacity
                  style={style.btnDislikeContainer}
                  onPress={this.handleDisLike.bind(this)}
                >
                    <Image
                      style = {style.btnDislikeImg}
                      source ={require('../assets/images/dislike.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.likeContainer}
                  onPress={this.handleLike}
                >
                    <Image
                      source ={require('../assets/images/like.png')}
                      style = {style.btnlikeImg}
                    />
                </TouchableOpacity>
            </View> */}
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