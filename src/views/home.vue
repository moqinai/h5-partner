<template>
  <div class="home">
    <!-- <transition name="fade"> -->
      <router-view class="aaa"></router-view>
    <!-- </transition> -->
    <nav-tab />
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import navTab from '@/components/navTab.vue'
  @Component({
    components: { navTab }
  })
  export default class Home extends Vue {
    public created () {}
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .home {
    position: relative;
    .aaa {
      // background: #FFF;
      height: 100%;
      // height: calc(100% - .5rem);
      padding-bottom: .5rem;
    }
    
  }
  
</style>
