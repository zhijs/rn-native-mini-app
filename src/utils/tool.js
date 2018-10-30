/**
 * 工具函数库
 */

// 监测是否是电话号码， return true/false
export function checkTelNumber(value) {
  if(!(/^1[34578]\d{9}$/.test(value))){ 
    return false; 
  }
  return true
}

/**
 * 
 * @param {}
 * date Date Object
 * splitStr String 
 * return string  eg：'2018-08-10' if splitStr === '-'
 */
export function date2str(date, splitStr = '-') {
  if (!date || Object.prototype.toString.call(date) !== '[object Date]') {
    throw new Error('date is not Date instance');
  }
  let mouth = date.getMonth() > 8 ?  date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return `${date.getFullYear()}${splitStr}${mouth}${splitStr}${day}`;
}
/**
 * 
 * @param {*} meter - 米数
 * @param {*} pointLen 消息点后保留位数，默认为1, > 1000m 返回 n.m公里 < 1公里， 返回 n.m 米
 */
export function meter2kilometer(meter, pointLen = 1) {
  if (meter < 1000) {
    return `${meter.toFixed(pointLen)}m`
  } else {
    let kilometer = (meter / 1000).toFixed(pointLen)
    return `${kilometer}km`
  }
}