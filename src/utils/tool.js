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