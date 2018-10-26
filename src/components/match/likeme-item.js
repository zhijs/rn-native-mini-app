/**
 * 谁喜欢了我用户列表组件
 */
import React, { Component } from 'react';
import {
  View,
  Style,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

export default class LikeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '2018/10/09',
      shwoMaxNum: 10,
      hasCollapse: true,
      users: [
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        },
        {
          img: 'http://211.159.182.124/resource/image/1539770238.jpeg'
        }
      ]
    }
  }

  // 获取时间文本
  getDayText(dateStr) {
    let date = new Date(dateStr);
    let now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return '今天';
    } else if ((now.getFullYear() === date.getFullYear()) && (now.getMonth() === date.getMonth()) && ((now.getDate() - date.getDate()) === 1)) {
      return '昨天';
    }
    return dateStr;
  }
  
  // 获取下拉和收起箭头
  getArrow(users) {
    if(users.length < this.state.shwoMaxNum) {
      return null;
    }
    return(
      <View style = {{ backgroundColor: '#ffffff', padding: 10}}>
        <TouchableOpacity
          onPress = {this.changeArrow.bind(this)}
          style = {{flexDirection: 'row', justifyContent: 'center'}}
        >
          <Image
            style = {{height: 15, width: 27}}
            source = {this.state.hasCollapse ? require('../../assets/images/drop-down.png') : require('../../assets/images/collapse.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
  
  // 获取所有要展示的头像
  getShowImgs(allUsers) {
    let users = [];
    if (allUsers.length > this.state.shwoMaxNum && this.state.hasCollapse) {
      users = allUsers.slice(0, this.state.shwoMaxNum);
    } else {
      users = allUsers;
    }
    return users.map((item) => {
      return (
        <Image
          key = {item.uid}
          source = {{uri: item.profile_photo_src}}
          style = {style.imgItem}
        >
        </Image>
      )
    })
  }
  // 箭头点击
  changeArrow() {
    this.setState({
      hasCollapse: !this.state.hasCollapse
    })
  }
  render() {
    return(
      <View style = {style.itemContainer}>
        <Text style = {style.itemDate}>
         {
           this.getDayText(this.props.item.date)
         } 
        </Text>
        <View style = {style.usersImgContainer}>
         {
           this.getShowImgs(this.props.item.users)
         }
        </View>
          {
            this.getArrow(this.props.item.users)
          }
      </View>
    )
  }
}

const style = StyleSheet.create({
  itemContainer: {
    marginTop: 10
  },
  itemDate: {
    paddingLeft: 8
  },
  usersImgContainer: {
    backgroundColor: '#ffffff',
    flexWrap:'wrap',
    flexDirection: 'row'
  },
  imgItem: {
    width: '16%',
    padding: 15,
    height: 40,
    margin: '2%',
    borderRadius: 4,
  }
})