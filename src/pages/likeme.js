/**
 * 谁喜欢了我界面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView, BackHandler } from 'react-native';
import LikeItem from '../components/match/likeme-item'
import { date2str } from "../utils/tool";
export default class LikeMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likeMeUsers: []
    }
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress () {
    this.props.navigation.goBack()
  }

  componentWillMount() {
    // 遍历喜欢我的用户，并用日期区分
    let likeMeData = {};
    let likeDataArr = []
    this.props.friend.likeMe.forEach((item) => {
      let all = this.props.friend.all;
      let dateStr = date2str(new Date(all[`${item}`].did_at), '/')
      if (likeMeData[dateStr] === undefined) {
        likeMeData[dateStr] = [];
        likeMeData[dateStr].push(all[`${item}`])
      } else {
        likeMeData[dateStr].push(all[`${item}`])
      }
    });
    let keys = Object.keys(likeMeData)
    for(let i = 0; i < keys.length; i++) {
      likeDataArr[i] = {
        date: keys[i],
        users: likeMeData[keys[i]]
      }
    }
    this.setState({
      likeMeUsers: likeDataArr
    })
  }
  render() {
    return (
      <ScrollView style = {style.container}>
       {
         this.state.likeMeUsers.map((item) => {
           return(
            <LikeItem
              key = {item.date}
              item = {item}
            />
           )
         })
       }
      </ScrollView>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  }
})