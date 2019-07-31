<template>
  <div class="groupType">
    <div class="lpc-content">
      <div class="lpc-content-header">
        <div class="header-img">
          <img :src="pageData.join_count === 3 ? fullTitle : title" alt="">
        </div>
        <div class="lpc-header-text" >
          <div v-if="pageData.total_num === 2 && pageData.isMain === 1"> <!-- 如是团主且总人数2个人了 -->
            <p>您发起的拼团已有<span>{{ pageData.join_count }}位</span>小伙伴报名</p>
            <p>恭喜您已累计获得助学金<span>{{ money }}元</span>，</p>
            <p>班级开课<span>*节</span>后请到校区前台领取</p>
          </div>
          <div v-if="pageData.total_num === 3 && pageData.isMain === 1"> <!-- 如是团主且总人数3个人了，同时显示去首页弹框 -->
            <p>您发起的拼团已有<span>{{ pageData.join_count }}位</span>小伙伴报名，此次团报已满员</p>
            <p>恭喜您已累计获得助学金<span>{{ money }}元</span>，</p>
            <p>班级开课<span>*节</span>后请到校区前台领取</p>
          </div>
          <!-- <div v-if="!(pageData.current_num === 2 && pageData.isMain !== 1 && pageData.total_num === 2)"> 如不是团主且是第2个人，且总人数为2时
            <p>您发起的拼团已有<span>{{ pageData.join_count }}位</span>小伙伴报名</p>
            <p>恭喜您已累计获得助学金<span>{{ money }}元</span>，</p>
            <p>班级开课<span>*节</span>后请到校区前台领取</p>
          </div> -->
          <div v-if="pageData.current_num === 2 && pageData.isMain !== 1 && pageData.total_num === 3"> <!-- 如不是团主且是第2个人，且总人数为3时,同时显示去首页弹框 -->
            <p>此团又有<span>{{ pageData.join_count }}位</span>小伙伴报名，此次团报已满员</p>
            <p>恭喜您已累计获得助学金<span>{{ money }}元</span>，</p>
            <p>班级开课<span>*节</span>后请到校区前台领取</p>
          </div>
          <!-- <div v-if="pageData.current_num === 3 && pageData.isMain !== 1 && pageData.total_num === 3"> 如不是团主且是第3个人，且总人数为3时,同时显示去首页弹框
            <p>此次团报已满员</p>
          </div> -->
        </div>
        <div class="header-img-list">
          <ul>
            <li v-for="(list, index) in pageData.info" :key="index">
              <div class="wx-img">
                <img class="img" :src="list.wx_headimgurl" alt="">
                <img class="head-img" v-if="index === 0" src="@/assets/img/grouptype/head@2x.png" alt="">
              </div>
              <p class="wx-name">{{ list.stu_name }}</p>
            </li>
          </ul>
        </div>
        <div class="lpc-price">
          <ul>
            <li class="price-img">
              <p>单人{{ pageData.order_ori_price }}元</p>
            </li>
            <li class="price-img">
              <p>单人{{ pageData.twoStudentPrice }}元</p>
            </li>
            <li class="price-img">
              <p>单人{{ pageData.threeStudentPrice }}元</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="lpc-split">
        <img src="@/assets/img/grouptype/hrImg.jpg" alt="">
      </div>
      <div class="lpc-bottom-btn">
        <div class="countNotFull" v-if="pageData.join_count !== 3">
          <p @click="shareFun">邀请好友拼团</p>
          <p @click="openPersonal">生成拼团海报</p>
        </div>
        <div class="countFull" v-else>
          <p @click="goIndex">去商城看看</p>
        </div>
      </div>
    </div>
    <personal :personalImg="personalImg" :showPersonal="showPersonal" @hidePersonal="hidePersonal"></personal>
    <v-loading v-if="showloading"></v-loading>
    <transition name="fade">
      <div class="lpc-share" v-if="shareLoading" @click="shareClick"> <!-- 分享指向 -->
        <div class="weixin-tip-img">
          <img src="@/assets/img/weixin-tips@2x.png" alt="">
        </div>
        <div class="weixin-tip-content">
          请在右上角菜单中选择分享
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import personal from '@/components/personal.vue'
// import paySuccess from '@/components/paySuccess.vue'

@Component({
  components: { personal }
})
export default class GroupType extends Vue {
  @Prop() private msg!: string;
  private pageData: any = {}
  private showloading: boolean = true
  private showPersonal: boolean = false
  private fullTitle: string = require('@/assets/img/grouptype/full@2x.png')
  private title: string = require('@/assets/img/grouptype/title@2x.png')
  private vacancy: string = require('@/assets/img/grouptype/vacancy@2x.png')
  private share: string = require('@/assets/img/share.png')
  private money: number = 0 // 助学金额
  private params: any = {} // 参数
  private personalImg: string = ''
  private shareLoading: boolean = false

  public created () {
    // console.log(this.$route.query)
    this.params = this.$route.query;
    // this.params = {
    //   erp_order_code: '',
    //   order_code: '',
    //   class_code: 'MAYI000068',
    //   sg_id: ''
    // }
    (this as any).$wxService.initWxConfig()
    const obj: any = {
      erp_order_code: this.params.erp_order_code,
      order_code: this.params.order_code,
      class_code: this.params.class_code
    };
    (this as any).$post('/partnercollage/order/doOpenGroup', obj).then((res: any) => {
      console.log(res)
      if (res.status) {
        this.pageData = res.data
        this.personalImg = res.data.posterUrl
        let corr = 0;
        if (res.data.current_num === 1) {
          corr = res.data.order_ori_price
        } else if (res.data.current_num === 2) {
          corr = res.data.twoStudentPrice
        } else if (res.data.current_num === 3) {
          corr = res.data.threeStudentPrice
        }
        this.money = res.data.order_money - corr // 助学金额 = 实际支付金额 - 对应第几个人金额
        const infoLength: number = this.pageData.info.length
        const objImg: any = {
          wx_headimgurl: this.vacancy,
          stu_name: ''
        }
        if (infoLength < 3) {
          const lnum = 3 - infoLength
          for (let i = 0; i < lnum; i++) {
            this.pageData.info.push(objImg)
          }
        }
        this.shareLinkFun() // 初始化分享方法
      }
      this.showloading = false
    })
  }
  private createPersonal (): void {
    this.$router.push('/partnercollage/Image/personal')
  }
  private goIndex (): void { // 去商城
    this.$router.push('/partnercollage/Index/index')
  }
  private shareFun (): void { // 分享海报方法
    this.shareLoading = true
  }
  private openPersonal (): void { // 打开拼团海报
    this.showPersonal = true
  }
  private hidePersonal (hide: boolean): void {
    this.showPersonal = hide
  }
  private shareLinkFun (): void { // 初始化分享方法
    console.log('初始化分享方法')
    const opt: any = {
      title: '【朴新教育】3人报名仅需1人学费',
      desc: '老带新超值优惠，手慢无~',
      link: 'http://' + window.location.host + '/partnercollage/Wxspell/index?tid=' + this.pageData.sg_id + '&class_code=' + this.pageData.class_code + '&schoolCode=' + this.pageData.school_code,
      imgUrl: this.share
    };
    (this as any).$wxService.shareAppMessage(opt)
  }
  private shareClick (): void {
    this.shareLoading = false
  }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .groupType {
    width: 100%;
    padding: .2rem;
    background-image: linear-gradient(90deg, #FF6109 0%, #FF8725 100%);
    .lpc-content {
      background: #FFF;
      border-radius: 6px;
      // padding: .2rem;
      margin-bottom: .2rem;
      // padding-left: .27rem;
      // padding-right: .18rem;
      // background: url("~@/assets/img/grouptype/bgcard@2x.png") no-repeat;
      // background-size: 100%;
      .lpc-content-header {
        padding: .2rem;
      }
      .header-img {
        width: 100%;
        text-align: center;
        padding-top: .16rem;
        img {
          width: 2.9rem;
          height: .71rem;
        }
      }
      .lpc-header-text {
        padding: .13rem 0 .15rem 0;
        font-family: PingFangSC-Regular;
        font-size: .13rem;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
        line-height: .19rem;
        span {
          color: #FF4F00;
        }
      }
      .header-img-list {
        background: rgba(255,143,0,0.10);
        border-radius: 5px;
        ul {
          display: flex;
          li {
            height: 1.22rem;
            flex: 1;
            padding: .15rem .15rem .11rem .15rem;
            .wx-img {
              // border: 1px solid red;
              position: relative;
              margin-bottom: .07rem;
              .img {
                width: .7rem;
                height: .7rem;
                border-radius: 50%;
              }
              .head-img {
                width: .36rem;
                height: .16rem;
                position: absolute;
                bottom: -.1rem;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
            .wx-name {
              text-align: center;
            }
          }
        }
      }
      .lpc-price {
        margin-top: .1rem;
        ul {
          display: flex;
          li.price-img {
            flex: 1;
            width: .93rem;
            height: .5rem;
            margin-right: .08rem;
            position: relative;
            p {
              font-family: PingFangSC-Regular;
              font-size: .11rem;
              color: #FF8400;
              letter-spacing: 0;
              position: absolute;
              left: .08rem;
              bottom: .07rem;
            }
          }
          li:first-child {
            background: url("~@/assets/img/grouptype/one@2x.png") no-repeat;
            background-size: 100%;
          }
          li:nth-child(2) {
            background: url("~@/assets/img/grouptype/two@2x.png") no-repeat;
            background-size: 100%;
          }
          li:last-child {
            margin-right: 0;
            background: url("~@/assets/img/grouptype/three@2x.png") no-repeat;
            background-size: 100%;
          }
        }
      }
      .lpc-split {
        img {
          width: 100%;
        }
      }
      .lpc-bottom-btn {
        padding: .2rem;
        text-align: center;
        p {
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: .16rem;
          letter-spacing: 0;
          padding: .12rem 0;
          line-height: normal;
          width: 80%;
          color: #FFF;
          background-image: linear-gradient(90deg, #FF6109 0%, #FF8725 100%);
          border-radius: 5px;
          margin: .05rem 0;
        }
        .countNotFull {
          p:last-child {
            color: #FF4F00;
            border: 1px solid #FF4F00;
            background: #FFF;
            border-radius: 5px;
          }
        }
      }
    }
    .lpc-share {
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .weixin-tip-img {
        position: fixed;
        right: .1rem;
        top: 0;
        img {
          width:.74rem;
        }
      }
      .weixin-tip-content {        
        padding-left: .1rem;
        font-size: .16rem;
        color:#FFF;
        font-weight:bold;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
