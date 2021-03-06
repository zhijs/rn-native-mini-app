/**
 * 个人信息完善页面
 */
import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput,
  Image,
  DatePickerAndroid,
  KeyboardAvoidingView
} from 'react-native';
import Footer from './footer'
import commonStyle from '../../utils/common-style'
import { date2str } from '../../utils/tool'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class UserInfoPage extends Component {
  constructor(props) {
    let year = (new Date).getFullYear();
    super(props)
    this.manKind = 0;
    this.womenKind = 1;
    this.maxDate = new Date(`${year - 18}-01-01`);
    this.state = {
      gender: 0, // 0-男性， 1-女性,
      pickerIsOpen: true,
      userInfoArr: []
    }
  }
  async handleSelectDay () {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
        maxDate: this.maxDate
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let monthStr = month > 8 ? month + 1 : `0${month + 1}`;
        let str = `${year}-${monthStr}-${day}`;
        this.setState({
          birthDay: str
        })
        this.props.birthDayChange(str)
      }
    } catch({code, message}) {
    }
  }
  render() {
    return (
      <View style={[style.container, commonStyle.pageBg]}>
        <KeyboardAwareScrollView>
        <View tyle={[style.itemContainer, style.item]}>
          <Text style={style.opTips}>完善个人信息</Text>
          <Text style={style.tipPromise}>确定后性别不可修改</Text> 
        </View>
        <View style={[style.avataContainer, style.item]}>
          <View style={[style.avataBtnContainer, style.manContainer]}>
          <TouchableOpacity
              style={style.itemContainer}
              onPress={() => {
                if (this.state.gender === this.manKind) return 
                this.setState({gender: this.manKind});
                this.props.genderChange(this.manKind)
              }}
            >
              <Image
                style={style.avatar}
                source={this.state.gender === this.manKind ? require("../../assets/images/man_1.png") : require("../../assets/images/man_0.png")}
              />
              <Text style={style.avatarText}>男生</Text>
              <View
                style = {style.btnContainer}
              >
                <Image
                  style={style.btnImg}
                  source={this.state.gender === this.manKind ?  require("../../assets/images/selected.png") : require("../../assets/images/un-selected.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[style.avataBtnContainer, style.womanContainer]}>
            <TouchableOpacity
                style={style.itemContainer}
                onPress={() => {
                  this.setState({gender: this.womenKind});
                  this.props.genderChange(this.womenKind)
                }}
              >
              <Image
                style={style.avatar}
                source={this.state.gender === this.womenKind ? require("../../assets/images/woman_1.png") :  require("../../assets/images/woman_0.png")}
              />
              <Text style={style.avatarText}>女生</Text>
              <View
                style = {style.btnContainer}
              >
                <Image
                  style={style.btnImg}
                  source={this.state.gender === this.womenKind ? require("../../assets/images/selected.png") :  require("../../assets/images/un-selected.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.editContainer}>
          <TextInput
            style={style.edit}
            underlineColorAndroid="transparent"
            placeholder="昵称"
            autoFocus={true}
            value = {this.props.userName}
            onChangeText= {(value) => {
              this.props.userNameChange(value.trim());
            }}
          />
        </View>
        <View style={style.item}>
              <TouchableOpacity
                style={[style.selectBirth]}
                onPress={() => {
                  this.handleSelectDay()
                }}
              >
                <Text
                  style={[style.selectText]}
                >
                  选择生日
                </Text>
                <Text
                  style={[style.selectText]}
                >
                  {this.props.birthDay}
                </Text>
                <Text
                  style={[style.selectText]}
                >
                  &gt;
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
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
    justifyContent: 'space-evenly'
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
    margin: 15,
    marginRight: 30,
    marginLeft: 30
  },
  edit: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    textAlign:'center',
    color: '#464646',
    borderRadius: 10
  },
  birthSelctContainer: {
    flex: 1
  },
  selectBirth: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 40,
    margin: 30,
    marginTop: 8,
    marginBottom: 8,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 8
  },
  selectText: {
    height: 40,
    lineHeight: 40,
    color: '#464646',
    paddingLeft: 20,
    paddingRight: 20
  }
})