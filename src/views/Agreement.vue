<template>
  <div>
    <Header></Header>
    <div class="content_follow">
      <div class="inner">
        <div class="tit">协议</div>
        <div class="upload"></div>
      </div>
    </div>
    <Footer> </Footer>
  </div>
</template>
<script>
import Footer from "../components/footer";
export default {
  data() {
    return {};
  },
  components: {
    Footer
  },
  methods: {
    back() {
      this.$router.go(-1);
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
  }
}
</style>
