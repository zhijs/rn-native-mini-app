import React, { Component } from "react";
import {
  View,
  Style,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { Api } from "../api/_fetch";
import Sound from "react-native-sound";
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { duration: 0 };
    this.sound = new Sound(this.props.audioSrc, null, error => {
      if (!error) {
        let duration = this.sound.getDuration();
        this.setState({ duration: duration });
        this.sound.setNumberOfLoops(0);
      } else {
      }
    });
    this.props.getCardChild(this);
  }
  _getGenderIcon(gender) {
    if (this.props.gender === "male") {
      return (
        <Image
          style={style.gender}
          source={require("../assets/images/boy.png")}
        />
      );
    } else {
      return (
        <Image
          style={style.gender}
          source={require("../assets/images/girl.png")}
        />
      );
    }
  }
  stopVideo() {
    this.sound.stop();
  }
  componentWillUnmount() {
    this.sound.pause();
  }
  render() {
    return (
      <View style={style.cardContainer}>
        <Image
          style={style.cardImage}
          source={{ uri: this.props.profile_photo_src}}
          borderRadius={15}
        />
        <View style={style.ptContainer}>
          <Image
            style={style.ptIcon}
            source={require("../assets/images/pt-icon.png")}
          />
          <Text style={style.ptNum}>{this.props.pics === null ? 0 : this.props.pics.length}</Text>
        </View>
        <View style={style.userInfoContainer}>
          <Text style={style.username}>{this.props.nickname}</Text>
          <View style={style.genderAgeContainer}>
            {this._getGenderIcon(this.props.gender)}
            <Text style={style.ageText}> {this.props.age} </Text>
          </View>
        </View>
        <View style={style.othderinfo}>
          <View style={style.distanceContainer}>
            <Image
              style={style.distanceIcon}
              source={require("../assets/images/location.png")}
            />
            <Text style={style.distance}>{this.props.distence}</Text>
          </View>
          <View style={style.videoContainer}>
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "row" }}
              onPress={() => {
                this.sound.play();
              }}
            >
              <Image
                style={style.videoIcon}
                source={require("../assets/images/video-icon.png")}
              />
              <Text style={style.videoTime}>
                {parseInt(this.state.duration)}S
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    position: "relative",
    flex: 1
  },
  cardImage: {
    width: 348,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    flex: 1
  },
  ptContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 5,
    right: 20,
    width: 50,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#9f8f86",
    borderColor: "#9f9187"
  },
  ptIcon: {
    width: 20,
    height: 14,
    marginTop: 8,
    marginLeft: 3
  },
  ptNum: {
    lineHeight: 30,
    color: "#FFFFFF",
    textAlign: "center",
    flexGrow: 1
  },
  userInfoContainer: {
    height: 60,
    marginTop: 5
  },
  username: {
    fontWeight: "700",
    fontSize: 18,
    color: "#444444",
    textAlign: "center"
  },
  genderAgeContainer: {
    height: 28,
    flexDirection: "row",
    justifyContent: "center"
  },
  gender: {
    width: 26,
    height: 20
  },
  ageText: {
    height: 20,
    marginLeft: 8,
    padding: 1,
    width: 26,
    borderRadius: 8,
    color: "#ffffff",
    textAlign: "center",
    backgroundColor: "#bb65ff"
  },
  othderinfo: {
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  distanceContainer: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  distanceIcon: {
    width: 12,
    height: 20,
    marginLeft: 10
  },
  distance: {
    marginLeft: 5,
    color: "#e1e1e1",
    height: 30
  },
  videoContainer: {
    borderColor: "#eaeaea",
    padding: 5,
    borderWidth: 1,
    width: 90,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  videoIcon: {
    width: 25,
    height: 20
  },
  videoTime: {
    marginLeft: 5,
    color: "#e1e1e1"
  }
});
