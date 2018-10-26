/**
 * 程序入口，用于生成导航栏和导航条
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {Provider} from "react-redux";
import configureStore from './store/index'
import  {Root} from './pages/container/index'
const store = configureStore({});
export default class App extends Component {
  render() {
    return (
      <Provider store ={store}>
        <Root/>
      </Provider>
    );
  }
}


