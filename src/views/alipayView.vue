<template>
  <div class="Pending">
    <div class="in-weixin" v-if="isWeixin">
      <div class="not-pay" v-if="!payStatus">
        <div class="weixin-tips">
          <div class="weixin-tip-img">
            <img src="@/assets/img/weixin-tips@2x.png" alt="">
          </div>
          <div class="weixin-tip-content">
            请在右上角菜单中，选择在浏览器中打开
            <br/>
            以便完成支付宝支付
          </div>
        </div>
        <div class="weixin-img" :class="{'ios':isIOS,'android':isAndroid}"></div>
      </div>
      <div class="have-pay" v-else>
        <div v-show="showloading">
          <p>检查支付结果中...</p>
          <p>
          <img src="@/assets/img/loading/loading.svg">
          </p>
        </div>
        <div v-show="!showloading" class="">
          <p>{{payResult}}</p>
        </div>
        
      </div>
    </div>
    <div class="in-browser" v-if="!isWeixin">
      <p>支付跳转中...</p>
    </div>
    <div class="payment-from" v-html="paymentForm"></div>
    <pay-success :showSuc="paySuccess" />
    <!--<v-loading v-if="showloading"></v-loading>-->
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import paySuccess from '@/components/paySuccess.vue'
@Component({
  components: {
     paySuccess
  }
})
export default class Home extends Vue {
  public option!: any
  public isWeixin: boolean = this.osweiXin()
  public isIOS: boolean = this.osIOS()
  public isAndroid = this.osAndroid()
  public payStatus: boolean = false
  public paymentForm: any = ''
  public orderId: any = ''
  public showloading: boolean = true
  public payResult: string = ''
  private paySuccess: boolean = false
  @Mutation private changeTips: any

  public created() {
    // this.option = this.$route.query.aliform
    this.orderId = this.$route.query.order_id
  }

  public mounted() {
    if (!this.isWeixin) {
      this.SubmitPay()
    }
    setTimeout(() => {
      this.payStatus = true
      this.checkCount()
    }, 5000)
  }
  public checkCount() {
    // this.showloading = true
    (this as any).$post('/partnercollage/order/wheelTrainingPay', { order_id: this.orderId }).then((res: any) => { // 订单轮询
      // res.status=1
      if (res.status) {
        this.showloading = false // 轮询成功关闭
        // clearInterval(lunxun)
        this.paySuccess = true
      } else {
        if (res.status === 0 && res.msg === '未支付') {
          setTimeout(() => {
            this.checkCount()
          }, 1000)
        } else {
          this.showloading = false
          this.payResult = res.msg
          //  this.changeTips({ show: true, title: '支付失败' })
        }
      }
    })
  }
  public SubmitPay () {
    const optionAlipayFrom: any = this.$route.query.alipayForm || ''
    // const optionAlipayFrom = ''
    this.paymentForm = decodeURIComponent(optionAlipayFrom)
    setTimeout(() => {
      const fm: any = document.getElementsByTagName('form')[0];
      fm && fm.submit()
    }, 50)
  }
  public osweiXin() {
    const ua: string = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
      return true;
    }
    return false;
  }
  public osIOS() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i)) {
      return true;
    } else {
      return false;
    }
  }
  public osAndroid() {
    const ua = window.navigator.userAgent;
    if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
      return true
    } else {
      return false
    }
  }
}
</script>

<style lang="scss">
  .weixin-tip-img{
    position:absolute;
    right:0;
    top:0;
    img{
      width:.74rem;
    }
  }
  .not-pay{  
    padding-top:1rem;
    .weixin-tip-content {
      padding-left:.1rem;
      font-size:.16rem;
      color:#009900;
      font-weight:bold;
    }
  }
  .have-pay {
    padding-top: .4rem;
    text-align: center;
  }
</style>
