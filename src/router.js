/**
 * 导航配置
 *
 */
import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  Text
} from "react-navigation";
import LoginIndex from "./pages/container/login-container";
import Chat from "./pages/container/chat-container";
import ChatDetail from "./pages/container/chat-detail-container";
import Match from "./pages/container/match-container";
import MatchList from "./pages/container/match-list-container";
import Square from "./pages/container/square-container";
import Upload from "./pages/container/upload-container";
import linkeMe from "./pages/container/likeme-container"
import linkeMeTitle from "./pages/container/likeme-title-container"
import { Image, StyleSheet } from "react-native";
import commonStyle from "./utils/common-style";

// 聊天页面上方Tab
const chatTab = createMaterialTopTabNavigator(
  {
    matchList: {
      screen: MatchList,
      navigationOptions: {
        tabBarLabel: "配对",
      }
    },
    chat: {
      screen: Chat,
      navigationOptions: {
        tabBarLabel: "聊天"
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: "#E8E8EF",
        height: 40,
        width: 120,
        marginLeft: "auto",
        marginRight: "auto"
      },
      tabStyle: {
        width: 60
      },
      indicatorStyle: {
        width: 30,
        height: 5,
        marginLeft: 15
      },
      labelStyle: {
        color: "#515151"
      },
      activeTintColor: "#000000"
    },
    swipeEnabled: true,
    animationEnabled: false
  }
);
const Tab = createBottomTabNavigator(
  {
    chat: {
      screen: chatTab,
      navigationOptions: {
        tabBarLabel: "聊天",
        showIcon: true,
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <Image
              source={
                focused
                  ? require("./assets/images/chat-active.png")
                  : require("./assets/images/chat.png")
              }
              style={focused ? commonStyle.tabItemActive : commonStyle.tabItem}
            />
          );
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
              source={
                focused
                  ? require("./assets/images/match-active.png")
                  : require("./assets/images/match.png")
              }
              style={focused ? commonStyle.tabItemActive : commonStyle.tabItem}
            />
          );
        }
      }
    },
    Square: {
      screen: Square,
      navigationOptions: {
        tabBarLabel: "广场",
        showIcon: true,
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <Image
              source={
                focused
                  ? require("./assets/images/square-active.png")
                  : require("./assets/images/square.png")
              }
              style={focused ? commonStyle.tabItemActive : commonStyle.tabItem}
            />
          );
        }
      }
    }
  },
  {
    initialRouteName: "chat",
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      tabBarPosition: "bottom",
      style: {
        backgroundColor: "#fff",
        borderTopColor: "#ccc",
        height: 50,
        overflow: "visible"
      }
    },
    swipeEnabled: false,
    animationEnabled: false
  }
);
const AppNavigator = createStackNavigator(
  {
    LoginIndex,
    Upload: {
      screen: Upload,
      navigationOptions: {
        title: "上传照片及其语音",
        headerStyle: {
          textAlign: "center"
        }
      }
    },
    Tab: {
      screen: Tab,
      headerBackTitleVisible: false,
      navigationOptions: {
        header: null
      }
    },
    linkeMe: {
      screen: linkeMe,
      headerBackTitleVisible: false,
      navigationOptions: {
        headerTitle: linkeMeTitle
      }
    },
    ChatDetail: {
      screen: ChatDetail
    }
  },
  {
    initialRouteName: "Tab"
  }
);
export default AppNavigator;
