/**
 * reducer合并导出
 */
import { combineReducers } from 'redux'
import user from './user';
import page from './login-page'

const rootReducer = combineReducers({
  user,
  page
})
export default rootReducer