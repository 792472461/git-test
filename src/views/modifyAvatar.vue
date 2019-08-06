<template>
  <div>
    <Header></Header>
    <div class="c">
      <div class="xgSuc" v-show="cur">修改成功</div>
      <div class="name">上传头像</div>
      <div class="avatar">
        <div class="left">
          <img class="avatar1" :src="avatar" />
        </div>
        <div class="fgx"></div>
        <div class="right">
          <a href="javascript:;" class="file">
            <input
              type="file"
              name="avatar"
              id="uppic"
              accept="image/gif,image/jpeg,image/jpg,image/png"
              @change="changeImage($event)"
              ref="avatarInput"
              class="uppic"
            />
          </a>
        </div>
      </div>
      <div class="sure" @click="modify">确定</div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { uploadImg, updateUserInfo } from "../api/home.js";
import Footer from "../components/footer";
export default {
  data() {
    return {
      cur: false,
      frontImg: "",
      avatar: require("../assets/images/home/touxsc.png"),
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
    //  上传图片
    async _uploadImg(formData) {
      const res = await uploadImg(formData);
      if (res.code === "1") {
        this.frontImg = res.data.imgPath;
      }
      console.log(this.frontImg, "000");
    },

    //  修改头像
    async _updateUserInfo(nickname, gender, birthday, score, avatar) {
      const res = await updateUserInfo(
        nickname,
        gender,
        birthday,
        score,
        avatar
      );
      if (res.code === "1") {
        this.cur = true;
        setTimeout(() => {
          this.cur = false;
        }, 2000);
      }
    },

    modify() {
      var nickname = "";
      var gender = "";
      var birthday = "";
      var score = "";
      this._updateUserInfo(nickname, gender, birthday, score, this.frontImg);
    },

    changeImage(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;

      var formData = new FormData();
      formData.append("file", file);
      this._uploadImg(formData);

      reader.readAsDataURL(file);
      reader.onload = function() {
        that.avatar = this.result;
      };
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.c {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  margin-top: 12px;
  overflow: hidden;
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
  .name {
    padding-top: 30px;
    height: 50px;
    color: #ff4a9c;
    font-weight: bold;
    font-size: 24px;
    text-align: left;
  }
  .avatar {
    width: 501px;
    margin: 0 auto;
    padding: 100px 0px 100px 0px;
    display: flex;
    .fgx {
      width: 2px;
      height: 180px;
      background-color: #eee;
    }
    .left {
      position: relative;
      margin-right: 70px;
      background-color: #000;
      width: 180px;
      height: 180px;
      .avatar1 {
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 0px;
        left: 0px;
        width: 180px;
        height: 180px;
        overflow: hidden;
      }
    }
    .right {
      position: relative;
      margin-left: 70px;
      border: 3px dashed #e5e9ef;
      width: 177px;
      height: 177px;
      .file {
        display: inline-block;
        width: 177px;
        height: 177px;
        background: url("../assets/images/home/uploadImg.png") no-repeat;
        background-size: 50px 50px;
        background-position: 50% 50%;
      }
      .uppic {
        position: absolute;
        top: 50%;
        margin-top: -25px;
        left: 50%;
        margin-left: -25px;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
      }
    }
  }
  .sure {
    margin: 0 auto;
    margin-bottom: 250px;
    width: 100px;
    height: 35px;
    line-height: 35px;
    background: #ff4a9c;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
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
