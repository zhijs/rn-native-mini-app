/**
 * 上传头像和语音页面
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
export default class Upload extends Component {
  render() {
    return (
      <View styler={style.container}>
        <View style={style.avatarContainer}>
           <View Style={style.avatarContent}>
             <TouchableOpacity
               onPress = {() => {
                 console.log('选择头像')
               }}
             >
               <Image
                 source={require('../assets/images/upload-avatar.png')}
                 style={style.avatarHolder}
               />
             </TouchableOpacity>
              <Text>上传本人真实照片</Text>
              <Text>作为默认头像及匹配照片</Text>
           </View>
        </View>

        <View style={style.audioContainer}>
          <TouchableOpacity
               onPress = {() => {
                 console.log('选择头像')
               }}
             >
               <Image
                 style={style.avatarHolder}
               />
            </TouchableOpacity>
            <Text>上传自己的专属语音</Text>
        </View>
        
        <View
          style={style.btnContainer}
        >
          <TouchableOpacity
            style={style.uploadBtn}
            onPress={() => {
              console.log('确定上传')
            }}
          >
            <Text style={style.uploadText}>确定上传</Text>
          </TouchableOpacity>
        </View>    
      </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:2
  },
  avatarContainer: {
    flex: 3,
    margin: 10,
    justifyContent: 'center'
  },
  avatarContent: {

  },
  avatarHolder: {
    height: 40,
    width: 40
  },
  audioContainer: {
    flex: 1,
    margin: 10
  },
  btnContainer: {
    height: 40
  }
})