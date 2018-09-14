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
 * return string  eg：'2018-08-10'
 */
export function date2str(date) {
  if (!date || Object.prototype.toString.call(date) !== '[object Date]') {
    throw new Error('date is not Date instance');
  }
  let mouth = date.getMonth() > 8 ?  date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return `${date.getFullYear()}-${mouth}-${day}`;
}