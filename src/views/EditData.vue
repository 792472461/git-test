<template>
  <div>
    <Header></Header>
    <div class="c">
      <div class="barnar">
        <ul>
          <li
            :class="{ lis: type == 'accountSetting' }"
            @click="set('accountSetting')"
          >
            账号设置
          </li>
          <li
            :class="{ lis: type == 'accountSecurity' }"
            @click="set('accountSecurity')"
          >
            账号安全
          </li>
        </ul>
      </div>
      <div v-show="type == 'accountSetting'">
        <div class="xgSuc" v-show="curId">修改成功</div>
        <div class="approve area">
          <p>
            <img
              class="headimg"
              :src="msg.avatar"
              @click="$router.push(`/modifyAvatar`)"
            />
          </p>
          <p>
            <span>昵称：</span>
            <input class="name" type="text" v-model="nickname" />
          </p>
          <p>
            <span>性别：</span>
            <input
              type="radio"
              v-model="picked"
              value="1"
              name="sex"
              id="man"
            /><label for="man" class="boy">男</label>
            <input
              type="radio"
              v-model="picked"
              value="0"
              name="sex"
              id="woman"
            /><label for="woman" class="girl">女</label>
          </p>
          <p>
            <span>生日：</span>
            <input type="date" v-model="birthday" />
          </p>
          <p>
            <span class="intro">简介：</span>
            <textarea v-model="score"></textarea>
          </p>
          <!-- <div class="bqtitb">
            <div class="bqtit">标签：</div>
            <div class="bq-box">
              <div class="bq">
                <input
                  v-model="tag"
                  type="text"
                  placeholder="创建个人专属标签（最多四个）"
                /><span @click="sureOk">确定</span>
              </div>
              <div class="box">
                <span v-for="(item, index) in arr" :key="index"
                  >{{ item }}<i @click="close(index)">x</i></span
                >
              </div>
            </div>
          </div> -->
          <p>
            <button @click="sure">确认修改</button>
          </p>
        </div>
      </div>
      <div v-if="type == 'accountSecurity'">
        <div class="accountSer">
          <div class="section">
            <div class="set-left">
              <img
                v-show="phoneState == 0"
                src="@/assets/images/home/grayPhone.png"
              />
              <img
                v-show="phoneState == 1"
                src="~@/assets/images/home/phone1.png"
              />
              <span>我的手机</span>
            </div>
            <div class="set-right">
              <p>绑定手机后即可使用手机号登陆</p>
              <p class="bind">
                <span
                  @click="status.is_mobile == 1 ? Phone() : changePhone(1)"
                  :class="status.is_mobile == 1 ? 'binding2' : 'binding1'"
                  >{{ status.is_mobile == 1 ? "已绑定" : "去绑定" }}</span
                >
                <span
                  v-show="status.is_mobile == 1"
                  @click="changePhone(2)"
                  class="binding3"
                  >更改绑定手机 &gt;</span
                >
              </p>
            </div>
          </div>
          <div class="section">
            <div class="set-left">
              <img
                v-show="emailState == 0"
                class="idcard"
                src="@/assets/images/home/grayEmail.png"
              />
              <img
                v-show="emailState == 1"
                class="idcard"
                src="@/assets/images/home/email1.png"
              />
              <span>我的邮箱</span>
            </div>
            <div class="set-right">
              <p>绑定邮箱后即可使用邮箱号登陆</p>
              <p class="bind">
                <span
                  @click="status.is_email == 1 ? Phone() : changePhone(3)"
                  :class="status.is_email == 1 ? 'binding2' : 'binding1'"
                  >{{ status.is_email == 1 ? "已绑定" : "去绑定" }}
                </span>
                <span
                  v-show="status.is_email == 1"
                  @click="changePhone(4)"
                  class="binding3"
                  >更改绑定邮箱 &gt;</span
                >
              </p>
            </div>
          </div>
          <div class="section">
            <div class="set-left">
              <img src="@/assets/images/home/lock1.png" />
              <span>修改密码</span>
            </div>
            <div class="set-right">
              <p>可修改账号密码</p>
              <p class="bind">
                <span class="binding1" @click="changePhone(5)">去设置</span>
              </p>
            </div>
          </div>
          <div class="section">
            <div class="set-left">
              <img
                v-show="realnameState == 0"
                class="idcard"
                src="@/assets/images/home/grayIdCard.png"
              />
              <img
                v-show="realnameState == 1"
                class="idcard"
                src="@/assets/images/home/card1.png"
              />
              <span>实名认证</span>
            </div>
            <div class="set-right">
              <p>实名认证成功后，可享受+V标识及上传视频功能</p>
              <p class="bind">
                <span
                  @click="changePhone(6)"
                  :class="status.is_verify == 1 ? 'binding2' : 'binding1'"
                  >{{ status.is_verify == 1 ? "已认证" : "去认证" }}
                </span>
              </p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
    <Footer>
      暂无页角
    </Footer>
  </div>
</template>
<script>
import { accountSet, updateUserInfo, accounStatus } from "../api/home.js";
import Footer from "../components/footer";
export default {
  data() {
    return {
      tag: "",
      arr: [],
      status: {},
      type: this.$route.query.type,
      curId: false,
      nickname: "",
      birthday: "",
      score: "",
      picked: "",
      msg: {},
      target: 1,
      // 是否绑定手机 邮箱 实名的状态 0 否 1 已绑定
      phoneState: 1,
      emailState: 0,
      realnameState: 1
    };
  },
  components: {
    Footer
  },
  methods: {
    Phone() {
      return
    },

    sureOk() {
      if (this.arr.length < 4 && this.arr.indexOf(this.tag) == "-1") {
        this.arr.push(this.tag);
      }
    },

    close(index) {
      this.arr.splice(index, 1);
    },

    set(tag) {
      this.type = tag;
      this.$router.replace("/editData?type=" + tag);
    },
    // 账号安全状态
    async _accounStatus() {
      const res = await accounStatus();
      this.status = res.data;
    },
    //  账号设置个人资料详情
    async _accountSet() {
      const res = await accountSet();
      this.msg = res.data;
      this.picked = res.data.gender;
      this.birthday = res.data.birthday;
      this.score = res.data.score;
      this.nickname = res.data.nickname;
    },

    //  编辑用户个人资料
    async _updateUserInfo() {
      const res = await updateUserInfo(
        this.nickname,
        this.picked,
        this.birthday,
        this.score
      );
      if (res.code === "1") {
        this.curId = true;
        setTimeout(() => {
          this.curId = false;
        }, 2000);
      }
    },

    sure() {
      this._updateUserInfo(
        this.nickname,
        this.picked,
        this.birthday,
        this.score
      );
    },

    search() {
      this.$router.push({
        path: "/search",
        query: {
          name: 11111
        }
      });
    },

    changePhone(i) {
      // 绑定手机
      if (i == 1) {
        this.$router.push({
          path: "/slectWay",
          query: {
            mode: "bindPhone",
            state: "toBindPhone"
          }
        });
      }
      // 改绑手机
      if (i == 2) {
        this.$router.push({
          path: "/slectWay",
          query: {
            mode: "bindPhone",
            state: "bindingPhone"
          }
        });
      }
      // 绑定邮箱
      if (i == 3) {
        this.$router.push({
          path: "/slectWay",
          query: {
            mode: "bindEmail",
            state: "toBindEmail"
          }
        });
      }
      // 改绑邮箱
      if (i == 4) {
        this.$router.push({
          path: "/slectWay",
          query: {
            mode: "bindEmail",
            state: "bindingEmail"
          }
        });
      }
      // 重置密码
      if (i == 5) {
        this.$router.push({
          path: "/resetPassword",
          query: {
            name: "resetPassword"
          }
        });
      }
      // 实名认证
      if (i == 6) {
        this.$router.push({
          path: "/certification",
          query: {
            name: "certification"
          }
        });
      }
      // if (i == 1) {
      //   this.$router.push({
      //     path: "/slectWay",
      //     query: {
      //       name: 2,
      //       state: that.phoneState
      //     }
      //   });
      // } else if (i == 2) {
      //   this.$router.push({
      //     path: "/slectWay",
      //     query: {
      //       name: 1,
      //       state: that.emailState
      //     }
      //   });
      // } else if (i == 3) {
      //   this.$router.push({
      //     path: "/resetPassword",
      //     query: {
      //       name: 3
      //     }
      //   });
      // } else if (i == 4) {
      //   this.$router.push({
      //     path: "/certification",
      //     query: {
      //       name: 4
      //     }
      //   });
      // } else if (i == 5) {
      //   this.$router.push({
      //     path: "/slectWay",
      //     query: {
      //       name: 1,
      //       state: 1
      //     }
      //   });
      // } else if (i == 6) {
      //   this.$router.push({
      //     path: "/slectWay",
      //     query: {
      //       name: 2,
      //       state: 3
      //     }
      //   });
      // } else if (i == 7) {
      //   this.$router.push({
      //     path: "/slectWay",
      //     query: {
      //       name: 2,
      //       state: 1
      //     }
      //   });
      // }
    }
  },
  created() {
    this._accountSet();
    this._accounStatus();
  }
};
</script>
<style lang="less" scoped>
.c {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  margin-top: 12px;
  overflow: hidden;
}
.barnar {
  float: left;
  margin-top: 70px;
  width: 177px;
  height: 950px;
  background: #f7f7f7;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      width: 177px;
      height: 65px;
      line-height: 65px;
      background: #f7f7f7;
      color: #000;
      font-size: 16px;
      color: #666666;
      text-align: center;
      cursor: pointer;
    }
    li:hover {
      background: #bc8686;
      color: #fff;
    }
    .lis {
      color: #fff;
      background: #bc8686;
    }
  }
}
.xgSuc {
  position: absolute;
  left: 50%;
  margin-left: -75px;
  top: 50%;
  margin-top: -50px;
  width: 150px;
  height: 100px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  line-height: 100px;
  border-radius: 5px;
  z-index: 999;
}
.approve {
  width: auto;
  height: 950px;
  margin: 0 auto;
  text-align: left;
  overflow: hidden;
  margin-top: 102px;
  padding-left: 60px;
  .bqtitb {
    display: flex;
    margin-left: 90px;
    .bq-box {
      width: 400px;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 6px;
      margin-left: 5px;
      .bq {
        display: flex;
        input {
          height: 40px;
          width: 300px;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding-left: 15px;
        }

        input::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          color: #787878;
        }
        :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #787878;
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #787878;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #787878;
        }
        input::-ms-input-placeholder {
          /* Microsoft Edge */
          color: #787878;
        }
        span {
          margin-left: 20px;
          display: block;
          width: 100px;
          height: 40px;
          background-color: #ff4a9c;
          color: #fff;
          border-radius: 5px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
        }
      }
      .box {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 6px;
        margin-top: 18px;
        padding: 20px;
        overflow: hidden;
        span {
          padding: 0 15px;
          display: block;
          float: left;
          height: 30px;
          line-height: 30px;
          background: #ff4a9c;
          color: #fff;
          text-align: center;
          border-radius: 5px;
          margin: 5px;
          i {
            float: right;
            display: block;
            width: 20px;
            height: 20px;
            background: #fff8f8;
            color: #ff4a9c;
            line-height: 20px;
            border-radius: 50%;
            text-align: center;
            margin-left: 10px;
            margin-top: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }

  p {
    margin: 0;
    padding: 0;
    padding-left: 20%;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 16px;
    position: relative;

    img {
      margin-left: -100px;
    }
    span {
      margin-left: -100px;
    }
    input,
    button {
      border: 1px solid #c8c8c8;
      border-radius: 4px;
      outline: none;
      padding-left: 10px;
    }
    button {
      width: 100px;
      height: 40px;
      color: #fff;
      background: #ff4a9c;
      text-align: center;
      line-height: 40px;
      border: 0;
      border-radius: 4px;
      margin-top: 10px;
      margin-left: -52px;
      cursor: pointer;
    }
    .boy {
      margin-left: 5px;
      margin-right: 20px;
    }
    .girl {
      margin-left: 5px;
    }
  }
  .headimg {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    cursor: pointer;
  }

  .name {
    width: 120px;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
  }
  .intro {
    display: inline-block;
    height: 60px;
    width: auto;
    line-height: 60px;
    position: absolute;
    top: 16px;
  }
  textarea {
    resize: none;
    width: 300px;
    height: 65px;
    outline: none;
    margin-top: 20px;
    margin-left: -52px;
    padding: 10px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    font-family: ”Microsoft YaHei”;
    color: #787878;
  }
}
.accountSer {
  margin: 0 auto;
  margin-top: 140px;
  .section {
    width: 600px;
    height: auto;
    // margin: 0 auto;
    margin-top: 50px;
    margin-left: 350px;
    text-align: left;
    overflow: hidden;
    .set-left {
      width: 80px;
      height: auto;
      float: left;
      font-size: 20px;
      img {
        display: block;
        // border: 1px solid red;
        margin-left: 20px;
      }
      .idcard {
        margin-left: 10px;
        margin-top: 15px;
      }
      span {
        display: block;
        margin-top: 10px;
      }
    }
    .set-right {
      width: 350px;
      height: auto;
      float: left;
      margin-top: 16px;
      font-size: 20px;
      margin-left: 20px;
      p {
        margin: 0;
        padding: 0;
        width: 450px;
      }
      .bind {
        height: 36px;
        width: auto;
        margin-top: 10px;
      }
      .binding1 {
        display: inline-block;
        line-height: 30px;
        width: 75px;
        color: #fff;
        background: #ff4a9c;
        border-radius: 3px;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
        cursor: pointer;
      }
      .binding2 {
        display: inline-block;
        line-height: 30px;
        width: 75px;
        color: #fff;
        background: #ccc;
        border-radius: 3px;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
        cursor: pointer;
      }
      .binding3 {
        margin-left: 37px;
        font-size: 14px;
        color: #457fff;
        height: 20px;
        width: 100px;
        line-height: 20px;
        cursor: pointer;
      }
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
