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

export function getLikeMeList(data) {
  return fetchJSON("/friend/list/apply_to_me", {}, data).catch(e => {
    console.log("获取喜欢我的列表失败", e);
  });
}

export function getFriendList(data) {
  return fetchJSON("/friend/list", {}, data).catch(e => {
    console.log("获取好友列表失败", e);
  });
}


export function getScore(data) {
  return fetchJSON("/friend/score/show", {}, data).catch(e => {
    console.log("获取亲密度失败", e);
  });
}