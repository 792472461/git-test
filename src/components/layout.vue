<template>
  <div class="m-layout">
    <m-header></m-header>
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import header from "./heads/header";
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  components: {
    MHeader: header
  }
};
</script>

<style lang="scss" scoped></style>
