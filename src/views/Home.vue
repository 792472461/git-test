<template>
  <div class="home" style="background:#FFFFFF;overflow:hidden">
    <div class="title">
      <div class="top1">
        <div class="top area">
          <div class="logo">
            <img src="@/assets/images/home/pfen.png" />
          </div>
          <div class="ser-right">
            <span class="search">
              <input type="text" :placeholder="word1" v-model="word" />
              <button @click="search()"></button>
              <img
                @click="search()"
                class="bigGlass"
                src="@/assets/images/home/bigGlass.png"
              />
            </span>
            <img
              :src="avatar"
              @click="login()"
              class="headImg"
              @mouseenter="enter"
            />
            <span @click="help()" class="help">帮助</span>
          </div>
          <div
            class="userCard"
            v-show="showId && token !== ''"
            @mouseleave="leave"
          >
            <p>{{ userName }}</p>
            <div class="signOut">
              <img @click="outLogin" src="~@/assets/images/home/tuic.png" />
              <span @click="outLogin">退出</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bgI">
        <img class="backgroudimg" :src="list.banner" />
        <div :class="{ nav: 1, navBottom: showColor == 0 }">
          <ul class="area">
            <!-- <li v-for="(item,key,index) in objs" :key="index" v-if="index >= 1" :class="{slect: showColor == 0}">
              {{item[0]}}
              <div v-show="showColor == 0" class="card"><i></i></div>
            </li>-->

            <li @click="tab(0, shouyeid[1])" :class="{ slect: showColor == 0 }">
              首页
              <div v-show="showColor == 0" class="card">
                <i></i>
              </div>
            </li>
            <li
              v-for="(item, index) in routerList"
              :key="index"
              @click="tab(+index + 1, item.id)"
              :class="{ slectColor: showColor == +index + 1 }"
            >
              {{ nameId ? item.seo_title : item.name }}
              <div class="cards" v-show="showColor == +index + 1">
                <div class="line"></div>
                <i></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="showColor != 0" class="pickLine">
      <div class="area conts1">
        <span @click="hots()" :class="{ redColor: target == 0 }">最热排序</span>
        <span @click="news()" :class="{ redColor: target == 1 }">最新发布</span>
        <i :class="{ lines: 1, moveline: target == 0 }"></i>
      </div>
      <img src="../assets/images/home/whitePinBG.png" />
    </div>
    <div class="container area">
      <router-view></router-view>
    </div>
    <div class="footer">页脚暂无内容99999</div>
  </div>
</template>

<script>
import { homePage, classList, userInfo, getRandomKey } from "../api/home.js";
import Cookies from "js-cookie";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {
      showId: false,
      word1: "",
      word: "",
      nameId: false,
      routerList: [],
      list: {},
      hit: "", // 用于切换 第一届show 和 打榜
      showColor: 0,
      bigImg: "", // 大图片
      title2: "", // 打榜
      objs: {}, // 所有的title 和 id
      shouyeid: [], //  首页：0title 1id show： 2title 3id
      slectBar: "", // 选中的bar的index
      id: "", // 选中的bar的id
      target: 0 // 用于切换样式
    };
  },
  inject: ["reload"],
  created() {
    this._homePage();
    this._classList();
    this.currentName();
    this._getRandomKey();
    if (this.token) {
      this.GET_USER_INFO();
    }
  },
  computed: {
    ...mapState(["token", "userName", "userId"]),
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
      this.EXIT();
      this.reload();
    },

    currentName() {
      if (this.$route.query.class === "hit") {
        this.nameId = true;
      } else {
        this.nameId = false;
      }
    },

    //  获取热门搜索默认
    async _getRandomKey() {
      const res = await getRandomKey();
      this.word1 = res.data;
    },

    //  首页列表
    async _homePage() {
      const res = await homePage();
      this.list = res.data;
    },

    //  个人首页
    async _userInfo() {
      const res = await userInfo();
      this.userName = res.data.nickname || "";
      const token = Cookies.get("tokenAccess");
      if (token) {
        this.avatar = res.data.avatar;
      } else {
        this.avatar = require("@/assets/images/home/user.png");
      }
    },

    //  首页导航
    async _classList() {
      const res = await classList();
      this.routerList = res.data;
    },

    hots() {
      this.target = 0;
      if (this.slectBar == 1) {
        this.$router.push({
          path: "/hit",
          query: {
            id: this.id,
            class: "hot",
            type: "hot"
          }
        });
      }
      if (this.slectBar == 2) {
        this.$router.push({
          path: "/vlog",
          query: {
            id: this.id,
            class: "vlog",
            type: "hot"
          }
        });
      }
      if (this.slectBar == 3) {
        this.$router.push({
          path: "/now",
          query: {
            id: this.id,
            class: "now",
            type: "hot"
          }
        });
      }
      if (this.slectBar == 4) {
        this.$router.push({
          path: "/openB",
          query: {
            id: this.id,
            class: "openB",
            type: "hot"
          }
        });
      }
      if (this.slectBar == 5) {
        this.$router.push({
          path: "/other",
          query: {
            id: this.id,
            class: "other",
            type: "hot"
          }
        });
      }
    },

    news() {
      this.target = 1;
      if (this.slectBar == 1) {
        this.$router.push({
          path: "/hit",
          query: {
            id: this.id,
            class: "hit",
            type: "new"
          }
        });
      }
      if (this.slectBar == 2) {
        this.$router.push({
          path: "/vlog",
          query: {
            id: this.id,
            class: "vlog",
            type: "new"
          }
        });
      }
      if (this.slectBar == 3) {
        this.$router.push({
          path: "/now",
          query: {
            id: this.id,
            class: "now",
            type: "new"
          }
        });
      }
      if (this.slectBar == 4) {
        this.$router.push({
          path: "/openB",
          query: {
            id: this.id,
            class: "openB",
            type: "new"
          }
        });
      }
      if (this.slectBar == 5) {
        this.$router.push({
          path: "/other",
          query: {
            id: this.id,
            class: "other",
            type: "new"
          }
        });
      }
    },
    tab(index, id) {
      this.target = 0;
      this.slectBar = index;
      this.id = id;

      if (index == 0) {
        this.$router.push({
          path: "/",
          query: {
            id: id,
            class: "home"
          }
        });
        this.hit = this.objs.show[0];
        this.showColor = 0;
      }
      if (index == 1) {
        this.$router.push({
          path: "/hit",
          query: {
            id: id,
            class: "hit"
          }
        });
        this.nameId = true;
        this.hit = this.title2;
        this.showColor = 1;
      } else {
        this.nameId = false;
      }
      if (index == 2) {
        this.$router.push({
          path: "/vlog",
          query: {
            id: id,
            class: "vlog"
          }
        });
        this.hit = this.objs.show[0];
        this.showColor = 2;
      }
      if (index == 3) {
        this.$router.push({
          path: "/now",
          query: {
            id: id,
            class: "now"
          }
        });
        this.hit = this.objs.show[0];
        this.showColor = 3;
      }
      if (index == 4) {
        this.$router.push({
          path: "/openB",
          query: {
            id: id,
            class: "openB"
          }
        });
        this.hit = this.objs.show[0];
        this.showColor = 4;
      }
      if (index == 5) {
        this.$router.push({
          path: "/other",
          query: {
            id: id,
            class: "other"
          }
        });
        this.hit = this.objs.show[0];
        this.showColor = 5;
      }
    },
    search() {
      if (this.word == "") {
        this.$router.push({
          path: "/search",
          query: {
            name: "search",
            word: this.word1
          }
        });
      } else {
        this.$router.push({
          path: "/search",
          query: {
            name: "search",
            word: this.word
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
    },
    logo() {},
    help() {
      let data = {
        name: 1,
        content: 2
      };
      this.$postHttp("http://localhost:3000/fans", data).then(response => {
        response.result; //请求返回数据
      });
    },
    getBigImg() {
      return this.bigImg;
    }
  },
  mounted() {
    let obj = require("@/assets/data/home.json");
    this.bigImg = obj.bigImg;
    this.hit = obj.data.show.title;
    this.title2 = obj.data.show.title2;
    let arr = [];
    arr.push(obj.data.home.id);
    arr.push(obj.data.show.id);
    arr.push(obj.data.Vlog.id);
    arr.push(obj.data.now.id);
    arr.push(obj.data.openB.id);
    arr.push(obj.data.other.id);
    this.shouyeid.push(obj.data.home.title);
    this.shouyeid.push(obj.data.home.id);
    this.shouyeid.push(obj.data.show.title);
    this.shouyeid.push(obj.data.show.id);
    let objs = {
      home: [obj.data.home.title, obj.data.home.id],
      show: [obj.data.show.title, obj.data.show.id],
      Vlog: [obj.data.Vlog.title, obj.data.Vlog.id],
      now: [obj.data.now.title, obj.data.now.id],
      openB: [obj.data.openB.title, obj.data.openB.id],
      other: [obj.data.other.title, obj.data.other.id]
    };
    this.objs = objs;
    // arr.push({"title":obj.data.home.title,"id":obj.data.home.id})
    // arr.push({"title":obj.data.show.title,"id":obj.data.show.id})
    // arr.push({"title":obj.data.Vlog.title,"id":obj.data.Vlog.id})
    // arr.push({"title":obj.data.now.title,"id":obj.data.now.id})
    // arr.push({"title":obj.data.openB.title,"id":obj.data.openB.id})
    // arr.push({"title":obj.data.other.title,"id":obj.data.other.id})
    // this.baran = arr;
    if (this.$route.path == "/") {
      this.hit = this.objs.show[0];
      this.showColor = 0;
    }
    if (this.$route.path == "/hit") {
      this.hit = this.title2;
      this.showColor = 1;
    }
    if (this.$route.path == "/vlog") {
      this.hit = this.objs.show[0];
      this.showColor = 2;
    }
    if (this.$route.path == "/now") {
      this.hit = this.objs.show[0];
      this.showColor = 3;
    }
    if (this.$route.path == "/openB") {
      this.hit = this.objs.show[0];
      this.showColor = 4;
    }
    if (this.$route.path == "/other") {
      this.hit = this.objs.show[0];
      this.showColor = 5;
    }
  },
  watch: {
    $route(to, from) {
      from.path;
      if (to.path == "/") {
        this.hit = this.objs.show[0];
        this.showColor = 0;
      }
      if (to.path == "/hit") {
        this.hit = this.title2;
        this.showColor = 1;
      }
      if (to.path == "/vlog") {
        this.hit = this.objs.show[0];
        this.showColor = 2;
      }
      if (to.path == "/now") {
        this.hit = this.objs.show[0];
        this.showColor = 3;
      }
      if (to.path == "/openB") {
        this.hit = this.objs.show[0];
        this.showColor = 4;
      }
      if (to.path == "/other") {
        this.hit = this.objs.show[0];
        this.showColor = 5;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cards {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 58px;
  left: 50%;
  margin-left: -10px;
  .line {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid #ad787e;
    border-right: transparent;
    border-bottom: transparent;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 0px;
    left: 50%;
    margin-left: -6px;
    background: #fff;
  }
}
.card {
  position: absolute;
  width: 30px;
  height: 20px;
  background: #fff;
  top: 66px;
  left: 50%;
  margin-left: -10px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  z-index: 999;
  i {
    position: absolute;
    width: 12px;
    height: 12px;
    top: -2px;
    left: -2px;
    border-left: 2px solid #ad787e;
    border-top: 2px solid #ad787e;
  }
}
.container {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
  z-index: 9;
}
.title {
  width: 100%;
  height: 440x;
  .top1 {
    width: 100%;
    height: 125px;
    background: #e5d0e2;
  }
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
        margin-top: 10px;
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
      width: 500px;
      height: 50px;
      float: right;
      margin-top: 35px;
      position: relative;
      .search {
        width: 350px;
        height: 40px;
        position: absolute;
        right: 120px;
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
        cursor: pointer;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        position: absolute;
        right: 60px;
        top: 10px;
      }
      .help {
        position: absolute;
        right: 0;
        top: 15px;
        font-size: 20px;
        color: #565656;
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
      height: 270px;
      padding: 0;
    }
    .nav {
      border-bottom: 2px solid #ad787e;
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
.footer {
  height: 100px;
  width: 100%;
  text-align: center;
  line-height: 100px;
  background: #696562;
}
.slectColor {
  color: #754e53 !important;
  font-weight: bold !important;
}
.pickLine {
  width: 100%;
  height: 65px;
  position: relative;
  .conts1 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    height: 50px;
    width: 1200px;
    z-index: 9;
    span {
      height: 50px;
      width: auto;
      float: left;
      line-height: 50px;
      font-size: 22px;
      margin-right: 40px;
      cursor: pointer;
    }
    .lines {
      position: absolute;
      bottom: -2px;
      left: 127px;
      width: 90px;
      height: 3px;
      background: #fc5d97;
      transition: left 0.3s linear;
    }
    .moveline {
      left: 0;
      transition: left 0.3s linear;
    }
    .redColor {
      color: #fc5d97;
    }
  }
  img {
    width: 100%;
    height: 100%;
    border: 0px solid blue;
  }
  z-index: 10;
}
</style>
