/**
 * reducer合并导出
 */
import { combineReducers } from 'redux'
import user from './user';
import friend from './friend';
import page from './login-page'
import { navReducer } from '../../pages/container/index'

const rootReducer = combineReducers({
  user,
  page,
  friend,
  nav: navReducer
})
export default rootReducer