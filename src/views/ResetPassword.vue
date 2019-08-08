<template>
  <div>
    <Header></Header>
    <div class="content area">
      <div class="flow">
        <p>
          <img :src="redTick" />
          <span>确认账号</span>
        </p>
        <i></i>
        <p>
          <img :src="czmm" />
          <span>重置密码</span>
        </p>
        <i></i>
        <p>
          <img :src="czok" />
          <span>重置成功</span>
        </p>
      </div>
      <div class="confirm" v-show="show == 1">
        <input
          v-model="number"
          type="text"
          placeholder="请输入绑定的手机号码/邮箱"
          @focus="wFocus"
        />
        <p v-show="curId" class="noNull">输入框不能为空</p>
        <button @click="phoneOk()">确认</button>
      </div>
      <div class="confirm" v-show="show == 2">
        您的密码已修改成功，3S后自动跳转登录页
        <button @click="callback()">返回</button>
      </div>
      <div class="confirm message" v-show="show == 3">
        <div>
          <p>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;新密码</span>
            <input
              placeholder="密码(6-16个字符组成，区分大小写)"
              v-model="newPassword"
              type="password"
              @blur="newBlur"
            />
          </p>
          <p>
            <span>确认新密码</span>
            <input
              placeholder="密码(6-16个字符组成，区分大小写)"
              v-model="surePassword"
              type="password"
              @blur="sureBlur"
            />
          </p>
          <p class="agreement" v-show="passId">密码输入不一致</p>
          <p class="agreement1" v-show="noId">密码不能为空</p>
          <p class="agreement2" v-show="wordId">新密码不能少于6个字符</p>
          <p class="sj">
            <span class="sj-name">{{ phoneEmail }}</span>
            <span class="sj-number">{{ phoneEmailNumber }}</span>
            <i class="sj-change" @click="pre()">修改</i>
          </p>
          <p class="yzm">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;验证码</span>
            <input
              v-model="yzm"
              class="yzm1"
              type="text"
              placeholder="请输入短信/邮箱验证码"
            />
            <em @click="sendCode()">{{ vCode }}</em>
            <span v-show="check" class="hit">验证码已发送，请注意查收</span>
            <span class="hit" v-show="yzmError">验证码错误</span>
            <span v-show="yzmId" class="hit">验证码不能为空</span>
          </p>
        </div>
        <div>
          <button @click="changeOk()">确认修改</button>
        </div>
      </div>
    </div>
    <Footer> </Footer>
  </div>
</template>
<script>
import { sendCaptcha, sendEmail, resetPwd } from "../api/home.js";
import redTick from "@/assets/images/home/redTick.png";
import grayTick from "@/assets/images/home/grayTick.png";
import Footer from "../components/footer";
export default {
  data() {
    return {
      yzmError: false,
      yzmId: false,
      yzm: "",
      wordId: false,
      noId: false,
      passId: false,
      newPassword: "", // 新密码
      surePassword: "", // 确认密码
      curId: false,
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
      phoneEmailNumber: ""
    };
  },
  components: {
    Footer
  },
  methods: {
    wFocus() {
      this.curId = false;
    },

    newBlur() {
      var reg = /^[a-zA-Z0-9]{6,10}$/;
      if (this.newPassword != "") {
        if (!reg.test(this.newPassword)) {
          this.wordId = true;
          this.noId = false;
          this.passId = false;
          return;
        } else {
          this.wordId = false;
        }
      }
    },
    // 确认密码鼠标失去焦点
    sureBlur() {},
    phoneOk() {
      var regPhone = /^1\d{10}$/;
      var regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (regPhone.test(this.number)) {
        this.show = 3;
        this.czmm = this.redTick;
        this.phoneEmail = "手机";
        this.phoneEmailNumber =
          this.number.substring(0, 3) + "****" + this.number.substring(7);
      } else {
        if (regEmail.test(this.number)) {
          this.show = 3;
          this.czmm = this.redTick;
          this.phoneEmail = "邮箱";
          this.phoneEmailNumber =
            this.number.substring(0, 3) +
            "****" +
            this.number.substring(this.number.indexOf("@"));
        } else {
          this.curId = true;
        }
      }
    },

    callback() {
      this.show = 3;
      this.czok = this.grayTick;
      console.log("恭喜重置成功");
    },

    changeOk() {
      if (this.yzm === "") {
        this.yzmId = true;
        this.check = 0;
        return;
      } else {
        this.yzmId = false;
      }

      this._resetPwd(
        this.number,
        this.newPassword,
        this.surePassword,
        this.yzm
      );
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
      } else {
        this.i--;
        this.vCode = this.i + "s";
      }
    },

    //  发送手机验证码
    async _sendCaptcha(type, number) {
      const res = await sendCaptcha(type, number);
      console.log(res);
    },

    //  发送邮箱验证码
    async _sendEmail(email, type) {
      const res = await sendEmail(email, type);
      console.log(res);
    },

    //  重置密码
    async _resetPwd(username, new_password, confim_password, captcha) {
      const res = await resetPwd(
        username,
        new_password,
        confim_password,
        captcha
      );
      if (res.code === "1") {
        this.show = 2;
        this.czok = this.redTick;
      }
      if (res.code === "5") {
        this.yzmError = true;
        this.check = 0;
        this.yzmId = false;
      }
    },

    sendCode() {
      if (this.newPassword === "" || this.surePassword === "") {
        this.noId = true;
        this.passId = false;
        this.wordId = false;
        return;
      } else {
        this.noId = false;
      }
      if (this.newPassword != "" && this.surePassword != "") {
        if (this.newPassword != this.surePassword) {
          this.passId = true;
          this.wordId = false;
          return;
        } else {
          this.passId = false;
        }
      }

      // if (this.wordId === true) {
      //   return
      // }
      // if (this.yzmError === false) {
      //   this.yzmId = false
      //   return
      // }

      if (this.i == -1) {
        if (this.phoneEmail === "邮箱") {
          this._sendEmail(this.number, 2);
        } else if (this.phoneEmail === "手机") {
          var type = 2;
          this._sendCaptcha(type, this.number);
        }
        this.i = 60;
        this.timer = setInterval(this.setTime, 1000);
        this.vCode = this.i + "s";
        this.check = 1;
      } else {
        alert(this.i + "秒后才可再次获取验证码");
      }
    }
  }
};
</script>

<style lang="less" scoped>
@media (max-width: 1400px) {
  .area {
    width: 960px !important;
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
          cursor: pointer;
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
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  .flow {
    margin-top: 100px;
    width: 100%;
    height: 50px;
    font-size: 20px;
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
    margin-top: 70px;
    width: 100%;
    height: 190px;
    position: relative;
    input {
      width: 300px;
      height: 40px;
      border: 1px solid #adadad;
      outline: none;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px;
    }
    .noNull {
      color: red;
      margin-top: 10px;
      margin-left: -190px;
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
    height: 380px;
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
    }
    .agreement {
      color: #ff4a9c;
      margin-left: -105px;
      margin-top: 15px;
    }
    .agreement1 {
      color: #ff4a9c;
      margin-left: -122px;
      margin-top: 15px;
    }
    .agreement2 {
      color: #ff4a9c;
      margin-left: -55px;
      margin-top: 15px;
    }
    .sj {
      margin-right: -30px;
      margin-top: 25px;
      height: 26px;
      position: relative;
      .sj-name {
        position: absolute;
        top: 0;
        left: 316px;
      }
      .sj-number {
        position: absolute;
        top: 0;
        left: 370px;
      }
      .sj-change {
        position: absolute;
        top: 0;
        right: 318px;
        cursor: pointer;
      }
    }
    .yzm {
      margin-right: -15px;
      margin-top: 25px;
    }
    .yzm1 {
      width: 195px;
      margin-right: 14px;
    }
    em {
      display: inline-block;
      width: 100px;
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
      left: 376px;
      font-size: 12px;
      cursor: pointer;
      color: #ff4a9c;
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
