/**
 * 登录注册页面跳转state
 */

import actionType from '../action/actionType';

const indexPage = {
  index : 0,
  direction: 1
}
export default function page(state = indexPage, action) {
  switch(action.type) {
    case actionType.PAGE_NEXT:
      return {
        index: state.index + action.index,
        direction: 1
      }
    case actionType.PAGE_PRE: 
      return {
        index: state.index - action.index,
        direction: -1
      }
    default:
      return state;
  }
}
