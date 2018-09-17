/**
 * reducer合并导出
 */
import { combineReducers } from 'redux'
import user from './user'

const rootReducer = combineReducers({
  user
})
export default rootReducer