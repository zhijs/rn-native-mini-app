/**
 * reducer合并导出
 */
import { combineReducers } from 'redux'
import user from './user';
import page from './login-page'
import { navReducer } from '../../pages/container/index'

const rootReducer = combineReducers({
  user,
  page,
  nav: navReducer
})
export default rootReducer