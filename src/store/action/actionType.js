/**
 * 定义 action类型
 */

module.exports = {
  LOGINPRE: "login_pre",
  LOGINED: "logined", // 登陆
  LOGOTOUT: "logout", // 登出
  REGISTER: "register", // 注册
  CHECKREGISTER: "check-rigister",
  GET_TEL_CODE: "get_tel_code", // 获取验证码
  SEND_CODE: "send_code", // 发送验证码
  RESET_PWD: "reset_password", // 重置密码
  PAGE_NEXT: "page_next",
  PAGE_PRE: "page_pre",
  SET_FRIEND_ALL: "set_friend_all",
  SET_NEW_FRIEND: "set_new_friend",
  SET_NEW_LINKE_ME: "set_new_like_me",
  SET_MATCH_FRIEND: "set_match_friend",
  SET_MSG_ALL: "set_msg_all",
  SET_MY_MSG: "set_my_msg",
  SET_CHAT_FRIEND: "set_chat_friend",
  ADD_NEW_MSG: "add_new_msg",
  DELETE_NEW_FRIEND: "delete_new-friend"
};
