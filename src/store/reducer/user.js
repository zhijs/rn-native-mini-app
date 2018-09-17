/**
 * 用户信息state
 */
import actionType from '../action/actionType';

const initUserData = {
  isLogin: false
};

export default function user(state = initUserData, action) {
  switch(action.type) {
    case actionType.LOGIN:
    case actionType.REGISTER:
      return {
       ...initUserData,
       isLogin: true,
       ...action.data
      }
      break;
    case actionType.LOGOTOUT: 
      return {
        ...initUserData,
        isLogin: false
      }
      
  }
}