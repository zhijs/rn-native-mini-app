/**
 * 朋友相关的接口
 */

import { fetchJSON } from "./_fetch";

export function getFriend(data) {
  return fetchJSON("/friend/find", {}, data).catch(e => {
    console.log("获取朋友列表出错", e);
  });
}

export function dislikeFriend(data) {
  console.log(data);
  return fetchJSON("/friend/add/dislike", {}, data).catch(e => {
    console.log("不喜欢对方失败", e);
  });
}

export function likeFriend(data) {
  return fetchJSON("/friend/add", {}, data).catch(e => {
    console.log("喜欢对方失败", e);
  });
}
