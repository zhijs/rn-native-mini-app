/**
 * 定义 redux的action操作
 */
import { fetchJSON } from '../../api/_fetch'
import actionType from './actionType'

// 登陆action
export function login(data) {
  return (dispatch) => {
    fetchJSON('/account/login ', data)
      .then((res) => {
        dispatch({
          type: actionType.LOGIN,
          data: res
        })
      })
  }
}

// 注册action
export function register(data) {
  return (dispatch) => {
    fetchJSON('/account/register', data)
      .then((res) => {
        dispatch({
          type: actionType.LOGIN,
          data: res
        })
      })
  }
}