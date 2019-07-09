<template>
  <div>
    <Header></Header>
    <div class="Certification">
      <div class="inner">
        <ul class="title">
          <li><img src="@/assets/images/home/fdh.png" />
            <p class="cur">填写实名信息</p>
            <hr />
          </li>
          <li><img src="@/assets/images/home/hdh.png" />
            <p>信息审核中</p>
            <hr />
          </li>
          <li><img src="@/assets/images/home/hdh.png" />
            <p>通过</p>
          </li>
        </ul>
        <div class="success">信息提交成功</div>
        <!-- <div class="success">信息正在审核中，请等待</div>
        <div class="success">恭喜您，您的信息审核已通过</div> -->
        <div class="next">下一步</div>
        <!-- <div class="next">返回</div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.Certification {
  width: 100%;
  .inner {
    position: relative;
    width: 1200px;
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
    }
  }
}
</style>

