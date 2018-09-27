import md5 from 'md5';
import DeviceInfo from 'react-native-device-info';
import { fetchXL } from './_fetch';

const bizNo = '200027';
const content  = '21验证码{}'
const needCode = true
const expireSeconds = 60
const deviceId = DeviceInfo.getDeviceId()
console.log('DeviceInfo', DeviceInfo);
// 发送验证码
export function sendCode(mobile) {
  let data = {
    bizNo,
    mobile,
    content,
    needCode,
    expireSeconds
  }
  let _url = getSignMsg(data)
  return Promise.resolve({data: {code: 0}})
  return fetchXL(`/concurrent-sms.json?${_url}`)
    .catch((e) => {
      console.log('发送验证码错误', res);
    })
}

// 验证码检验
export function verifyCode(mobile, verifyCode) {
  let data = {
    bizNo,
    mobile,
    verifyCode
  }
  let _url = getSignMsg(data)
  return Promise.resolve({data: {code: 0}})
  return fetchXL(`/verify.json?${_url}`);
}

// 号码检验
export function checkNumber(mobile) {
  console.log('检验号码')
  let data = {
    bizNo,
    mobile
  }
  console.log({
    bizNo,
    mobile,
    signMsg: getSignMsg(data)
  })
  return Promise.resolve({data: {code: 0}})
  return fetchXL('/risk/mobile.json', {}, {
    bizNo,
    mobile,
    signMsg: getSignMsg(data)
  }).then((res) => {
    console.log('检验号码', res);
  }).catch((e) => {
    console.log('e,,,,',e)
  })
}

// 获取签明信息
function getSignMsg(data) {
  let keys = Object.keys(data).sort();
  let arr = []
  for(let i = 0; i < keys.length; i++) {
    arr.push(`${keys[i]}=${data[keys[i]]}`);
  }
  let stringA = arr.join('&');
  console.log(stringA)
  let stringSignTemp = `${stringA}pAXF6T25oc9h`;
  let signMsg = md5(stringSignTemp).toUpperCase();
  console.log('signMsg', signMsg)
  return `${stringA}&signMsg=${signMsg}`
}