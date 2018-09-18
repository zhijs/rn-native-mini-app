/**
 * 程序入口，用于生成导航栏和导航条
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import LoginIndex from './pages/container/login-container'
import configureStore from './store/index'
const store = configureStore({});
console.log('store', store)

class index extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginIndex />
      </Provider>
    )
  }
}
// 导航页

const App = StackNavigator({
  LoginIndex : { screen: index },
  Main: {
    screen: index,
    navigationOptions: ({navigation})=> ({
      header: {
        visible: true
      }
    })
  }
}, {
  headerMode: 'screen'
});

export default App;


