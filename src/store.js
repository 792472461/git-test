import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import Cookie from "js-cookie";
import { userInfo } from "@/api/home.js";

export default new Vuex.Store({
  state: {
    avatar: Cookie.get("avatar") || "",
    token: Cookie.get("tokenAccess") || "",
    userName: Cookie.get("userName") || "",
    userId: Cookie.get("userId") || ""
  },
  mutations: {
    CHANGE_AVATAR(state, payload) {
      state.avatar = payload;
      Cookie.set("avatar", payload);
    },
    CHANGE_USERNAME(state, payload) {
      state.userName = payload;
      Cookie.set("userName", payload);
    },
    CHANGE_TOKEN(state, payload) {
      state.token = payload;
      Cookie.set("tokenAccess", payload.accesstoken);
      Cookie.set("expire_time", payload.expire_time);
    },
    CHANGE_USERID(state, payload) {
      state.userId = payload;
      Cookie.set("userId", payload);
    },
    EXIT(state) {
      Cookie.remove("avatar");
      Cookie.remove("tokenAccess");
      Cookie.remove("userName");
      Cookie.remove("userId");
      state.avatar = "";
      state.token = "";
      state.userName = "";
      state.userId = "";
    }
  },
  actions: {
    async GET_USER_INFO({ commit }) {
      const res = await userInfo();
      if (res.code === "1") {
        const userName = res.data.nickname || "";
        const userId = res.data.user_id || "";
        const avatar = res.data.avatar || "";
        commit("CHANGE_AVATAR", avatar);
        commit("CHANGE_USERNAME", userName);
        commit("CHANGE_USERID", userId);
      }
    }
  }
});
