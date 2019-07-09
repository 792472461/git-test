<template>
  <div>
    <Header></Header>
    <div class="Certification">
      <div class="inner">
        <ul class="title">
          <li>
            <img
              :src="
                curID
                  ? require('@/assets/images/home/fdh.png')
                  : require('@/assets/images/home/hdh.png')
              "
            />
            <p :class="curID ? 'cur' : ''">填写实名信息</p>
            <hr />
          </li>
          <li>
            <img
              :src="
                curId
                  ? require('@/assets/images/home/fdh.png')
                  : require('@/assets/images/home/hdh.png')
              "
            />
            <p :class="curId ? 'cur' : ''">信息审核中</p>
            <hr />
          </li>
          <li>
            <img
              :src="
                cur
                  ? require('@/assets/images/home/fdh.png')
                  : require('@/assets/images/home/hdh.png')
              "
            />
            <p :class="cur ? 'cur' : ''">通过</p>
          </li>
        </ul>
        <div class="success" v-show="curID">信息提交成功</div>
        <div class="success" v-show="curId">信息正在审核中，请等待</div>
        <div class="success" v-show="cur">恭喜您，您的信息审核已通过</div>
        <div class="next" v-show="!cur" @click="next">下一步</div>
        <!-- <div class="next">返回</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { verifyStatus } from "../api/home.js";
export default {
  data() {
    return {
      cur: false,
      curId: false,
      curID: true,
      userStatus: ""
    };
  },
  created() {
    // this._verifyStatus();
  },
  mounted() {
    var type = this.$route.query.type;
    if (type == "success") {
      this.cur = false;
      this.curId = false;
      this.curID = true;
    } else if (type == "review") {
      this.cur = false;
      this.curId = true;
      this.curID = false;
    } else if (type == "pass") {
      this.cur = true;
      this.curId = false;
      this.curID = false;
    }
  },

  methods: {
    next() {
      var type = this.$route.query.type;
      if (type == "success") {
        this.curId = true;
        this.curID = false;
        this.$router.replace("/submission?type=review");
      } else if (type == "review") {
        this.$router.replace("/submission?type=pass");
        this._verifyStatus();
      }
    },

    // 账号安全状态
    async _verifyStatus() {
      const res = await verifyStatus();
      this.userStatus = res.userStatus;
      if (this.userStatus == 2) {
        return;
      } else if (this.userStatus == 1) {
        this.cur = true;
        this.curId = false;
        this.curID = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.Certification {
  width: 100%;
  .inner {
    position: relative;
    width: 1200px;
    height: 700px;
    margin: 0 auto;
    .title {
      position: absolute;
      left: 160px;
      top: 106px;
      display: flex;
      margin: 0 auto;
      li {
        display: flex;
        width: 378px;
        .cur {
          color: #ff4a9c;
          font-weight: bold;
        }
        img {
          width: 42px;
          height: 42px;
        }
        p {
          line-height: 42px;
          margin-left: 6px;
          font-size: 16px;
        }
        span {
          font-size: 20px;
          color: #606060;
        }
        hr {
          width: 200px;
          height: 2px;
          margin-left: 12px;
          margin-right: 12px;
          background-color: #616161;
          margin-top: 18px;
        }
      }
    }
    .success {
      position: absolute;
      top: 300px;
      color: #303030;
      font-size: 30px;
      font-weight: bold;
      left: 50%;
      transform: translateX(-50%);
    }
    .next {
      position: absolute;
      top: 500px;
      width: 120px;
      height: 40px;
      background-color: #ff4a9c;
      line-height: 40px;
      color: #fff;
      border-radius: 3px;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 100px;
      cursor: pointer;
    }
  }
}
</style>
