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
    console.log('message-box', props)
  }
  render() {
    return(
      <Modal
        animationType = {'slide'}
        transparent = {true}
        presentationStyle = {'overFullScreen'}
        visible = {this.props.visiable === undefined ? false : this.props.visiable}
        onRequestClose = {() => {
          this.props.modalClose();
        }}
      >  
        <View
          style = {style.bg}
        >
          <View
            style = {[style.modalContent, { height: this.props.contentHeight}]}
          >
            <TouchableOpacity
              onPress = {() => {
                this.props.modalClose();
              }}
              style = {style.closeBtnContainer}
            >
              <Image
                style = {style.closeBtn}
                source = {require('../assets/images/close-btn.png')}
              >
              </Image>
            </TouchableOpacity>
             <View style = {{flex: 1, marginTop: 25}}>
                {this.props.childView}
              </View>
            </View>
        </View>
      </Modal>
    )
  }
}

const style = StyleSheet.create({
  bg: {
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%'
  },
  modalContent: {
    width: '70%',
    height: '70%',
    marginLeft: '15%',
    marginTop: '15%',
    backgroundColor: '#ffffff',
    position: 'relative',
    borderRadius: 6
  },
  closeBtnContainer: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: 8,
    right: 8
  },
  closeBtn: {
    width: 25,
    height: 25
  }
})