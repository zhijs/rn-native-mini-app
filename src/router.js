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
import {Image, StyleSheet } from 'react-native';
import commonStyle from './utils/common-style'

// const TabBarComponent =  class TabBarComponent extends Component {
//   render() {
//     return(
//       <BottomTabBar {...this.props} 
//         style = {{overflow: 'visiable'}}
//       />
//     )
//   }
// }
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
    Tab
  },
  {
    initialRouteName: 'LoginIndex',
  }
);
export default AppNavigator;