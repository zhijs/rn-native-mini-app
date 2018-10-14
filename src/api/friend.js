/**
 * 朋友相关的接口
 */

import { fetchJSON } from './_fetch';

export function getFriend(data) {
  return fetchJSON('/friend/find', {}, data)
    .catch((e) => {
      console.log('获取朋友列表出错', e);
    })
}