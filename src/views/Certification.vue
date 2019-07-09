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
              <option value="sfzCard">身份证</option>
              <option value="hzCard">护照</option>
              <option value="gaCard">港澳居民前往内地通行证</option>
              <option value="twCard">台湾居民前往内地通行证</option>
            </select>
          </div>
          <div class="third">
            <span>证件号码：</span>
            <!-- <input
              type="text"
              maxlength="3"
              onkeyup="if(isNaN(value))execCommand('undo')"
            /> -->
            <input
              type="text"
              class="form-control match-rotation-input"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              onblur="value=value.replace(/[^\d]/g,'')"
              ng-model="schedule.round"
              placeholder="请输入您的证件号码"
            />
          </div>
        </div>
        <div class="card_img">
          <ul>
            <li class="left">
              <img src="@/assets/images/home/card_z.png" />
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span>上传证件正面照2M</span>
              <p>点击上传</p>
            </li>
            <li class="left">
              <img src="@/assets/images/home/card_b.png" />
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span>上传证件正面照2M</span>
              <p>点击上传</p>
            </li>
          </ul>
          <div class="ljrz" @click="attestation()">立即认证</div>
        </div>
      </div>
      <div class="mask" v-show="curId"></div>
    </div>
    <footer>
      暂无页脚
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chooseList: "",
      name: "",
      imageUrl: "",
      curId: false
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },

  attestation() {
    console.log(1111);
    this.curId = true;
    // var r = confirm('您确定要提交审核吗')
    // if (r == true) {
    //   console.log('跳转下一页')
    //   this.curId = false
    // } else {
    //   this.curId = false
    //   return
    // }
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
    margin-bottom: 70px;
    .smyz {
      height: 70px;
      line-height: 70px;
      border-bottom: 1px solid #ccc;
      font-size: 18px;
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
      ul {
        display: flex;
        width: 443px;
        margin: 0 auto;
        li {
          img {
            display: block;
            width: 220px;
            height: 140px;
          }
        }
        .left {
          margin-left: 17px;
          margin-right: 30px;
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
        margin-top: 100px;
        width: 120px;
        height: 40px;
        background-color: #ff4a9c;
        line-height: 40px;
        color: #fff;
        border-radius: 3px;
        margin-left: 580px;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
}
</style>
