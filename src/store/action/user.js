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

// 检测是否注册
export function checkRegister(number) {
  return (dispatch, getState) => {
    fetchJSON('/account/is_registered', {}, {phone_number: number})
      .then((res) => {
        console.log('是否注册。。',  res)
        if (res.data.result === 'ok') { // 请求成功
          let isRegister = res.data.is_registered ? true : false;
          dispatch({
            type: actionType.CHECKREGISTER,
            isRegister
          })
        }
      })
  }
}
// 注册action
// export function updateUser(data) {
//   return (dispatch) => {
//     fetchJSON('/account/register', data)
//       .then((res) => {
//         console.log('用户注册')
//         dispatch({
//           type: actionType.LOGIN,
//           data: res
//         })
//       })
//   }
// }