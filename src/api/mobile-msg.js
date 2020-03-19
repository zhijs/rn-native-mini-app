import md5 from "md5";
import DeviceInfo from "react-native-device-info";
import { fetchXL } from "./_fetch";

// const bizNo = "200027";
const content = "锁爱验证码{}";
const needCode = true;
const expireSeconds = 60;
const deviceId = DeviceInfo.getDeviceId();
// 发送验证码
export function sendCode(mobile) {
  let data = {
    bizNo,
    mobile,
    content,
    needCode,
    expireSeconds
  };
  let _url = getSignMsg(data);
  // return Promise.resolve({ data: { code: 0 } });
  return fetchXL(`/concurrent-sms.json?${_url}`).catch(e => {
    console.log("发送验证码错误", res);
  });
}

// 验证码检验
export function verifyCode(mobile, verifyCode) {
  let data = {
    bizNo,
    mobile,
    verifyCode
  };
  let _url = getSignMsg(data);
  // return Promise.resolve({ data: { code: 0 } });
  return fetchXL(`/verify.json?${_url}`);
}

// 号码检验
export function checkNumber(mobile) {
  let data = {
    bizNo,
    mobile
  };
  // return Promise.resolve({data: {code: 0}})
  return fetchXL(
    "/risk/mobile.json",
    {},
    {
      bizNo,
      mobile,
      signMsg: getSignMsg(data)
    }
  )
    .then(res => {
    })
    .catch(e => {
    });
}

// 获取签明信息
function getSignMsg(data) {
}
