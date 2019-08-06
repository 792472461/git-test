<template>
  <div class="title">
    <div class="top area">
      <div class="logo">
        <img src="@/assets/images/home/pfen.png" />
      </div>
      <div class="bar">
        <ul>
          <li @click="bar(1)">首页</li>
          <li
            @click="bar(item.id)"
            v-for="(item, index) in routerList"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="ser-right">
        <span v-show="curId" class="search">
          <input type="text" :placeholder="star" v-model="wSearch" />
          <button @click="search()"></button>
          <img
            @click="search()"
            class="bigGlass"
            src="@/assets/images/home/bigGlass.png"
          />
        </span>
        <img
          @click="login()"
          class="headImg"
          :src="avatar"
          @mouseenter="enter"
        />
        <span class="help" @click="help()">帮助</span>
      </div>
      <div class="userCard" v-show="showId && token !== ''" @mouseleave="leave">
        <p>{{ userName }}</p>
        <div class="signOut">
          <img @click="outLogin" src="~@/assets/images/home/tuic.png" />
          <span @click="outLogin">退出</span>
        </div>
      </div>
    </div>
    <div class="bgI">
      <img class="backgroudimg" :src="list.banner" />
    </div>
  </div>
</template>
<script>
import { homePage, classList, getRandomKey } from "@/api/home.js";
import { mapState, mapActions, mapMutations } from "vuex";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      showId: false,
      curId: false,
      star: "",
      wSearch: "",
      list: {},
      routerList: []
    };
  },
  inject: ["reload"],
  created() {
    this._classList();
    this._homePage();
    this._getRandomKey();
    if (this.token) {
      this.GET_USER_INFO();
    }
  },
  computed: {
    ...mapState(["token", "userName", "userId"]),
    wordId() {
      return this.$route.query.name;
    },
    avatar() {
      return (
        this.$store.state.avatar || require("@/assets/images/home/user.png")
      );
    }
  },
  methods: {
    ...mapActions(["GET_USER_INFO"]),
    ...mapMutations(["EXIT"]),
    enter() {
      this.showId = true;
    },
    leave() {
      this.showId = false;
    },
    // 退出登录
    outLogin() {
      // Cookies.remove("expire_time");
      // Cookies.remove("tokenAccess");
      this.EXIT();
      this.reload();
    },
    //  获取热门搜索默认
    async _getRandomKey() {
      const res = await getRandomKey();
      this.star = res.data;
    },

    help() {
      this.$router.push({
        path: "/help",
        query: {
          name: "help"
        }
      });
    },

    bar(id) {
      if (id == 1) {
        this.$router.push({
          path: "/"
        });
      } else if (id == 5) {
        this.$router.push({
          path: "/hit",
          query: {
            id: id,
            class: "hit"
          }
        });
      } else if (id == 3) {
        this.$router.push({
          path: "/vlog",
          query: {
            id: id,
            class: "vlog"
          }
        });
      } else if (id == 2) {
        this.$router.push({
          path: "/now",
          query: {
            id: id,
            class: "now"
          }
        });
      } else if (id == 4) {
        this.$router.push({
          path: "/openB",
          query: {
            id: id,
            class: "openB"
          }
        });
      } else if (id == 6) {
        this.$router.push({
          path: "/other",
          query: {
            id: id,
            class: "other"
          }
        });
      }
    },
    //  banner
    async _homePage() {
      const res = await homePage();
      this.list = res.data;
    },
    //  导航
    async _classList() {
      const res = await classList();
      this.routerList = res.data;
      if (this.wordId == "searchWord") {
        this.curId = false;
      } else if (this.wordId == "search") {
        this.curId = false;
      } else {
        this.curId = true;
      }
    },
    search() {
      if (this.wSearch == "") {
        this.$router.push({
          path: "/search",
          query: {
            name: "searchWord",
            word: this.star
          }
        });
      } else {
        this.$router.push({
          path: "/search",
          query: {
            name: "searchWord",
            word: this.wSearch
          }
        });
      }
    },
    login() {
      const token = Cookies.get("tokenAccess");
      if (token) {
        this.$router.push({
          path: "/personalCenter",
          query: {
            type: "message"
          }
        });
      } else {
        this.$router.push({
          path: "/login",
          query: {
            name: "login"
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  width: 100%;
  height: 440x;
  background: #fff;
  .top {
    position: relative;
    margin: 0 auto;
    height: 125px;
    width: 1200px;
    .logo {
      float: left;
      height: 108px;
      width: 214px;
      line-height: 74px;
      text-align: center;
      margin-top: 8px;
      font-weight: bold;
      font-size: 35px;
      cursor: pointer;
      img {
        height: 108px;
        width: 214px;
      }
    }
    .bar {
      font-size: 20px;
      width: auto;
      height: 50px;
      float: left;
      margin-top: 16px;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        overflow: hidden;
        margin-left: 20px;
        margin-top: 25px;
        li {
          height: 50px;
          line-height: 50px;
          float: left;
          margin-left: 12px;
          margin-right: 12px;
          color: #bc8686;
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
    .ser-right {
      width: 450px;
      height: 50px;
      float: right;
      margin-top: 33px;
      position: relative;
      .search {
        width: 350px;
        height: 40px;
        position: absolute;
        right: 80px;
        bottom: 0;
        input {
          width: 215px;
          height: 38px;
          color: black;
          padding-left: 22px;
          border-bottom-left-radius: 22px;
          border-top-left-radius: 22px;
          border: 0px;
          float: left;
          outline: none;
          font-size: 17px;
          border: 1px solid #494949;
        }
        input::-webkit-input-placeholder {
          color: #8e8e8e;
        }
        input::-moz-input-placeholder {
          color: #8e8e8e;
        }
        input::-ms-input-placeholder {
          color: #8e8e8e;
        }
        input::-o-input-placeholder {
          color: #8e8e8e;
        }
        button {
          cursor: pointer;
          width: 60px;
          height: 38px;
          background: #7c5d62;
          border-bottom-right-radius: 22px;
          border-top-right-radius: 22px;
          border: 0px;
          float: left;
          outline: none;
        }
        .bigGlass {
          position: absolute;
          right: 90px;
          bottom: 8px;
        }
        img {
          cursor: pointer;
          width: 28px;
          height: 28px;
        }
      }
      .headImg {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        position: absolute;
        right: 60px;
        top: 10px;
        cursor: pointer;
      }
      .help {
        position: absolute;
        right: 0;
        top: 15px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .userCard {
      position: absolute;
      width: 200px;
      height: 85px;
      background: #fdf2fd;
      top: 100px;
      right: -20px;
      z-index: 9999;
      border-radius: 15px;
      overflow: hidden;
      p {
        line-height: 40px;
        margin-top: 5px;
        font-size: 18px;
        color: #7c5d61;
      }
      p:hover {
        color: #d09ea4;
      }
      .signOut {
        position: absolute;
        width: 100%;
        bottom: 0px;
        height: 30px;
        background-color: #fdf2fd;
        color: #7c5d61;
      }
      span {
        cursor: pointer;
      }
      img {
        width: 23px;
        height: 23px;
        margin-right: 5px;
        cursor: pointer;
      }
    }
  }
  .bgI {
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
    left: 0;
    .backgroudimg {
      display: block;
      width: 100%;
      height: 230px;
      padding: 0;
    }
    .nav {
      border-bottom: 2px solid #ff2222;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 65px;
      background: rgba(255, 255, 255, 0.8);
      ul {
        margin: 0 auto;
        width: 1200px;
        padding: 0;
        list-style: none;
        // overflow: hidden;
        text-align: left;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: space-between;
        li {
          padding: 0;
          margin: 0;
          height: 65px;
          line-height: 60px;
          width: auto;
          font-size: 25px;
          color: #333;
          font-weight: 300;
          position: relative;
          cursor: pointer;
        }
        .slect {
          font-weight: bold;
          color: #754e53;
        }
        .last {
          width: auto;
          margin-right: 0;
        }
        .ShowImg {
          height: 50px;
          margin-top: 12px;
          position: absolute;
          top: 2px;
          left: -25px;
        }
      }
    }
    .navBottom {
      border-bottom: 2px solid #ad787e;
    }
  }
}
</style>
