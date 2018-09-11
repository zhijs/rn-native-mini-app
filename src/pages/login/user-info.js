/**
 * 个人信息完善页面
 */
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  TouchableOpacity, 
  TextInput,
  Image
} from 'react-native';
import Footer from './footer'
import commonStyle from '../../utils/common-style'
import Svg from '../../components/svg'
export default class UserInfoPage extends Component {
  constructor(props) {
    super(props)
    this.manKind = 0;
    this.womenKind = 1;
    this.state = {
      gender: 0 // 0-男性， 1-女性
    }
  }
  render() {
    return (
      <View style={[style.container, commonStyle.pageBg]}>
        <View tyle={[style.itemContainer, style.item]}>
          <Text style={style.opTips}>完善个人信息</Text>
          <Text style={style.tipPromise}>确定后性别不可修改</Text> 
        </View>
        <View style={[style.avataContainer, style.item]}>
          <View style={[style.avataBtnContainer, style.manContainer]}>
            <Image
              style={style.avatar}
              source={this.state.gender === this.manKind ? require("../../assets/images/man_1.png") : require("../../assets/images/man_0.png")}
            />
            <Text style={style.avatarText}>男生</Text>
            <TouchableOpacity
              style={style.btnContainer}
              onPress={() => {
                if (this.state.gender === this,this.manKind) return 
                this.setState({gender: this.manKind});
              }}
            >
              <Image
                style={style.btnImg}
                source={this.state.gender === this.manKind ?  require("../../assets/images/selected.png") : require("../../assets/images/un-selected.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={[style.avataBtnContainer, style.womanContainer]}>
            <Image
              style={style.avatar}
              source={this.state.gender === this.womenKind ? require("../../assets/images/woman_1.png") :  require("../../assets/images/woman_0.png")}
            />
            <Text style={style.avatarText}>女生</Text>
            <TouchableOpacity
              style={style.btnContainer}
              onPress={() => {
                this.setState({gender: this.womenKind});
              }}
            >
              <Image
                style={style.btnImg}
                source={this.state.gender === this.womenKind ? require("../../assets/images/selected.png") :  require("../../assets/images/un-selected.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[style.selectContainer, style.item]}>
          <View style={style.editContainer}> 
            <TextInput
              style={style.edit}
              underlineColorAndroid="transparent"
              placeholder="昵称"
              onChangeText= {(value) => {
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={[style.editContainer, style.selectBirth]}
              onPress={() => {
              }}
            >
              <Text
                style={commonStyle.btnText}
              >
                选择生日
              </Text>
              <Text
                style={commonStyle.arrowText}
              >
                >
              </Text>
            </TouchableOpacity>
          </View>
          <View style={style.btnContain}>
              <TouchableOpacity
                style = {commonStyle.btnStyle}
                onPress={() => {
                  if (this.state.isTelNumber) {
                    navigate('VerifyCode')
                  }
                }}
              >
                <Text
                  style={commonStyle.btnText}
                >
                  确定
                </Text>
              </TouchableOpacity>
          </View>
        </View>
        <View style={[style.itemContainer, style.item]}>
          <Footer
            ShowLoginType={false}
          />
        </View>
    </View>
    )
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  },
    item: {
      flex: 1
    },
    itemContainer: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 15
    },
    opTips: {
      textAlign: 'center',
      color: '#444444',
      fontSize: 25,
      fontWeight: '900'
    },
    tipPromise: {
      color: '#c9c9c9',
      fontSize: 15,
      marginTop: 15,
      textAlign: 'center'
    },
  avataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    textAlign: 'center'
  },
  avataBtnContainer: {
    marginTop: 20
  },
  manContainer: {
    marginRight: -20
  },
  womanContainer: {
    marginLeft: -20
  },
  avatar: {
    width: 55,
    height: 55
  },
  avatarText: {
    textAlign: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnImg: {
    width: 12,
    height: 12
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30,
    marginTop: 20,
    marginBottom: 8
  },
  edit: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    textAlign:'center',
    color: '#464646',
    borderRadius: 10
  },
  selectBirth: {
    borderColor: '#989A9C'
  }
})