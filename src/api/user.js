/**
 * 用户注册
 */
import { fetchJSON } from "./_fetch";

export function sign(data) {
  // return Promise.resolve({ data: { result: "ok" } });
  return fetchJSON("/account/register", {}, data).catch(e => {
    console.log("注册出错", e);
  });
}

export function checkRegister(data) {
  //return Promise.resolve({ data: { result: "ok", is_registered: false } });
  return fetchJSON("/account/is_registered", {}, data).catch(e => {
    console.log("检验是否注册", e);
  });
}

export function login(data) {
  console.log("用户登陆", data);
  return fetchJSON("/account/login", {}, data).catch(e => {
    console.log("用户登陆", e);
  });
}
export function logout(data) {
  return fetchJSON("/account/logout", {}, data).catch(e => {
    console.log("用户退出登陆", e);
  });
}
export function updateAccount(data) {
  return fetchJSON("/account/update", {}, data).catch(e => {
    console.log("更新用户资料", e);
  });
}
