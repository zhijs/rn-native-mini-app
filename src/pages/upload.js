/**
 * 上传头像和语音页面
 */
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import commonStyle from "../utils/common-style";
export default class Upload extends Component {
  render() {
    return (
      <View style={[style.container, commonStyle.pageBg]}>
        <View style={[style.avatarContainer, style.itemBg]}>
          <View Style={style.avatarContent}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                padding: 10
              }}
              onPress={() => {
                console.log("选择头像");
              }}
            >
              <Image
                source={require("../assets/images/upload-avatar.png")}
                style={style.avatarHolder}
              />
            </TouchableOpacity>
            <Text style={[commonStyle.textCenter, style.opText]}>
              上传本人真实照片
            </Text>
            <Text style={[commonStyle.textCenter]}>作为默认头像及匹配照片</Text>
          </View>
        </View>

        <View style={[style.audioContainer, style.itemBg]}>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                padding: 10
              }}
              onPress={() => {
                console.log("选择头像");
              }}
            >
              <Image
                style={style.avatarHolder}
                source={require("../assets/images/upload-audio.png")}
              />
            </TouchableOpacity>
            <Text style={[commonStyle.textCenter]}>上传自己的专属语音</Text>
          </View>
        </View>

        <View style={[style.btnContainer, style.itemBg]}>
          <TouchableOpacity
            style={style.uploadBtn}
            onPress={() => {
              console.log("确定上传");
            }}
          >
            <Text style={[style.uploadText, commonStyle.textCenter]}>
              确定上传
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  itemBg: {
    backgroundColor: "#f9f9f9",
    margin: 20,
    marginTop: 10,
    position: "relative"
  },
  container: {
    flex: 1,
    borderWidth: 2
  },
  avatarContainer: {
    flex: 5,
    justifyContent: "center"
  },
  avatarContent: {
    padding: 10
  },
  opText: {
    fontSize: 13,
    color: "#4b4b4b",
    fontWeight: "600",
    padding: 10
  },
  avatarHolder: {
    height: 40,
    width: 40
  },
  audioContainer: {
    flex: 3,
    margin: 10,
    justifyContent: "center"
  },
  btnContainer: {
    height: 40,
    position: "absolute",
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  uploadText: {
    lineHeight: 40
  }
});
