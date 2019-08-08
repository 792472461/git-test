<template>
  <div>
    <Header></Header>
    <div class="center">
      <div class="tit">
        <div class="imgs">
          <img :src="userInfo.avatar" />
          <span
            class="attention"
            v-show="userInfo.followStatus == 0"
            @click="follow"
            >+ 关注</span
          >
          <span
            class="attention"
            v-show="userInfo.followStatus == 1"
            @click="following"
            >已关注</span
          >
        </div>
        <div class="intro">
          <h3>{{ userInfo.nickname }}</h3>
          <p><span>开箱达人</span></p>
          <div class="intros">个人简介：{{ userInfo.score }}</div>
        </div>
        <div class="right">
          <div class="s">
            <p>关注</p>
            <p class="nub">{{ userInfo.followCount }}</p>
          </div>
          <div class="s">
            <p>粉丝</p>
            <p class="nub">{{ userInfo.fansCount }}</p>
          </div>
          <div class="s">
            <p>播放量</p>
            <p class="nub">{{ userInfo.palyNum }}</p>
          </div>
        </div>
      </div>
      <div class="video">
        <div class="kby" v-show="videoList.length == 0">
          <img src="~@/assets/images/home/kongbaiye.png" />
          <p>他还没有上传过视频噢~</p>
        </div>
        <div class="title">
          TA的视频
        </div>
        <div class="videos" v-show="1">
          <div>
            <div class="content">
              <div v-for="item in videoList" :key="item.id" class="row-list">
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
          </div>
        </div>
        <div class="noVideo" v-show="0">
          <span>他还没有上传过视频哦~</span>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { userPage, followUser, cancelFollow } from "../api/home.js";
import Footer from "../components/footer";
export default {
  data() {
    return {
      userInfo: {},
      followId: "",
      videoList: []
    };
  },
  computed: {
    userId() {
      return this.$route.query.userId;
    }
  },
  components: {
    Footer
  },
  created() {
    this._userPage(this.userId);
  },
  methods: {
    //  个人主页
    async _userPage() {
      const res = await userPage(this.userId);
      this.userInfo = res.data;
      this.videoList = res.data.videoList;
    },
    follow() {
      this._followUser(this.userId);
    },
    following() {
      this._cancelFollow(this.userId);
    },
    //  关注用户
    async _followUser(id) {
      const res = await followUser(id);
      if (res.code === "-1") {
        this.$router.push({
          path: "/login"
        });
      } else if (res.code === "1") {
        this._userPage(this.userId);
      }
    },
    //  取消关注
    async _cancelFollow(id) {
      const res = await cancelFollow(id);
      if (res.code === "1") {
        this._userPage(this.userId);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.center {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  .tit {
    height: 453px;
    width: 100%;
    border-bottom: 1px solid #d8d8d8;
    padding-top: 60px;
    .imgs {
      float: left;
      width: 250px;
      height: 349px;
      position: relative;
      img {
        width: 250px;
        height: 250px;
        display: inline-block;
        border-radius: 50%;
        background: #ccc;
      }
      .attention {
        cursor: pointer;
        width: 100px;
        height: 37px;
        line-height: 37px;
        background: #ff4a9c;
        color: #fff;
        font-size: 18px;
        text-align: center;
        position: absolute;
        bottom: 41px;
        left: 50%;
        margin-left: -50px;
      }
    }
    .intro {
      width: 400px;
      height: auto;
      float: left;
      margin-left: 65px;
      text-align: left;
      margin-top: 31px;
      .intros {
        font-size: 16px;
        color: #7e7e7e;
      }
      h3 {
        font-size: 40px;
        color: #303030;
        font-weight: bold;
      }
      p {
        height: 26px;
        width: 100%;
        margin-top: 40px;
        margin-bottom: 53px;
        span {
          display: inline-block;
          width: 71px;
          height: 26px;
          color: #fff;
          font-size: 15px;
          line-height: 26px;
          text-align: center;
          background: #f29d06;
          border-radius: 3px;
        }
      }
    }
    .right {
      float: right;
      margin-top: 31px;
      .s {
        float: left;
        margin-left: 30px;
        text-align: center;
        cursor: pointer;
        p {
          font-size: 20px;
        }
        .nub {
          font-size: 15px;
          margin-top: 10px;
        }
      }
    }
  }
  .video {
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 200px;
    .kby {
      position: absolute;
      width: 200px;
      left: 50%;
      top: 150px;
      margin-left: -75px;
      img {
        width: 150px;
        height: 100px;
      }
      p {
        padding-top: 20px;
        font-size: 18px;
        color: #e6469a;
      }
    }
    .title {
      font-size: 40px;
      margin-top: 87px;
      text-align: left;
    }
    .noVideo {
      height: 1202px;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        font-size: 30px;
        margin-top: 216px;
      }
    }
    .videos {
      margin-top: 60px;
      width: 100%;
      height: auto;
      overflow: hidden;
      position: relative;
      .content {
        width: 100%;
        height: auto;
        overflow: hidden;
      }
      .row-list {
        float: left;
        width: 217px;
        height: 210px;
        margin-top: 20px;
        margin-right: 25px;
        .smarllImg {
          width: 188px;
          height: 108px;
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
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
      .paging {
        width: 100%;
        height: 185px;
        position: relative;
        bottom: 0;
        left: 0;
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
    }
  }
}
footer {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  height: 300px;
  background: #ccc;
  color: #f40;
}
</style>
