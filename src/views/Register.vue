<template>
  <div class="login">
    <div class="logo">
      <div class="inner">
        <img @click="backHome()" src="@/assets/images/home/pfen-white.png" />
      </div>
    </div>
    <div class="login_form">
      <div class="inner">
        <div class="form">
          <div class="suc" v-show="zccg">
            注册成功<i @click="closeZccg">x</i>
          </div>
          <div class="tit">账号注册</div>
          <div class="first">
            <input
              type="text"
              placeholder="昵称(4-10个字符，不能包含特殊字符)"
              :class="{ bk: uBorderId }"
              ref="userName"
              @blur.prevent="uBlur($event)"
              v-model="uValue"
            />
            <p class="warn" v-show="nameId">该昵称已被他人使用</p>
            <p class="warn" v-show="curId">
              昵称长度应在4-10个字符，不能包含特殊字符
            </p>
          </div>

          <div class="second">
            <input
              type="password"
              placeholder="密码(6-16个字符组成，区分大小写)"
              :class="wBorderId ? 'bk' : ''"
              ref="passWord"
              @blur="wBlur"
              v-model="wValue"
            />
            <p class="warn" v-show="wordId">密码不能少于6个字符</p>
          </div>

          <div class="yxzc">
            <select
              class="card"
              id="card"
              v-model="selected"
              @change="changeSelect"
            >
              <option value="phone">手机号注册</option>
              <option value="email">邮箱注册</option>
            </select>
            <input
              type="text"
              :placeholder="
                selected == 'phone' ? '请输入您的手机号' : '请输入您的邮箱'
              "
              :class="{ kb: nBorderId }"
              ref="number"
              @blur="nBlur"
              v-model="nValue"
            />
            <p class="warn" v-show="addId">邮箱格式错误</p>
            <p class="warn" v-show="phoneId">手机号格式错误</p>
            <p class="warn" v-show="reId">
              {{ register == 1 ? "该手机号已被注册" : "该邮箱已被注册" }}
            </p>
            <p class="warn" v-show="sWriteId">请填写手机号</p>
            <p class="warn" v-show="aWriteId">请填写邮箱</p>
          </div>
          <div class="ljyz">
            <input
              type="text"
              ref="yzm"
              :placeholder="
                selected != 'phone' ? '请输入邮件验证码' : '请输入手机号验证码'
              "
              :class="yBorderId ? 'bk' : ''"
              v-model="yValue"
            />
            <span class="yzm" @click="sendCode()">{{ vCode }}</span>
            <span class="yzm_ts" v-show="checkId"
              >验证码已发送，五分钟内有效</span
            >
          </div>
          <p class="warn" v-show="yzmId">验证码错误，请重新输入</p>
          <div class="third">
            <div class="xy">
              <input
                type="checkbox"
                value="agree"
                name="名称"
                checked="checked"
                v-model="checkedNames"
              /><span> 我已同意<a @click="agreement">《使用协议》</a></span>
            </div>
          </div>
          <button
            :class="isCanRegister ? 'four' : 'four four1'"
            :disabled="isCanRegister"
            @click="postZC"
          >
            注 册
          </button>
          <div class="five">
            <a @click="$router.push(`/login`)">已有账号，直接登录 ></a>
          </div>
        </div>
      </div>
    </div>
    <Footer> </Footer>
  </div>
</template>
<script>
import Footer from "../components/footer";
import {
  checkNickname,
  checkaccount,
  sendCaptcha,
  sendEmail,
  checkCaptcha,
  phoneRegister,
  emailRegister
} from "../api/home.js";
export default {
  data() {
    return {
      zccg: false, // 注册成功弹窗
      uValue: "", // 昵称内容
      wValue: "", // 密码内容
      nValue: "", //手机号/邮箱内容
      yValue: "", // 验证码内容
      checkedNames: "", // 复选框
      isSendId: false, // 是否发送验证码
      cur: "",
      id: 0, // 手机/邮箱iput提示
      selected: "phone",
      num: "", // 倒计时
      vCode: "立即获取",
      checkId: false,
      curId: false, // 昵称规则提示
      nameId: false, // 昵称占用提示
      uBorderId: false, // 昵称错误边框提示
      wBorderId: false, // 密码错误边框提示
      wordId: false, // 密码长度提示
      nBorderId: false, // 手机/邮箱错误边框提示
      addId: false, // 邮箱格式提示
      phoneId: false, // 手机号格式提示
      reId: false, // 手机/邮箱已被注册
      register: 1, // 1 手机已注册 2 邮箱已注册
      sWriteId: false, // 手机不能为空
      aWriteId: false, // 邮箱不能为空
      yzmId: false, // 验证码错误提示
      yBorderId: false, // 验证码错误边框提示
      timeId: true, // 不能重复验证码倒计时
      aLockId: "" // 邮箱重复禁止发送验证码
    };
  },
  components: {
    Footer
  },
  computed: {
    isCanRegister() {
      var uPattern = /^([\u2E80-\u9FFF]|\w){4,10}$/; // 昵称
      var reg = /^[a-zA-Z0-9]{6,10}$/; // 密码
      var numreg = /^[1][3,4,5,7,8][0-9]{9}$/; // 手机号
      var addreg = /^[0-9A-Za-z][.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/; // 邮箱

      console.log(
        uPattern.test(this.uValue),
        reg.test(this.wValue),
        this.selected === "phone" && numreg.test(this.nValue),
        this.selected === "email" && addreg.test(this.nValue)
      );

      if (
        uPattern.test(this.uValue) &&
        reg.test(this.wValue) &&
        (this.yValue != "" && this.yValue.length === 6) &&
        this.checkedNames === true &&
        this.isSendId === true &&
        ((this.selected === "phone" && numreg.test(this.nValue)) ||
          (this.selected === "email" && addreg.test(this.nValue)))
      ) {
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    // 关闭注册成功弹窗
    closeZccg() {
      this.zccg = false;
      this.$router.push({
        path: "/login",
        query: {
          name: "login"
        }
      });
    },

    agreement() {
      this.$router.push({
        path: "/agreement",
        query: {
          name: "agreement"
        }
      });
    },

    // 点击扑粉网图片 返回主页
    backHome() {
      this.$router.push({
        path: "/",
        query: {
          home: "toHome"
        }
      });
    },
    //  昵称失去焦点
    // uBlur(e) {
    uBlur() {
      var username = this.$refs.userName.value;
      var uPattern = /^([\u2E80-\u9FFF]|\w){4,10}$/;
      if (username) {
        if (!uPattern.test(username)) {
          this.curId = true;
          this.uBorderId = true;
        } else {
          this.curId = false;
          this.uBorderId = false;
        }
      }
      this._checkNickname(username);
    },

    //  密码失去焦点
    wBlur() {
      var password = this.$refs.passWord.value;
      var reg = /^[a-zA-Z0-9]{6,10}$/;
      if (password) {
        if (!reg.test(password)) {
          this.wordId = true;
          this.wBorderId = true;
        } else {
          this.wordId = false;
          this.wBorderId = false;
        }
      }
    },

    // 手机号/邮箱失去焦点
    nBlur() {
      var number = this.$refs.number.value;
      if (number !== "") {
        if (this.selected == "email") {
          this.phoneId = false;
          var addreg = /^[0-9A-Za-z][.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;

          if (!addreg.test(number)) {
            this.nBorderId = true;
            this.addId = true;
            return;
          } else {
            this._checkaccount(number, 2);
            this.nBorderId = false;
            this.addId = false;
            this.aWriteId = false;
            return;
          }
        } else if (this.selected == "phone") {
          this.addId = false;
          var numreg = /^[1][3,4,5,7,8][0-9]{9}$/;

          if (!numreg.test(number)) {
            this.nBorderId = true;
            this.phoneId = true;
            return;
          } else {
            this._checkaccount(number, 2);
            this.nBorderId = false;
            this.phoneId = false;
            this.sWriteId = false;
          }
        }
      }
    },

    // select 发生改变
    changeSelect() {
      var number = this.$refs.number.value;
      this.nBlur();
      if (this.cur === 1) {
        this.sendCode();
      }
      if (number != "" && this.selected === "phone" && this.reId === true) {
        this.reId = false;
        return;
      }
      if (number != "" && this.selected === "email" && this.reId === true) {
        this.reId = false;
        return;
      }

      if (number === "" && this.selected === "phone" && this.reId === true) {
        this.reId = false;
        return;
      }
      if (number === "" && this.selected === "email" && this.reId === true) {
        this.reId = false;
        return;
      }
    },

    //  检测昵称重复
    async _checkNickname(username) {
      const res = await checkNickname(username);
      if (res.code == 2) {
        this.nameId = true;
        this.uBorderId = true;
      } else if (res.code == 1) {
        this.nameId = false;
      }
    },

    //  检测手机/邮箱重复
    async _checkaccount(number, id) {
      const res = await checkaccount(number);
      if (res.code == 2) {
        this.reId = true;
        this.nBorderId = true;
      } else if (res.code == 1) {
        this.reId = false;
        this.nBorderId = false;
        this.aLockId = true;
      }
      if (id === 2) {
        this.register = 2;
      }
    },

    // 点击立即获取
    sendCode() {
      this.cur = 1;
      var number = this.$refs.number.value;
      this.addId = false;
      this.phoneId = false;
      this.aWriteId = false;
      this.sWriteId = false;

      if (number === "" && this.selected === "phone") {
        this.sWriteId = true;
        this.nBorderId = true;
        return;
      }
      if (number === "" && this.selected === "email") {
        this.aWriteId = true;
        this.nBorderId = true;
        return;
      }

      if (
        number != "" &&
        this.selected === "phone" &&
        !/^[1][3,4,5,7,8][0-9]{9}$/.test(number)
      ) {
        this.phoneId = true;
        this.nBorderId = true;
        return;
      }
      if (
        number != "" &&
        this.selected === "email" &&
        !/^[0-9A-Za-z][.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/.test(
          number
        )
      ) {
        this.addId = true;
        this.nBorderId = true;
        return;
      }

      if (this.timeId === true) {
        if (this.selected === "phone") {
          this._sendCaptcha(number);
        } else if (this.selected === "email") {
          this._sendEmail(number, 1);
        }
      }

      if (this.aLockId === true && this.timeId === true) {
        this.num = 60;
        this.timer = setInterval(this.setTime, 1000);
        this.vCode = this.num + "s";
        this.checkId = true;
      }
    },

    setTime() {
      if (this.num == 0) {
        this.num--;
        window.clearInterval(this.timer);
        this.timer = null;
        this.vCode = "重新获取验证码";
        this.timeId = true;
      } else {
        this.num--;
        this.vCode = this.num + "s";
        this.checkId = true;
        this.timeId = false;
      }
    },

    //  发送手机验证码
    async _sendCaptcha(number) {
      var type = 1;
      await sendCaptcha(number, type);
      this.isSendId = true;
    },

    //  发送邮箱验证码
    async _sendEmail(email) {
      await sendEmail(email);
      this.isSendId = true;
    },

    //  校验验证码
    async _checkCaptcha(account, captcha) {
      const res = await checkCaptcha(account, captcha);
      if (res.code == "5") {
        this.yzmId = true;
        this.yBorderId = true;
      } else if (this.selected === "phone" && res.code == "1") {
        this._phoneRegister();
      } else if (this.selected === "email" && res.code == "1") {
        this._emailRegister();
      }
    },

    // 注册
    postZC() {
      var number = this.nValue;
      var value = this.yValue;
      this._checkCaptcha(number, value);
    },

    //  手机号注册
    async _phoneRegister() {
      var nickname = this.uValue;
      var password = this.wValue;
      var number = this.nValue;
      var value = this.yValue;
      const res = await phoneRegister(number, value, nickname, password);
      if (res.code == "1") {
        this.zccg = true;
      }
    },

    //  邮箱注册
    async _emailRegister() {
      var nickname = this.uValue;
      var password = this.wValue;
      var number = this.nValue;
      var value = this.yValue;
      await emailRegister(number, value, nickname, password);
      this.zccg = true;
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  .inner {
    width: 1200px;
    margin: 0 auto;
    img {
      cursor: pointer;
    }
  }
  .logo {
    height: 200px;
    padding-top: 30px;
    background: url("~@/assets/images/home/logo_bg.png") no-repeat;
    background-size: 100% 300px;
    background-position: -50px;
    background-color: #ed8ecc;
    margin: 0;

    .inner {
      position: relative;
    }
    img {
      position: absolute;
      height: 140px;
      width: 260px;
      left: 0px;
      cursor: pointer;
    }
  }
  .login_form {
    text-align: left;
    width: 100%;
    height: 750px;
    background-size: 100% 100%;
    .inner {
      width: 1200px;
      position: relative;
    }
    .form {
      position: absolute;
      border-radius: 3px;
      left: 50%;
      transform: translateX(-50%);
      top: 76px;
      width: 382px;
      .suc {
        position: absolute;
        left: 50%;
        margin-left: -80px;
        top: 50%;
        margin-top: -50px;
        width: 160px;
        height: 100px;
        color: #fff;
        line-height: 100px;
        border-radius: 8px;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        i {
          top: -25px;
          position: absolute;
          right: 15px;
          cursor: pointer;
        }
      }
      .tit {
        height: 93px;
        line-height: 93px;
        text-align: center;
        color: #ff068f;
        font-weight: bold;
        font-size: 22px;
      }
      .first {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 35px;
        input {
          width: 382px;
          height: 48px;
          border: 1px solid #ccc;
          padding-left: 10px;
        }
        .bk {
          outline: 2px auto red;
          border: none;
        }
        .warn {
          position: absolute;
          bottom: -25px;
          color: #ff068f;
        }
      }

      .second {
        position: relative;
        margin-bottom: 35px;
        input {
          width: 382px;
          height: 48px;
          border: 1px solid #ccc;
          padding-left: 10px;
        }
        .bk {
          outline: 2px auto red;
          border: none;
        }
        .warn {
          position: absolute;
          bottom: -25px;
          color: #ff068f;
        }
      }
      .yxzc {
        position: relative;
        margin-bottom: 35px;
        .card {
          height: 50px;
          outline: none;
        }
        .bk {
          outline: 2px auto red;
          border: none;
        }
        input {
          padding-left: 10px;
          height: 50px;
          width: 245px;
          border: 1px solid #ccc;
          margin-left: 20px;
        }
        .warn {
          position: absolute;
          bottom: -25px;
          color: #ff068f;
        }
      }
      .ljyz {
        position: relative;
        display: flex;
        .bk {
          outline: 2px auto red;
          border: none;
        }
        input {
          padding-left: 10px;
          height: 49px;
          width: 224px;
          border: 1px solid #ccc;
        }
        .yzm {
          height: 50px;
          width: 155px;
          background: #ff068f;
          line-height: 50px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        .yzm_ts {
          position: absolute;
          right: -200px;
          top: 50%;
          transform: translateY(-50%);
          color: #ff068f;
        }
      }
      .warn {
        margin-top: 6px;
        color: #ff068f;
      }

      .third {
        position: relative;
        .xy {
          position: absolute;
          left: 50%;
          top: 33px;
          transform: translateX(-50%);
          span {
            a {
              color: #ff068f;
              cursor: pointer;
            }
          }
        }
      }

      .four {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-top: 90px;
        border-radius: 3px;
        background-color: #f5f5f5;
        color: #ababab;
        border: 1px solid #e1e1e1;
        cursor: pointer;
      }
      .four1 {
        color: #fff;
        background-color: #ff068f;
        outline: none;
      }
      .four:disabled {
        cursor: not-allowed;
      }
      .five {
        cursor: pointer;
        float: right;
        margin-bottom: 35px;
        margin-top: 13px;
        a {
          color: #ff068f;
        }
      }
    }
  }
  footer {
    margin-top: 200px;
    height: 100px;
    border-top: 1px solid #888;
    .list1 {
      width: 1200px;
      margin: 0 auto;
    }
    .lists {
      margin-top: 40px;
      display: flex;
      li {
        width: 15%;
      }
    }
  }
}
</style>
