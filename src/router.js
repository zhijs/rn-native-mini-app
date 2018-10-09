/**
 * 导航配置
 *
 */
import React, {Component} from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import {BottomTabBar } from 'react-navigation-tabs'
import LoginIndex from './pages/container/login-container'
import Chat from './pages/container/chat-container'
import Match from './pages/container/match-container'
import Square from './pages/container/square-container'
import Upload from './pages/container/upload-container'
import {Image, StyleSheet } from 'react-native';
import commonStyle from './utils/common-style'
const Tab = createBottomTabNavigator(
  {
    chat: {
      screen: Chat,
      navigationOptions: {
        tabBarLabel: "聊天",
        showIcon: true,
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <Image 
              source = { focused ? require('./assets/images/chat-active.png') : require('./assets/images/chat.png')}
              style = {focused ? commonStyle.tabItemActive : commonStyle.tabItem}
            />
          )
        }
      }
    },
    Match: {
      screen: Match,
      navigationOptions: {
        tabBarLabel: "匹配",
        showIcon: true,
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <Image 
              source = { focused ? require('./assets/images/match-active.png') : require('./assets/images/match.png')}
              style = {focused ? commonStyle.tabItemActive : commonStyle.tabItem}
            />
          )
        }
      }
    },
    Square: {
      screen: Square,
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      tabBarPosition: 'bottom',
      style: {
        backgroundColor: '#fff',
        borderTopColor: '#ccc',
        height: 60,
        overflow:'visible'
      }
    },
    // tabBarComponent: TabBarComponent,
    swipeEnabled: false,
    animationEnabled: false,
  }
);
const AppNavigator = createStackNavigator(
  {
    LoginIndex,
    Upload: {
      screen: Upload,
      navigationOptions: {
        title: '上传照片及其语音',
        headerStyle: {
          textAlign: 'center'
        }
      }
    },
    Tab
  },
  {
    initialRouteName: 'Upload',
  }
);
export default AppNavigator;