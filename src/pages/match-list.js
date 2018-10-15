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
import { Api } from "../api/_fetch";
import { relative } from "path";
export default class matchList extends Component {
  render() {
    return (
      <View style={[commonStyle.pageBg, style.container]}>
        <View style={style.linkeMeContainer}>
          <TouchableOpacity style={{ flex: 1, flexDirection: "row" }}>
            <View style={style.iconContainer}>
              <Image
                source={require("../assets/images/like-me.png")}
                style={style.likeIcon}
              />
            </View>
            <View style={style.likeTextContainer}>
              <Text style={style.title}>谁喜欢我</Text>
              <Text style={style.likeMeNum}>得到1344人喜欢</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.matchContainer}>
          <Text style={style.matchNum} />
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  linkeMeContainer: {
    height: 70,
    padding: 10,
    marginBottom: 8
  },
  likeIcon: {
    width: 50,
    height: 50
  },
  likeTextContainer: {
    marginLeft: 15
  },
  title: {
    color: "#000000",
    fontWeight: "900",
    fontSize: 16
  },
  likeMeNum: {
    marginTop: 8
  }
});
