/**
 * 登录注册页面跳转state
 */

import actionType from '../action/actionType';

const indexPage = {
  index : 0
}
export default function page(state = indexPage, action) {
  switch(action.type) {
    case actionType.PAGE_NEXT:
      return {
        index: indexPage + action.index
      }
    case actionType.PAGE_PRE: 
      return {
        index: indexPage - action.index
      }
    default:
      return indexPage;
  }
}
