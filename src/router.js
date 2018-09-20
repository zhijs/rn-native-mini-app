/**
 * 导航配置
 *
 */

import { createStackNavigator  } from 'react-navigation'
import LoginIndex from './pages/container/login-container'
// import Chat from './pages/container/chat-container'
import Chat from './pages/chat'

const AppNavigator = createStackNavigator(
  {
    LoginIndex,
    Chat
  },
  {
    initialRouteName: 'LoginIndex',
  }
);

export default AppNavigator;