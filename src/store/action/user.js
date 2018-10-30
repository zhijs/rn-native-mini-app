/**
 * 定义 redux的action操作
 */
import { fetchJSON } from '../../api/_fetch'
import actionType from './actionType'

// 登陆action
export function login(data) {
  return (dispatch, getState) => {
    dispatch({
      type: actionType.LOGINPRE,
    })
    fetchJSON('/account/login', {}, data)
      .then((res) => {
        if (res.data.result === 'ok') { // 请求成功

        }
        dispatch({
          type: actionType.LOGINED,
          data: res
        })
      })
  }
}
