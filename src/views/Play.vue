<template>
  <div>
    <Header></Header>
    <div class="area content">
      <div class="videoplay">
        <div class="title">
          <div class="tit-left">
            <p class="bt">{{ list.name }}</p>
            <p class="timer">{{ list.time }}</p>
          </div>
          <div class="tit-right">
            <div @click="toMine(list.user_id)" class="imgT">
              <img :src="list.avatar" />
            </div>
            <div class="adds">
              <p class="names">{{ list.nickname }}</p>
              <p>
                <button v-show="followId == 0" @click="follow">
                  +关注&nbsp;&nbsp;{{ list.fansNum }}
                </button>
              </p>
              <p>
                <button
                  v-show="followId == 1"
                  @click="following"
                  class="following"
                >
                  已关注
                </button>
              </p>
            </div>
          </div>
        </div>
        <div class="videos">
          <!-- <video ref="video">
            <source :src="list.video_src" />
            此浏览器不兼容 video，请更换浏览器观看
          </video>
          <div class="control">
            <i
              @mousedown="drags()"
              @mousemove="drag($event)"
              @mouseup="clearMove()"
              class="circle"
              :style="{ display: blocks, left: lft }"
            ></i>
            <div
              class="progressHover"
              ref="progress"
              @click="tiemClick($event)"
              @mouseover="block(1)"
              @mouseleave="block(2)"
            ></div>
            <div class="progressWhite"></div>
            <div class="progressRed" :style="{ width: w }"></div>
            <div @click="staPlay()" class="startPlay">
              <img
                v-show="startPlay"
                src="@/assets/images/home/startPlay.png"
              />
              <img
                v-show="!startPlay"
                src="@/assets/images/home/stopPlay.png"
              />
            </div>
            <div class="playTime">{{ nowTime }} / {{ list.length }}</div>
            <div class="full">
              <img @click="full()" src="@/assets/images/home/fullBtn.png" />
            </div>
            <div class="volume">
              <img src="@/assets/images/home/volumeBtn.png" />
            </div>
            <div @click="ProgsFn()" class="P720">
              720P
              <div v-show="Progs" class="Progressive">
                <p>720P</p>
                <p>480P</p>
                <p>360P</p>
              </div>
            </div>
          </div> -->
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
          />
        </div>
        <div class="share">
          <div class="seeLove">
            <p class="first">
              <img src="@/assets/images/home/llan.png" /><span>{{
                list.browse_num
              }}</span>
            </p>
            <p>
              <img
                :src="
                  isLike === 0
                    ? require('@/assets/images/home/xhuan.png')
                    : require('@/assets/images/home/xhuan1.png')
                "
                @click="isLike === 0 ? loveVideo() : cancellove()"
              /><span>{{ list.like_num }}</span>
            </p>
            <p>
              <img
                :src="
                  isCollect === 0
                    ? require('@/assets/images/home/scang.png')
                    : require('@/assets/images/home/scang1.png')
                "
                @click="isCollect === 0 ? collect() : cancelcollect()"
              /><span>{{ list.collect_num }}</span>
            </p>
            <p>
              <img
                @click="fxiang"
                class="fxiang"
                src="@/assets/images/home/fxiang.png"
              /><span>{{ list.share_num }}</span>
            </p>
          </div>
          <div class="comp">
            <p>
              <img
                src="@/assets/images/home/tsu.png"
                @click="complain()"
              /><span @click="complain()">投诉</span>
            </p>
          </div>
        </div>

        <div class="fenx" v-show="fxiangId">
          <div class="fl">分享到：</div>
          <div @click="shareTo('qzone')">
            <img
              src="http://zixuephp.net/static/images/qqzoneshare.png"
              width="30"
            />
          </div>
          <div @click="shareTo('qq')">
            <img
              src="http://zixuephp.net/static/images/qqshare.png"
              width="32"
            />
          </div>
          <div @click="shareTo('sina')">
            <img
              src="http://zixuephp.net/static/images/sinaweiboshare.png"
              width="36"
            />
          </div>
          <div @click="shareTo('wechat')">
            <img
              src="http://zixuephp.net/static/images/wechatshare.png"
              width="32"
            />
          </div>
        </div>

        <div class="videoIntrdon">
          <div class="videoTit">视频简介</div>
          <div class="videoCont">{{ list.describe }}</div>
          <div class="videoLabel">
            <span
              class="bq"
              v-for="(item, index) in list.video_label"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
      <div class="dont" v-show="dontId">
        <i @click="cancelf">x</i>
        <p>不能关注自己</p>
      </div>
      <!-- 视频简介结束 -->
      <div class="comment">
        <div class="preComment">
          <div class="comment-tit">
            <div class="headImg" @click="toMine(list.user_id)">
              <img :src="list.avatar" />
            </div>
            <div class="headname">
              <span @click="$router.push(`/perHome?userId=${list.user_id}`)">{{
                list.nickname
              }}</span
              ><img src="" />
            </div>
            <div class="headnumber">{{ remnant }}/300</div>
          </div>
          <div class="sayIdea">
            <textarea
              maxlength="300"
              @input="descInput"
              cols="30"
              rows="10"
              v-model="comment"
            ></textarea>
          </div>
          <div class="sedComment">
            <button @click="_addVideoComment">发表评论</button>
          </div>
        </div>

        <div class="allComment">
          <div class="allComment-tit">
            全部评论
          </div>
          <div class="gap" v-show="videoCommentList.length == 0">
            <img src="~@/assets/images/home/kongbaiye.png" />
            <p>暂时还没有人评论~</p>
          </div>
          <ul class="list">
            <li
              class="lists"
              v-for="(item, index) in videoCommentList"
              :key="item.id"
            >
              <div class="lists-con">
                <div class="comment-left">
                  <img :src="item.avatar" @click="toMine(item.user_id)" />
                  <button
                    v-show="item.isFollow === 0"
                    @click="fUser(item.user_id)"
                  >
                    关注
                  </button>
                  <button
                    v-show="item.isFollow === 1"
                    @click="cancelfUser(item.user_id)"
                    style="background: #ccc;"
                  >
                    已关注
                  </button>
                </div>
                <div class="comment-right">
                  <div class="rig-name">
                    <span>{{ item.nickname }}</span>
                    <img src="" alt="" />
                  </div>

                  <div class="rig-con">
                    <p>
                      {{ item.content }}
                    </p>
                  </div>
                  <div class="rig-timer">
                    <span class="timer">{{ item.create_time }}</span>
                    <div class="icon">
                      <div class="icons">
                        <img
                          @click="
                            item.isLike == 0
                              ? dzan(item.id)
                              : cancelDzan(item.id)
                          "
                          :src="
                            item.isLike == 0
                              ? require('@/assets/images/home/dzan.png')
                              : require('@/assets/images/home/dzan1.png')
                          "
                        /><span class="numbe">{{ item.likes }}</span>
                      </div>
                      <div class="icons">
                        <img
                          @click="
                            item.isTread == 0
                              ? cai(item.id)
                              : cancelCai(item.id)
                          "
                          :src="
                            item.isTread == 0
                              ? require('@/assets/images/home/cai.png')
                              : require('@/assets/images/home/cai1.png')
                          "
                        /><span class="numbe">{{ item.tread_num }}</span>
                      </div>
                      <div class="icons">
                        <img
                          @click="replyInput(index)"
                          src="@/assets/images/home/plun.png"
                        />
                        <span class="numbe">{{ item.reply.length }}</span>
                      </div>
                      <div class="icons" @click="complain1(item.id)">
                        <img src="@/assets/images/home/wjing.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 回复框 -->
              <div class="reply" v-show="replyInputId === index">
                <img class="name" :src="avatar" />
                <textarea v-model="replyContent"></textarea>
                <div class="sure" @click="sureReply(item.id)">确定</div>
              </div>
              <div class="sub" v-if="item.reply.length !== 0">
                <video-comment
                  :index="index"
                  :itemId="item.id"
                  @sureSecondReply="sureSecondReply"
                  @tsBox="tsBox"
                  @hfdzan="hfdzan"
                  @hfcancelDzan="hfcancelDzan"
                  @hfcai="hfcai"
                  @hfcancelCai="hfcancelCai"
                  :data="!item.brandFold ? item.reply.slice(0, 3) : item.reply"
                  :replyInputId.sync="replyInputId"
                ></video-comment>
                <!-- 查看更多二级评论 -->
                <div v-if="item.reply.length > 3" class="sub-more">
                  <span @click="changeFoldState(index)"
                    >共{{ item.reply.length }}条回复&nbsp;</span
                  >
                  <i @click="changeFoldState(index)">{{
                    !item.brandFold ? "点击查看" : "收起"
                  }}</i>
                </div>
              </div>
            </li>
          </ul>
          <!-- 一级评论分页 -->
          <div class="feny" v-show="allTotal > 1">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="+currentPage"
              :page-size="12"
              :total="total"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 举报1 -->
    <div class="background" v-show="complains">
      <div class="jbBox">
        <div class="jb-tit">举报 <i @click="dlt()">x</i></div>
        <div class="jb-con">
          <div v-for="rule in rules" :key="rule.id">
            <label
              ><input
                name="ts"
                type="radio"
                value=""
                @click="checkedNames1(rule.id)"
              />{{ rule.title }}
            </label>
          </div>
        </div>
        <div class="jb-dirct">
          <p>请在下方留言框简述举报原因</p>
          <textarea
            maxlength="400"
            @input="tsInput"
            cols="30"
            rows="10"
            v-model="comment1"
          ></textarea>
          <span class="number">{{ remnant1 }}/400</span>
        </div>
        <div class="submit">
          <button @click="submitTs(list.id, 1)">提交</button>
        </div>
      </div>
    </div>
    <!-- 举报2 -->
    <div class="background" v-show="complains1">
      <div class="jbBox">
        <div class="jb-tit">举报 <i @click="dlt()">x</i></div>
        <div class="jb-con">
          <div v-for="rule in rules" :key="rule.id">
            <label
              ><input
                name="ts"
                type="radio"
                value=""
                @click="checkedNames1(rule.id)"
              />{{ rule.title }}
            </label>
          </div>
        </div>
        <div class="jb-dirct">
          <p>请在下方留言框简述举报原因</p>
          <textarea
            maxlength="400"
            @input="tsInput"
            cols="30"
            rows="10"
            v-model="comment1"
          ></textarea>
          <span class="number">{{ remnant1 }}/400</span>
        </div>
        <div class="submit"><button @click="submitTs1(2)">提交</button></div>
      </div>
    </div>

    <!-- 举报3 -->
    <div class="background" v-show="complains2">
      <div class="jbBox">
        <div class="jb-tit">举报 <i @click="dlt()">x</i></div>
        <div class="jb-con">
          <div v-for="rule in rules" :key="rule.id">
            <label
              ><input
                name="ts"
                type="radio"
                value=""
                @click="checkedNames1(rule.id)"
              />{{ rule.title }}
            </label>
          </div>
        </div>
        <div class="jb-dirct">
          <p>请在下方留言框简述举报原因</p>
          <textarea
            maxlength="400"
            @input="tsInput"
            cols="30"
            rows="10"
            v-model="comment1"
          ></textarea>
          <span class="number">{{ remnant1 }}/400</span>
        </div>
        <div class="submit"><button @click="submitTs2(3)">提交</button></div>
      </div>
    </div>

    <!-- 举报成功 -->
    <div v-show="jbcgId" class="jbcg">举报成功</div>
    <div v-show="cfjbId" class="jbcg">请不要重复举报</div>
    <footer>暂无页脚</footer>
  </div>
</template>
<script>
import "video.js/dist/video-js.css";
import {
  vedioInfo,
  followUser,
  cancelFollow,
  addVideoComment,
  commentList,
  likeVideo,
  cancelLikeVideo,
  collectVideo,
  cancelCollectVideo,
  addReply,
  report,
  reportRules,
  addCommentLikes,
  cancelCommentLikes,
  treadComment,
  cancelTreadComment,
  addReplyLikes,
  cancelReplyLikes,
  treadReply,
  cancelTreadReply
} from "../api/home.js";
// import { setInterval, clearInterval } from "timers";
import Cookies from "js-cookie";
import { videoPlayer } from "vue-video-player";
import videoComment from "../components/VideoComment";
export default {
  data() {
    return {
      allTotal: "",
      total: 0,
      fxiangId: false,
      introduce: "",
      videoName: "",
      hfId: "",
      plId: "",
      cfjbId: false,
      jbcgId: false,
      rules: [],
      checkedNames: "",
      remnant: 0,
      remnant1: 0,
      stateId: false,
      replyArr: [],
      // brandFold: false,
      lock: true,
      lock1: true,
      lock2: true,
      lock4: true,
      replyContent: "",
      replyContent1: "",
      replySecondId: false,
      replyInputId: false,
      avatar: "",
      fUserId: "",
      dontId: false,
      isCollect: "",
      isLike: "",
      currentCommentShow: null,
      userId: "",
      followId: "",
      list: {},
      startPlay: true,
      Progs: false,
      w: "30%",
      lft: "10",
      interval: null,
      cont: "",
      totalTime: "",
      nowTime: "",
      blocks: "none",
      move: 1,
      complains: 0,
      complains1: 0,
      complains2: 0,
      comment: "",
      comment1: "",
      comment2: "",
      videoCommentList: [],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "" //你的视频地址（必填）
          }
        ]
        // poster: "poster.jpg", //你的封面地址
        // width: document.documentElement.clientWidth
      }
    };
  },
  inject: ["reload"],
  created() {
    this._vedioInfo(this.videoId);
    var limit = 12;
    var page = this.currentPage;
    this._getCommentList(limit, page);
    this._reportRules();
  },
  computed: {
    videoId() {
      return this.$route.query.videoId;
    },
    currentPage() {
      return this.$route.query.page || 1;
    }
  },
  // mounted() {
  //   var $config = {
  //     title: '234',
  //     description: '123',
  //     wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
  //     wechatQrcodeHelper:
  //       '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
  //   }

  //   socialShare('.social-share-cs', $config)
  // },
  methods: {
    fxiang() {
      if (this.lock4 === true) {
        this.fxiangId = true;
        this.lock4 = false;
        return;
      }

      if (this.lock4 === false) {
        this.fxiangId = false;
        this.lock4 = true;
        return;
      }
    },
    shareTo(stype) {
      var linkVal = window.location.href;
      var ftit = this.videoName;
      var lk = "http://fans.mimanduo.xyz/img/pfen.0abb0695.png";
      var introduce = "扑粉网-粉丝打榜网站";
      //qq空间接口的传参
      if (stype == "qzone") {
        window.open(
          `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${linkVal}?sharesource=qzone&title=${ftit}&pics=${lk}&summary=${introduce}`
        );
      }
      //新浪微博接口的传参
      if (stype == "sina") {
        window.open(
          `http://service.weibo.com/share/share.php?url=${linkVal}?sharesource=weibo&title=${ftit}&pic=${lk}&appkey=2706825840`
        );
      }
      //qq好友接口的传参
      if (stype == "qq") {
        window.open(
          `http://connect.qq.com/widget/shareqq/index.html?url=${linkVal}?sharesource=qzone&title=${ftit}&pics=${lk}&summary=${introduce}`
        );
      }
      //生成二维码给微信扫描分享，php生成，也可以用jquery.qrcode.js插件实现二维码生成
      if (stype == "wechat") {
        window.open(`http://zixuephp.net/inc/qrcode_img.php?url=${linkVal}`);
      }
    },

    // 点赞评论
    dzan(id) {
      this._addCommentLikes(id);
    },
    // 取消点赞评论
    cancelDzan(id) {
      this._cancelCommentLikes(id);
    },

    // 点赞评论
    async _addCommentLikes(id) {
      const res = await addCommentLikes(id);
      if (res.code === "1") {
        this._getCommentList();
      }
    },

    // 取消点赞评论
    async _cancelCommentLikes(id) {
      const res = await cancelCommentLikes(id);
      if (res.code === "1") {
        this._getCommentList();
      }
    },
    hfdzan(id) {
      this._addReplyLikes(id);
    },
    hfcancelDzan(id) {
      this._cancelReplyLikes(id);
    },
    hfcai(id) {
      this._treadReply(id);
    },
    hfcancelCai(id) {
      this._cancelTreadReply(id);
    },
    // 点赞回复
    async _addReplyLikes(id) {
      const res = await addReplyLikes(id);
      if (res.code === "1") {
        this._getCommentList();
      }
    },

    // 取消点赞回复
    async _cancelReplyLikes(id) {
      const res = await cancelReplyLikes(id);
      if (res.code === "1") {
        this._getCommentList();
      }
    },

    // 踩回复
    async _treadReply(id) {
      const res = await treadReply(id);
      if (res.code === "1") {
        this._getCommentList();
      }
    },

    // 取消踩回复
    async _cancelTreadReply(id) {
      const res = await cancelTreadReply(id);
      if (res.code === "1") {
        this._getCommentList();
      }
    },

    // 踩评论
    cai(id) {
      this._treadComment(id);
    },
    // 取消踩评论
    cancelCai(id) {
      this._cancelTreadComment(id);
    },

    // 踩评论
    async _treadComment(id) {
      const res = await treadComment(id);
      if (res.code === "1") {
        this._getCommentList();
      }
    },
    // 取消踩评论
    async _cancelTreadComment(id) {
      const res = await cancelTreadComment(id);
      if (res.code === "1") {
        this._getCommentList();
      }
    },

    descInput() {
      var txtVal = this.comment.length;
      this.remnant = txtVal;
    },

    changeFoldState(index) {
      this.$set(this.videoCommentList, index, {
        ...this.videoCommentList[index],
        brandFold: !this.videoCommentList[index].brandFold
      });
    },

    replyInput(index) {
      if (this.lock === true) {
        this.replyInputId = index;
        this.replySecondId = false;
        this.lock = false;
        return;
      }

      if (this.lock === false) {
        this.replyInputId = false;
        this.lock = true;
        return;
      }
    },
    complain() {
      this.complains = 1;
    },

    complain1(id) {
      this.plId = id;
      this.complains1 = 1;
    },

    tsBox(id, hfId) {
      this.hfId = hfId;
      this.complains2 = 1;
    },

    dlt() {
      this.complains = 0;
      this.complains1 = 0;
      this.complains2 = 0;
    },

    tsInput() {
      var _txtVal = this.comment1.length;
      this.remnant1 = _txtVal;
    },
    checkedNames1(id) {
      this.checkedNames = id;
    },

    // 视频投诉
    submitTs(id, type) {
      var checkedNames = this.checkedNames;
      var comment = this.comment1;
      this._report(id, type, comment, checkedNames);
    },

    // 评论投诉
    submitTs1(type) {
      var id = this.plId;
      var checkedNames = this.checkedNames;
      var comment = this.comment1;
      this._report(id, type, comment, checkedNames);
    },

    // 回复投诉
    submitTs2(type) {
      var id = this.hfId;
      var checkedNames = this.checkedNames;
      var comment = this.comment1;
      this._report(id, type, comment, checkedNames);
    },

    // 投诉举报
    async _report(id, type, comment, checkedNames) {
      const res = await report(id, type, comment, checkedNames);
      if (res.code === "1") {
        this.jbcgId = true;
        this.complains = 0;
        this.complains1 = 0;
        this.complains2 = 0;
        setTimeout(() => {
          this.jbcgId = false;
        }, 2000);
      } else if (res.code === "2") {
        this.cfjbId = true;
        this.complains = 0;
        this.complains1 = 0;
        this.complains2 = 0;
        setTimeout(() => {
          this.cfjbId = false;
        }, 2000);
      }
    },

    // 举报类型
    async _reportRules() {
      const res = await reportRules();
      this.rules = res.data;
    },

    toMine(id) {
      var userId = Cookies.get("userId");
      if (id == userId) {
        this.$router.push(`/personalCenter?userId=${id}&type=message`);
      } else {
        this.$router.push(`/perHome?userId=${id}&type=message`);
      }
    },
    // 关注自己 关闭按钮
    cancelf() {
      this.dontId = false;
    },
    loveVideo() {
      this._likeVideo(this.videoId);
    },
    cancellove() {
      this._cancelLikeVideo(this.videoId);
    },
    collect() {
      this._collectVideo(this.videoId);
    },
    cancelcollect() {
      this._cancelCollectVideo(this.videoId);
    },
    // 关注列表用户说
    fUser(id) {
      this._followUser(id);
    },
    // 取消关注列表用户说
    cancelfUser(id) {
      this._cancelFollow(id);
    },

    // 确定回复
    sureReply(id) {
      var replyId = "";
      var replyContent = this.replyContent;
      this._addReply(id, replyId, replyContent);
    },

    // 二级确定回复
    sureSecondReply(id, replyId, replySecondContent) {
      this._addReply(id, replyId, replySecondContent);
    },

    //  视频详情
    async _vedioInfo(id) {
      const res = await vedioInfo(id);

      this.avatar = Cookies.get("avatar");

      this.list = res.data || { video_src: "" };
      this.playerOptions.sources = [
        {
          type: "video/mp4",
          src: res.data.video_src
        }
      ];
      // this.$refs.video.src = res.data.video_src || "";
      this.followId = res.data.isFollow;
      this.userId = res.data.user_id;
      this.isLike = res.data.is_like;
      this.isCollect = res.data.is_collect;
      this.videoName = res.data.name;
      this.introduce = res.data.describe;
    },

    //  关注用户
    async _followUser(id) {
      const res = await followUser(id);
      if (res.code === "1") {
        this.followId = 1;
        this._getCommentList();
      } else if (res.code === "-1") {
        this.$router.push({
          path: "/login"
        });
      } else if (res.code === "12") {
        this.dontId = true;
      }
    },

    //  取消关注
    async _cancelFollow(id) {
      const res = await cancelFollow(id);
      if (res.code === "1") {
        this.followId = 0;
        this._getCommentList();
      }
    },

    // 添加评论
    async _addVideoComment() {
      const res = await addVideoComment(this.list.id, this.comment);
      this._getCommentList(this.videoId);
      if (res.code === "-1") {
        this.$router.push({
          path: "/login"
        });
      }
    },

    // 回复
    async _addReply(id, replyId, replyContent) {
      const res = await addReply(id, replyId, replyContent);
      if (res.code === "1") {
        this._getCommentList();
      }
    },

    // 获取评论列表
    async _getCommentList(limit, page) {
      const res = await commentList(limit, page, this.videoId);
      this.videoCommentList = res.data;
      this.total = res.count;
      this.allTotal = res.totalpage;
    },

    // 分页
    handleCurrentChange(currentPage) {
      const params = this.$route.query;
      const newParams = Object.assign({}, params, {
        page: currentPage
      });
      this.$router.push({
        path: "/play",
        query: newParams
      });
      var limit = 12;
      var page = this.currentPage;
      this._getCommentList(limit, page);
    },

    // 点赞视频
    async _likeVideo() {
      const res = await likeVideo(this.videoId);
      if (res.code === "1") {
        this._vedioInfo(this.videoId);
      } else if (res.code === "-1") {
        this.$router.push({
          path: "/login"
        });
      }
    },

    // 取消点赞视频
    async _cancelLikeVideo() {
      const res = await cancelLikeVideo(this.videoId);
      if (res.code === "1") {
        this._vedioInfo(this.videoId);
      }
    },

    // 收藏视频
    async _collectVideo() {
      const res = await collectVideo(this.videoId);
      if (res.code === "1") {
        this._vedioInfo(this.videoId);
      } else if (res.code === "-1") {
        this.$router.push({
          path: "/login"
        });
      }
    },

    // 取消收藏视频
    async _cancelCollectVideo() {
      const res = await cancelCollectVideo(this.videoId);
      if (res.code === "1") {
        this._vedioInfo(this.videoId);
      }
    },
    onPlayerPlay() {},
    onPlayerPause() {},
    follow() {
      this._followUser(this.userId);
    },
    following() {
      this._cancelFollow(this.userId);
    },

    times(t) {
      let sec = parseInt(t) % 60;
      let minute = parseInt(t / 60) % 60;
      let hour = parseInt(t / 360) % 24;
      if (sec < 10) {
        sec = "0" + sec;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (hour > 0) {
        return (t = hour + ":" + minute + ":" + sec);
      } else if (minute > 0) {
        return (t = minute + ":" + sec);
      } else {
        return (t = "00:" + sec);
      }
    },
    staPlay() {
      if (this.startPlay) {
        this.startPlay = !this.startPlay;
        this.$refs.video.play();
        // this.interval = setInterval(() => {
        //   let cont = this.$refs.video.duration;
        //   let now = this.$refs.video.currentTime;
        //   this.totalTime = this.times(cont);
        //   this.nowTime = this.times(now);
        //   this.w = (now / cont) * 100 + "%";
        //   this.lft = (now / cont) * 100 - 0.7 + "%";
        //   // console.log('总时长：', this.times(cont) )
        //   // console.log('现在时间：', this.times(now) )
        //   if (now / cont == 1) {
        //     clearInterval(this.interval);
        //     this.startPlay = !this.startPlay;
        //   }
        //   console.log("视频总时长", cont, now, now / cont);
        // }, 1000);
      } else {
        this.startPlay = !this.startPlay;
        this.$refs.video.pause();
        // console.log(22222, this.$refs.video.currentTime);
        clearInterval(this.interval);
      }
    },
    // 720p
    ProgsFn() {
      this.Progs = !this.Progs;
    },
    // 全屏
    full() {
      this.$refs.video.webkitRequestFullScreen();
    },
    // 点击拖拽圆点
    drags() {
      this.move = 1;
    },
    // 鼠标移动事件
    drag(e) {
      if (this.move == 1) {
        console.log("100", e);

        let width = this.$refs.progress.offsetWidth; //div 的宽度
        let left = e.layerX; // 鼠标相对div的距离
        console.log("ydydydydyddyyd", width, left, e, this.$refs.progress);
      } else {
        return false;
      }
    },
    // 取消鼠标移动事件
    clearMove() {
      this.move = 2;
    },
    // 点击到对应的时间点
    tiemClick() {
      // this.move = 2;
      // let width = $event.target.offsetWidth; //div 的宽度
      // let left = $event.offsetX; // 鼠标相对div的距离
      // // let a = $event.clientX;  // 鼠标相对可视窗口的距离
      // this.$refs.video.currentTime = (left / width) * this.cont;
      // this.w = (left / width) * 100 + "%";
      // this.lft = (left / width) * 100 - 0.7 + "%";
      // this.nowTime = this.times((left / width) * this.cont);
      // console.log(22222222222222,width,left,this.cont);
    },
    // 鼠标悬浮
    block(n) {
      if (n == 1) {
        this.blocks = "inline-block";
      } else {
        this.blocks = "none";
      }
    }
  },
  mounted() {
    // console.log("当前播放位置", this.$refs.video.currentTime);
    // console.log("声音的大小", this.$refs.video.volume);
  },
  components: {
    videoPlayer,
    videoComment
  }
};
</script>
<style lang="less" scoped>
.jbcg {
  position: fixed;
  top: 50%;
  margin-top: -50px;
  left: 50%;
  margin-left: -75px;
  width: 150px;
  height: 100px;
  background: #666;
  color: #fff;
  line-height: 100px;
  text-align: center;
  border-radius: 5px;
  z-index: 9999;
}
.pointer {
  cursor: pointer;
}
.content {
  position: relative;
  width: 1200px;
  height: auto;
  margin: 0 auto;
  .videoplay {
    position: relative;
  }

  .title {
    height: 100px;
    width: auto;
    .tit-left {
      float: left;
      margin-top: 20px;
      text-align: left;
    }
    .bt {
      font-size: 18px;
    }
    .timer {
      margin-top: 10px;
      font-size: 12px;
    }
    .tit-right {
      float: right;
      margin-top: 5px;
      .imgT {
        width: 60px;
        height: 60px;
        display: inline-block;
        margin-top: 10px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50px;
          margin-top: 10px;
          float: left;
          cursor: pointer;
        }
      }
      .adds {
        height: auto;
        display: inline-block;
        margin-top: 10px;
        margin-left: 15px;
      }
      .following {
        background: #ccc;
      }
      .names {
        font-size: 14px;
        margin-bottom: 0;
        text-align: left;
      }
      p {
        margin: 0;
        padding: 0;
      }
      button {
        width: 103px;
        height: 26px;
        background: #ff4a9c;
        color: #fff;
        line-height: 26px;
        text-align: center;
        border: 0;
        outline: none;
        cursor: pointer;
        font-size: 14px;
        margin-top: 15px;
      }
    }
  }
  .videos {
    width: 1200px;
    height: 676px;
    position: relative;
    /deep/ .vjs-big-play-button {
      margin-left: 50%;
      margin-top: 25%;
    }
    &:hover .control {
      display: block;
    }
    video {
      display: inline-block;
      width: 100%;
      height: 676px;
      background: #000;
    }
    .control {
      display: block;
      height: 64px;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 0px;
      left: 0;
      border-top: 2px solid #fff;
      .circle {
        display: block;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #ff1268;
        position: absolute;
        top: -8px;
        left: 7.7%;
        z-index: 99;
        cursor: pointer;
        &:hover ~ .progressWhite {
          height: 8px;
          top: -5px;
        }
        &:hover ~ .progressRed {
          height: 8px;
          top: -5px;
        }
        &:hover {
          display: block !important;
        }
        &:hover ~ .progressHover {
          height: 13px;
          top: -8px;
          height: 8px;
          top: -5px;
        }
      }
      .progressHover {
        height: 2px;
        width: 100%;
        background: rgba(221, 214, 214, 0);
        position: absolute;
        top: -2px;
        left: 0;
        z-index: 10;
        cursor: pointer;
        &:hover {
          height: 13px;
          top: -8px;
          height: 8px;
          top: -5px;
        }
        &:hover ~ .progressWhite {
          height: 8px;
          top: -5px;
        }
        &:hover ~ .progressRed {
          height: 8px;
          top: -5px;
        }
      }
      .progressWhite {
        height: 2px;
        width: 100%;
        background: #fff;
        position: absolute;
        top: -2px;
        left: 0;
        z-index: 9;
        cursor: pointer;
        &:hover {
          height: 8px;
          top: -5px;
        }
        &:hover + .progressRed {
          height: 8px;
          top: -5px;
        }
      }
      .progressRed {
        height: 2px;
        width: 50%;
        background: #ff1268;
        position: absolute;
        top: -2px;
        left: 0;
        z-index: 9;
        cursor: pointer;
        &:hover {
          height: 8px;
          top: -5px;
        }
        &:hover ~ .progressWhite {
          height: 8px;
          top: -5px;
        }
      }
      .startPlay {
        width: auto;
        height: auto;
        float: left;
        margin-top: 12px;
        margin-left: 30px;
        img {
          width: 28px;
          height: 37px;
        }
      }
      .playTime {
        font-size: 14px;
        color: #e5e5e5;
        margin-left: 30px;
        float: left;
        height: 64px;
        width: 200px;
        text-align: center;
        line-height: 64px;
      }
      .P720 {
        float: right;
        height: 35px;
        width: 107px;
        background: #0202024d;
        color: #fff;
        font-size: 16px;
        line-height: 35px;
        text-align: center;
        margin-right: 76px;
        margin-top: 12px;
        position: relative;
        .Progressive {
          position: absolute;
          top: -125px;
          left: 0;
          width: 107px;
          height: 118px;
          p {
            margin: 0;
            padding: 0;
            width: 107px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            background: rgba(2, 2, 2, 0.9);
            font-size: 12px;
            color: #fff;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          }
        }
      }
      .volume {
        height: 64px;
        width: 50px;
        float: right;
        line-height: 64px;
        text-align: center;
        margin-right: 57px;
        img {
          height: 30px;
          width: 29px;
        }
      }
      .full {
        height: 64px;
        width: 50px;
        float: right;
        line-height: 64px;
        text-align: center;
        margin-right: 51px;
        cursor: pointer;
        img {
          height: 25px;
          width: 25px;
        }
      }
    }
  }
  .fenx {
    position: absolute;
    left: 50%;
    margin-left: -157px;
    box-shadow: 5px 5px 5px #ccc;
    padding-top: 15px;
    padding-left: 20px;
    width: 315px;
    height: 90px;
    display: flex;
    img {
      margin-right: 15px;
      margin-top: 20px;
      cursor: pointer;
    }
  }
  .share {
    width: 1200px;
    height: 74px;
    box-shadow: 10px 10px 10px #e0e0e0;
    p {
      margin: 0;
      padding: 0;
      margin-top: 25px;
    }
    .seeLove {
      padding-left: 15px;
      width: 500px;
      height: auto;
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      float: left;
      p {
        img {
          width: 35px;
          height: 35px;
          margin-right: 15px;
          cursor: pointer;
        }
      }
      .first {
        img {
          width: 35px;
          height: 28px;
          cursor: auto;
        }
      }
    }
    .comp {
      float: right;
      margin-right: 30px;
      p {
        margin: 0;
        padding: 0;
        margin-top: 30px;
        font-size: 14px;
        cursor: pointer;
        img {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
  .videoIntrdon {
    width: 100%;
    height: 280px;
    margin-top: 60px;
    .videoTit {
      font-size: 16px;
      color: #e15689;
      font-weight: bold;
      text-align: left;
    }
    .videoCont {
      width: auto;
      height: 137px;
      line-height: 25px;
      border: 1px solid #b3b3b3;
      padding: 16px;
      font-size: 14px;
      text-align: left;
      margin-top: 28px;
      border-radius: 5px;
      overflow-y: auto;
    }
    .videoLabel {
      width: 100%;
      height: 50px;
      margin-top: 15px;
      .bq {
        float: left;
        width: auto;
        height: 26px;
        border: 1px solid #e15689;
        border-radius: 4px;
        font-size: 14px;
        line-height: 26px;
        text-align: center;
        padding-left: 10px;
        padding-right: 10px;
        margin-right: 17px;
        color: #e15689;
      }
    }
  }
}
.dont {
  z-index: 1000;
  position: fixed;
  left: 50%;
  margin-left: -70px;
  top: 50%;
  margin-top: -50px;
  width: 180px;
  height: 100px;
  background-color: rgb(230, 70, 154);
  color: #fff;
  border-radius: 5px;
  line-height: 50px;
  i {
    position: absolute;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  p {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.comment {
  width: 100%;
  height: auto;
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .preComment {
    width: 100%;
    height: auto;
    margin-top: 50px;
    .comment-tit {
      height: 70px;
      width: 100%;
      .headImg {
        width: 70px;
        height: 70px;
        float: left;
        cursor: pointer;
        img {
          display: inline-block;
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .headname {
        height: 70px;
        width: 200px;
        font-size: 16px;
        color: #383838;
        line-height: 70px;
        float: left;
        margin-left: 30px;
        text-align: left;
      }
      .headnumber {
        height: 70px;
        width: auto;
        font-size: 14px;
        color: #707070;
        line-height: 80px;
        float: right;
      }
    }
    .sayIdea {
      width: 100%;
      height: 150px;
      margin-top: 20px;
      overflow: hidden;
      textarea {
        width: 98%;
        height: 120px;
        resize: none;
        outline: none;
        padding: 10px;
        font-size: 16px;
        border: 2px solid #d2d2d2;
        box-shadow: inset 0px 0px 10px #ccc;
        border-radius: 5px;
      }
    }
    .sedComment {
      height: 93px;
      width: 100%;
      button {
        cursor: pointer;
        width: 144px;
        height: 50px;
        background: #ff4a9c;
        color: #fff;
        font-size: 16px;
        line-height: 50px;
        text-align: center;
        float: right;
        border: 0;
        outline: none;
        border-radius: 5px;
      }
    }
  }
  .allComment {
    width: 1200px;
    height: auto;
    .allComment-tit {
      height: 41px;
      width: 100%;
      font-size: 18px;
      font-weight: bold;
      color: #e6469a;
      text-align: left;
      line-height: 41px;
      border-bottom: 1px solid #595959;
      margin-top: -18px;
    }
    .gap {
      padding-top: 180px;
      padding-bottom: 280px;
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
    .list {
      margin-top: 24px;
      .lists {
        width: 100%;
        height: auto;
        padding-top: 38px;
        padding-bottom: 27px;
        border-bottom: 1px solid #bebebe;
        overflow: hidden;
      }
      .reply {
        position: relative;
        display: flex;
        .name {
          position: absolute;
          top: 50%;
          margin-top: -25px;
          margin-right: 10px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        textarea {
          width: 550px;
          height: 70px;
          border: 1px solid #ff4a9c;
          padding: 10px;
          border-radius: 5px;
          margin-left: 60px;
        }
        .sure {
          width: 70px;
          height: 70px;
          background-color: #ff4a9c;
          line-height: 70px;
          color: #fff;
          border-radius: 5px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .lists-con {
        width: 100%;
        height: auto;
        overflow: hidden;
        .comment-left {
          float: left;
          width: 70px;
          height: auto;
          text-align: center;
          img {
            display: inline-block;
            width: 70px;
            height: 70px;
            background: #ccc;
            border-radius: 50%;
            margin: 0;
            cursor: pointer;
          }
          button {
            width: 66px;
            height: 25px;
            background: #ff4a9c;
            font-size: 12px;
            line-height: 25px;
            text-align: center;
            color: #fff;
            border: 0;
            outline: none;
            border-radius: 5px;
            margin: 0;
            margin-top: 10px;
            cursor: pointer;
          }
        }
        .comment-right {
          width: 800px;
          height: 150px;
          float: left;
          margin-left: 34px;
          .rig-name {
            font-size: 16px;
            text-align: left;
          }
          .rig-con {
            width: 800px;
            height: 50px;
            margin-top: 20px;
            // border: 1px solid blue;
            p {
              text-align: left;
              margin: 0;
              padding: 0;
              font-size: 14px;
              float: left;
              line-height: 25px;
              width: 800px;
              height: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          .rig-timer {
            font-size: 12px;
            text-align: left;
            // border: 1px solid red;
            margin-top: 18px;
            width: 100%;
            height: 22px;
            line-height: 22px;
            color: #a3a3a3;
            margin-left: 10px;
            .timer {
              float: left;
            }
            .icon {
              width: 500px;
              height: 22px;
              float: left;
              margin-left: 90px;
              .icons {
                width: 100px;
                height: 22px;
                float: left;
                vertical-align: middle;
              }
              img {
                width: 22px;
                height: 22px;
                float: left;
                cursor: pointer;
              }
              .numbe {
                width: 22px;
                height: 22px;
                line-height: 22px;
                margin-top: 2px;
                margin-left: 5px;
                float: left;
              }
            }
          }
        }
      }
      .sub {
        ul {
          width: 800px;
          height: auto;
          margin-left: 120px;
          li {
            overflow: hidden;
            margin-top: 20px;
            padding-bottom: 15px;
            .reply1 {
              position: relative;
              display: flex;
              height: 70px;
              margin-top: 110px;
              img {
                position: absolute;
                top: 50%;
                margin-top: -25px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
              }
              textarea {
                width: 550px;
                height: 70px;
                border: 1px solid #ff4a9c;
                padding: 10px;
                border-radius: 5px;
                margin-left: 60px;
              }
              .sure {
                width: 70px;
                height: 70px;
                background-color: #ff4a9c;
                line-height: 70px;
                color: #fff;
                border-radius: 5px;
                margin-left: 10px;
                cursor: pointer;
              }
            }
          }

          .sub-img {
            float: left;
            width: 40px;
            height: 40px;
            img {
              display: inline-block;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: #ccc;
              cursor: pointer;
            }
          }
          .sub-con {
            font-size: 14px;
            float: left;
            width: 720px;
            text-align: left;
            margin-left: 10px;
            margin-top: 10px;
            .nick {
              color: #000;
            }
            i {
              color: #ff4a9c;
              cursor: pointer;
            }
            p {
              display: inline-block;
              width: 700px;
              margin-top: 10px;
              margin-bottom: 10px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 12px;
              color: #000;
            }
            .sub-btom {
              font-size: 12px;
            }
            .sub-timer {
              float: left;
              color: #a3a3a3;
            }
            .sub-icon {
              float: left;
              margin-left: 30px;
              .sub-icons {
                display: inline-block;
                width: 80px;
              }
              img {
                width: 18px;
                height: 19px;
                display: inline-block;
                margin-right: 10px;
                cursor: pointer;
              }
            }
          }
        }
        .sub-more {
          width: 800px;
          height: auto;
          margin-left: 120px;
          font-size: 12px;
          text-align: left;
          margin-top: 20px;
          i {
            font-style: normal;
            color: #0099e5;
            cursor: pointer;
          }
        }
      }
    }
    .feny {
      padding: 50px 0px;
      /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #c08c93;
      }
      /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #84414b;
      }
    }
    .paging {
      width: 1200px;
      height: 114px;
      position: relative;
      ul {
        position: absolute;
        font-size: 15px;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: 22px;
        width: auto;
        display: inline-block;
        text-align: center;
        li {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 1px solid #838383;
          margin-left: 8px;
          line-height: 20px;
          text-align: 20px;
          cursor: pointer;
        }
        .pag-per {
          width: 60px;
        }
        .pag-next {
          width: 60px;
        }
      }
    }
  }
}
footer {
  width: 100%;
  height: 250px;
  background: #ccc;
  color: red;
  text-align: center;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 99;
}
.jbBox {
  width: 654px;
  height: 564px;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -282px;
  margin-left: -327px;
  background: #fff;
  z-index: 99;
  .jb-tit {
    font-size: 20px;
    color: #303030;
    height: 59px;
    width: 100%;
    border-bottom: 1px solid #cccccc;
    line-height: 59px;
    i {
      display: inline-block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid #ccc;
      color: #ccc;
      font-size: 12px;
      font-style: normal;
      line-height: 16px;
      text-align: center;
      position: absolute;
      top: 15px;
      right: 20px;
      cursor: pointer;
    }
  }
  .jb-con {
    text-align: left;
    margin-left: 61px;
    margin-top: 40px;
    div {
      height: 50px;
      input {
        margin-right: 15px;
      }
    }
    p {
      margin-bottom: 44px;
    }
    em {
      float: left;
      width: 20px;
      height: 20px;
      border: 1px solid #d8d8d8;
      margin-right: 7px;
    }
  }
  .jb-dirct {
    margin-left: 71px;
    font-size: 12px;
    text-align: left;
    position: relative;
    p {
      margin-bottom: 10px;
    }
    textarea {
      width: 500px;
      height: 80px;
      border: 1px solid #d8d8d8;
      padding: 15px;
    }
    .number {
      color: #606060;
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      right: 100px;
      margin-bottom: 5px;
    }
  }
  .submit {
    width: 100%;
    height: 50px;
    // border: 1px solid red;

    button {
      width: 150px;
      height: 40px;
      border-radius: 5px;
      background: #ff4a9c;
      color: #fcfcfc;
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      outline: none;
      border: 0px;
      margin-top: 30px;
      cursor: pointer;
    }
  }
}
</style>
