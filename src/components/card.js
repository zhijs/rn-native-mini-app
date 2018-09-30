import React, { Component } from 'react';
import {
  View,
  Style,
  Text,
  StyleSheet,
  Image
} from 'react-native'
export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.cardContainer}>
          <Image
            style = {style.cardImage}
            source={{uri:this.props.img}}
            borderRadius={15}
          />
          <View style={style.ptContainer}>
            <Image
              style = {style.ptIcon}
              source ={require('../assets/images/pt-icon.png')}
            />
            <Text style={style.ptNum}>5</Text>
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
    )
  }
}
const style = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    position: 'relative',
    flex: 1
  },
  cardImage: {
    width: 348,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    flex: 1
  },
  ptContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 5,
    right: 20,
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
    height: 52,
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
  }, distanceContainer: {
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
