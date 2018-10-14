/**
 * 定义 action类型
 */

 module.exports = {
   LOGINPRE: 'login_pre',
   LOGINED: 'logined', // 登陆
   LOGOTOUT: 'logout', // 登出
   REGISTER: 'register', // 注册
   CHECKREGISTER: 'check-rigister',
   GET_TEL_CODE: 'get_tel_code', // 获取验证码
   SEND_CODE: 'send_code', // 发送验证码
   RESET_PWD: 'reset_password', // 重置密码
   PAGE_NEXT: 'page_next',
   PAGE_PRE: 'page_pre',
   SET_NEW_FRIEND: 'set_new_friend',
   SET_NEW_LINKE_ME: 'set_new_like_me'
 }