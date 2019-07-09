<template>
  <div>
    <Header></Header>
    <div class="c">
      <div class="bar">
        <Barnar v-on:checks="listcheck"></Barnar>
      </div>
      <!-- 个人信息 -->
      <div v-show="index == 'message'">
        <div class="centent area">
          <div class="con-title">
            <div class="titleImg">
              <div>
                <div class="txImg">
                  <img
                    class="titimg"
                    :src="info.avatar"
                  />
                </div>
                <img
                  class="Vadd"
                  src="@/assets/images/home/Vadd.png"
                />
              </div>
              <div class="my">
                <div
                  class="mys"
                  @click="$router.push(`/follow`)"
                >
                  <span>我的关注</span>
                  <span>{{ info.followCount }}</span>
                </div>
                <div
                  class="mys"
                  @click="$router.push(`/myFans`)"
                >
                  <span>我的粉丝</span>
                  <span>{{ info.fansCount }}</span>
                </div>
              </div>
            </div>
            <div class="introduce">
              <h3>{{ info.nickname }}</h3>
              <p>
                <img
                  class="idCardImg"
                  @click="$router.push(`/certification`)"
                  src="@/assets/images/home/grayIdCard.png"
                />
                <img
                  class="phoneImg"
                  @click="$router.push(`/editData?type=accountSecurity`)"
                  src="@/assets/images/home/grayPhone.png"
                />
              </p>
              <p>
                <span class="openBox">开箱达人</span>
                <span class="openBox">Vlog博主</span>
                <span class="openBox fansDk">周杰伦粉丝大咖</span>
                <span class="openBox">热血前线</span>
              </p>
              <p>
                个人简介
              </p>
              <p class="lazy">{{ info.score }}</p>
            </div>
            <div
              class="editPro"
              @click="editPro()"
            >
              <span>编辑个人资料</span>
            </div>
          </div>
        </div>
        <div class="approve area">
          <div class="pf">
            <span class="reds">扑粉认证</span>
            <div class="condition">
              <div>开通条件：</div>
              <p>
                明星粉丝大咖：上传10个某明星相关视频（时长5分钟以上，且每个视频的浏览量超过100)。
              </p>
              <p>
                vlog博主：上传10个vlog视频（时长5分钟以上，且每个视频的浏览量超过100)。
              </p>
              <p>
                开箱达人：上传10个开箱视频（时长2分钟以上，且每个视频的浏览量超过50)。
              </p>
              <p>
                热血前线：上传至少10个现场相关视频（时长5分钟以上，且每个视频的浏览量超过100)。
              </p>
            </div>
          </div>
          <div class="pf">
            <span class="reds blues">团体认证</span>
            <div class="condition">
              <div>开通条件：</div>
              <p>
                粉丝站子或团体相关负责人提供证据（如上传以管理员身份运营的微博账号，百度贴吧账号，论坛账号等）。
              </p>
            </div>
          </div>
          <div class="pf">
            <span class="reds yellows">明星认证</span>
            <div class="condition">
              <div>开通条件：</div>
              <p>明星本人或工作室提供的相关证明。</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 我的视频 -->
      <div v-show="index == 'myVideo'">
        <div class="myVideo">
          <div class="drafts">
            <div
              class="uploadV"
              @click="$router.push(`/uploadVideo`)"
            >
              上传视频
            </div>
            <div
              @click="cgx()"
              class="dra"
            >草稿箱</div>
          </div>
          <div class="lis">
            <ul>
              <li
                v-for="item in myVideoList"
                :key="item.id"
              >
                <span
                  class="headImg"
                  @click="$router.push(`/play?videoId=${item.id}`)"
                ><img :src="item.cover_img" /><i>{{ item.length }}</i></span>
                <div class="cont">
                  <p
                    class="h"
                    @click="$router.push(`/play?videoId=${item.id}`)"
                  >
                    {{ item.name }}
                  </p>
                  <p class="uptime">上传时间：{{ item.create_time }}</p>
                  <p class="label">
                    <span
                      class="labels"
                      v-for="(_item, index) in item.video_label"
                      :key="index"
                    >{{ _item }}</span>
                  </p>
                </div>
                <div class="edit">
                  <img
                    @click="myDel(item.id)"
                    class="delt upDelt"
                    src="@/assets/images/home/deltaVideo.png"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div
            class="nohave"
            v-show="0"
          >
            <img src="@/assets/images/home/nohave.png" />
            <span class="noupload">还没有上传过视频哦，<i>立即上传 &gt;</i></span>
          </div>
          <div
            class="fy"
            v-show="allTotal2 > 1"
          >
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="+currentPage"
              :page-size="10"
              :total="total"
              @current-change="handleCurrentChange3"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 我的收藏 -->
      <div
        class="top12"
        v-show="index == 'myCollection'"
      >
        <div class="collect">
          <span class="title">收藏的视频</span>
        </div>
        <div class="col-video">
          <div
            class="col-videos"
            v-for="(item, index) in list"
            :key="index"
          >
            <p
              class="imgh"
              @click="$router.push(`/play?videoId=${item.id}`)"
            >
              <img :src="item.cover_img" />
            </p>
            <p class="welcome">{{ item.name }}</p>
            <p class="cole">
              收藏于：{{ item.create_time }}
              <i @click="qxsc(item.id, index)">取消收藏</i>
            </p>
          </div>
        </div>
        <div
          class="fy"
          v-show="allTotal > 1"
        >
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="+currentPage"
            :page-size="24"
            :total="total1"
            @current-change="handleCurrentChange1"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 浏览记录 -->
      <div
        class="top12"
        v-show="index == 'browsingHistory'"
      >
        <div class="collect">
          <span class="title">浏览历史</span>
          <p class="clearhistory">
            <img
              @click="empty"
              src="@/assets/images/home/delatAllVideo.png"
            /><span @click="empty">清空历史</span>
          </p>
        </div>
        <div class="col-video">
          <div
            class="col-videos"
            v-for="(item, index) in historyList"
            :key="index"
          >
            <p
              class="imgh"
              @click="$router.push(`/play?videoId=${item.id}`)"
            >
              <img :src="item.cover_img" />
            </p>
            <p class="welcome">{{ item.name }}</p>
            <p class="cole">
              看到：16:00
              <img
                @click="scls(item.id)"
                src="~@/assets/images/home/ljt.png"
              />
            </p>
          </div>
        </div>
        <div
          class="fy"
          v-show="allTotal1 > 1"
        >
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="+currentPage"
            :page-size="24"
            :total="total2"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 金币管理 -->
      <div
        class="top12"
        v-show="index == 'gold'"
      >
        <div class="zwkt">暂未开通金币管理，敬请等待...</div>
      </div>
      <!-- 草稿箱 -->
      <div v-show="index == 6">
        <div class="myVideo">
          <div class="drafts">
            <img
              @click="back()"
              src="@/assets/images/home/drafts-lt.png"
            />
            <span class="cgx">草稿箱</span>
          </div>
          <div class="lis">
            <ul>
              <li
                v-for="(item, index) in cgxList"
                :key="index"
              >
                <span class="headImg"><img
                    :src="item.cover_img"
                    @click="$router.push(`/play?videoId=${item.id}`)"
                  /><i>{{item.length}}</i></span>
                <div class="cont">
                  <p class="h">{{ item.name }}</p>
                  <!-- <p class="dirct">废材个阻止妹恋爱</p> -->
                  <p class="uptime">上传时间：{{item.create_time}}</p>
                  <p class="label"><span
                      v-for="(_item, index) in item.video_label"
                      :key="index"
                      class="labels"
                    >{{_item}}</span></p>
                </div>
                <div class="edit">
                  <span class="btn">编辑视频</span>
                  <img
                    class="delt"
                    src="@/assets/images/home/deltaVideo.png"
                    @click="cgxDel(item.id)"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div
            class="fy"
            v-show="allTotal2 > 1"
          >
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="+currentPage"
              :page-size="10"
              :total="total"
              @current-change="handleCurrentChange3"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <footer>
      暂无页角
    </footer>
  </div>
</template>
<script>
import {
  userInfo,
  myCollectionVideo,
  cancelCollectVideo,
  videoHistory,
  myVideo,
  deleteHistory,
  clearHistory,
  deleteVideo
} from '../api/home.js'
import Barnar from '../components/barnar/barnar.vue'
export default {
  data() {
    return {
      cgxList: [],
      myVideoList: [],
      allTotal2: '',
      allTotal1: '',
      allTotal: '',
      total: 0,
      total1: 0,
      total2: 0,
      historyList: [],
      list: [],
      info: {},
      index: this.$route.query.type
    }
  },
  computed: {
    Id() {
      return this.$route.query.id
    },
    currentPage() {
      return this.$route.query.page || 1
    }
  },

  created() {
    var limit = 24
    var _limit = 10
    var page = this.currentPage
    this._videoHistory(limit, page)
    this._userInfo()
    this._myCollectionVideo(limit, page)
    this._myVideo(_limit, page, 0)
  },
  methods: {
    myDel(videoId) {
      this._deleteVideo(videoId, 0)
    },

    // 草稿箱
    cgx() {
      this.index = 6
      var _limit = 10
      var page = this.currentPage
      this._myVideo(_limit, page, 1)
    },

    qxsc(id) {
      this._cancelCollectVideo(id)
    },

    cgxDel(index) {
      this._deleteVideo(index, 1)
    },

    // 清空历史
    async _clearHistory() {
      const res = await clearHistory()
      if (res.code === '1') {
        var limit = 24
        var page = this.currentPage
        this._videoHistory(limit, page)
      }
    },

    empty() {
      this._clearHistory()
    },

    // 删除历史
    async _deleteHistory(historyId) {
      const res = await deleteHistory(historyId)
      if (res.code === '1') {
        var limit = 24
        var page = this.currentPage
        this._videoHistory(limit, page)
      }
    },

    scls(historyId) {
      this._deleteHistory(historyId)
    },

    // 我的视频接口
    async _myVideo(limit, page, isdrafts) {
      const res = await myVideo(limit, page, isdrafts)

      this.total = res.count
      this.allTotal2 = res.totalpage
      if (isdrafts == 0) {
        this.myVideoList = res.data
      } else if (isdrafts == 1) {
        this.cgxList = res.data
      }
      console.log(this.cgxList, 'ppp')
    },

    // 删除我的视频
    async _deleteVideo(videoId, name) {
      const res = await deleteVideo(videoId)
      if (res.code == '1' && name == 0) {
        var _limit = 10
        var page = this.currentPage
        this._myVideo(_limit, page, 0)
      } else if (res.code == '1' && name == 1) {
        this.index = 6
        var _limit = 10
        var page = this.currentPage
        this._myVideo(_limit, page, 1)
      }
    },

    //  历史记录接口
    async _videoHistory(limit, page) {
      const res = await videoHistory(limit, page)
      this.historyList = res.data
      this.total2 = res.count
      this.allTotal1 = res.totalpage
    },

    // 浏览记录
    handleCurrentChange(currentPage) {
      const params = this.$route.query
      const newParams = Object.assign({}, params, {
        page: currentPage
      })
      this.$router.push({
        path: '/personalCenter',
        query: newParams
      })
      var limit = 24
      var page = this.currentPage
      this._videoHistory(limit, page)
    },

    // 收藏
    handleCurrentChange1(currentPage) {
      const params = this.$route.query
      const newParams = Object.assign({}, params, {
        page: currentPage
      })
      this.$router.push({
        path: '/personalCenter',
        query: newParams
      })
      var limit = 24
      var page = this.currentPage
      this._myCollectionVideo(limit, page)
    },

    // 我的视频
    handleCurrentChange3(currentPage) {
      const params = this.$route.query
      const newParams = Object.assign({}, params, {
        page: currentPage
      })
      this.$router.push({
        path: '/personalCenter',
        query: newParams
      })
      var limit = 10
      var page = this.currentPage
      this._myVideo(limit, page)
    },

    async _userInfo() {
      const res = await userInfo(this.Id)
      this.info = res.data
    },

    // 我的收藏接口
    async _myCollectionVideo(limit, page) {
      const res = await myCollectionVideo(limit, page)
      this.list = res.data
      this.total1 = res.count
      this.allTotal = res.totalpage
    },

    async _cancelCollectVideo(id) {
      const res = await cancelCollectVideo(id)
      this.list = res.data
      if (res.code == '1') {
        var limit = 24
        var page = this.currentPage
        this._myCollectionVideo(limit, page)
      }
    },

    search() {
      this.$router.push({
        path: '/search',
        query: {
          name: 11111
        }
      })
    },

    editPro() {
      this.$router.push({
        path: '/editData',
        query: {
          type: 'accountSetting'
        }
      })
    },

    listcheck(data) {
      this.index = data
    },

    back() {
      this.index = 'myVideo'
      var _limit = 10
      var page = this.currentPage
      this._myVideo(_limit, page, 0)
    }
  },
  components: {
    Barnar
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #c08c93;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #84414b;
}
.c {
  width: 1200px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
}
.bar {
  width: 177px;
  height: 1805px;
  float: left;
  margin-top: 12px;
  overflow: hidden;
}
.centent {
  width: 994px;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
  float: left;
  padding-left: 27px;
  .con-title {
    margin-top: 80px;
    float: left;
    width: 994px;
    height: 290px;
    border-bottom: 1px solid #e3e3e3;
    position: relative;
    .titleImg {
      position: absolute;
      top: 37px;
      left: 0;
      .txImg {
        width: 160px;
        height: 160px;
        overflow: hidden;
        .titimg {
          width: 165px;
          height: 165px;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          background: #ccc;
        }
      }

      .Vadd {
        position: absolute;
        top: 120px;
        left: 120px;
        width: 46px;
        height: 46px;
      }
      .my {
        position: absolute;
        top: 175px;
        left: 15px;
        display: flex;
        justify-content: center;
        font-size: 12px;
        width: 150px;
        height: auto;
        .mys {
          margin-right: 10px;
          cursor: pointer;
          color: #2c3e50;
        }
        .mys:hover {
          color: #e56d6d;
        }
      }
    }
    .introduce {
      position: absolute;
      top: 35px;
      left: 190px;
      width: 400px;
      text-align: left;
      h3 {
        margin: 0;
        margin-top: 10px;
      }
      p {
        padding: 0;
        margin: 0;
        font-size: 20px;
        margin-top: 10px;
        height: 30px;
        width: 500px;
      }
      .idCardImg {
        width: 28px;
        height: auto;
        margin-right: 25px;
        cursor: pointer;
      }
      .phoneImg {
        width: 15px;
        height: auto;
        cursor: pointer;
      }
      .openBox {
        display: inline-block;
        width: 85px;
        color: #fff;
        background: #f29d06;
        border-radius: 3px;
        line-height: 20px;
        font-size: 18px;
        text-align: center;
        margin-right: 16px;
        padding: 4px;
      }
      .fansDk {
        width: 145px;
      }
      .lazy {
        font-size: 12px;
      }
    }
    .editPro {
      position: absolute;
      top: 40px;
      right: 30px;
      font-size: 15px;
      cursor: pointer;
      span {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      span:hover {
        color: #e56d6d;
        border: 1px solid #e56d6d;
      }
    }
  }
}
.approve {
  width: 996px;
  height: 800px;
  margin: 0 auto;
  text-align: left;
  overflow: hidden;
  margin-top: 32px;
  margin-left: 204px;
  .pf {
    margin-top: 35px;
    width: 100%;
    height: auto;
    .reds {
      display: inline-block;
      width: 130px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      color: #fff;
      background: #e56d6d;
      border-radius: 5px;
      font-size: 20px;
    }
    .blues {
      background: #6b6bca;
    }
    .yellows {
      background: #e5c244;
      color: #fff;
    }
    .condition {
      margin-left: 30px;
      font-size: 16px;
      margin-top: 20px;
      color: #848484;
      p {
        margin: 10px;
        margin-left: 20px;
        font-size: 16px;
      }
    }
  }
}
.myVideo {
  width: 1021px;
  height: auto;
  float: left;
  margin-top: 12px;
  .drafts {
    margin-top: 70px;
    width: 980px;
    height: 65px;
    border-bottom: 1px solid #e3e3e3;
    overflow: hidden;
    margin-left: 40px;
    .dra {
      width: 100px;
      height: 40px;
      border: 1px solid #e6469a;
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      float: right;
      margin-top: 18px;
      margin-right: 15px;
      cursor: pointer;
      color: #e6469a;
    }
    .uploadV {
      width: 160px;
      height: 58px;
      font-size: 20px;
      background: #ff4a9c;
      border-radius: 3px;
      line-height: 58px;
      text-align: center;
      color: #fff;
      float: right;
      margin-top: 2px;
      cursor: pointer;
    }
    .uploadV:hover {
      background: #f7b7d4;
    }
    .cgx {
      font-size: 20px;
      color: #666;
      float: left;
      margin-left: 30px;
      margin-top: 20px;
    }
    img {
      float: left;
      margin-left: 45px;
      margin-top: 25px;
    }
  }
  .lis {
    width: 100%;
    height: auto;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      padding-top: 35px;
      padding-left: 40px;
      li {
        width: 100%;
        height: 195px;
        background: #fff7f7;
        overflow: hidden;
        border-radius: 10px;
        .headImg {
          float: left;
          width: 190px;
          height: 120px;
          border-radius: 10px;
          box-shadow: 0 0 5px #ccc;
          position: relative;
          overflow: hidden;
          margin-top: 28px;
          margin-left: 45px;
          cursor: pointer;

          img {
            width: 190px;
            height: 120px;
            border-radius: 10px;
          }
          i {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 50px;
            height: 18px;
            font-size: 10px;
            color: #fff;
            line-height: 18px;
            text-align: center;
            background: rgba(5, 5, 5, 0.5);
            border-top-left-radius: 8px;
          }
        }
        .cont {
          font-size: 20px;
          float: left;
          width: auto;
          height: 120px;
          margin-top: 28px;
          text-align: left;
          margin-left: 40px;
          p {
            margin: 0;
            padding: 0;
          }
          .h {
            padding-top: 10px;
            cursor: pointer;
            font-weight: bold;
            color: #bc8586;
          }
          .dirct {
            font-size: 16px;
            margin-top: 3px;
            color: #bc8586;
          }
          .uptime {
            font-size: 16px;
            margin-top: 3px;
            color: #bc8586;
          }
          .label {
            height: 26px;
            width: auto;
            margin-top: 25px;
            .labels {
              margin-right: 10px;
              font-size: 16px;
              height: 26px;
              border-radius: 15px;
              color: #fff;
              background: #ff4a9c;
              line-height: 28px;
              text-align: center;
              float: left;
              padding: 0px 10px;
            }
          }
        }
        .edit {
          cursor: pointer;
          float: right;
          width: auto;
          height: 120px;
          margin-top: 28px;
          font-size: 20px;
          position: relative;
          .btn {
            border: 1px solid #737373;
            color: #737373;
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin-right: 20px;
            margin-top: 36px;
            float: left;
            border-radius: 5px;
          }
          .delt {
            width: 21px;
            height: 21px;
            display: inline-block;
            position: absolute;
            right: 68px;
            top: 88px;
          }
          .upDelt {
            top: 50px;
          }
        }
      }
      li:nth-child(2n) {
        background: #fff;
      }
    }
  }
}
.collect {
  width: 1021px;
  height: auto;
  overflow: hidden;
  .title {
    font-size: 20px;
    color: #bc8686;
    float: left;
    margin-left: 25px;
    margin-top: 75px;
  }
  .clearhistory {
    font-size: 20px;
    color: #666;
    float: right;
    margin-top: 90px;
    margin-right: 30px;
    cursor: pointer;
    img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      // background: #ccc;
      float: left;
    }
    span {
      margin-left: 6px;
    }
  }
}
.col-video {
  float: left;
  width: 1010px;
  height: auto;
  .col-videos {
    margin-top: 30px;
    width: 225px;
    height: 220px;
    float: left;
    margin-left: 25px;
    p {
      margin: 0;
      padding: 0;
    }
    .imgh {
      width: 225px;
      height: 142px;
      border-radius: 8px;
      cursor: pointer;
      img {
        width: 225px;
        height: 142px;
        border-radius: 8px;
      }
    }
    .welcome {
      font-size: 14px;
      color: #3f3f3f;
      text-align: left;
      margin-top: 12px;
    }
    .cole {
      font-size: 12px;
      color: #3f3f3f;
      text-align: left;
      width: 100%;
      margin-top: 10px;
      img {
        float: right;
        width: 25px;
        height: 25px;
        cursor: pointer;
      }
      i {
        font-size: 12px;
        font-style: normal;
        width: 68px;
        text-align: center;
        float: right;
        border: 1px solid #3f3f3f;
        border-radius: 3px;
        cursor: pointer;
        padding: 1px 3px;
      }
      i:hover {
        background: #bc8686;
        border: 1px solid #bc8686;
        color: #fff;
      }
    }
  }
  .col-videos:hover {
    .welcome {
      color: #bc8686;
    }
    .cole {
      color: #bc8686;
      i {
        border: 1px solid #bc8686;
      }
    }
  }
}
.top12 {
  margin-top: 12px;
  .zwkt {
    margin-top: 222px;
    font-size: 16px;
  }
}
.fy {
  width: 998px;
  height: 100px;
  float: left;
  margin-top: 50px;
  ul {
    list-style: none;
    display: inline-block;
    margin-top: 41px;
    li {
      float: left;
      width: 18px;
      height: 18px;
      border: 1px solid #868686;
      line-height: 18px;
      text-align: center;
      margin-left: 15px;
    }
    li:first-child,
    li:last-child {
      width: 60px;
    }
  }
}
.nohave {
  width: 100%;
  height: auto;
  // border: 1px solid red;
  position: relative;
  margin-top: 100px;
  .noupload {
    position: absolute;
    left: 35%;
    top: 90%;
    font-size: 25px;
    i {
      color: #ff4a9c;
      font-style: normal;
    }
  }
}
footer {
  width: 100%;
  max-width: 1920px;
  height: 165px;
  background: #000000;
  text-align: center;
  line-height: 165px;
  padding: 0;
  margin: 0 !important;
  margin: 0 auto;
}
</style>
