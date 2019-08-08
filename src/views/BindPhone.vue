<template>
  <div>
    <Header></Header>
    <div class="content area">
      <div class="flow">
        <p>
          <img :src="redTick" />
          <span>验证身份</span>
        </p>
        <i></i>
        <p>
          <img :src="czmm" />
          <span>{{ arrs[0] }}</span>
        </p>
        <i></i>
        <p>
          <img :src="czok" />
          <span>{{ arrs[1] }}</span>
        </p>
      </div>
      <div class="confirm message" v-show="show == 1">
        <div>
          <p>
            <span>验证{{ name }}</span>
            <input
              type="text"
              v-model="yzsj"
              @blur="yz1($event)"
              :placeholder="'请输入已绑定的' + name + '号'"
            />
            <span class="ts" v-show="phoneHit1">请输入正确的{{ name }}号</span>
          </p>
          <p class="yzm">
            <span class="yzmleft">
              &nbsp;&nbsp;&nbsp;&nbsp;验证码&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <input
              class="yzm1"
              v-model="yzmId"
              @blur="yzm1($event)"
              type="text"
              :placeholder="'请输入六位' + name + '验证码'"
            />
            <span class="hit" v-show="yzmHit1">请输入正确的验证码</span>
            <em @click="sendCode()">{{ vCode }}</em>
            <span v-show="check" class="hit">验证码已发送，请注意查收</span>
          </p>
        </div>
        <div>
          <button class="next" @click="phoneOk()">下一步</button>
        </div>
      </div>
      <div class="confirm message" v-show="show == 2">
        <div>
          <p>
            <span>{{ arrs[0] }}</span>
            <input
              v-if="arrs[0] == '修改密码'"
              type="password"
              @blur="yz2($event, 1)"
              placeholder="请输入需要修改的密码"
            />
            <input
              v-else
              type="text"
              @blur="yz2($event)"
              :placeholder="'请输入' + arrs[0] + '号'"
            />
            <span class="ts" v-show="phoneHit2">请输入正确的手机号码</span>
            <span class="ts" v-show="phoneHit3">请输入正确的邮箱号码</span>
            <span class="ts" v-show="phoneHit4">请输入正确的密码格式</span>
          </p>
          <p v-if="arrs[0] == '修改密码'" class="yzm">
            <span>{{ arrs[0] }}</span>
            <input
              v-if="arrs[0] == '确认密码'"
              type="password"
              @blur="yz2($event, 3)"
              placeholder="请再次输入修改的密码"
            />
            <input
              v-else
              type="text"
              @blur="yz2($event)"
              :placeholder="'请输入' + arrs[0] + '号'"
            />
            <span class="ts" v-show="phoneHit2">请输入正确的手机号码</span>
            <span class="ts" v-show="phoneHit3">请输入正确的邮箱号码</span>
            <span class="ts" v-show="phoneHit5">两次填写的密码不相同</span>
          </p>
          <p v-else class="yzm">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;验证码&nbsp;&nbsp;</span>
            <input
              class="yzm1"
              @blur="yzm2"
              type="text"
              placeholder="请输入六位验证码"
            />
            <span class="ts" v-show="yzmHit2">请输入正确的验证码</span>
            <em @click="sendCode()">{{ vCode }}</em>
            <span v-show="check" class="hit">验证码已发送，请注意查收</span>
          </p>
        </div>
        <div>
          <button @click="changeOk()">下一步</button>
        </div>
      </div>
      <div class="confirm" v-show="show == 3">
        3S自动跳转登录页
        <button @click="callback()">返回</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import redTick from "@/assets/images/home/redTick.png";
import grayTick from "@/assets/images/home/grayTick.png";
import { bindEmail, sendEmail, checkCaptcha, sendCaptcha } from "../api/home.js";
import Footer from "../components/footer";
export default {
  data() {
    return {
      yzmId: "",
      name: "",
      names: 1,
      show: 1,
      vCode: "获取验证码",
      i: -1,
      check: 0,
      timer: null,
      redTick: redTick,
      grayTick: grayTick,
      czmm: grayTick,
      czok: grayTick,
      number: "",
      showNumber: "",
      phoneEmail: "",
      phoneEmailNumber: "",
      yzsj: "",
      arrs: [],
      // 验证身份
      phoneHit1: false,
      phoneState: null,
      yzmHit1: false,
      yzmState: null,

      phoneHit2: false,
      phoneHit3: false,
      phoneHit4: false,
      phoneHit5: false,
      phoneState2: null,
      yzmHit2: false,
      yzmState2: null,
      firstPasWord: "",
      secondPasWord: ""
    };
  },
  components: {
    Footer
  },
  methods: {
    yz1(e) {
      if (this.name == "手机") {
        let value = e.target.value;
        if (!/^1[34578]\d{9}$/.test(value)) {
          this.phoneHit1 = true;
          this.phoneState = 0;
        } else {
          this.phoneHit1 = false;
          this.phoneState = 1;
        }
      }
      if (this.name == "邮箱") {
        let value = e.target.value;
        if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
          this.phoneHit1 = true;
          this.phoneState = 0;
        } else {
          this.phoneHit1 = false;
          this.phoneState = 1;
        }
      }
    },
    yz2(e, index) {
      let i = this.arrs[0];
      if (i == "绑定手机" || i == "改绑手机") {
        let value = e.target.value;
        if (!/^1[34578]\d{9}$/.test(value)) {
          this.phoneHit2 = true;
          this.phoneState2 = 0;
        } else {
          this.phoneHit2 = false;
          this.phoneState2 = 1;
        }
      }
      if (i == "绑定邮箱" || i == "改绑邮箱") {
        let value = e.target.value;
        if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
          this.phoneHit3 = true;
          this.phoneState2 = 0;
        } else {
          this.phoneHit3 = false;
          this.phoneState2 = 1;
        }
      }
      if (i == "修改密码") {
        let value = e.target.value;
        if (index == 1) {
          this.firstPasWord = value;
          if (!/^(\d){6,12}$/.test(value)) {
            this.phoneHit4 = true;
            this.phoneState2 = 0;
          } else {
            this.phoneHit4 = false;
            this.phoneState2 = 1;
          }
        }
        if (!index) {
          this.secondPasWord = value;
          if (this.firstPasWord != value) {
            this.phoneHit5 = true;
            this.yzmState2 = 0;
          } else {
            this.phoneHit5 = false;
            this.yzmState2 = 1;
          }
        }
      }
    },
    yzm1(e) {
      let value = e.target.value;
      if (!/^\d{6}$/.test(value)) {
        this.yzmHit1 = true;
        this.check = 0;
        this.yzmState = 0;
      } else {
        this.yzmHit1 = false;
        this.yzmState = 1;
      }
    },
    yzm2(e) {
      let value = e.target.value;
      if (!/^\d{6}$/.test(value)) {
        this.yzmHit2 = true;
        this.check = 0;
        this.yzmState2 = 0;
      } else {
        this.yzmHit2 = false;
        this.yzmState2 = 1;
      }
    },
    accountSer() {
      this.$router.push({
        path: "editData",
        query: {
          name: 111
        }
      });
    },

    // 绑定邮箱
    async _bindEmail(email, captcha) {
      const res = await bindEmail(email, captcha);
      if (res.code === "5") {
        this.yzmHit1 = true;
      }
    },

    //  发送手机验证码
    async _sendCaptcha(type, mobile) {
      const res = await sendCaptcha(type, mobile);
      if (res.code == "1") {
        if (this.i == -1) {
          this.i = 60;
          this.timer = setInterval(this.setTime, 1000);
          this.vCode = this.i + "s";
          this.check = 1;
          this.yzmHit1 = false;
          this.yzmHit2 = false;
        } else {
          console.log(this.i + "秒后才可再次获取验证码");
        }
      }
    },

    // 发送邮箱验证码
    async _sendEmail(email, type) {
      const res = await sendEmail(email, type);
      if (res.code === "1") {
        if (this.i == -1) {
          this.i = 60;
          this.timer = setInterval(this.setTime, 1000);
          this.vCode = this.i + "s";
          this.check = 1;
          this.yzmHit1 = false;
          this.yzmHit2 = false;
        } else {
          console.log(this.i + "秒后才可再次获取验证码");
        }
      }
    },

    // 验证验证码
    async _checkCaptcha(account, captcha) {
      const res = await checkCaptcha(account, captcha);
      if (res.code === "1") {
        this.show = 2;
        this.vCode = 60 + "s";
        clearInterval(this.setTime);
      } else {
        this.yzmHit1 = true;
        this.check = 0;
      }
    },
    // 下一步
    phoneOk() {
      this._checkCaptcha(this.yzsj, this.yzmId);
      // 绑定邮箱
      // this.state = this.$route.query.state
      // var state = this.state.indexOf('绑定成功')
      // console.log(state, this.yzsj, this.yzmId)
      // if (state != -1 && this.yzsj != '' && this.yzmId != '') {
      //   this._bindEmail(this.yzsj, this.yzmId)
      // }

      // if (this.phoneState) {
      //   if (this.yzmState) {
      //     if (this.arrs[0] == '修改密码') {
      //       if (this.firstPasWord == this.secondPasWord) {
      //         this.show = 2
      //         this.czmm = this.redTick
      //       } else {
      //         this.phoneHit5 = true
      //       }
      //     } else {
      //       this.show = 2
      //       this.czmm = this.redTick
      //     }
      //   } else {
      //     this.yzmHit1 = true
      //   }
      // } else {
      //   this.phoneHit1 = true
      //   if (!this.yzmState) {
      //     this.yzmHit1 = true
      //   }
      // }
    },
    changeOk() {
      let i = this.arrs[0];
      if (this.phoneState2) {
        if (this.yzmState2) {
          if (this.arrs[0] == "修改密码") {
            if (this.firstPasWord == this.secondPasWord) {
              this.show = 3;
              this.czok = this.redTick;
            } else {
              this.phoneHit5 = true;
            }
          } else {
            this.show = 3;
            this.czok = this.redTick;
          }
        } else {
          if (i == "修改密码") {
            this.phoneHit5 = true;
          } else {
            this.yzmHit2 = true;
          }
        }
      } else {
        if (i == "绑定手机" || i == "改绑手机") {
          this.phoneHit2 = true;
        }
        if (i == "绑定邮箱" || i == "改绑邮箱") {
          this.phoneHit3 = true;
        }
        if (i == "修改密码") {
          this.phoneHit4 = true;
        }
        if (!this.yzmState2) {
          if (i == "修改密码") {
            this.phoneHit5 = true;
          } else {
            this.yzmHit2 = true;
          }
        }
      }
    },
    callback() {
      this.show = 1;
      this.czmm = this.grayTick;
      this.czok = this.grayTick;
      console.log("恭喜重置成功");
    },
    pre() {
      this.show = 1;
      this.czmm = this.grayTick;
    },
    setTime() {
      if (this.i == 0) {
        this.i--;
        window.clearInterval(this.timer);
        this.timer = null;
        this.vCode = "获取验证码";
        this.check = 0;
      } else {
        this.i--;
        this.vCode = this.i + "s";
      }
    },
    // 发送验证码
    sendCode() {
      this.state = this.$route.query.state;
      var state = this.state.indexOf("绑定成功");
      var state1 = this.state.indexOf("绑定邮箱");
      var state2 = this.state.indexOf("绑定手机");
      if (state != -1 && state1 != -1 && this.yzsj != "") {
        var type = 1;
        this._sendCaptcha(type, this.yzsj);
      } else if (state != -1 && state2 != -1 && this.yzsj != "") {
        var type1 = 1;
        this._sendEmail(this.yzsj, type1);
      }
    }
  },
  created() {
    // this.setTime();
  },
  mounted() {
    if (this.$route.query.names == "toBindPhone") {
      this.name = "邮箱";
    }
    if (this.$route.query.names == "bindingPhone") {
      this.name = "手机";
    }
    if (this.$route.query.names == "toBindEmail") {
      this.name = "手机";
    }
    if (this.$route.query.names == "bindingEmail") {
      this.name = "邮箱";
    }

    this.arrs = this.$route.query.state || [];
  }
};
</script>

<style lang="less" scoped>
.topBack {
  text-align: left;
  span {
    cursor: pointer;
  }
}
.title {
  width: 100%;
  height: 440x;
  background: #e5d0e2;
  .top {
    margin: 0 auto;
    height: 68px;
    width: 1200px;
    .logo {
      float: left;
      height: 36px;
      width: 135px;
      line-height: 36px;
      text-align: center;
      border: 1px solid red;
      margin-top: 15px;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
    }
    .ser-right {
      width: 500px;
      height: 50px;
      float: right;
      margin-top: 5px;
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
          height: 40px;
          background: #7c5d62;
          border-bottom-right-radius: 22px;
          border-top-right-radius: 22px;
          border: 0px;
          float: left;
          outline: none;
        }
        .bigGlass {
          position: absolute;
          right: 58px;
          bottom: 8px;
        }
      }
      .headImg {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #ccc;
        position: absolute;
        right: 60px;
        top: 10px;
      }
      .help {
        position: absolute;
        right: 0;
        top: 15px;
        font-size: 18px;
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
      height: 286px;
      background: rgb(216, 62, 255);
      padding: 0;
    }
  }
}
.content {
  height: 800px;
  width: 1200px;
  margin: 0 auto;
  font-size: 20px;
  .flow {
    margin-top: 100px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    p {
      width: 120px;
      height: 32px;
      margin: 0;
      margin-right: 30px;
      margin-left: 30px;
      display: flex;
      justify-content: center;
      img {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 5px;
      }
      span {
        display: inline-block;
        width: auto;
        height: 30px;
        line-height: 30px;
      }
    }
    i {
      width: 150px;
      height: 1px;
      background: #666666;
      margin: 0;
      margin-top: 16px;
    }
  }
  .confirm {
    margin-top: 100px;
    width: 100%;
    height: 190px;
    position: relative;
    input {
      width: 400px;
      height: 40px;
      border: 1px solid #c4c4c4;
      outline: none;
      padding-left: 15px;
      padding-right: 15px;
      border-radius: 5px;
    }
    button {
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -60px;
      width: 120px;
      height: 35px;
      outline: none;
      background: #ff4a9c;
      color: #fff;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
    }
  }
  .message {
    height: 280px;
    p {
      margin-top: 30px;
      position: relative;
      span {
        margin-right: 20px;
      }
      i {
        margin-left: 205px;
        font-size: 12px;
        color: #ff4a9c;
        font-style: normal;
      }
      .changeyz {
        font-size: 12px;
        color: #ff4a9c;
        position: absolute;
        top: 50px;
        left: 480px;
        cursor: pointer;
      }
      .ts {
        position: absolute;
        bottom: -20px;
        left: 450px;
        font-size: 12px;
        color: #f40;
      }
    }
    .sj {
      margin-right: -30px;
      margin-top: 25px;
      height: 26px;
      position: relative;
      .sj-name {
        position: absolute;
        top: 0;
        left: 296px;
      }
      .sj-number {
        position: absolute;
        top: 0;
        left: 350px;
      }
      .sj-change {
        position: absolute;
        top: 0;
        right: 296px;
      }
    }
    .yzm {
      margin-top: 65px;
      .yzmleft {
        margin-left: -10px;
        margin-right: 0px;
      }
    }
    .yzm1 {
      width: 280px;
      margin-right: 10px;
    }
    em {
      display: inline-block;
      width: 120px;
      height: 40px;
      background: #ff4a9c;
      font-style: normal;
      border-radius: 5px;
      color: #fff;
      line-height: 40px;
      cursor: pointer;
    }
    .hit {
      position: absolute;
      top: 48px;
      left: 458px;
      font-size: 12px;
      cursor: pointer;
      color: red;
    }
  }
}
footer {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  height: 200px;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: center;
}
</style>
