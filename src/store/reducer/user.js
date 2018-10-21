/**
 * 用户信息state
 */
import actionType from '../action/actionType';

const initUserData = {
  nickname: '',
  isLogin: false,
  isRegister: false,
  TelNumber: '',
  gender: 'male',
  dob: '',
  uid: '',
  msg:[]
};

export default function user(state = initUserData, action) {
  switch(action.type) {
    case actionType.LOGINPRE:
      return {
        ...state,
        logining: true
      }
    case actionType.LOGINED:
    case actionType.REGISTER:
      return {
       ...state,
       isLogin: true,
       isRegister: true,
       ...action.data
      }
    case actionType.CHECKREGISTER:
      return {
        ...state,
        isRegister: action.isRegister
      }
    case actionType.LOGOTOUT: 
      return {
        ...state,
        isLogin: false,
      }
    case actionType.SET_MY_MSG:
      let newState = Object.assign({}, state); 
      if (!newState.msgs.includes(action.data)) {
        newState.msgs.push(action.data)
      }
    default :
      return state
  }
}