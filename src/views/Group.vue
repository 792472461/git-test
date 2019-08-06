<template>
  <div>
    <Header></Header>
    <div class="content_follow">
      <div class="inner">
        <div class="tit">团体认证</div>
        <div class="upload">
          <img :src="pageImg" />
          <div class="dljm">请您提供微博或B站管理员登陆界面</div>
          <a href="javascript:;" class="file">
            点击上传
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
        <div class="ljr" @click="attestation">立即认证</div>
      </div>
    </div>
    <Footer> </Footer>
  </div>
</template>
<script>
import Footer from "../components/footer";
import { uploadImg } from "../api/home.js";
export default {
  data() {
    return {
      frontImg: "",
      pageImg: require("../assets/images/home/addPage.png")
    };
  },
  components: {
    Footer
  },
  methods: {
    //  立即认证
    attestation() {},

    //  上传图片
    async _uploadImg(formData) {
      const res = await uploadImg(formData);
      if (res.code === "1") {
        this.frontImg = res.data.imgPath;
      }
    },

    back() {
      this.$router.go(-1);
    },

    changeImage(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;

      var formData = new FormData();
      formData.append("file", file);
      this._uploadImg(formData, "back");

      reader.readAsDataURL(file);
      reader.onload = function() {
        that.pageImg = this.result;
      };
    },
    created() {}
  }
};
</script>

<style lang="less" scoped>
ul li {
  list-style: none;
}
.content_follow {
  width: 100%;
  .inner {
    width: 1200px;
    height: 750px;
    margin: 0 auto;
    .tit {
      height: 90px;
      line-height: 90px;
      border-bottom: 1px solid #ccc;
      font-size: 22px;
      color: #e64c7e;
      text-align: left;
      font-weight: bold;
    }
    .upload {
      margin: 0 150px;
      border: 1px solid #f1f1f1;
      margin-top: 60px;
      padding-bottom: 40px;
      padding-top: 20px;
      border-radius: 10px;
      .dljm {
        margin-top: 15px;
        margin-bottom: 10px;
        font-size: 16px;
        color: #8e8e8e;
      }
      img {
        width: 400px;
        height: 200px;
      }
      .file {
        position: relative;
        display: inline-block;
        background: #ffaad7;
        border: 1px solid #eb78b4;
        border-radius: 4px;
        padding: 10px 30px;
        overflow: hidden;
        color: #fff;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        margin-top: 35px;
      }
      .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
      }
      .file:hover {
        background: #fb91d5;
        border-color: #f198d1;
        color: #fff;
        text-decoration: none;
      }
    }
    .ljr {
      position: relative;
      top: 40px;
      left: 50%;
      margin-left: -140px;
      width: 280px;
      height: 40px;
      border-radius: 7px;
      background: #e64c7e;
      color: #fff;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>
