<template>
  <div>
    <Header></Header>
    <div class="content_follow">
      <div class="inner">
        <div class="title">
          <span class="my">我的关注</span>
          <p><span @click="back">返回</span></p>
        </div>
        <ul class="list_follow">
          <li
            class="list"
            v-for="item in list"
            :key="item.id"
          >
            <div
              class="user_img"
              @click="$router.push(`/perHome?userId=${item.user_id}`)"
            >
              <img
                :src="item.avatar"
                class="user"
              />
              <div class="img"><img src="@/assets/images/home/Vadd.png" /></div>
            </div>
            <div
              class="tit"
              @click="$router.push(`/perHome?userId=${item.user_id}`)"
            >
              <p>{{ item.nickname }}</p>
              <span>{{ item.score }}</span>
            </div>
            <div class="right">
              <p
                :class="item.user_id === curId ? 'follow' : ''"
                @click="
                  item.user_id === curId
                    ? followUser(item.user_id)
                    : cancelFollow(item.user_id)
                "
              >
                {{ item.user_id === curId ? "关注" : "取消关注" }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      暂无页脚
    </footer>
  </div>
</template>
<script>
import { myFollowList, followUser, cancelFollow } from '../api/home.js'
export default {
  data() {
    return {
      curId: '',
      list: []
    }
  },

  methods: {
    //  关注列表
    async _myFollowList() {
      const res = await myFollowList()
      this.list = res.data
    },

    //  关注用户
    async _followUser(id) {
      const res = await followUser(id)
      if (res.code === '1') {
        this.curId = ''
      }
    },

    //  取消关注用户
    async _cancelFollow(id) {
      const res = await cancelFollow(id)
      if (res.code === '1') {
        this.curId = id
      }
    },

    back() {
      this.$router.go(-1)
    },

    followUser(id) {
      this._followUser(id)
    },

    cancelFollow(id) {
      this._cancelFollow(id)
    }
  },
  created() {
    this._myFollowList()
  }
}
</script>

<style lang="less" scoped>
ul li {
  list-style: none;
}
.content_follow {
  width: 100%;
  .inner {
    width: 1200px;
    margin: 0 auto;
    .title {
      width: 100%;
      height: 127px;
      border-bottom: 1px solid #4e4e4e;
      .my {
        font-size: 30px;
        color: #303030;
        float: left;
        margin-top: 63px;
      }
      p {
        padding-top: 63px;
        padding-bottom: 30px;
        float: right;
        margin: 0px;
        span {
          border: 1px solid #606060;
          font-size: 18px;
          border-radius: 4px;
          padding: 6px 30px;
          cursor: pointer;
        }
      }
    }
    .list_follow {
      margin: 0px;
      padding: 0px;
      .list {
        position: relative;
        height: 208px;
        border-bottom: 1px solid #4e4e4e;
        padding: 0px;
        margin: 0px;
        .user_img {
          position: absolute;
          left: 34px;
          top: 50%;
          transform: translateY(-50%);
          width: 140px;
          height: 140px;
          .user {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            cursor: pointer;
          }
          .img {
            position: absolute;
            z-index: 1000;
            bottom: 0px;
            right: 0px;
            img {
              width: 30px;
              height: 30px;
            }
          }
        }
        .tit {
          position: absolute;
          margin-left: 20px;
          text-align: left;
          left: 194px;
          top: 50%;
          transform: translateY(-50%);
          p {
            font-size: 25px;
            margin-bottom: 38px;
          }
          span {
            font-size: 14px;
          }
        }
        .right {
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          color: #fff;
          p {
            width: 146px;
            height: 44px;
            line-height: 44px;
            background-color: #00a4ff;
            border-radius: 5px;
            margin: 0px;
            cursor: pointer;
          }
          .follow {
            background-color: #8b5cff;
          }
        }
      }
    }
  }
}
</style>
