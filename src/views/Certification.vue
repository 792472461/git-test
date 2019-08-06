<template>
  <div>
    <Header></Header>
    <div class="Certification">
      <div class="inner">
        <div class="smyz">实名认证</div>
        <div class="form">
          <div class="first">
            <span>真实姓名：</span
            ><input
              type="text"
              placeholder="请输入您的真实姓名"
              v-model="name"
            />
          </div>
          <div class="second">
            <label for="sex">证件类型：</label>
            <select class="card" id="card" v-model="chooseList">
              <option value="1">身份证</option>
              <option value="2">护照</option>
              <option value="3">港澳居民前往内地通行证</option>
              <option value="4">台湾居民前往内地通行证</option>
            </select>
          </div>
          <div class="third">
            <span>证件号码：</span>
            <input
              type="text"
              class="form-control match-rotation-input"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              onblur="value=value.replace(/[^\d]/g,'')"
              ng-model="schedule.round"
              placeholder="请输入您的证件号码"
              v-model="identityNUM"
            />
          </div>
        </div>
        <div class="card_img">
          <ul>
            <li class="left">
              <img :src="avatar" />
              <span>上传证件背面照2M</span>
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
            </li>

            <li class="left">
              <img :src="avatarBack" />
              <span>上传证件正面照2M</span>
              <a href="javascript:;" class="file">
                点击上传
                <input
                  type="file"
                  name="avatar"
                  id="uppic"
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                  @change="changeImageBack($event)"
                  ref="avatarInput"
                  class="uppic"
                />
              </a>
            </li>
          </ul>
          <div class="ljrz" @click="attestation()">立即认证</div>
        </div>
      </div>
      <div class="mask" v-show="curId"></div>
    </div>
    <Footer> </Footer>
  </div>
</template>
<script>
import Footer from "../components/footer";
import { uploadImg, userVerify } from "../api/home.js";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      identityNUM: "",
      frontImg: "",
      backImg: "",
      chooseList: "",
      name: "",
      imageUrl: "",
      curId: false,
      avatar: require("../assets/images/home/card_z.png"),
      avatarBack: require("../assets/images/home/card_b.png")
    };
  },
  components: {
    Footer
  },
  methods: {
    //  上传图片
    async _uploadImg(formData, type) {
      const res = await uploadImg(formData);
      if (type === "front" && res.code === "1") {
        this.frontImg = res.data.imgPath;
      } else if (type === "back" && res.code === "1") {
        this.backImg = res.data.imgPath;
      }
    },

    changeImage(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;

      var formData = new FormData();
      formData.append("file", file);
      this._uploadImg(formData, "front");

      reader.readAsDataURL(file);
      reader.onload = function() {
        that.avatar = this.result;
      };
    },

    changeImageBack(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;

      var formData = new FormData();
      formData.append("file", file);
      this._uploadImg(formData, "back");

      reader.readAsDataURL(file);
      reader.onload = function() {
        that.avatarBack = this.result;
      };
    },

    //  立即认证
    async _userVerify(
      realname,
      papersType,
      papersNumber,
      papersImg,
      papersBackimg
    ) {
      const res = await userVerify(
        realname,
        papersType,
        papersNumber,
        papersImg,
        papersBackimg
      );
      if (res.code === "1") {
        Cookies.set("typeId", "true");
        this.$router.push({
          path: "/submission",
          query: {
            type: "success"
          }
        });
      } else if (res.code === "2") {
        alert("请不要重复提交");
      }
    },

    attestation() {
      var realname = this.name;
      var papersType = this.chooseList;
      var papersNumber = this.identityNUM;
      var papersImg = this.frontImg;
      var papersBackimg = this.backImg;
      this._userVerify(
        realname,
        papersType,
        papersNumber,
        papersImg,
        papersBackimg
      );
      // var r = confirm('您确定要提交审核吗')
      // if (r == true) {
      //   console.log('跳转下一页')
      //   this.curId = false
      // } else {
      //   this.curId = false
      //   return
      // }
    }
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.Certification {
  position: relative;
  width: 100%;
  .inner {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 570px;
    .smyz {
      height: 90px;
      line-height: 90px;
      border-bottom: 1px solid #ccc;
      font-size: 22px;
      color: #e64c7e;
      text-align: left;
      font-weight: bold;
    }
    .form {
      .first {
        margin-top: 70px;
        margin-bottom: 50px;
        span {
          font-size: 16px;
          color: #303030;
        }
        input {
          padding: 10px;
          width: 500px;
          height: 40px;
          border: 1px solid #9d9d9d;
          border-radius: 3px;
        }
      }
      .second {
        .card {
          width: 500px;
          height: 40px;
          border-radius: 3px;
        }
      }
      .third {
        margin-top: 50px;
        margin-bottom: 40px;
        span {
          font-size: 16px;
          color: #303030;
        }
        input {
          padding: 10px;
          width: 500px;
          height: 40px;
          border: 1px solid #9d9d9d;
          border-radius: 3px;
        }
      }
    }
    .card_img {
      position: relative;
      ul {
        position: absolute;
        display: flex;
        left: 50%;
        transform: translateX(-50%);
        li {
          img {
            display: block;
            width: 250px;
            height: 160px;
          }
        }
        .left {
          margin-left: 17px;
          margin-right: 30px;
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

          span {
            display: block;
            color: #606060;
            margin-bottom: 23px;
            margin-top: 10px;
          }
          p {
            border: 1px solid #ccc;
            width: 85px;
            height: 26px;
            border-radius: 3px;
            margin-left: 65px;
            cursor: pointer;
          }
        }
      }
      .ljrz {
        position: absolute;
        top: 400px;
        transform: translateX(-50%);
        width: 120px;
        height: 40px;
        background-color: #ff4a9c;
        line-height: 40px;
        color: #fff;
        border-radius: 3px;
        margin-left: 580px;
        cursor: pointer;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    // background: rgba(0, 0, 0, 0.4);
  }
}
</style>
