/**
 * 导航配置
 *
 */

import { createStackNavigator,createBottomTabNavigator  } from 'react-navigation'
import LoginIndex from './pages/container/login-container'
import Chat from './pages/container/chat-container'
import Match from './pages/container/match-container'
import Square from './pages/container/square-container'

const Tab = createBottomTabNavigator(
  {
    chat: {
      screen: Chat,
      navigationOptions: {
        tabBarLabel: "聊天",
      }
    },
    Match: {
      screen: Match,
      navigationOptions: {
        tabBarLabel: "匹配",
      }
    },
    Square: {
      screen: Square,
      navigationOptions: {
        tabBarLabel: "广场",
      }
    }
  }
);
const AppNavigator = createStackNavigator(
  {
    LoginIndex,
    Chat,
    Tab
  },
  {
    initialRouteName: 'LoginIndex',
  }
);

export default AppNavigator;