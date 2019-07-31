<template>
  <transition name="fade">
    <div v-if="showSuc" class="paySuccess">
      <div class="payContent">
        <header class="header">
          <img src="@/assets/img/pay/paySuccess@2x.png" alt="">
        </header>
        <div class="lpc-text">
          <p>恭喜您支付成功~</p>
        </div>
        <div class="lpc-enterBtn">
          <div class="index" @click="goIndex">去商城看看</div>
          <div class="about" @click="goAbout">个人中心</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class PaySuccess extends Vue {
  @Prop() private showSuc!: boolean
  private type: number = 1
  private paySuccess: string = require('@/assets/img/pay/paySuccess@2x.png')
  private radionot: string = require('@/assets/img/pay/radio-not@2x.png')

  private created () {}
  private goIndex () {
    this.$router.push('/partnercollage/Index/index')
  }
  private goAbout () {
    this.$router.push('/partnercollage/Profile/index')
  }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .paySuccess {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    background: rgba(0, 0, 0, .6);   
    .payContent {
      width: 2.6rem;
      height: 1.8rem;
      background: #FFFFFF;
      border-radius: 5px;
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
      .header {
        text-align: center;
        padding-top: .27rem; 
        img {
          width: .4rem;
          height: .4rem;
        }
      }
      .lpc-text {
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: .16rem;
        color: #666666;
        letter-spacing: 0;
      }
      .lpc-enterBtn {        
        padding: .24rem .15rem .15rem .15rem;
        display: flex;
        .index {
          flex: 1;
          background-image: linear-gradient(90deg, #FF6109 0%, #FF8725 100%);
          border-radius: 5px;
          // display: inline-block;
          margin-right: .1rem;
          font-family: PingFangSC-Regular;
          font-size: .16rem;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
          padding: .13rem 0;
          // width: 45%;
        }
        .about {
          flex: 1;
          // display: inline-block;
          border: 1px solid #FF4F00;
          border-radius: 5px;
          text-align: center;
          padding: .13rem 0;
          font-family: PingFangSC-Regular;
          font-size: .16rem;
          color: #FF4F00;
          letter-spacing: 0;
          text-align: center;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
