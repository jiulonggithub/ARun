import axios from './axios';
import simpleUrl from 'simple-url';
// const apiDomain = 'http://arun.acinfo-local.com/api';
const apiDomain = 'http://192.168.2.139/api';

const createApiUrl = function (path, query, hash) {
  return `${apiDomain}${simpleUrl.createPath(path, query, hash)}`;
};
/**
 * 密码登录
 **/
export function pwdLogin(data) {
  return axios.post(createApiUrl('/user/login'), data);
}
/**
 * 短信验证码登录
 **/
export function TelCodeLogin(data) {
    return axios.post(createApiUrl('/user/login/captcha'), data);
}

/**
 * 手机号注册获取短信验证码
 **/
export function registerTelCode(data) {
    return axios.post(createApiUrl('/user/register/code'),data);
}
/**
 * 登录获取短信验证码
 **/
export function LoginTelCode(data) {
    return axios.post(createApiUrl('/user/login/code'),data);
}
/**
 * 注册
 * **/
export function register(data) {
    return axios.post(createApiUrl('/user/register'), data);
}
/**
 * 修改密码
 * **/
export function updatePwd(data) {
    return axios.post(createApiUrl('/user/password/modify'), data);
}

/**
 * 发送消息
 **/
export function chatSend(data) {
    return axios.post(createApiUrl('/chat/send'),data);
}
/**
 * 获取历史消息
 **/
export function chatHistory(data) {
    return axios.get(createApiUrl('/chat/history'),{params:data});
}

/**
 * 通知已拉取的历史消息更改状态
 **/
export function msgStatusChange(data) {
    return axios.post(createApiUrl('/chat/mark'),data);
}

/**
 * 编辑个人资料
 * **/
export function editUserProfile(data) {
    return axios.post(createApiUrl('/user/editUserProfile'), data);
}
/**
 * 获取用户资料
 * **/
export function getUserProfile() {
  return axios.get(createApiUrl('/user/userProfile'));
}

/**
 * 获取通讯录
 *
 **/
export function getContacts(query) {
  return axios.get(createApiUrl('/friend-relation/list'), query);
}


/**
 * 上传文件
 **/
export function uploadFile(formData) {
  return axios.upload(createApiUrl('/user/upload'), formData)
  // return axios.upload('http://192.168.2.100/x.php', formData)
}


/**
 * 三方登录
 **/
export function thirdLogin(data) {
  return axios.get(createApiUrl('/third/login'),{params:data});
}

/**
 * 三方跳转
 **/
export function thirdRedirect(data) {
  return axios.get(createApiUrl('/third/redirect'),{params:data});
}

/**
 * 手机号注册
 **/
export function phoneRegister(data) {
  return axios.post(createApiUrl('/register/phone'), data);
}

/**
 * 修改时手机验证码
 **/
export function modifyPhoneCode(data) {
  return axios.get(createApiUrl('/user/phone/modify/code'),{params:data});
}

/**
 * 修改手机号
 **/
export function modifyPhone(data) {
  return axios.post(createApiUrl('/user/phone/modify'), data);
}

/**
 * 解除三方绑定
 **/
export function thirdUnbound(data) {
  return axios.get(createApiUrl('/third/unbound'),{params:data});
}

/**
 * 三方绑定验证码
 **/
export function thirdBoundCode(data) {
  return axios.get(createApiUrl('/third/register/code'),{params:data});
}

/**
 * 三方绑定手机号
 **/
export function thirdBoundPhone(data) {
  return axios.post(createApiUrl('/third/register'), data);
}

/**
 * 注册个人资料
 **/
export function registerProfile(data) {
    console.log(data);
  return axios.post(createApiUrl('/user/registerUserProfile'), data);
}

/**
 * 找回密码-修改密码
 **/
export function forgetPassword(data) {
  return axios.post(createApiUrl('/password/forgot/modify'), data);
}

/**
 * 找回密码-发送验证码
 **/
export function forgetPasswordCode(data) {
  return axios.post(createApiUrl('/password/forgot/code'), data);
}

/**
 * 上传头像
 **/
export function uploadAvatar(formData) {
    return axios.upload(createApiUrl('/user/uploadAvatar'), formData);
}

/**
 * 添加反馈
 **/
export function feedBack(data) {
  return axios.post(createApiUrl('/system/config/feedBack'), data);
}

/**
 * 验证码登录获取验证码
 **/
export function loginToSendCode(data) {
  return axios.post(createApiUrl('/user/login/code'), data);
}

/**
 * 我的收益列表（最近一个月）
 **/
export function myProfit() {
  return axios.get(createApiUrl('/user/myReturns'));
}
/**
 * 我的总收益
 **/
export function TotalProfit() {
  return axios.get(createApiUrl('/user/myTotalReturns'));
}
/**
 * 获取线路详情
 **/
export function wayDetails(data) {
  return axios.get(createApiUrl('/user/routeDetails'),{params:data});
}

/**
 * 获取留言
 **/
export function lineMessage(data) {
    return axios.get(createApiUrl('/comment/list'),{params:data});
}
/**
 * 添加评论
 **/
export function commentAdd(data) {
    return axios.post(createApiUrl('/comment/add'),data);
}

/**
 * 添加别人的线路
 */
export function addLine(data) {
    return  axios.post(createApiUrl('/movement/route/add'),data)
}
/**
 * 获取运动记录
 */
export function getDateRecord(data) {
    return  axios.post(createApiUrl('/user/dateRecord'),data)
}
/**
 * 我的收藏线路
 */
export function getMyLine(data) {
    return  axios.get(createApiUrl('/movement/route/list'),{params:data})
}


/**
 * 修改密码
 **/
export function updataPassword(data) {
  return axios.post(createApiUrl('/user/password/modify'),data);
}

/**
 * 联系我们
 */
export function contactUs(data) {
    return  axios.get(createApiUrl('/system/config/contactUs'),{params:data})
}

/**
 * 举报好友
 **/
export function reportFriend(data) {
  return axios.post(createApiUrl('/friend-relation/report'),data);
}

/**
 * 好友进行备注
 **/
export function remarkFriend(data) {
  return axios.post(createApiUrl('/friend-relation/report'),data);
}

/**
 * 删除好友
 **/
export function deleteFriend(data) {
  return axios.post(createApiUrl('/friend-relation/delete'),data);
}

/**
 * 软件更新
 **/
export function versionUpdate(data) {
  return axios.post(createApiUrl('/system/config/versionUpdate'),data);
}

/**
 * 关于我们
 */
export function aboutUs(data) {
  return  axios.get(createApiUrl('/system/config/aboutUs'),{params:data})
}

/**
 * 隐私条约
 */
export function privacyTreaty(data) {
  return  axios.get(createApiUrl('/system/config/agreement'),{params:data})
}

/**
 * 获取个人配置
 */
export function getOwnSetting(data) {
  return  axios.get(createApiUrl('/user/getUserConfig'),{params:data})
}

/**
 * 个人配置修改
 */
export function ownSettingUpdate(data) {
  return  axios.post(createApiUrl('/user/config'),data)
}






