<template>
  <div>
    <div class="left">
      <div class="frist">
        <p>{{ show.title }}top排行榜</p>
      </div>
      <div class="bigImg">
        <div class="img" @click="$router.push(`/play?videoId=${best.id}`)">
          <img class="first_img" :src="best.cover_img" />
        </div>
        <img class="crown" src="@/assets/images/home/crown.png" />
        <img
          @click="play(firstVideo.id)"
          class="play"
          src="@/assets/images/home/play.png"
        />
        <i>{{ best.length }}</i>
      </div>
      <div class="zjl zjls">
        <span class="bigFont">{{ best.title_label }}</span>
        <div class="introduce">
          <p>{{ best.name }}</p>
          <span class="see">{{ best.browse_num }}</span>
          <span class="see love">{{ best.like_num }}</span>
          <span class="see share">{{ best.share_num }}</span>
        </div>
      </div>
      <div class="row-lists">
        <div
          v-for="(item, index) in list.hot"
          :key="index"
          class="row-list row-list-width"
        >
          <div class="center_list">
            <div
              class="smarllImg"
              @click="$router.push(`/play?videoId=${item.id}`)"
            >
              <img :src="item.cover_img" />
              <p>
                <span>{{ item.length }}</span>
              </p>
              <div class="list_icon">
                <img
                  :src="
                    index == 0
                      ? second
                      : index == 1
                      ? three
                      : index == 2
                      ? four
                      : five
                  "
                />
              </div>
            </div>
            <div class="centent">
              <div class="tops">
                <img
                  :src="
                    item.id == 4
                      ? second1
                      : item.id == 5
                      ? three1
                      : item.id == 6
                      ? four1
                      : five1
                  "
                />
                <span class="name">{{ item.title_label }}</span>
                <span
                  :class="{
                    cont0: item.name.length == 0,
                    cont1: item.name.length == 1,
                    cont2: item.name.length == 2,
                    cont3: item.name.length == 3,
                    cont4: item.name.length >= 4
                  }"
                  >{{ item.name }}</span
                >
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
      <div class="vlogList" v-for="(item, index) in list.typeArr" :key="index">
        <!-- Vlog -->
        <div class="Vlog">
          <div class="more">
            <span class="lefts">{{ item.name }}</span>
            <span class="rights" @click="more(item.id)">
              更多
              <img class="gt" src="@/assets/images/home/towGt.png" />
            </span>
          </div>
          <div>
            <div class="row-lists row-lists-height">
              <div
                class="row-list row-list-width"
                v-for="video in item.data"
                :key="video.id"
              >
                <div class="center_list">
                  <div
                    class="smarllImg"
                    @click="$router.push(`/play?videoId=${video.id}`)"
                  >
                    <img :src="video.cover_img" />
                    <p>
                      <span>{{ video.length }}</span>
                    </p>
                  </div>
                  <div class="centent">
                    <div class="tops">
                      <span class="cont p">{{ video.name }}</span>
                    </div>
                    <div class="share">
                      <span class="see1">{{ video.browse_num }}</span>
                      <span class="see1 love1">{{ video.like_num }}</span>
                      <span class="see1 share1">{{ video.share_num }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="newup">
        <img src="@/assets/images/home/newUpload.png" />
      </div>
      <div class="col">
        <ul>
          <li v-for="(item, index) in newupList" :key="index">
            <div class="fontimg">
              <div
                class="leftimg"
                @click="$router.push(`/play?videoId=${item.id}`)"
              >
                <img v-lazy="item.cover_img" />
                <p>
                  <span>{{ item.length }}</span>
                </p>
              </div>
              <div class="rightfont">
                <p class="tit">{{ item.name }}</p>
                <p class="concern">
                  <span class="con1">{{ item.browse_num }}</span>
                  <span class="con2">{{ item.like_num }}</span>
                </p>
              </div>
            </div>
            <div class="line">
              <i></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { homePage, newUploadVideo } from "../api/home.js";

import second from "../assets/images/home/second.png";
import three from "../assets/images/home/three.png";
import four from "../assets/images/home/four.png";
import five from "../assets/images/home/five.png";
import second1 from "../assets/images/home/list_icon1.png";
import three1 from "../assets/images/home/three1.png";
import four1 from "../assets/images/home/four1.png";
import five1 from "../assets/images/home/five1.png";

export default {
  data() {
    return {
      newupList: [],
      best: {},
      // list: {},
      list: [1, 2, 3, 4],
      list1: [1, 2, 3, 4, 5, 6, 7, 8],
      lists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      title: [], // 第一届show大赛 等title 数组
      show: {}, // show 中的title 和 id
      firstVideo: {}, //最大的video
      showVideo: [], //show 下面四个video
      Vlog: {},
      now: {},
      openB: {},
      other: [],
      newList: {},
      bigImg: "",
      second: second,
      three: three,
      four: four,
      five: five,
      second1: second1,
      three1: three1,
      four1: four1,
      five1: five1
    };
  },
  created() {
    this._homePage();
    this._newUploadVideo();
  },
  methods: {
    //  首页列表
    async _homePage() {
      const res = await homePage();
      this.list = res.data;
      this.best = res.data.best;
    },

    //  最新上传
    async _newUploadVideo() {
      const res = await newUploadVideo();
      this.newupList = res.data;
    },

    //  查看更多
    more(id) {
      if (id === 3) {
        this.$router.push({ path: "vlog", query: { id: id } });
      } else if (id === 2) {
        this.$router.push({ path: "now", query: { id: id } });
      } else if (id === 4) {
        this.$router.push({ path: "openB", query: { id: id } });
      }
    },

    play(id) {
      // this.$router.push({
      //   path: 'play',
      //   query: {
      //     name: 111,
      //   }
      // })
      console.log(id);
    }
  },
  mounted() {
    let objs = require("@/assets/data/home.json");
    this.show = objs.data.show;
    this.firstVideo = objs.data.show.firstVideo;
    this.showVideo = objs.data.show.twolist;
    this.Vlog = objs.data.Vlog;
    this.now = objs.data.now;
    this.openB = objs.data.openB;
    this.other = objs.data.other;
    this.newList = objs.data.news;
    this.title.push(objs.data.show.title);
    this.title.push(objs.data.now.title);
    this.title.push(objs.data.openB.title);
    this.title.push(objs.data.other.title);
  }
};
</script>
<style lang="less" scoped>
.left {
  float: left;
  width: 78%;
  height: auto;
  position: relative;
  .frist {
    color: #543e43;
    font-size: 30px;
    font-weight: bold;
    height: 40px;
    text-align: left;
    margin-top: 36px;
    p {
      height: 30px;
      line-height: 25px;
      border-left: 5px solid #a54956;
      padding-top: 5px;
      padding-left: 10px;
    }
  }
  .bigImg {
    width: 90%;
    height: 410px;
    background: #ccc;
    border-radius: 10px;
    position: relative;
    top: 0px;
    left: 0;
    margin-top: 12px;
    box-shadow: 0px 3px 5px #ccc;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }
    .crown {
      position: absolute;
      top: 0;
      left: 0;
      width: 120px;
      height: auto;
    }
    .first_img {
      transition: all 1s;
      max-width: 100%;
      max-height: 100%;
    }
    .first_img:hover {
      transform: scale(1.2);
    }
    .play {
      width: 78px;
      height: 98px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -49px;
      margin-left: -39px;
    }
    i {
      width: 67px;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.61);
      line-height: 23px;
      text-align: center;
      font-style: normal;
      position: absolute;
      right: 7px;
      bottom: 12px;
      font-size: 16px;
      color: #fff;
    }
    em {
      color: #fff;
      width: 95px;
      height: 40px;
      background: #ff6a1f;
      border-radius: 5px;
      line-height: 40px;
      font-size: 26px;
      position: absolute;
      top: 8px;
      right: 15px;
      font-style: normal;
    }
  }
  .zjl {
    height: 120px;
    .bigFont {
      float: left;
      margin-left: 20px;
      font-size: 56px;
      font-weight: bold;
      color: #3d3d3d;
      border-right: 3px solid #ccc;
      height: 60px;
      line-height: 54px;
      margin-top: 30px;
      padding-right: 30px;
    }
    .introduce {
      margin-top: 20px;
      margin-left: 10px;
      float: left;
      height: 80px;
      position: relative;
      p {
        text-align: left;
        color: #3d3d3d;
        width: 600px;
        height: 40px;
        margin: 8px 0 0 20px;
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0px;
      }
      img {
        width: 30px;
        height: 20px;
      }
      .see {
        display: block;
        float: left;
        margin-left: 23px;
        background: url("~@/assets/images/home/love1.png") no-repeat 0 0;
        background-size: auto 20px;
        padding-left: 35px;
        margin-right: 56px;
        font-size: 18px;
      }
      .love {
        background-position: -90px 0;
      }
      .share {
        background-position: -185px 0;
      }
    }
  }
  .row-lists {
    width: 100%;
    margin-top: 17px;
    overflow: hidden;
  }
  .row-list {
    float: left;
    width: 217px;
    height: 210px;
    .center_list {
      width: 188px;
      overflow: hidden;
    }
    .centent .share {
      bottom: 0px;
      transition: all 0.4s;
    }
    .center_list:hover {
      .centent .share {
        bottom: -28px;
        transition: all 0.4s;
      }
      .tops .cont {
        color: #be5a99;
      }
      .tops .name {
        color: #be5a99;
      }
      .tops .p {
        color: #be5a99;
      }
      .smarllImg p {
        display: block;
      }
    }
    .smarllImg {
      width: 188px;
      height: 108px;
      cursor: pointer;
      position: relative;
      border-radius: 10px;
      box-shadow: 0px 3px 5px #ccc;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      p {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: relative;
        top: 0px;
        bottom: 0px;
        display: none;
        span {
          color: #fff;
          position: absolute;
          bottom: 5px;
          right: 8px;
          font-size: 12px;
        }
      }
      .list_icon {
        display: block;
        img {
          width: 35px;
          height: 35px;
        }
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
          // white-space:nowrap;
          // overflow:hidden;
          // text-overflow:ellipsis;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .cont0 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          font-size: 12px;
          margin-top: 7px;
          text-indent: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .cont1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          font-size: 12px;
          margin-top: 7px;
          text-indent: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .cont2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          font-size: 12px;
          margin-top: 7px;
          text-indent: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .cont3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          font-size: 12px;
          margin-top: 7px;
          text-indent: 65px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .cont4 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          font-size: 12px;
          margin-top: 7px;
          text-indent: 81px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .p {
          width: 188px;
          text-align: left;
        }
      }
      .share {
        position: absolute;
        bottom: 5px;
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
          display: inline-block;
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
  .Vlog {
    height: auto;
    width: 100%;
    .more {
      height: 50px;
      width: 846px;
      // border: 1px solid red;
      .lefts {
        margin-top: 10px;
        float: left;
        height: 30px;
        line-height: 30px;
        width: auto;
        padding-left: 11px;
        border-left: 5px solid #a54956;
        font-size: 30px;
        font-weight: bold;
        color: #543e43;
      }
      .gt {
        margin-top: 6px;
        float: right;
        width: 19px;
        height: 19px;
      }
      .rights {
        cursor: pointer;
        margin-top: 10px;
        float: right;
        color: #686868;
        font-size: 16px;
        height: 30px;
        line-height: 32px;
        text-align: right;
      }
    }
  }
}
.right {
  float: right;
  width: 22%;
  height: auto;
  // border: 1px solid green;
  .newup {
    width: 100%;
    height: 120px;
    // border: 1px solid blue;
    position: relative;
    img {
      position: absolute;
      bottom: 10px;
      left: 31px;
      width: 150px;
      height: 38px;
      // border: 1px solid red;
    }
  }
  .col {
    width: 100%;
    height: auto;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        width: 100%;
        height: auto;
        // border: 1px solid red;
        &:last-child .line i {
          display: none;
        }
        .fontimg {
          width: 100%;
          height: 120px;
          // border: 1px solid red;
          .leftimg {
            float: left;
            width: 180px;
            height: 120px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 3px 5px #ccc;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .rightfont {
            float: right;
            width: 84px;
            height: 120px;
            // border: 1px solid red;
            .tit {
              width: 79px;
              height: 40px;
              overflow: hidden;
              font-size: 14px;
              line-height: 20px;
              padding-left: 9px;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .p {
              margin: 0;
            }
            .concern {
              width: 79px;
              height: 65px;
              margin-top: 10px;
              .con1 {
                float: left;
                width: 100%;
                height: 30px;
                margin-left: 9px;
                background: url("~@/assets/images/home/rightICON.png") no-repeat
                  0 3px;
                background-size: 20px auto;
                font-size: 13px;
                padding-left: 9px;
              }
              .con2 {
                float: left;
                width: 100%;
                height: 30px;
                margin-left: 9px;
                background: url("~@/assets/images/home/rightICON.png") no-repeat
                  0 -39px;
                background-size: 20px auto;
                font-size: 13px;
                padding-left: 9px;
              }
            }
          }
        }
        .fontimg:hover {
          .rightfont {
            color: #be5a99;
          }
          .concern .con1 {
            background: url("~@/assets/images/home/right_h.png") no-repeat 0 3px;
            background-size: 20px auto;
          }
          .concern .con2 {
            background: url("~@/assets/images/home/right_h.png") no-repeat 0 -39px;
            background-size: 20px auto;
          }
        }
        .line {
          width: 100%;
          height: 40px;
          overflow: hidden;
          i {
            display: block;
            width: 100%;
            height: 1px;
            background: #bababa;
            margin-top: 23px;
          }
        }
      }
    }
  }
}
</style>
