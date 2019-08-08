<template>
  <div class="home" style="background:#FFFFFF;overflow:hidden">
    <div class="title">
      <Header></Header>
    </div>
    <div class="pinkSearch">
      <div class="seaCont">
        <p><em>扑粉</em>搜索</p>
        <p class="ss">
          <input
            type="text"
            placeholder="请输入您要搜索的关键词"
            v-model="gjc"
          />
          <button @click="gjcSearch">搜 索</button>
        </p>
      </div>
    </div>
    <!-- <div class="pickLine">
      <div class=" conts1">
        <span>最热排序</span>
        <span class="redColor">最新发布</span>
        <i class="lines"></i>
      </div>
    </div> -->
    <div class="container">
      <div>
        <div class="content">
          <div class="none" v-show="curId">
            <img src="~@/assets/images/home/none.png" />
            <p>暂时无搜索结果</p>
          </div>
          <div v-for="item in list" :key="item.id" class="row-list">
            <div
              class="smarllImg"
              @click="$router.push(`/play?videoId=${item.id}`)"
            >
              <img :src="item.cover_img" />
            </div>
            <div class="centent">
              <div class="tops">
                <span class="cont p">{{ item.name }}</span>
              </div>
              <div class="share">
                <span class="see1">{{ item.browse_num }}</span>
                <span class="see1 love1">{{ item.like_num }}</span>
                <span class="see1 share1">{{ item.share_num }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="paging" v-show="allTotal > 1">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="+currentPage"
            :page-size="15"
            :total="total"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <Footer> </Footer>
  </div>
</template>

<script>
import { search } from "../api/home.js";
import Footer from "../components/footer";
export default {
  name: "home",
  data() {
    return {
      allTotal: "",
      total: 0,
      curId: false,
      gjc: "",
      list: [],
      showColor: 0,
      hit: "第一届show大赛"
    };
  },
  components: {
    Footer
  },
  computed: {
    wordId() {
      return this.$route.query.word;
    },
    currentPage() {
      return this.$route.query.page || 1;
    }
  },
  created() {
    var limit = 15;
    var page = this.currentPage;
    this._search(limit, page, this.wordId);
  },
  methods: {
    handleCurrentChange(currentPage) {
      const params = this.$route.query;
      const newParams = Object.assign({}, params, {
        page: currentPage
      });
      this.$router.push({
        path: "/search",
        query: newParams
      });
      var limit = 15;
      var page = this.currentPage;
      this._search(limit, page, this.wordId);
    },

    gjcSearch() {
      if (this.gjc == "") {
        return;
      } else {
        this._search(this.gjc);
      }
    },
    async _search(limit, page, word) {
      const res = await search(limit, page, word);
      this.list = res.data;
      if (res.data.length == "") {
        this.curId = true;
      } else {
        this.curId = false;
      }
    },

    login() {
      this.$router.push({
        path: "/personalCenter",
        query: {
          name: "login"
        }
      });
    },
    bar1() {
      this.$router.push({
        path: "/",
        query: {
          name: "shouye"
        }
      });
      this.hit = "第一届show大赛";
      this.showColor = 0;
    },
    bar2() {
      this.$router.push({
        path: "/hit",
        query: {
          name: "第一届show大赛 打榜"
        }
      });
      this.hit = "打榜";
      this.showColor = 1;
    },
    bar3() {
      this.$router.push({
        path: "/vlog",
        query: {
          name: "Vlog"
        }
      });
      this.hit = "第一届show大赛";
      this.showColor = 2;
    },
    bar4() {
      this.$router.push({
        path: "/now",
        query: {
          name: "现场"
        }
      });
      this.hit = "第一届show大赛";
      this.showColor = 3;
    },
    bar5() {
      this.$router.push({
        path: "/openB",
        query: {
          name: "开箱"
        }
      });
      this.hit = "第一届show大赛";
      this.showColor = 4;
    },
    bar6() {
      this.$router.push({
        path: "/other",
        query: {
          name: "其他"
        }
      });
      this.hit = "第一届show大赛";
      this.showColor = 5;
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
    border: 2px solid #ff2222;
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
  height: 440px;
  .top {
    margin: 0 auto;
    height: 91px;
    width: 1200px;
    .logo {
      float: left;
      height: 74px;
      width: 214px;
      line-height: 74px;
      text-align: center;
      border: 1px solid red;
      margin-top: 8px;
      font-weight: bold;
      font-size: 35px;
      cursor: pointer;
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
      margin-top: 20px;
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
          width: 75px;
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
          right: 75px;
          bottom: 8px;
        }
        img {
          width: 28px;
          height: 28px;
        }
      }
      .headImg {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: #ccc;
        position: absolute;
        right: 80px;
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
      height: 218px;
      background: rgb(216, 62, 255);
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
.pickLine {
  width: 100%;
  height: 40px;
  position: relative;
  background: #ffd2de;
  box-shadow: 0px 15px 10px -15px #ccc;
  .conts1 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    height: 40px;
    width: 1200px;
    z-index: 9;
    span {
      height: 40px;
      width: auto;
      float: left;
      line-height: 40px;
      font-size: 22px;
      margin-right: 40px;
      cursor: pointer;
    }
    .lines {
      position: absolute;
      bottom: 0px;
      left: 127px;
      width: 90px;
      height: 3px;
      background: #ff1268;
    }
    .redColor {
      color: #ff1268;
    }
  }
  img {
    width: 100%;
    height: 100%;
    border: 0px solid blue;
  }
  z-index: 10;
}
// 列表内容
.row-list {
  float: left;
  width: 217px;
  height: 210px;
  margin-top: 20px;
  margin-right: 25px;
  // border: 1px solid blue;
  .smarllImg {
    width: 188px;
    height: 108px;
    // border: 1px solid red;
    position: relative;
    border-radius: 10px;
    box-shadow: 0px 3px 5px #ccc;
    overflow: hidden;
    cursor: pointer;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .centent {
    position: relative;
    height: 60px;
    width: auto;
    .tops {
      margin: 0;
      width: 100%;
      height: 45px;
      margin-top: 10px;
      position: relative;
      line-height: 20px;
      overflow: hidden;
      img {
        float: left;
        width: 10px;
        height: 12px;
        margin-top: 11px;
      }
      .name {
        float: left;
        font-size: 16px;
        margin-left: 5px;
        margin-top: 4px;
      }
      .cont {
        float: left;
        width: 130px;
        font-size: 12px;
        margin-top: 7px;
      }
      .p {
        width: 188px;
        text-align: left;
      }
    }
    .share {
      position: absolute;
      bottom: 3px;
      background: #fff;
      width: 195px;
      height: 28px;
      line-height: 15px;
      text-align: left;
      padding: 0;
      margin: 0;
      .see1 {
        margin: 0;
        padding: 0;
        float: left;
        width: 65px;
        height: 22px;
        background: url("~@/assets/images/home/love1.png") no-repeat 0 0;
        background-size: auto 18px;
        font-size: 12px;
        padding-left: 25px;
        line-height: 22px;
      }
      .love1 {
        background-position: -80px 0;
      }
      .share1 {
        background-position: -170px 0;
      }
    }
  }
}
.row-list:nth-child(5n) {
  margin-right: 0;
}
.content {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-bottom: 200px;
  .none {
    margin-top: 50px;
    img {
      width: 120px;
      height: 120px;
    }
    p {
      margin-top: 20px;
      font-size: 18px;
    }
  }
}
.paging {
  width: 100%;
  height: 185px;
  position: relative;
  // border: 1px solid red;
  ul {
    height: 30px;
    width: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    list-style: none;
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    li {
      float: left;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #000;
      font-size: 12px;
      border: 1px solid #868686;
      margin-right: 12px;
      cursor: pointer;
    }
    .pre,
    .next {
      width: 60px;
    }
  }
}

.pinkSearch {
  width: 100%;
  height: 120px;
  .seaCont {
    height: 120px;
    width: 1200px;
    margin: 0 auto;
    p {
      margin: 0;
      float: left;
      height: 120px;
      line-height: 120px;
      margin-right: 30px;
      font-size: 30px;
      padding: 0;
      position: relative;
      em {
        font-style: normal;
        color: #ea699f;
      }
      input {
        height: 40px;
        width: 400px;
        border: 1px solid #979797;
        padding-left: 10px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        margin-top: -3px;
        outline: none;
        position: absolute;
        top: 43px;
        left: 12px;
      }
      button {
        font-size: 18px;
        height: 40px;
        width: 80px;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        color: #fff;
        background: #8f7579;
        border: 0;
        outline: none;
        position: absolute;
        top: 40px;
        left: 411px;
        padding-right: 10px;
        cursor: pointer;
      }
      img {
        display: inline-block;
        width: 28px;
        height: 28px;
        // border: 1px solid red;
        position: absolute;
        top: 43px;
        left: 425px;
      }
    }
    .ss {
      width: 600px;
      line-height: 100px;
    }
  }
}
</style>
