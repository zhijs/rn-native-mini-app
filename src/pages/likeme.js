/**
 * 谁喜欢了我界面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import LikeItem from '../components/match/likeme-item'
import { date2str } from "../../utils/tool";
export default class LikeMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likeMeUsers: []
    }
  }

  componentWillMount() {
    // 遍历喜欢我的用户，并用日期区分
    let likeMeData = {};
    let likeDataArr = []
    this.props.friend.LikeMe.forEach((item) => {
      let dateStr = date2str(new Date(item.did_at), '/')
      if (likeMeData[dateStr] === undefined) {
        likeMeData[dateStr] = [];
        likeMeData[dateStr].push(item)
      } else {
        likeMeData[dateStr].push(item)
      }
    });
  }
  render() {
    return (
      <ScrollView style = {style.container}>
        <LikeItem/>
        <LikeItem/>
        <LikeItem/>
        <LikeItem/>
        <LikeItem/>
        <LikeItem/>
        <LikeItem/>
      </ScrollView>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  }
})