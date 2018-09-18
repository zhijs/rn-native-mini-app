import md5 from 'md5'
import { fetchXL } from './_fetch';

const bizNo = '200027';
const content  = '21验证码{}'

// 发送验证码
export function sendCode(mobile) {
  let data = {
    bizNo,
    mobile,
    content,
    signMsg: getSignMsg({bizNo, mobile, content})
  }
  return fetchXL('/concurrent-sms.json', {}, data)
}

// 验证码检验
export function verifyCode(mobile, verifyCode) {
  let data = {
    bizNo,
    mobile,
    verifyCode
  }
  return fetchXL('/risk/mobile.json', {}, {
    bizNo,
    mobile,
    signMsg: getSignMsg(data)
  })
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
  console.log('stringSignTemp', stringSignTemp)
  let signMsg = md5(stringSignTemp).toUpperCase();
  return `${signMsg}`
}