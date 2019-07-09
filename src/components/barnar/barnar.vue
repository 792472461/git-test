<template>
  <div class="barnar">
    <ul>
      <li :class="{ lis: type == 'message' }" @click="check('message')">
        个人信息
      </li>
      <li :class="{ lis: type == 'myVideo' }" @click="check('myVideo')">
        我的视频
      </li>
      <li
        :class="{ lis: type == 'myCollection' }"
        @click="check('myCollection')"
      >
        我的收藏
      </li>
      <li
        :class="{ lis: type == 'browsingHistory' }"
        @click="check('browsingHistory')"
      >
        浏览记录
      </li>
      <li :class="{ lis: type == 'gold' }" @click="check('gold')">
        金币管理
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: this.$route.query.type || "usercenter"
    };
  },
  methods: {
    check(tag) {
      this.$router.replace("/personalCenter?type=" + tag);
      this.$emit("checks", tag);
      this.type = tag;
    }
  }
};
</script>
<style lang="less" scoped>
.barnar {
  margin-top: 60px;
  width: 177px;
  height: 100%;
  background: #f7f7f7;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      width: 177px;
      height: 65px;
      line-height: 65px;
      background: #f7f7f7;
      color: #000;
      font-size: 16px;
      color: #666666;
      text-align: center;
      cursor: pointer;
    }
    .lis {
      color: #fff;
      background: #bc8686;
      cursor: pointer;
    }
    li:hover {
      background: #bc8686;
      color: #fff;
    }
  }
}
</style>
