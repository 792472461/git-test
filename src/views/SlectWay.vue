<template>
  <div>
    <Header></Header>
    <div class="yz">
      <div class="tit">选择验证方式</div>
      <div class="slet">
        <div class="phone">
          <div class="left">
            <div class="img">
              <img src="@/assets/images/home/phone1.png" />
            </div>
            <span class="b">通过手机号验证</span>
            <br />
            <span class="s">如果你的绑定手机号可用，则可通过绑定的手机号发送验证码修改</span>
          </div>
          <div class="right">
            <button
              @click="yz(1)"
              :disabled="noclickphone"
              :class="{ noclickBtn: noclickphone }"
            >
              立即验证
            </button>
          </div>
        </div>
        <div class="phone">
          <div class="left">
            <div class="img">
              <img src="@/assets/images/home/email1.png" />
            </div>
            <span class="b">通过邮箱验证</span>
            <br />
            <span class="s">如果你的账号绑定邮箱，则可通过向绑定邮箱发送验证码修改</span>
          </div>
          <div class="right">
            <button
              @click="yz(2)"
              :disabled="noclickemail"
              :class="{ noclickBtn: noclickemail }"
            >
              立即验证
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer>暂无页脚</footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      preState: null,
      dosomething: [],
      noclickphone: true,
      noclickemail: true
    }
  },

  methods: {
    yz(i) {
      let preState = this.preState
      let that = this
      if (i == 1) {
        this.$router.push({
          path: '/bindPhone',
          query: {
            name: 'Phone',
            names: preState,
            state: that.dosomething
          }
        })
      }
      if (i == 2) {
        this.$router.push({
          path: '/bindPhone',
          query: {
            name: 'Email',
            names: preState,
            state: that.dosomething
          }
        })
      }
    }
  },
  mounted() {
    this.name = this.$route.query.mode
    this.preState = this.$route.query.state

    if (this.name == 'bindPhone') {
      if (this.preState == 'toBindPhone') {
        this.dos = '绑定手机'
        this.dosomething = ['绑定手机', '绑定成功']
        this.noclickphone = false
        this.noclickemail = true
      } else if (this.preState == 'bindingPhone') {
        this.dos = '改绑手机'
        this.dosomething = ['改绑手机', '改绑成功']
        this.noclickphone = false
        this.noclickemail = true
      }
    }
    if (this.name == 'bindEmail') {
      if (this.preState == 'toBindEmail') {
        this.dos = '绑定邮箱'
        this.dosomething = ['绑定邮箱', '绑定成功']
        this.noclickphone = true
        this.noclickemail = false
      } else if (this.preState == 'bindingEmail') {
        this.dos = '改绑邮箱'
        this.dosomething = ['改绑邮箱', '改绑成功']
        this.noclickphone = true
        this.noclickemail = false
      }
    }
    if (this.name == 3) {
      this.dos = '修改密码'
      this.dosomething = ['修改密码', '修改成功']
    }
  }
}
</script>
<style lang="less" scoped>
.yz {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  .tit {
    font-size: 20px;
    color: #303030;
    text-align: center;
    height: 99px;
    line-height: 99px;
    border-bottom: 1px solid #e3e3e3;
  }
  .slet {
    height: auto;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 50px;
    overflow: hidden;
    .phone {
      height: 120px;
      width: 100%;
      margin-left: 260px;
      margin-top: 50px;
      .left {
        width: 520px;
        height: 120px;
        float: left;
        text-align: left;
        color: #606060;
        .img {
          width: 80px;
          height: 80px;
          float: left;
        }
        .b {
          font-size: 20px;
          display: inline-block;
        }
        .s {
          font-size: 12px;
          margin-top: 20px;
          display: inline-block;
        }
      }
      .right {
        width: 200px;
        height: 120px;
        float: left;
        margin-top: 40px;
        button {
          width: 125px;
          height: 35px;
          color: #fff;
          background: #ff4a9c;
          text-align: center;
          line-height: 35px;
          font-size: 16px;
          border-radius: 5px;
          outline: none;
          border: 0;
          cursor: pointer;
        }
        .noclickBtn {
          background: #f5f5f5;
          color: #ababab;
          border: 1px solid #e1e1e1;
          cursor: not-allowed;
        }
      }
    }
  }
}
footer {
  width: 100%;
  max-width: 1920px;
  height: 200px;
  background: #f40;
}
</style>
