/**
 * 弹窗组件
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'

export default class MessageBox extends Component {
  
  constructor(props) {
    super(props)
  }
  // 弹出框关闭事件
  modalClose() {

  }
  render() {
    return(
      <Modal
        animationType = {'slide'}
        transparent = {true}
        presentationStyle = {'overFullScreen'}
        visible = {this.props.visible}
      >
        <TouchableOpacity
          onPress = {this.modalClose}
          style = {style.closeBtnContainer}
        >
          <Image
            style = {style.closeBtn}
            source = {require('../assets/images/close-btn.png')}
          >
          </Image>
          <View>
            <Text>倒数带上多所多所多所多</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const style = StyleSheet.create({
  modalContainer: {
    width: 80,
    height: 300,
    position: 'absolute'
  },
  closeBtnContainer: {
    flex: 1,
    position: 'absolute',
    top: 8,
    right: 8
  },
  closeBtn: {
    width: 20,
    height: 20
  }
})