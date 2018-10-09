/**
 * 左边抽屉导航
 */
import React, {Component} from 'react';
import { createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import mineContainer from './container/mine-container'
const drawer = createDrawerNavigator({
  mine: {
    screen: mineContainer
  }
})

export default drawer;