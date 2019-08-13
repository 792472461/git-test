<template>
  <div>
    <div class="content">
      <div v-for="item in moreList" :key="item.id" class="row-list">
        <div class="center_list">
          <div
            class="smarllImg"
            @click="$router.push(`/play?videoId=${item.id}`)"
          >
            <img :src="item.cover_img" />
            <p>
              <span>{{ item.length }}</span>
            </p>
          </div>
          <div class="centent">
            <div class="tops">
              <span class="cont p">{{ item.name }}</span>
            </div>
            <div class="share">
              <span class="see1">{{ item.browse_num }}</span>
              <span class="see1 love1">{{ item.like_num }}</span>
              <span class="see1 share1">{{ item.share_num }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paging" v-show="allTotal > 1">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="+currentPage"
        :page-size="15"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { moreVideo } from "../api/home.js";
export default {
  data() {
    return {
      total: 0,
      allTotal: "",
      moreList: [],
      list: [1, 2]
    };
  },
  computed: {
    Id() {
      return this.$route.query.id;
    },
    currentPage() {
      return this.$route.query.page || 1;
    }
  },
  watch: {
    $route(to, from) {
      console.log(from);
      var limit = 15;
      var page = this.currentPage;
      var order = "hot";
      var order1 = "new";
      var type = to.query.type;
      if (type == "hot") {
        this._moreVideo(limit, page, order);
      } else if (type == "new") {
        this._moreVideo(limit, page, order1);
      }
    }
  },
  created() {
    var limit = 15;
    var page = this.currentPage;
    var order = "hot";
    this._moreVideo(limit, page, order);
  },
  methods: {
    //  更多视频
    async _moreVideo(limit, page, order) {
      const res = await moreVideo(limit, page, this.Id, order);
      this.moreList = res.data;
      this.total = res.count;
      this.allTotal = res.totalpage;
    },
    handleCurrentChange(currentPage) {
      const params = this.$route.query;
      const newParams = Object.assign({}, params, {
        page: currentPage
      });
      this.$router.push({
        path: "/openB",
        query: newParams
      });
      var limit = 15;
      var page = this.currentPage;
      this._moreVideo(limit, page);
    }
  },
  mounted() {
    // console.log(window.location.pathname)
    console.log(this.$route.path);
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);

    console.log(from);

    console.log(next);

    console.log(22222222222);

    next();
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #c08c93;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #84414b;
}
.row-list {
  float: left;
  width: 228px;
  height: 210px;
  margin-right: 15px;
  .center_list {
    width: 188px;
    overflow: hidden;
  }
  .centent .share {
    bottom: 0px;
    transition: all 0.4s;
  }
  .center_list:hover {
    .centent .share {
      bottom: -28px;
      transition: all 0.4s;
    }
    .tops .cont {
      color: #be5a99;
    }
    .tops .name {
      color: #be5a99;
    }
    .tops .p {
      color: #be5a99;
    }
    .smarllImg p {
      display: block;
    }
  }
  .smarllImg {
    width: 188px;
    height: 108px;
    position: relative;
    border-radius: 10px;
    box-shadow: 0px 3px 5px #ccc;
    overflow: hidden;
    cursor: pointer;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    p {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: relative;
      top: 0px;
      bottom: 0px;
      display: none;
      span {
        color: #fff;
        position: absolute;
        bottom: 5px;
        right: 8px;
        font-size: 12px;
      }
    }
    .list_icon {
      display: block;
      img {
        width: 35px;
        height: 35px;
      }
    }
  }
  .centent {
    position: relative;
    height: 60px;
    width: auto;
    .tops {
      margin: 0;
      width: 100%;
      height: 45px;
      margin-top: 10px;
      position: relative;
      line-height: 20px;
      overflow: hidden;
      img {
        float: left;
        width: 10px;
        height: 12px;
        margin-top: 11px;
      }
      .name {
        float: left;
        font-size: 16px;
        margin-left: 5px;
        margin-top: 4px;
      }
      .cont {
        float: left;
        width: 130px;
        font-size: 12px;
        margin-top: 7px;
      }
      .p {
        width: 188px;
        text-align: left;
      }
    }
    .share {
      position: absolute;
      bottom: 3px;
      background: #fff;
      width: 195px;
      height: 28px;
      line-height: 15px;
      text-align: left;
      padding: 0;
      margin: 0;
      .see1 {
        margin: 0;
        padding: 0;
        display: inline-block;
        width: 65px;
        height: 22px;
        background: url("~@/assets/images/home/love1.png") no-repeat 0 0;
        background-size: auto 18px;
        font-size: 12px;
        padding-left: 25px;
        line-height: 22px;
      }
      .love1 {
        background-position: -80px 0;
      }
      .share1 {
        background-position: -170px 0;
      }
    }
  }
}
.row-list:nth-child(5n) {
  margin-right: 0;
}
.content {
  padding-top: 50px;
  height: 800px;
}
.paging {
  width: 100%;
  height: 185px;
  position: relative;
  // border: 1px solid red;
  ul {
    height: 30px;
    width: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    li {
      float: left;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #000;
      font-size: 12px;
      border: 1px solid #868686;
      margin-right: 12px;
      cursor: pointer;
    }
    .pre,
    .next {
      width: 60px;
    }
  }
}
</style>
