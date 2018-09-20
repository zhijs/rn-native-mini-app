/**
 * 用户注册
 */
import { fetchJSON } from './_fetch';

export function sign(data) {
  console.log('注册', data);
  return fetchJSON('/account/register', {}, data)
    .catch((e) => {
      console.log('注册出错', e);
    })
}

export function checkRegister(data) {
  console.log('检验是否注册', data)
  return fetchJSON('/account/is_registered', {}, data)
    .catch((e) => {
      console.log('检验是否注册', e);
    })
}

export function login(data) {
  console.log('用户登陆', data)
  return fetchJSON('/account/login', {}, data)
    .catch((e) => {
      console.log('检验是否注册', e);
    })
}