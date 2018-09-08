/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AndroidApp from './src/pages/app-android';

// const page = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: require('./pages/app-android.js')
// });

export default class App extends Component {
  render() {
    return (
      <View style={style.container}>
        <AndroidApp/>
      </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  }
});
