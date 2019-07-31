<template>
  <transition name="fade">
    <div v-if="showPersonal" class="lpc-personal" @click="clickClose">
      <div class="lpc-header">
        <p>恭喜您拼团成功！</p>
        <p>快去请身边的朋友参团吧~</p>
      </div>
      <div class="lpc-img">
        <img class="img" :src="personalImg" alt="">
      </div>
      <div class="lpc-footer">
        <p>长按保存图片至手机</p>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

  @Component
  export default class Personal extends Vue {
    @Prop() private showPersonal!: boolean
    @Prop() private personalImg!: boolean
    @Emit('hidePersonal') public send (hide: boolean) {}

    public created () {}
    public clickClose (e: any): void {
      console.log(e.target.classList.toString().indexOf('img'))
      if (e.target.classList.toString().indexOf('img') !== 0) {
        this.send(false)
      }
    }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .lpc-personal {
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, .75);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    overflow: auto;
    p {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
    }
    .lpc-img {
      text-align: center;
      img {
        width: calc(100% - 1rem);
      }
    }
    .lpc-header {
      padding: .46rem 0 .17rem 0;
    }
    .lpc-footer {
      padding: .15rem 0 .43rem 0;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
