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