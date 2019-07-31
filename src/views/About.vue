<template>
  <div class="about">
    <div class="user-info">
      <div class="avatar">
        <img :src="wxHeadImgUrl"> <!--  :alt="userInfo.wx_nickname" -->
      </div>
      <h4>{{ userInfo.wx_nickname }}</h4>
      <button class="btn" @click="goOpenGroup(userInfo.join_status)">去开团</button>
    </div>
    <ul>
      <li @click="goOpenUnpaid(userInfo.pay_status)">
        <div>
          <img src="@/assets/img/about-notPay.png" alt="待支付订单">
          <span>待支付订单</span>
        </div>
        <img src="@/assets/img/about-next.png" alt="next">
      </li>
      <li @click="goOpenHistory(userInfo.index_status)">
        <div>
          <img src="@/assets/img/about-myTeam.png" alt="我的拼团">
          <span>我的拼团</span>
        </div>
        <img src="@/assets/img/about-next.png" alt="next">
      </li>
      <li @click="checkQuestion">
        <div>
          <img src="@/assets/img/about-questions.png" alt="常见问题">
          <span>常见问题</span>
        </div>
        <img src="@/assets/img/about-next.png" alt="next">
      </li>
      <li @click="service">
        <div>
          <img src="@/assets/img/about-service.png" alt="客服服务">
          <span>客服服务</span>
        </div>
        <img src="@/assets/img/about-next.png" alt="next">
      </li>
    </ul>

     <div class="empty-mask" v-if="isEmpty" @click.stop.prevent="closeCue">
      <div class="empty-cue">
        <h4>1人原价，拼团价格均分</h4>
        <p>赶快抢购，享受超值优惠<br/> 同时邀请小伙伴来一起拼团吧！</p>
        <button @click.stop.prevent="goMall">去商城看看</button>
      </div>
    </div>
    <introduction :is-show-intr="isShow" :question-oragree="questionOragreement" @closeInParent="closeQuestion"> </introduction>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import introduction from '@/components/introduction.vue';

@Component({
  components: {
    introduction
  }
})
export default class Home extends Vue {
  private userInfo: any = {}
  private isEmpty: boolean = false
  // 组件信息 ？默认值
  private isShow: boolean = false
  private questionOragreement: string = 'question'
  private wxHeadImgUrl: string = require('@/assets/img/grouptype/vacancy.png')

  public created () {
    (this as any).$post('/partnercollage/Profile/indexInfo').then((res: any) => {
      if (res.status === 1) {
        this.userInfo = res.data
        this.wxHeadImgUrl = res.data.wx_headimgurl
      }
    })
  }
  // 开团
  private goOpenGroup (status: number): void {
    console.log(status)
    if (status === 1) {
      this.$router.push('/partnercollage/Order/reportedOrder')
    } else {
      this.isEmpty = true
    }
  }
  // 待支付
  private goOpenUnpaid (status: number): void {
    if (status === 1) {
      this.$router.push('/partnercollage/Pay/unPaid')
    } else {
      this.isEmpty = true
    }
  }
  // 我的拼团
  private goOpenHistory (status: number): void {
    if (status === 1) {
      this.$router.push('/partnercollage/History/groupHistory')
    } else {
      this.isEmpty = true
    }
  }
  // 客服
  private service (): void {
    this.$router.push('/partnercollage/Profile/serviceIndex')
  }
  // 常见问题
  private checkQuestion () {
    this.isShow = true;
  }
  // 关闭常见问题
  private closeQuestion (show: boolean): void {
    this.isShow = show
  }
  private goMall (): void {
    this.isEmpty = false
    this.$router.push('/partnercollage/Index/index')
  }
  private closeCue(): void {
    this.isEmpty = false;
  }
}
</script>

<style lang="scss" scoped>
  .about {
    // overflow: hidden;
    .user-info {
      position: relative;
      padding-top: .28rem;
      height: 1.8rem;
      background: url("~@/assets/img/about-bg.png") no-repeat;
      background-size:cover;
      .avatar {
        width: .8rem;
        height: .8rem;
        margin: 0 auto;
        background: #f2f2f2;
        border-radius: 50%;
        img {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          border: .02rem solid #fff;
        }
      }
      h4 {
        margin-top: .04rem;
        text-align: center;
        font-size: .16rem;
        color: #fff;
      }
      .btn {
        position: absolute;
        left: 50%;
        bottom: -.22rem;
        width: 1.2rem;
        height: .44rem;
        margin-left: -.6rem;
        font-size: .16rem;
        color: #fff;
        border: 2px solid #fff;
        border-radius: .22rem;
        background-image: linear-gradient(270deg, #FF6109 0%, #FF8725 100%);
      }
    }
    ul {
      margin-top: .27rem;
      padding-left: .2rem;
      padding-right: .2rem;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .64rem;
        border-bottom: 1px solid #EBEBEB;

        >img {
          width: .1rem;
          height: .1rem;
        }
        div {
          display: flex;
          align-items: center;
          img {
            width: .38rem;
          }
          span {
            margin-left: .06rem;
            font-size: .14rem;
            color: #999;
          }
        }
      }
    }
    
    // empth-mask
    .empty-mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.60);
      .empty-cue {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2.82rem;
        height: 2.85rem;
        margin-top: -1.42rem;
        margin-left: -1.41rem;
        background: url("~@/assets/img/about-empty.png") no-repeat;
        background-size: 2.82rem 2.85rem;
        h4 {
          margin-top: 1.38rem;
          font-size: .18rem;
          color: #666;
          text-align: center;
        }
        p {
          margin-top: .14rem;
          font-size: .14rem;
          color: #999;
          text-align: center;
        }
        button {
          display: block;
          width: 2.3rem;
          height: .44rem;
          margin: .1rem auto 0;
          font-size: .16rem;
          color: #fff;
          background-image: linear-gradient(270deg, #FF6109 0%, #FF8725 100%);
          border-radius: .05rem;
          border: 0;

        }
      }
    }
  }
</style>
