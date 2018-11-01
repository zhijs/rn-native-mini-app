/*
*  登陆首页，登陆方式选择页面
*/
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  ToastAndroid,
  PermissionsAndroid,
} from "react-native";
import Geolocation from 'Geolocation';
import { date2str, checkTelNumber } from "../../utils/tool";
import { checkNumber, sendCode, verifyCode } from "../../api/mobile-msg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { sign, checkRegister, login, updateAccount } from "../../api/user";
import md5 from "md5";
import Footer from "./footer";
import IndexHeader from "./login-index.header";
import PhoneInput from "./phone-input";
import VerifyCode from "./verify-code";
import PasswdInput from "./passwd-input";
import UserInfo from "./user-info";
import commonStyle from "../../utils/common-style";
import SlideAnimation from "./animation-view";
import { Api } from "../../api/_fetch";
import Spinner from 'react-native-loading-spinner-overlay';
export default class LoginIndex extends Component {
  constructor(props) {
    super(props);
    // 状态码
    this.PWD_ERROR = 2;
    this.allTime = 60; // 倒计时时长
    this.state = {
      btnState: true,
      telNumber: "",
      rightPwd: true,
      isNumber: false,
      isLoginBtn: true,
      isRegister: false, // 当前用户是否注册
      isSendCode: false, // 是否已经发送验证码
      remainTime: 0, // 验证码倒计时
      canResendCode: false,
      passwd: "",
      pawIsValid: false,
      userInfoBtn: true,
      canRegister: false,
      userName: "", // 用户名
      gender: "male", // 0-男性， 1-女性,
      birthDay: "",
      spinner: false
    };
    this.timer = null; // 用于验证码倒计时

    // 页面信息
    this.pageData = [
      {
        name: "login-index",
        ShowLoginType: true,
        nextBtn: {
          isActive: true,
          text: "手机号登陆",
          activeByKey: "isLoginBtn"
        },
        pageStyle: { flex: 1 }
      },
      {
        name: "phone-input",
        ShowLoginType: true,
        nextBtn: { isActive: true, text: "下一步", activeByKey: "isNumber" },
        pageStyle: { flex: 1 }
      },
      {
        name: "verify-code",
        ShowLoginType: false,
        nextBtn: {
          isActive: false,
          text: "重发验证码",
          activeByKey: "canResendCode"
        },
        pageStyle: { flex: 1 }
      },
      {
        name: "passwd-input",
        ShowLoginType: false,
        nextBtn: { isActive: false, activeByKey: "pawIsValid" },
        pageStyle: { flex: 1 }
      },
      {
        name: "user-info",
        ShowLoginType: false,
        nextBtn: { isActive: true, text: "确定", activeByKey: "canRegister" },
        pageStyle: { flex: 4 }
      }
    ]; // 是否显示第三方登陆区域 // 下方按钮是否激活 // 按钮显示文本 // 按钮激活条件
  }
  // 监听用户回退事件
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  
  // 询问获得地理位置权限
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': '地理位置信息权限',
          'message': '该过程可能需要获取你的地理位置权限'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } catch (err) {
    }
  }
  // 用户点击回退按钮
  handleBackPress = () => {
    if (this.props.page.index === 0) {
      // 直接退出程序
      BackHandler.exitApp();
      return true;
    } else {
      if (
        this.props.user.isRegister &&
        this.pageData[this.props.page.index].name === "passwd-input"
      ) {
        this.props.pageBack(2);
      } else {
        this.props.pageBack(1);
      }
      return true;
    }
    return true;
  };
  // 电话号码改变事件
  telChange(value) {
    if (!checkTelNumber(value)) {
      this.setState({ telNumber: value, isNumber: false });
      return;
    } else {
      this.setState({ telNumber: value, isNumber: true });
    }
  }

  // 密码框输入改变事件
  pwdChange(data) {
    if (data.pawIsValid) {
      this.setState({
        pawIsValid: data.pawIsValid,
        passwd: md5(data.value)
      });
    } else {
      this.setState({
        pawIsValid: data.pawIsValid
      });
    }
  }

  // 完善用户信息界面相关监听
  userNameChange(value) {
    let canRegister = false;
    if (value !== "" && this.state.birthDay !== "") {
      canRegister = true;
    }
    this.setState({ userName: value, canRegister });
  }

  // 性别改变
  genderChange(value) {
    this.setState({ gender: value === 0 ? "male" : "female" });
  }

  // 出生日期改变
  birthDayChange(value) {
    if (value !== "" && this.state.userName !== "") {
      canRegister = true;
    }
    this.setState({ birthDay: value, canRegister });
  }


  // 根据当前状态返回特定组件
  getPage(pageIndex, direction) {
    switch (pageIndex) {
      case 0:
        return <IndexHeader />;
        break;
      case 1:
        return (
          <SlideAnimation
            style={style.header}
            key={`PhoneInput${direction}`}
            direction={direction}
          >
            <PhoneInput
              valueChange={value => {
                this.telChange(value);
              }}
              phone_number={this.state.telNumber}
            />
          </SlideAnimation>
        );
        break;
      case 2:
        return (
          <SlideAnimation
            style={style.header}
            key={`VerifyCode${direction}`}
            direction={direction}
          >
            <VerifyCode
              verifyCodeChange={value => {
                this.codeChange(value);
              }}
              isSendCode={this.state.isSendCode}
              checkCode={value => {
                this.checkCode(value);
              }}
              canResendCode={this.state.canResendCode}
            />
          </SlideAnimation>
        );
        break;
      case 3:
        return (
          <SlideAnimation
            style={style.header}
            key={`PasswdInput${direction}`}
            direction={direction}
          >
            <PasswdInput
              passwdChange={value => {
                this.pwdChange(value);
              }}
              isRegister={this.state.isRegister}
              rightPwd={this.state.rightPwd}
              pawIsValid={this.state.pawIsValid}
            />
          </SlideAnimation>
        );
        break;
      case 4:
        return (
          <SlideAnimation
            style={style.header}
            key={`UserInfo${direction}`}
            direction={direction}
          >
            <UserInfo
              userNameChange={value => {
                this.userNameChange(value);
              }}
              genderChange={value => {
                this.genderChange(value);
              }}
              birthDayChange={value => {
                this.birthDayChange(value);
              }}
              userName={this.state.userName}
              birthDay={this.state.birthDay}
            />
          </SlideAnimation>
        );
        break;
    }
  }

  // 设置定时器
  setTimer() {
    if (this.timer !== null) return;
    let count = 0;
    this.setState({ canResendCode: false });
    this.timer = setInterval(() => {
      count++;
      this.setState({ remainTime: this.allTime - count });
      if (this.allTime === count) {
        clearInterval(this.timer);
        this.setState({
          remainTime: 0,
          canResendCode: true
        });
        this.timer = null;
      }
    }, 1000);
  }
  //发送验证码逻辑
  _sendCode() {
    if (
      this.state.remainTime > 0 &&
      this.state.isRegister &&
      this.pageData[this.props.page.index] === "passwd-input"
    ) {
      this.props.pageAdd(1);
    }
    this.setTimer();
    sendCode(this.state.telNumber).then(res => {
      if (res.data.code === 0) {
        if (this.pageData[this.props.page.index].name === "phone-input") {
          this.props.pageAdd(1);
        }
        this.setState({
          isSendCode: true
        });
      }
    });
  }

  // 验证码验证逻辑
  checkCode(value) {
    let code = value.join("");
    verifyCode(this.state.telNumber, code).then(res => {
      if (res.data.code === 0) {
        this.timer && clearInterval(this.timer);
        this.timer = null;
        this.setState({ remainTime: 0, canResendCode: true });
        this.props.pageAdd(1); // 跳转页面
      } else if (res.data.code === 103) {
        // 验证码错误
        ToastAndroid.showWithGravity(
          "验证码错误",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else if (res.data.code === 102) {
        ToastAndroid.showWithGravity(
          "验证码已失效",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        this.timer && clearInterval(this.timer);
        this.setState({ remainTime: 0, canResendCode: true });
      }
    });
  }

  // 用户注册
  sigin() {
    let data = {
      phone_number: this.state.telNumber,
      password: this.state.passwd
    };
    sign(data).then(res => {
      // console.log("注册", res);
      if (res.data.result === "ok") {
        data.is_registered = true;
        data.uid = res.data.uid;
        this.props.sigin(data);
        this.props.pageAdd(1);
      }
    });
  }

  updateUser() {
    const { navigate } = this.props.navigation;
    let data = {
      uid: this.props.user.uid,
      gender: this.state.gender,
      nickname: this.state.userName,
      dob: this.state.birthDay
    };
    updateAccount(data).then(res => {
      // console.log("更新用户信息", res);
      if (res.data.result === "ok") {
        data.profile_photo_src = res.data.profile_photo_src || "";
        this.props.sigin(data);
        navigate("Tab");
      }
    });
  }
  // 登陆操作
  async handleLogin() {
    try {
      const granted = await requestLocationPermission();
    }
    catch (e) {
    }
    let local = {
      lat: 0,
      lon: 0
    };
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(() => {
    Geolocation.getCurrentPosition((result) => {
      this.setState({spinner: true})
      local.lat = result.coords.latitude
      local.lon = result.coords.longitude
      this.sendLoginData(local);
    }, (error)=> {
      this.sendLoginData(local);
    }, {enableHighAccuracy: false, timeout: 5000, maximumAge: 3000})
    }).catch((e) => {
      this.sendLoginData(local);
    })
  }

  sendLoginData(data = {}) {
    const { navigate } = this.props.navigation;
    let postData = Object.assign({
      phone_number: this.state.telNumber,
      password: this.state.passwd
    }, data)
    login(postData).catch((e) => {
      this.setState({spinner: false})
    }).then(res => {
      if (res.data.result === "ok") {
        if (res.data.status === this.PWD_ERROR) {
          this.setState({ rightPwd: false});
        } else if (res.data.status === 0) {
          // console.log("登陆成功", res);
          this.props.logined({
            uid: res.data.uid,
            gender: res.data.gender,
            nickname: res.data.nickname,
            dob: res.data.dob,
            old: res.data.old,
            password: this.state.passwd,
            phone_number: this.state.telNumber,
            profile_photo_src: `${Api.Test}${res.data.profile_photo_src}` || ""
          });
          navigate("Tab");
        }
      }
      if (this.state.spinner) {
        this.setState({spinner: false})
      }
    });
  }

  // 获取确认按钮的文本数据
  getComfirmText() {
    if (this.pageData[this.props.page.index].name === "passwd-input") {
      return this.props.user.isRegister ? "登录" : "下一步";
    } else {
      return (
        this.pageData[this.props.page.index].nextBtn.text +
        (this.pageData[this.props.page.index].name === "verify-code"
          ? this.state.remainTime === 0
            ? ""
            : `${this.state.remainTime}S`
          : "")
      );
    }
  }
  render() {
    return (
      <View style={[style.container, commonStyle.pageBg]}>
        <Spinner
          visible={this.state.spinner}
          textContent={'正在登陆..'}
          textStyle = {{color: '#ffffff', fontSize: 12}}
        />
        <View style={this.pageData[this.props.page.index].pageStyle}>
          {this.getPage(this.props.page.index, this.props.page.direction)}
        </View>
        <View style={style.btnContain}>
          <TouchableOpacity
            style={
              this.state[
                this.pageData[this.props.page.index].nextBtn.activeByKey
              ]
                ? commonStyle.btnStyle
                : commonStyle.btnDisable
            }
            activeOpacity={0.5}
            disabled={
              !this.state[
                this.pageData[this.props.page.index].nextBtn.activeByKey
              ] && true
            }
            onPress={() => {
              let cur = this.props.page.index;
              let i = 1;
              if (!this.state[this.pageData[cur].nextBtn.activeByKey]) return;
              // 当前显示的是验证码页面
              let nextPage = false;
              switch (this.pageData[cur].name) {
                case "login-index":
                  this.props.pageAdd(1);
                  break;
                case "phone-input":
                  checkRegister({
                    phone_number: this.state.telNumber
                  }).then(res => {
                    if (res.data && res.data.result === "ok") {
                      let is_registered = res.data.is_registered;
                      if (is_registered) {
                        this.props.pageAdd(2);
                      } else {
                        this._sendCode();
                      }
                      this.setState({
                        isRegister: res.data.is_registered
                      });
                      this.props.checkRegister(res.data.is_registered);
                    }
                  });
                  break;
                case "verify-code":
                  this._sendCode();
                  break;
                case "passwd-input":
                  // 已经注册，执行登陆操作
                  if (this.state.isRegister) {
                    this.handleLogin();
                  } else {
                    this.sigin(); // 注册
                  }
                  this.setState({ pawIsValid: false });
                  break;
                case "user-info":
                  if (this.state.gender !== "" && this.state.birthDay !== "") {
                    this.updateUser(); // 更新用户信息
                  }
              }
            }}
          >
            <Text style={commonStyle.btnText}>{this.getComfirmText()}</Text>
          </TouchableOpacity>
        </View>
        <Footer
          ShowLoginType={this.pageData[this.props.page.index].ShowLoginType}
        />
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1
  },
  btnContain: {
    flex: 1,
    justifyContent: "center"
  }
});
