/**
 * reducer合并导出
 */
import { combineReducers } from 'redux'
import user from './user';
import friend from './friend';
import page from './login-page'
import message from './message'
import { navReducer } from '../../pages/container/index'

const rootReducer = combineReducers({
  user,
  page,
  friend,
  message,
  nav: navReducer
})
export default rootReducer