<template>
  <div class="uoloadV">
    <Header></Header>
    <div class="submitSuc">
      <p>x</p>提交成功
    </div>
    <div class="content">
      <div class="tit">上传视频</div>
      <div class="upALL">
        <!-- 添加封面 -->
        <div class="fmImg">
          <p class="spfm">上传视频封面图</p>
          <el-upload
            :headers="headers"
            class="avatar-uploader"
            action="http://fapi.mimanduo.xyz/api/index/uploadImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </div>
        <!-- 上传视频 -->
        <div class="spVideo">
          <div class="upload">
            <p class="scsp">上传视频</p>
            <div class="videoSize">视频大小 &lt; 1G以内，时长 &lt; 15分钟</div>
          </div>
          <uploader
            :options="options"
            class="uploader-example"
            @file-success="onFileSuccess"
          >
            <uploader-unsupport></uploader-unsupport>
            <uploader-drop>
              <uploader-btn>上传视频</uploader-btn>
            </uploader-drop>
            <uploader-list></uploader-list>
          </uploader>
        </div>

      </div>
      <!-- <div class="add">
        <div class="tit">
          <img
            class="videologo"
            src=""
            alt=""
          >
          <div class="videoright">
            <div class="videoright-top"><span>原文件题目</span><img
                src=""
                alt=""
              ></div>
            <div class="videoright-bottom">
              <span>上传成功</span>
              <div class="blueLine"></div>
            </div>
          </div>
        </div>
        <div class="addImg">
          <input type="file">
          <div class="coverImg">
            <img
              class="mainImg"
              src=""
              alt=""
            >
            <img
              class="addtp"
              src=""
              alt=""
            >
            <span>添加封面</span>
          </div>
        </div>
      </div> -->

      <!-- 添加标题 -->
      <div class="set">
        <div class="addtit">
          <span>添加标题</span>
          <input
            type="text"
            placeholder="请输入稿件标题"
            v-model="title"
            @blur="uBlur"
          >
        </div>
        <div class="xzlm">
          <span>选择投稿栏目</span>
          <select
            id="card"
            class="card"
            v-model="chooseList"
            @change="changeSelect"
          >
            <option
              v-for="item in columnList"
              :key="item.id"
              :value="item.id"
              class="phone"
            >{{item.name}}</option>
          </select>
        </div>

        <!-- 选择明星标题标签 -->
        <div class="select">
          <p>选择明星标题标签（只能选填一个明星，该标签会在视频标题前面展示）</p>
          <div class="mx">
            <div class="sel-label1">
              <span class="selLabels">{{nameStar}}</span>
            </div>
            <div class="right">
              <input
                type="text"
                placeholder="创建明星姓名标签"
                v-model="starName"
              />
              <span @click="sure">确定</span>
            </div>
          </div>
        </div>
        <div class="label">
          <ul>
            <li
              class="starLi"
              v-for="(item, index) in starList"
              :key='item.id'
              @click="choiceStar(index)"
            >
              {{item.name}}
            </li>
          </ul>
        </div>

        <!-- 选择视频所属标签 -->
        <div>
          <div class="select">
            <span class="bp">选择视频所属标签（最多可选填十个标签）</span>
            <div class="sel-label">
              <p v-show="arr.length == 0">为视频选择合适的标签，让更多的人能找到您的视频！</p>
              <span
                class="selLabels"
                v-for="(item, index) in arr"
                :key='index'
              >{{item}} <i @click="close(index)">x</i></span>
            </div>
          </div>
          <div class="right1">
            <input
              v-model="spLabel"
              type="text"
              placeholder="创建标签"
            />
            <span @click="spSure">确定</span>
          </div>
          <!-- <div
            class="label"
            v-show="curId"
          > -->
          <div class="label">
            <ul
              class="spbq"
              v-show="curId"
            >
              <li
                v-for="(item, index) in spList"
                :key="item.id"
                @click="choiceTab(index)"
              >
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
        <div
          class="none"
          v-show="!curId"
        ></div>
        <!-- 视频简介 -->
        <div class="intro">
          <p>添加视频简介</p>
          <div class="intro-con">
            <textarea
              placeholder="制作辛苦了，请为观众们介绍一下视频内容吧~"
              maxlength="250"
              @input="descInput"
              cols="30"
              rows="10"
              v-model="comment"
            ></textarea>
            <span class="hit">{{remnant}}个字以内</span>
          </div>
        </div>
        <div class="dsfb">
          <div class="timeing">
            <input
              type="checkbox"
              id="checkAll"
            >
            <label>定制发布</label>
            <input type="date">
          </div>
        </div>
        <div class="btns">
          <button @click="drafts">存草稿</button>
          <button @click="release">提交发布</button>
        </div>
      </div>
    </div>
    <div class="protocol">
      上传视频，即表示您已同意 <span>扑粉网平台使用协议</span> ，请勿上传色情，反动等违法视频。
    </div>
    <footer>暂无页脚</footer>
  </div>
</template>
<script>
import {
  fileVideo,
  getLabel,
  classList,
  addVideo,
  uploadImg,
  addLabel
} from '../api/home.js'
import Cookies from 'js-cookie'
const getToken = () => {
  return Cookies.get('tokenAccess')
}
export default {
  data() {
    return {
      headers: {
        tokenAccess: getToken()
      },
      videoarr: [],
      filePath: '',
      videoArr: [],
      starId: '',
      classId: '',
      chooseList: '',
      coverImg: '',
      imageUrl: '',
      spLabel: '',
      arr: [],
      spList: [],
      curId: false,
      title: '',
      columnList: [],
      starList: [],
      comment: '',
      remnant: 250,
      nameStar: '明星姓名',
      starName: '',
      options: {
        // target: '//localhost:3000/upload',
        testChunks: false,
        headers: {
          tokenAccess: getToken()
        }
      },
      attrs: {
        accept: 'image/*'
      }
    }
  },

  created() {
    // this.options.target = '/req/api/index/file'
    this.options.target = 'http://fapi.mimanduo.xyz/api/index/file'
    this._getLabel(1)
    this._classList()
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.coverImg = res.data.imgPath
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 视频上传成功
    onFileSuccess(rootFile, file, response, chunk) {
      const res = JSON.parse(response)
      this.filePath = res.file_path
      console.log(rootFile, file, response, chunk, '9999')
    },

    changeSelect() {
      this.classId = this.chooseList
    },
    // 提交发布
    release() {
      var name = this.title
      var coverImg = this.coverImg
      var describe = this.comment
      var classId = this.classId
      var videoSrc = this.filePath
      var titleLabel = this.starId
      var videoLabel = this.videoArr
      var length = 1
      this._addVideo(
        name,
        coverImg,
        describe,
        classId,
        videoSrc,
        titleLabel,
        videoLabel,
        length
      )
    },

    drafts() {
      var name = this.title
      var coverImg = this.coverImg
      var describe = this.comment
      var classId = this.classId
      var videoSrc = this.filePath
      var titleLabel = this.starId
      var videoLabel = this.videoArr
      var length = 1
      var isdrafts = 0
      this._addVideo(
        name,
        coverImg,
        describe,
        classId,
        videoSrc,
        titleLabel,
        videoLabel,
        length,
        isdrafts
      )
    },

    // 提交发布视频
    async _addVideo(
      name,
      coverImg,
      describe,
      classId,
      videoSrc,
      titleLabel,
      videoLabel,
      length,
      isdrafts
    ) {
      const res = await addVideo(
        name,
        coverImg,
        describe,
        classId,
        videoSrc,
        titleLabel,
        videoLabel,
        length,
        isdrafts
      )
    },

    // 选择明星标签
    choiceStar(index) {
      var tab = this.starList[index].name
      this.nameStar = tab
      var starLabel = this.starList[index].id
      this.starId = starLabel
    },

    // 选择视频标签
    choiceTab(index) {
      var tab = this.spList[index].name
      var videoLabel = this.spList[index].id
      if (this.arr.length >= 10) {
        return
      } else if (this.arr.indexOf(tab) == '-1') {
        this.arr.push(tab)
        this.videoarr.push(videoLabel)
        this.videoArr = JSON.stringify(this.videoarr)
      }
      console.log(this.videoArr, 'eee')
    },

    close(index) {
      this.arr.splice(index, 1)
      // 从入参数组里删除
      this.videoarr.splice(index, 1)
      this.videoArr = JSON.stringify(this.videoarr)
      console.log(this.videoArr, 'eee')
    },

    // 标题失去焦点
    uBlur() {
      if (this.title != '') {
        this._getLabel(0, this.title)
      }
    },

    // 获取标签
    async _getLabel(isStart, name) {
      const res = await getLabel(isStart, name)

      if (res.code === '1' && name != undefined) {
        this.spList = res.data
        this.curId = true
      } else {
        this.starList = res.data
      }
    },

    // 分区
    async _classList() {
      const res = await classList()
      this.columnList = res.data
    },

    // 确定明星名字
    sure() {
      var name = this.starName
      if (name != '') {
        this._addLabel(1, name)
      }
    },

    // 新建确定视频标签
    spSure() {
      var name = this.spLabel
      if (this.spLabel != '') {
        this._addLabel(0, name)
      }
    },

    // 新增标签
    async _addLabel(isStart, name) {
      const res = await addLabel(isStart, name)
      var videoLabel = res.labelId
      if (isStart == 1 && res.code == '1') {
        this.nameStar = name
        this.starId = videoLabel
      } else if (isStart == 0 && res.code == '1') {
        if (this.arr.length >= 10) {
          return
        } else if (this.arr.indexOf(name) == '-1') {
          this.arr.push(name)
          this.videoarr.push(Number(videoLabel))
          this.videoArr = JSON.stringify(this.videoarr)
        }
        console.log(this.videoArr, 'ppp')
      }
    },

    //  视频简介字数
    descInput() {
      var txtVal = this.comment.length
      this.remnant = 250 - txtVal
    }
  }
}
</script>
<style lang="less" scoped>
.uoloadV {
  position: relative;
  .submitSuc {
    position: fixed;
    left: 50%;
    margin-left: -75px;
    top: 50%;
    margin-top: -50px;
    width: 150px;
    height: 100px;
    background: #ff4a9c;
    color: #fff;
    border-radius: 10px;
    z-index: 999;
    p {
      text-align: right;
      padding-right: 10px;
      cursor: pointer;
      margin-bottom: 20px;
    }
  }
}

.upALL {
  display: flex;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  width: 340px;
  height: 160px;
  margin-right: 55px;
  border: 1px solid #eee;
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
  width: 340px;
  height: 160px;
  display: block;
}
.spfm {
  height: 40px;
  text-align: left;
  font-size: 18px;
}
.uploader-example {
  width: 620px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
.content {
  width: 1200px;
  height: auto;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  margin-top: 70px;
  padding: 41px 90px 43px 90px;
  .tit {
    padding-bottom: 20px;
    font-size: 30px;
    color: #ff4a9c;
    text-align: left;
    border-bottom: 1px solid #ccc;
    margin-bottom: 50px;
  }
  .upload {
    width: 100%;
    .scsp {
      height: 40px;
      text-align: left;
      font-size: 18px;
    }
    .uploadBtn {
      width: 100%;
      height: 55px;
      font-size: 18px;
      color: #fff;
      position: relative;
      input,
      button {
        width: 188px;
        height: 55px;
        text-align: center;
        line-height: 55px;
        background: #ff4a9c;
        color: #fff;
        font-size: 18px;
        float: left;
        outline: none;
        border: 0;
        box-shadow: 0 0 5px #ccc;
        border: 1px solid #c4adb8;
        border-radius: 3px;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
    .videoSize {
      font-size: 14px;
      color: #9d9d9d;
      text-align: left;
      margin-top: 5px;
    }
  }
  .add {
    width: 100%;
    height: 246px;
    border-bottom: 1px solid #999999;
    .tit {
      width: 100%;
      height: 100px;
      float: left;
      .videologo {
        float: left;
        width: 70px;
        height: 40px;
        background: #ccc;
        overflow: hidden;
      }
      .videoright {
        width: 1090px;
        float: right;
        height: auto;
        overflow: hidden;
        .videoright-top {
          width: 100%;
          height: 50px;
          padding-top: 6px;
          span {
            font-size: 16px;
            color: #999;
            float: left;
          }
          img {
            float: right;
            width: 21px;
            height: 21px;
            border: 1px solid #00db0f;
          }
        }
        .videoright-bottom {
          width: 100%;
          height: 20px;
          span {
            font-size: 14px;
            color: #999;
            text-align: left;
            float: left;
          }
          .blueLine {
            float: left;
            width: 100%;
            height: 3px;
            background: #17b2ff;
          }
        }
      }
    }
    .addImg {
      height: 140px;
      width: 100%;
      float: left;
      position: relative;
      input {
        width: 206px;
        height: 132px;
        float: left;
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
      .coverImg {
        width: 206px;
        height: 132px;
        float: left;
        border: 2px dashed #e5e5e5;
        position: absolute;
        top: 0;
        left: 0;
        .addtp {
          display: inline-block;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #ccc;
          position: absolute;
          top: 26%;
          left: 50%;
          margin-left: -21px;
        }
        span {
          font-size: 18px;
          color: #999;
          display: block;
          margin-top: 60px;
        }
        .mainImg {
          // width: 206px;
          // height: 132px;
          // display: inline-block;
          // background: red;
        }
      }
    }
  }
  .set {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 25px;
    .right1 {
      width: 100%;
      margin-top: 70px;
      margin-bottom: 20px;
      input {
        padding-left: 15px;
        border: 1px solid #ccc;
        height: 60px;
        border-radius: 5px;
        width: 880px;
        float: left;
      }
      input::-webkit-input-placeholder {
        color: #9d9d9d;
        font-size: 16px;
      }
      input::-moz-input-placeholder {
        color: #9d9d9d;
        font-size: 16px;
      }
      input::-ms-input-placeholder {
        color: #9d9d9d;
        font-size: 16px;
      }
      input::-o-input-placeholder {
        color: #9d9d9d;
        font-size: 16px;
      }
      span {
        float: right;
        display: block;
        width: 120px;
        height: 60px;
        line-height: 60px;
        background: #eb88c4;
        color: #fff;
        border-radius: 5px;
        margin-left: 20px;
        cursor: pointer;
      }
      span:hover {
        background: #ff4a9c;
      }
    }
    .addtit {
      width: 100%;
      height: 50px;
      margin-top: 40px;
      span {
        float: left;
        height: 50px;
        text-align: right;
        line-height: 50px;
        font-size: 18px;
      }
      input {
        float: right;
        height: 50px;
        width: 892px;
        outline: none;
        margin-left: 38px;
        padding-left: 15px;
        padding-right: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      input::-webkit-input-placeholder {
        color: #9d9d9d;
        font-size: 16px;
      }
      input::-moz-input-placeholder {
        color: #9d9d9d;
        font-size: 16px;
      }
      input::-ms-input-placeholder {
        color: #9d9d9d;
        font-size: 16px;
      }
      input::-o-input-placeholder {
        color: #9d9d9d;
        font-size: 16px;
      }
    }
    .xzlm {
      margin-top: 50px;
      text-align: left;
      span {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
      }
      .card {
        float: right;
        width: 892px;
        height: 50px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-left: 20px;
        padding-left: 10px;
        .phone {
          height: 50px;
        }
      }
    }
    .select {
      width: 100%;
      height: 120px;
      margin-top: 50px;
      p {
        text-align: left;
        height: 40px;
        font-size: 18px;
      }
      .bp {
        float: left;
        height: 40px;
        text-align: right;
        font-size: 18px;
      }
      .sel-label1 {
        position: relative;
        width: 250px;
        height: 60px;
        float: left;
        border: 1px solid #ccc;
        border-radius: 5px;
        .selLabels {
          position: absolute;
          left: 50%;
          margin-left: -39px;
          top: 50%;
          margin-top: -14px;
          color: #fff;
          font-size: 14px;
          height: 27px;
          background: #eb88c4;
          border-radius: 12px;
          line-height: 27px;
          padding: 0px 10px;
          i {
            cursor: pointer;
            display: inline-block;
            width: 15px;
            height: 15px;
            font-style: normal;
            font-size: 12px;
            line-height: 15px;
            text-align: center;
            background: #fff;
            color: #eb88c4;
            border-radius: 50%;
            margin-right: -3px;
            font-weight: bold;
          }
        }
      }
      .right {
        float: right;
        input {
          padding-left: 15px;
          border: 1px solid #ccc;
          height: 60px;
          border-radius: 5px;
          width: 600px;
        }
        input::-webkit-input-placeholder {
          color: #9d9d9d;
          font-size: 16px;
        }
        input::-moz-input-placeholder {
          color: #9d9d9d;
          font-size: 16px;
        }
        input::-ms-input-placeholder {
          color: #9d9d9d;
          font-size: 16px;
        }
        input::-o-input-placeholder {
          color: #9d9d9d;
          font-size: 16px;
        }
        span {
          display: inline-block;
          width: 120px;
          height: 60px;
          line-height: 60px;
          background: #eb88c4;
          color: #fff;
          border-radius: 5px;
          margin-left: 20px;
          cursor: pointer;
        }
        span:hover {
          background: #ff4a9c;
        }
      }
      .sel-label {
        width: 100%;
        float: left;
        height: 120px;
        border: 1px solid #ccc;
        padding-left: 30px;
        border-radius: 5px;
        p {
          margin-left: -15px;
          margin-top: 13px;
          color: #7e7e7e;
          font-size: 14px;
        }
        .selLabels {
          color: #fff;
          font-size: 14px;
          float: left;
          height: 27px;
          background: #eb88c4;
          border-radius: 12px;
          margin-right: 30px;
          margin-top: 20px;
          line-height: 27px;
          padding: 0px 8px;
          i {
            cursor: pointer;
            display: inline-block;
            width: 15px;
            height: 15px;
            font-style: normal;
            font-size: 12px;
            line-height: 15px;
            text-align: center;
            background: #fff;
            color: #eb88c4;
            border-radius: 50%;
            margin-right: -3px;
            font-weight: bold;
          }
        }
      }
    }
    .label {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: -10px;
      .spbq {
        margin-bottom: 50px;
        li {
          padding: 0px 10px;
        }
      }
      ul {
        display: inline-block;
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        li {
          cursor: pointer;
          float: left;
          height: 27px;
          text-align: center;
          margin-top: 20px;
          margin-right: 35px;
          border: 1px solid #ff4a9c;
          font-size: 12px;
          line-height: 27px;
          border-radius: 3px;
          color: #7e7e7e;
        }
        .starLi {
          width: 82px;
        }
        .starLi:nth-child(9n) {
          margin-right: 0;
        }
        li:hover {
          background: #ff4a9c;
          color: #fff;
        }
      }
    }
    .none {
      height: 100px;
    }
    .intro {
      width: 100%;
      height: 50px;
      p {
        height: 40px;
        text-align: left;
        font-size: 18px;
        color: #000;
      }
      span {
        float: left;
        height: 50px;
        width: 191px;
        text-align: right;
        line-height: 30px;
        font-size: 18px;
      }
      .intro-con {
        width: 100%;
        border: 1px solid #ebebec;
        height: 191px;
        float: left;
        position: relative;

        textarea {
          width: 100%;
          height: 161px;
          resize: none;
          border: 0;
          outline: none;
          padding: 15px;
          font-family: 'Microsoft Yahei';
          color: #7e7e7e;
        }
        .hit {
          color: #999;
          font-size: 14px;
          position: absolute;
          right: 20px;
          bottom: -10px;
        }
      }
    }
    .dsfb {
      margin-top: 200px;
      position: relative;
      width: 100%;
      height: 30px;
    }
    .timeing {
      position: absolute;
      bottom: 0px;
      .tick {
        width: 15px;
        height: 15px;
        background: #ff4a9c;
        margin-top: 8px;
        outline: none;
      }
      span {
        font-size: 20px;
        margin-left: 25px;
      }
      input {
        margin-top: 18px;
        margin-left: 28px;
      }
      label {
        margin-left: 10px;
      }
    }
    .btns {
      width: 100%;
      height: 100px;
      float: left;
      margin-top: 30px;
      button {
        font-size: 20px;
        background: #fff;
        border: 2px solid #ff4a9c;
        color: #ff4a9c;
        width: 185px;
        height: 49px;
        border-radius: 5px;
        text-align: center;
        margin-top: 20px;
        margin-right: 60px;
        outline: none;
        cursor: pointer;
      }
      button:last-child {
        margin-left: 60px;
        margin-right: 0px;
      }
    }
  }
}
.protocol {
  text-align: center;
  width: 1200px;
  font-size: 12px;
  height: 141px;
  padding-top: 35px;
  margin: 0 auto;
  span {
    color: #0382d8;
    cursor: pointer;
  }
}
footer {
  width: 100%;
  max-width: 1920px;
  height: 265px;
  margin: 0 auto;
  text-align: center;
  background: #cccccc;
  color: red;
}
</style>

