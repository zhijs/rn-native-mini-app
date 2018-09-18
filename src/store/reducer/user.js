/**
 * 用户信息state
 */
import actionType from '../action/actionType';

const initUserData = {
  name: '',
  logining: false,
  isLogin: false,
  numberIsRisk: false,
  isRegister: false,
  TelNumber: '',
  gender: 'male'
};

export default function user(state = initUserData, action) {
  switch(action.type) {
    case actionType.LOGINPRE:
      return {
        ...initUserData,
        logining: true
      }
    case actionType.LOGINED:
    case actionType.REGISTER:
      return {
       ...initUserData,
       isLogin: true,
       logining: false,
       ...action.data
      }
      break;
    case actionType.CHECKREGISTER:
      return {
        ...initUserData,
        isRegister: action.isRegister
      }
    case actionType.LOGOTOUT: 
      return {
        ...initUserData,
        isLogin: false,
      }
    default :
      return initUserData
  }
}