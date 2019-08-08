import axios from "./myAxios";

/**
 * 登录接口
 */

function login(username, password) {
  let data = {
    username: username,
    password: password
  };
  return axios.post("/api/user/login", data);
}

/**
 * 注册接口
 */

//  验证昵称
function checkNickname(nickname) {
  let data = {
    nickname: nickname
  };
  return axios.post("/api/index/checkNickname", data);
}

//  验证手机/邮箱 重复
function checkaccount(account) {
  let data = {
    account: account
  };
  return axios.post("/api/index/checkaccount", data);
}

// 发送手机验证码
function sendCaptcha(type, mobile) {
  let data = {
    type: type,
    mobile: mobile
  };
  return axios.post("/api/index/sendCaptcha", data);
}

// 发送邮箱验证码
function sendEmail(email, type) {
  let data = {
    email: email,
    type: type
  };
  return axios.post("/api/index/sendEmail", data);
}

// 校验验证码
function checkCaptcha(account, captcha) {
  let data = {
    account: account,
    captcha: captcha
  };
  return axios.post("/api/index/checkCaptcha", data);
}

// 手机号注册
function phoneRegister(mobile, captcha, nickname, password) {
  let data = {
    mobile: mobile,
    captcha: captcha,
    nickname: nickname,
    password: password
  };
  return axios.post("/api/index/mobileRegister", data);
}

// 邮箱注册
function emailRegister(email, captcha, nickname, password) {
  let data = {
    email: email,
    captcha: captcha,
    nickname: nickname,
    password: password
  };
  return axios.post("/api/index/emailRegister", data);
}

// 重置密码
function resetPwd(username, newPassword, confimPassword, captcha) {
  let data = {
    username: username,
    new_password: newPassword,
    confim_password: confimPassword,
    captcha: captcha
  };
  return axios.post("/api/user/resetPwd", data);
}

/**
 * 关注接口
 */
// 关注列表
function myFollowList() {
  return axios.post("/api/user/myFollowList");
}

// 关注用户
function followUser(id) {
  let data = {
    user_id: id
  };
  return axios.post("/api/user/followUser", data);
}

// 取消关注用户
function cancelFollow(id) {
  let data = {
    user_id: id
  };
  return axios.post("/api/user/cancelFollow", data);
}

// 关注列表
function myFansList() {
  return axios.post("/api/user/myFansList");
}

/**
 * 个人中心接口
 */
// 编辑用户个人资料
function updateUserInfo(nickname, gender, birthday, score, avatar) {
  let data = {
    nickname: nickname,
    gender: gender,
    birthday: birthday,
    score: score,
    avatar: avatar
  };
  return axios.post("/api/user/updateUserInfo", data);
}

// 账号设置个人资料详情
function accountSet() {
  return axios.post("/api/user/accountSet");
}

/**
 * 首页接口
 */

//  首页列表
function homePage() {
  return axios.post("/api/home/homePage");
}

//  最新上传
function newUploadVideo() {
  return axios.post("/api/home/newUploadVideo");
}

//  查看更多视频
function moreVideo(limit, page, id, order) {
  let data = {
    limit: limit,
    page: page,
    typeId: id,
    order: order
  };
  return axios.post("/api/home/moreVideo", data);
}

//  首页导航
function classList() {
  return axios.post("/api/home/classList");
}

//  视频详情
function vedioInfo(videoId) {
  let data = {
    videoId: videoId
  };
  return axios.post("/api/home/vedioInfo", data);
}

//  个人主页（自己看）
function userInfo() {
  return axios.post("/api/user/userInfo");
}

//  个人主页（别人看）
function userPage(userId) {
  let data = {
    user_id: userId
  };
  return axios.post("/api/user/userPage", data);
}

//  评论列表
function commentList(limit, page, videoId) {
  let data = {
    limit: limit,
    page: page,
    videoId: videoId
  };
  return axios.post("/api/home/commentList", data);
}

// 添加评论
function addVideoComment(video_id, content) {
  let data = {
    video_id,
    content
  };
  return axios.post("/api/user/addComment", data);
}

//  添加回复
function addReply(id, replyId, replyContent) {
  let data = {
    comment_id: id,
    reply_id: replyId,
    content: replyContent
  };
  return axios.post("/api/user/addReply", data);
}

//  点赞视频
function likeVideo(videoId) {
  let data = {
    videoId: videoId
  };
  return axios.post("/api/user/likeVideo", data);
}

//  取消点赞视频
function cancelLikeVideo(videoId) {
  let data = {
    videoId: videoId
  };
  return axios.post("/api/user/cancelLikeVideo", data);
}

//  点赞评论
function addCommentLikes(commentId) {
  let data = {
    comment_id: commentId
  };
  return axios.post("/api/user/addCommentLikes", data);
}

//  取消点赞评论
function cancelCommentLikes(commentId) {
  let data = {
    comment_id: commentId
  };
  return axios.post("/api/user/cancelCommentLikes", data);
}

//  踩评论
function treadComment(commentId) {
  let data = {
    comment_id: commentId
  };
  return axios.post("/api/user/treadComment", data);
}

//  取消踩评论
function cancelTreadComment(commentId) {
  let data = {
    comment_id: commentId
  };
  return axios.post("/api/user/cancelTreadComment", data);
}

//  点赞回复
function addReplyLikes(replyId) {
  let data = {
    reply_id: replyId
  };
  return axios.post("/api/user/addReplyLikes", data);
}

//  取消点赞回复
function cancelReplyLikes(replyId) {
  let data = {
    reply_id: replyId
  };
  return axios.post("/api/user/cancelReplyLikes", data);
}

//  踩回复
function treadReply(replyId) {
  let data = {
    reply_id: replyId
  };
  return axios.post("/api/user/treadReply", data);
}

//  取消踩回复
function cancelTreadReply(replyId) {
  let data = {
    reply_id: replyId
  };
  return axios.post("/api/user/cancelTreadReply", data);
}

//  收藏视频
function collectVideo(videoId) {
  let data = {
    videoId: videoId
  };
  return axios.post("/api/user/collectVideo", data);
}

//  取消收藏视频
function cancelCollectVideo(videoId) {
  let data = {
    videoId: videoId
  };
  return axios.post("/api/user/cancelCollectVideo", data);
}

//  举报类型
function reportRules() {
  return axios.post("/api/home/reportRules");
}

//  举报
function report(subjectId, type, remark, classId) {
  let data = {
    subject_id: subjectId,
    type: type,
    remark: remark,
    class_id: classId
  };
  return axios.post("/api/user/report", data);
}

//  上传视频
function fileVideo() {
  return axios.post("/api/index/file");
}

//  全局搜索
function search(limit, page, word) {
  let data = {
    limit: limit,
    page: page,
    keyWord: word
  };
  return axios.post("/api/home/search", data);
}

//  我的收藏列表
function myCollectionVideo(limit, page) {
  let data = {
    limit: limit,
    page: page
  };
  return axios.post("/api/user/myCollectionVideo", data);
}

//  我的视频列表
function myVideo(limit, page, isdrafts) {
  let data = {
    limit: limit,
    page: page,
    isdrafts: isdrafts
  };
  return axios.post("/api/user/myVideo", data);
}

//  浏览记录
function videoHistory(limit, page) {
  let data = {
    limit: limit,
    page: page
  };
  return axios.post("/api/user/videoHistory", data);
}

//  获取热门搜索默认
function getRandomKey() {
  return axios.post("/api/home/getRandomKey");
}

//  获取标签
function getLabel(isStart, name) {
  let data = {
    is_start: isStart,
    name: name
  };
  return axios.post("/api/user/getLabel", data);
}

//  删除我的视频
function deleteVideo(videoId) {
  let data = {
    video_id: videoId
  };
  return axios.post("/api/user/deleteVideo", data);
}

//  上传图片
function uploadImg(data) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post("/api/index/uploadImg", data, config);
}

//  立即认证（身份证）
function userVerify(
  realname,
  papersType,
  papersNumber,
  papersImg,
  papersBackimg
) {
  let data = {
    realname: realname,
    papers_type: papersType,
    papers_number: papersNumber,
    papers_img: papersImg,
    papers_back_img: papersBackimg
  };
  return axios.post("/api/user/userVerify", data);
}

//  视频发布
function addVideo(
  name,
  coverImg,
  describe,
  classId,
  videoSrc,
  titleLabel,
  videoLabel,
  length,
  isdrafts
) {
  let data = {
    name: name,
    cover_img: coverImg,
    describe: describe,
    class_id: classId,
    video_src: videoSrc,
    title_label: titleLabel,
    video_label: videoLabel,
    length: length,
    drafts: isdrafts
  };
  return axios.post("/api/user/addVideo", data);
}

//  删除历史
function deleteHistory(historyId) {
  let data = {
    historyId: historyId
  };
  return axios.post("/api/user/deleteHistory", data);
}

//  清空历史
function clearHistory() {
  return axios.post("/api/user/clearHistory");
}

//  新增标签
function addLabel(isStart, name) {
  let data = {
    is_start: isStart,
    name: name
  };
  return axios.post("/api/user/addLabel", data);
}

//  绑定邮箱
function bindEmail(email, captcha) {
  let data = {
    email: email,
    captcha: captcha
  };
  return axios.post("/api/user/bindEmail", data);
}

// 账号安全状态
function accounStatus() {
  return axios.post("/api/user/accounStatus");
}

// 实名认证状态
function verifyStatus() {
  return axios.post("/api/user/verifyStatus");
}

// 编辑视频详情
function videoInfo(videoId) {
  let data = {
    video_id: videoId
  };
  return axios.post("/api/user/videoInfo", data);
}
// 添加浏览量
function addViews(videoId) {
  const data = {
    videoId
  };
  return axios.post("/api/user/addViews", data);
}

// 添加用户观看记录
function addVideoHistory(video_id) {
  const data = {
    video_id
  };
  return axios.post("/api/user/addVideoHistory", data);
}

// 增加分享量
function addShareNum(videoId) {
  const data = {
    videoId
  };
  return axios.post("/api/user/addShareNum", data);
}
export {
  login,
  checkNickname,
  checkaccount,
  sendCaptcha,
  sendEmail,
  checkCaptcha,
  phoneRegister,
  emailRegister,
  resetPwd,
  myFollowList,
  followUser,
  cancelFollow,
  myFansList,
  updateUserInfo,
  accountSet,
  homePage,
  newUploadVideo,
  moreVideo,
  classList,
  vedioInfo,
  addReply,
  userInfo,
  userPage,
  commentList,
  addVideoComment,
  likeVideo,
  cancelLikeVideo,
  collectVideo,
  cancelCollectVideo,
  report,
  fileVideo,
  reportRules,
  addCommentLikes,
  treadComment,
  cancelTreadComment,
  cancelCommentLikes,
  addReplyLikes,
  cancelReplyLikes,
  treadReply,
  cancelTreadReply,
  search,
  myCollectionVideo,
  videoHistory,
  getRandomKey,
  getLabel,
  myVideo,
  addVideo,
  deleteHistory,
  clearHistory,
  addLabel,
  deleteVideo,
  bindEmail,
  accounStatus,
  uploadImg,
  userVerify,
  verifyStatus,
  videoInfo,
  addViews,
  addVideoHistory,
  addShareNum
};
