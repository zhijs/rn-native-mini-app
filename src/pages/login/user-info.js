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
export default class UserInfoPage extends Component {
  constructor(props) {
    let year = (new Date).getFullYear();
    super(props)
    this.manKind = 0;
    this.womenKind = 1;
    let dateNowStr = date2str(new Date())
    this.minDate = new Date(`${year - 18}-01-01`);
    this.state = {
      gender: 0, // 0-男性， 1-女性,
      birthDay: dateNowStr,
      pickerIsOpen: true,
      userInfoArr: []
    }
  }
  async handleSelectDay () {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
        minDate: this.minDate
      });
      console.log('select day');
      console.log(action, year, month, day);
      console.log(this)
      console.log('aciotn === dateSetAction', action === 'dateSetAction');
      if (action === 'dateSetAction') {
        let monthStr = month > 8 ? month + 1 : `0${month + 1}`;
        let str = `${year}-${monthStr}-${day}`;
        this.setState({
          birthDay: str
        })
        console.log('birthday', `${year}-${monthStr}-${day}`);
        this.props.birthDayChange(value)
      }
    } catch(e) {
      
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
                if (this.state.gender === this.manKind) return 
                this.setState({gender: this.manKind});
                this.props.genderChange(this.manKind)
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
                this.props.genderChange(this.womenKind)
              }}
            >
              <Image
                style={style.btnImg}
                source={this.state.gender === this.womenKind ? require("../../assets/images/selected.png") :  require("../../assets/images/un-selected.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.item}>
          <TextInput
            style={style.edit}
            underlineColorAndroid="transparent"
            placeholder="昵称"
            autoFocus={true}
            onChangeText= {(value) => {
              this.props.userNameChange(value);
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
                  {this.state.birthDay}
                </Text>
                <Text
                  style={[style.selectText]}
                >
                  &gt;
                </Text>
              </TouchableOpacity>
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
    marginBottom: 0,
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