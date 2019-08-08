<template>
  <div class="login">
    <div class="logo">
      <div class="inner">
        <img @click="backHome()" src="@/assets/images/home/pfen.png" />
      </div>
    </div>
    <div class="login_form">
      <div class="inner">
        <div class="form">
          <div class="tit">用户登录</div>
          <div class="first">
            <img src="@/assets/images/home/user_name.png" />
            <input
              :class="uBorderId ? 'bk' : ''"
              type="text"
              placeholder="请输入您的手机号/邮箱"
              ref="userName"
              @focus="uFocus"
              @blur="uBlur"
              @input="uInput"
            />
          </div>
          <div class="second">
            <img src="@/assets/images/home/pass_word.png" />
            <input
              :class="wBorderId ? 'bk' : ''"
              type="password"
              placeholder="请输入您的密码"
              ref="passWord"
              @focus="wFocus"
              @blur="wBlur"
              @input="wInput"
            />
          </div>
          <div class="third">
            <span v-show="curId">登录账号或密码错误</span>
            <span v-show="nullId">输入框不能为空</span>
            <span v-show="numberId">用户名格式不正确</span>
            <span v-show="nozc">该账号不存在</span>
            <p>
              <b>
                <a @click="$router.push(`/resetPassword`)">忘记密码</a>
              </b>
            </p>
          </div>
          <div class="loginPF">
            <div class="four" @click="login">登 录</div>
          </div>

          <div class="five">
            <a @click="$router.push(`/register`)">注册</a>
          </div>
        </div>
      </div>
    </div>
    <Footer> </Footer>
  </div>
</template>
<script>
import { login } from "../api/home.js";
import Footer from "../components/footer";
export default {
  data() {
    return {
      nozc: false, // 该账号不存在
      uBorderId: false, //input边框错误提示
      wBorderId: false, //input边框错误提示
      curId: false, //登录账号或密码错误错误提示
      nullId: false, //输入框不能为空错误提示
      numberId: false //用户名格式不正确错误提示
    };
  },
  components: {
    Footer
  },
  methods: {
    // 点击扑粉网图片 返回主页
    backHome() {
      this.$router.push({
        path: "/",
        query: {
          home: "返回主页"
        }
      });
    },
    // 用户名获取焦点
    uFocus() {
      // this.curId = false
    },
    // 密码获取焦点
    wFocus() {
      // this.curId = false
    },
    // 用户名失去焦点
    uBlur() {
      var username = this.$refs.userName.value;
      var numreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      var addreg = /^[0-9A-Za-z][.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
      if (username !== "") {
        if (!(numreg.test(username) || addreg.test(username))) {
          this.uBorderId = true;
          this.numberId = true;
          return;
        } else {
          this.uBorderId = false;
          this.numberId = false;
        }
      } else {
        this.uBorderId = false;
        this.numberId = false;
      }
    },

    // 密码失去焦点
    wBlur() {
      var password = this.$refs.passWord.value;
      if (password == "") {
        this.wBorderId = false;
        this.numberId = false;
      }
    },

    // 用户名输入监听
    uInput() {
      var username = this.$refs.userName.value;
      var password = this.$refs.passWord.value;
      if (username) {
        this.uBorderId = false;
      }
      if (username && password) {
        this.nullId = false;
      }
    },

    // 密码输入监听
    wInput() {
      var username = this.$refs.userName.value;
      var password = this.$refs.passWord.value;
      if (password) {
        this.wBorderId = false;
      }
      if (username && password) {
        this.nullId = false;
      }
    },

    login() {
      var username = this.$refs.userName.value;
      var password = this.$refs.passWord.value;
      if (username == "" || password == "") {
        this.nullId = true;
        this.uBorderId = true;
        this.wBorderId = true;
      } else {
        this.nullId = false;
      }
      this._login(username, password);
    },

    //  登录
    async _login(username, password) {
      const res = await login(username, password);
      this.numberId = false;
      if (res.code == "10") {
        this.curId = true;
        this.uBorderId = true;
        this.wBorderId = true;
      } else {
        this.curId = false;
      }
      if (res.code == "3") {
        this.nozc = true;
      } else {
        this.nozc = false;
      }
      if (res.code == "1") {
        var accesstoken = res.data.accesstoken;
        var expire_time = res.data.expire_time;
        this.$store.commit("CHANGE_TOKEN", {
          accesstoken,
          expire_time
        });
        this.$store.dispatch("GET_USER_INFO");
        this.$router.push({
          path: "/"
        });
      }
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
  }
  .logo {
    height: 180px;
    padding-top: 30px;
    .inner {
      position: relative;
    }
    img {
      position: absolute;
      height: 153px;
      width: 270px;
      left: 0px;
      top: -15px;
      cursor: pointer;
    }
  }
  .login_form {
    background-color: #ec8ecc;
    text-align: left;
    width: 100%;
    height: 537px;
    background: url("~@/assets/images/home/login_bg.png") no-repeat;
    background-size: 100% 100%;
    .inner {
      width: 1200px;
      position: relative;
    }
    .form {
      position: absolute;
      border-radius: 3px;
      right: 0px;
      top: 76px;
      padding: 0px 22px;
      background-color: #fff;

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
        margin-bottom: 25px;
        img {
          position: absolute;
          height: 48px;
          width: 50px;
        }
        input {
          width: 352px;
          height: 48px;
          border: 1px solid #ccc;
          padding-left: 60px;
        }
        .bk {
          outline: 2px auto red;
          border: none;
        }
      }
      .second {
        position: relative;
        margin-bottom: 7px;
        img {
          position: absolute;
          height: 48px;
          width: 50px;
        }
        input {
          width: 352px;
          height: 48px;
          border: 1px solid #ccc;
          padding-left: 60px;
        }
        .bk {
          outline: 2px auto red;
          border: none;
        }
      }
      .third {
        width: 100%;
        span {
          float: left;
          color: #ff068f;
        }
        p {
          float: right;
          padding-top: 6px;
          color: #666666;
          font-size: 14px;
          b {
            font-weight: normal;
            cursor: pointer;
          }
        }
      }
      .loginPF {
        position: relative;
        .opa {
          position: absolute;
          width: 100%;
          height: 50px;
          border: 1px solid #ccc;
          cursor: pointer;
          opacity: 0;
        }
        .four {
          width: 100%;
          height: 50px;
          line-height: 50px;
          color: #fff;
          text-align: center;
          margin-top: 60px;
          border-radius: 3px;
          background-color: #ff068f;
          cursor: pointer;
        }
      }

      .five {
        cursor: pointer;
        float: right;
        margin-bottom: 35px;
        margin-top: 13px;
        border-bottom: 1px solid #ff068f;
        a {
          color: #ff068f;
        }
      }
    }
  }
  footer {
    height: 100px;
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
