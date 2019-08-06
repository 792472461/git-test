import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    // 主页
    {
      path: "/",
      component: Home,
      children: [
        // 主页 - 首页
        {
          path: "/",
          component: () => import("./components/shouye.vue")
        },
        // 主页 - 打榜
        {
          path: "/hit",
          component: () => import("./components/hit.vue")
        },
        // 主页 - Vlog
        {
          path: "/vlog",
          component: () => import("./components/Vlog.vue")
        },
        // 主页 - 现场
        {
          path: "/now",
          component: () => import("./components/now.vue")
        },
        // 主页 - 开箱
        {
          path: "/openB",
          component: () => import("./components/openB.vue")
        },
        // 主页 - 其他
        {
          path: "/other",
          component: () => import("./components/other.vue")
        }
      ]
    },
    // 搜索页面
    {
      path: "/search",
      component: () => import("./views/Search.vue")
    },

    // 登录注册页面
    {
      path: "/login",
      component: () => import("./views/Login.vue")
    },
    // 个人中心
    {
      path: "/personalCenter",
      component: () => import("./views/PersonalCenter.vue")
    },
    // 重置密码
    {
      path: "/resetPassword",
      component: () => import("./views/ResetPassword.vue")
    },
    // 编辑资料
    {
      path: "/editData",
      component: () => import("./views/EditData.vue")
    },
    // 绑定或改绑手机
    {
      path: "/bindPhone",
      component: () => import("./views/BindPhone.vue")
    },
    // 播放页
    {
      path: "/play",
      component: () => import("./views/Play.vue")
    },
    // 上传视频
    {
      path: "/uploadVideo",
      component: () => import("./views/UploadVideo.vue")
    },
    // 我的关注
    {
      path: "/follow",
      component: () => import("./views/Follow.vue")
    },
    // 我的粉丝
    {
      path: "/myFans",
      component: () => import("./views/myFans.vue")
    },
    // 个人认证-实名认证
    {
      path: "/certification",
      component: () => import("./views/Certification.vue")
    },
    // 个人认证-实名认证信息提交
    {
      path: "/submission",
      component: () => import("./views/Submission.vue")
    },
    // 注册页面
    {
      path: "/register",
      component: () => import("./views/Register.vue")
    },
    // 注册成功页面
    {
      path: "/registerSuccess",
      component: () => import("./views/RegisterSuccess.vue")
    },
    // 选择验证方式
    {
      path: "/slectWay",
      component: () => import("./views/SlectWay.vue")
    },
    // 个人主页
    {
      path: "/perHome",
      component: () => import("./views/PersonalHomepage.vue")
    },
    // 团体认证
    {
      path: "/group",
      component: () => import("./views/Group.vue")
    },
    // 明星认证
    {
      path: "/starGroup",
      component: () => import("./views/StarGroup.vue")
    },
    // 修改头像
    {
      path: "/modifyAvatar",
      component: () => import("./views/modifyAvatar.vue")
    },
    // 帮助页
    {
      path: "/help",
      component: () => import("./views/Help.vue")
    },
    // 注册协议页
    {
      path: "/agreement",
      component: () => import("./views/Agreement.vue")
    },
    // 发布视频协议页
    {
      path: "/videoAgreement",
      component: () => import("./views/videoAgreement.vue")
    }
  ]
});
