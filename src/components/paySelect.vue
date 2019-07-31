<template>
  <transition name="fade">
    <div class="paySelect" v-if="select" @click="paySelectClick($event)">
      <div class="payContent">
        <header class="header">
          <img src="@/assets/img/pay/return@2x.png" alt="" @click="returnFun"><span>选择支付方式</span>
        </header>
        <div class="lpc-pay">
          <ul>
            <li>
              <div>
                <p @click="selectRadio(1)"><img src="@/assets/img/pay/wx@2x.png" alt=""> <span>微信支付</span> <img :src="type === 1 ? radio : radionot" alt=""></p>
              </div>
            </li>
            <li>
              <div>
                <p @click="selectRadio(2)"><img src="@/assets/img/pay/ali@2x.png" alt=""> <span>支付宝支付</span> <img :src="type === 2 ? radio : radionot" alt=""></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="lpc-bottom-btn">
          <p @click="enter">
            确认
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class PaySelect extends Vue {
  public type: number = 1
  public radio: string = require('@/assets/img/pay/radio@2x.png')
  public radionot: string = require('@/assets/img/pay/radio-not@2x.png')
  @Prop() private select!: boolean
  @Emit('selected') public send (show: boolean, item?: any ) {}

  public created () {
    console.log(this.select)
  }
  // public activated () {
  //   // this.$destroy()
  //   console.log(this.select)
  // }
  public returnFun (): void {
    this.send(false) // 关闭支付弹窗
  }
  public selectRadio (item: number): void {
    this.type = item
  }
  public enter (): void {
    this.send(false, this.type) // 确认
  }
  public paySelectClick (e: any): void {
    if (e.target.classList.toString().indexOf('paySelect') === 0) {
      this.send(false) // 关闭支付弹窗
    }
  }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .paySelect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    background: rgba(0, 0, 0, .6);
    input {
      border: 1!important;
      -webkit-appearance: radio;
      appearance: radio;
    }
    .payContent {
      width: 2.6rem;
      height: 2.2rem;
      background: #FFFFFF;
      border-radius: 5px;
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
      .header {
        padding: .17rem .1rem;
        border-radius: 5px;
        line-height: normal;
        text-align: center;
        display: flex;
        align-items:center;
        justify-content:center;
        img {
          width: .12rem;
          height: .16rem;
          border-radius: 5px;
        }
        span {
          font-family: PingFangSC-Medium;
          font-size: .16rem;
          color: #333333;
          text-align: center;
          font-weight: bold;
          flex: 1;
        }
      }
      .lpc-pay {
        p {
          padding: .15rem;
          line-height: normal;
          display: flex;
          align-items:center;
          justify-content:center;
          img:first-child {
            width: .2rem;
            height: .2rem;
          }
          img:last-child {
            width: .16rem;
            height: .16rem;
          }
          span {
            flex: 1;
            margin-left: .1rem;
            vertical-align: middle;
          }
        }
      }
      .lpc-bottom-btn {
        width: 100%;
        text-align: center;
        margin-top: .1rem;
        p {
          display: inline-block;
          background-image: linear-gradient(90deg, #FF6109 0%, #FF8725 100%);
          border-radius: 5px;
          width: 2.3rem;
          // height: .44rem;
          padding: .11rem 0;
          font-family: PingFangSC-Regular;
          font-size: .16rem;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
        }
        // background: url("~@/assets/img/openteam.png") no-repeat;
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
