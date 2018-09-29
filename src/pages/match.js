/**
 * 匹配页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import commonStyle from '../utils/common-style'
import SwipeCards from 'react-native-swipe-cards';
export default class Chat extends Component {
  constructor(props) {
    super(props);
    // this.handleDisLike = this.handleDisLike.bind(this)
    // this.btnlikeImg = this.btnlikeImg.bind(this)
    this.state = {
      card: {
        name: 'userImg', image: '../assets/images/user.jpg',
      }
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
              style = {{flex: 1}}
            >
              <ImageBackground
                style= {style.othderBg}
                imageStyle={style.bgImgageStyle}
                source ={require('../assets/images/user.jpg')}
              >
                <View style={style.ptContainer}>
                  <Image
                    style = {style.ptIcon}
                    source ={require('../assets/images/pt-icon.png')}
                  />
                  <Text style={style.ptNum}>5</Text>
                </View>
              </ImageBackground>
            </SwipeCards>
            <View style={style.imgBtn}>
                <TouchableOpacity
                  style={style.btnDislikeContainer}
                  onPress={this.handleDisLike}
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
            </View>
            <View style={style.userInfoContainer}>
                <Text style={style.username}>文艺小清新</Text>
                <View style={style.genderAgeContainer}>
                  <Image
                    style = {style.gender}
                    source ={require('../assets/images/boy.png')}
                  />
                  <Text
                    style = {style.ageText}
                  >
                    21
                  </Text>
                </View>
            </View>
            <View style={style.othderinfo}>
                <View style={style.distanceContainer}>
                  <Image
                    style = {style.distanceIcon}
                    source ={require('../assets/images/location.png')}
                  />
                  <Text style={style.distance}>300m</Text>
                </View>
                <View style={style.videoContainer}>
                  <Image
                    style = {style.videoIcon}
                    source ={require('../assets/images/video-icon.png')}
                  />
                  <Text style={style.videoTime}>6s</Text>
                </View>
            </View>
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
  ptContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 5,
    right: 10,
    width: 50,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#9f8f86',
    borderColor: '#9f9187'
  },
  ptIcon: {
    width: 20,
    height: 14,
    marginTop: 8,
    marginLeft: 3
  },
  ptNum: {
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    flexGrow: 1
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
  btnDislikeImg: {
    width: 70,
    height: 50
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
  },
  userInfoContainer: {
    height: 60,
    marginTop: 5
  },
  username: {
    fontWeight: '700',
    fontSize: 18,
    color: '#444444',
    textAlign: 'center'
  },
  genderAgeContainer: {
    height: 28,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gender: {
    width: 26,
    height: 20
  },
  ageText: {
    height: 20,
    marginLeft: 8,
    padding: 1,
    width: 26,
    borderRadius: 8,
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: '#bb65ff'
  },
  othderinfo: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distanceContainer: {
    width: 60,
    height: 16,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  distanceIcon: {
    width: 10,
    height: 20,
    marginLeft: 10
  },
  distance: {
    marginLeft: 5,
    color: '#e1e1e1'
  },
  videoContainer: {
    borderColor: '#eaeaea',
    padding: 5,
    borderWidth: 1,
    width: 60,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  videoIcon: {
    width: 25,
    height: 20
  },
  videoTime: {
    marginLeft: 10,
    color: '#e1e1e1'
  },
})