<template>
  <ul class="comment-list">
    <li
      v-for="_item in data"
      :key="_item.id"
    >
      <div class="sub-img">
        <img :src="_item.avatar" @click="toMine(_item.user_id)" />
      </div>
      <div class="sub-con">
        <div>
          <span class="nick">{{ _item.nickname }}</span>
          <span v-if="_item.userInfo != ''">&nbsp;&nbsp;回复：<i @click="toMine(_item.user_id)">@{{ _item.userInfo.nickname }}</i></span>
        </div>
        <div>
          <p>
            {{ _item.content }}
          </p>
        </div>
        <div class="sub-btom">
          <span class="sub-timer"> {{ _item.create_time }}</span>
          <div class="sub-icon">
            <span class="sub-icons">
              <img
                @click="_item.isLike == 0 ? hfdzan(_item.id) : hfcancelDzan(_item.id)"
                :src="_item.isLike == 0 ? require('@/assets/images/home/dzan.png') : require('@/assets/images/home/dzan1.png')"
              />
              <span>{{
                _item.likes
                }}</span></span>
            <span
              class="sub-icons"
              @click="currentCommentShow = index"
            >
              <img
                @click="_item.isTread == 0 ? hfcai(_item.id) : hfcancelCai(_item.id)"
                :src="_item.isTread == 0 ? require('@/assets/images/home/cai.png') : require('@/assets/images/home/cai1.png')"
              /><span>{{
                _item.tread_num
                }}</span></span>
            <span class="sub-icons"><img
                @click="replySecond(_item.id)"
                src="@/assets/images/home/plun.png"
              />
            </span>
            <span
              class="sub-icons"
              @click="complain2(_item.id)"
            >
              <img src="@/assets/images/home/wjing.png" /></span>
          </div>
        </div>
      </div>
      <!-- 回复框 -->
      <div
        class="reply1"
        v-show="replySecondId === _item.id"
      >
        <img
          class="name"
          :src="avatar"
        />
        <textarea v-model="replyContent1"></textarea>
        <div
          class="sure"
          @click="sureSecondReply(_item.id)"
        >
          确定
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  props: {
    data: Array,
    itemId: {
      require: true
    },
    index: Number
  },
  data() {
    return {
      currentCommentShow: -1,
      replyContent1: '',
      replySecondId: -1,
      lock1: true,
      complains2: 0
    }
  },
  methods: {
    hfdzan(id) {
      this.$emit('hfdzan', id)
    },
    hfcancelDzan(id) {
      this.$emit('hfcancelDzan', id)
    },
    hfcai(id) {
      this.$emit('hfcai', id)
    },
    hfcancelCai(id) {
      this.$emit('hfcancelCai', id)
    },
    complain2(hfId) {
      this.complains2 = 1
      this.$emit('tsBox', this.complains2, hfId)
    },

    replySecond(index) {
      if (this.lock1 === true) {
        this.replySecondId = index
        this.lock1 = false
        this.$emit('update:replyInputId', false)
        return
      }

      if (this.lock1 === false) {
        this.replySecondId = false
        this.lock1 = true
        return
      }
    },
    sureSecondReply(id) {
      this.$emit('sureSecondReply', this.itemId, id, this.replyContent1)
    },
    toMine(id) {
      var userId = Cookies.get('userId')
      if (id == userId) {
        this.$router.push(`/personalCenter?userId=${id}&type=message`)
      } else {
        this.$router.push(`/perHome?userId=${id}&type=message`)
      }
    }
  },
  computed: {
    avatar() {
      return Cookies.get('avatar') || ''
    }
  }
}
</script>

<style lang="less" scoped>
ul.comment-list {
  width: 800px;
  height: auto;
  margin-left: 120px;
  li {
    overflow: hidden;
    margin-top: 20px;
    padding-bottom: 15px;
    .reply1 {
      position: relative;
      display: flex;
      height: 70px;
      margin-top: 110px;
      img {
        position: absolute;
        top: 50%;
        margin-top: -25px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      textarea {
        width: 550px;
        height: 70px;
        border: 1px solid #ff4a9c;
        padding: 10px;
        border-radius: 5px;
        margin-left: 60px;
      }
      .sure {
        width: 70px;
        height: 70px;
        background-color: #ff4a9c;
        line-height: 70px;
        color: #fff;
        border-radius: 5px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .sub-img {
    float: left;
    width: 40px;
    height: 40px;
    img {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ccc;
      cursor: pointer;
    }
  }
  .sub-con {
    font-size: 14px;
    float: left;
    width: 720px;
    text-align: left;
    // border: 1px solid red;
    margin-left: 10px;
    margin-top: 10px;
    .nick {
      color: #000;
    }
    i {
      color: #ff4a9c;
      cursor: pointer;
    }
    p {
      display: inline-block;
      width: 700px;
      margin-top: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      color: #000;
    }
    .sub-btom {
      font-size: 12px;
    }
    .sub-timer {
      float: left;
      color: #a3a3a3;
    }
    .sub-icon {
      float: left;
      margin-left: 30px;
      .sub-icons {
        display: inline-block;
        width: 80px;
      }
      img {
        width: 18px;
        height: 19px;
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>