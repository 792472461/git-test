<template>
  <div class="login">
    <div class="logo">
      <div class="inner"><img src="@/assets/images/home/logo1.png" /></div>
    </div>
    <div class="RegisterSuc">
      <div class="first">
        <img src="@/assets/images/home/redTick.png" />
        <p>恭喜您，注册成功</p>
      </div>
      <div class="second">
        <p>3秒后跳转，或<span>点击跳转</span></p>
      </div>
    </div>
    <footer>
      <div class="list1">
        <ul class="lists">
          <li>关于我们</li>
          <li>友情链接</li>
          <li>关于我们</li>
          <li>友情链接</li>
          <li>关于我们</li>
          <li>友情链接</li>
          <li>关于我们</li>
          <li>友情链接</li>
        </ul>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
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
      height: 103px;
      left: 0px;
    }
  }
  .RegisterSuc {
    position: relative;
    margin-top: 145px;
    .first {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      img {
        width: 90px;
        height: 90px;
      }
      p {
        margin-left: 15px;
        height: 90px;
        line-height: 90px;
        font-size: 30px;
        color: #303030;
        font-weight: bold;
      }
    }
    .second {
      position: relative;
      margin: 0 auto;
      top: 120px;
      left: 20px;
      width: 1200px;
      span {
        position: absolute;
        color: #1dade5;
        cursor: pointer;
      }
    }
  }
  footer {
    margin-top: 300px;
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
