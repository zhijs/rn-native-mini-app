/**
 * 消息相关接口
 */
import { fetchJSON } from "./_fetch";

export function sendMsg(data) {
  return fetchJSON("/push/send ", {}, data).catch(e => {
    console.log("发送消息失败", e);
  });
}

export function getHistoryMsg(data) {
  return fetchJSON("/push/list", {}, data).catch(e => {
    console.log("发送消息失败", e);
  });
}