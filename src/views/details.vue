<template>
  <div class="details">
    <div class="detail-content">
      <div class="detail-img" :style="{ 'background': listDetails.color }">
        <lesson-cover :backIndex="listDetails.rand_picture" :lessonanme="listDetails.gradeName+listDetails.subjectName" class="lesson-cover">{{listDetails.gradeName}}{{listDetails.subjectName}}</lesson-cover>
      </div>
      <div class="original-price">
        <div class="price">
          <span>原价</span>
          <span>￥</span>
          <span>{{listDetails.classPrice || ''}}</span>
        </div>
        <div class="full-status">
          <p class="remain-number" v-if="listDetails.remaining !== 0">
            剩余<span class="rest-number">{{listDetails.remaining >= 3 ? 3 : listDetails.remaining}}</span>个名额
          </p>
          <p class="will-full"><img v-if="listDetails.remaining === 0" src="@/assets/img/alreadyfull.png"/><img v-else src="@/assets/img/willfull.png"/></p>
        </div>
      </div>
      <div class="detail-text">
        <p><span class="season">{{listDetails.quarterName}}</span><span class="year"> {{listDetails.year}}</span> | <span>{{listDetails.className}}</span></p>
        <p class="samep"><img src="@/assets/img/subject.png"><span>{{ listDetails.gradeName || '' }}{{ listDetails.subjectName || '' }}</span></p>
        <p class="samep"><img src="@/assets/img/startclassdate.png"><span>{{ listDetails.beginDate || '' }}~{{ listDetails.endDate || '' }}</span></p>
        <p class="samep"><img src="@/assets/img/lessonnum.png"><span>总课次:{{ listDetails.itemCount || '' }}</span></p>
        <p class="samep-adr"><img src="@/assets/img/classadress.png"><span>{{listDetails.areaName || ''}}</span></p>
      </div>
      <div class="team-price">
        <div class="one-team"><span>单人{{listDetails.classPrice}}</span></div>
        <div class="two-team"><span>每人{{listDetails.twoStudentPrice}}</span></div>
        <div class="three-team"><span>每人{{listDetails.threeStudentPrice}}</span></div>
      </div>
    </div>
    <div class="fotter">
      <div class="fotter-status foot-full-status" v-if="listDetails.remaining === 0">
        已满班
      </div>
      <div class="fotter-status foot-not-start" v-if="!isteam && listDetails.activityTimeStatus !== '00'"> <!-- 不是参团且活动未开始-->
        活动未开始
      </div>
      <div class="fotter-btn">
        <div class="returnIndex" @click="() => {this.$router.push('/partnercollage/Index/index')}">
            <p><img src="@/assets/img/homenot@2x.png" alt=""></p>
            <p href="javascript:void(0)">回首页</p>
        </div>
        <div class="describle">
          <span v-if="!isteam && isnew === 1 && listDetails.activityTimeStatus === '00' && listDetails.remaining !== 0">名额有限满班即封</span>
          <span v-if="!isteam && isnew === 2 && listDetails.activityTimeStatus === '00' && listDetails.remaining !== 0">已购买</span>
        </div>    
        <div class="join-activity join-orange" v-if="isteam && isnew === 1 && listDetails.remaining !== 0"> <!-- 参团是新生不满班-->
          <p class="money" v-if="listDetails.join_num === 1">￥{{listDetails.classPrice}}</p>
          <p class="money" v-if="listDetails.join_num === 2">￥{{listDetails.twoStudentPrice}}</p>
          <p class="money" v-else>￥{{listDetails.threeStudentPrice}}</p>
          <p class="joinBtn" @click="gobuy">参团</p>
        </div>
        <div class="join-activity join-grey" v-if="isteam && isnew === 1 && listDetails.remaining === 0"> <!-- 参团是新生满班-->
          <p class="money">￥{{listDetails.classPrice}}</p>
          <p class="joinBtn">参团</p>
        </div>
        <div class="join-activity join-grey" v-if="isteam && isnew === 2"> <!-- 参团是新生满班-->
          <p class="money">￥{{listDetails.classPrice}}</p>
          <p class="joinBtn">参团</p>
        </div>
        <div class="join-activity join-grey" v-if="!isteam && isnew === 1 && listDetails.activityTimeStatus !== '00'"> <!-- 不是参团且是新生且是活动未开始 -->
          <p class="money">￥{{listDetails.classPrice}}</p>
          <p class="joinBtn">购买</p>
        </div>
        <div class="join-activity join-grey" v-if="!isteam && isnew === 1 && listDetails.activityTimeStatus === '00' && listDetails.remaining === 0"> <!-- 不是参团且是新生且是活动已开始且满班 -->
          <p class="joinBtn">购买</p>
        </div>
        <div class="join-activity join-orange" @click="gobuy" v-if="!isteam && isnew === 1 && listDetails.activityTimeStatus === '00' && listDetails.remaining !== 0"> <!-- 不是参团且是新生且是活动已开始不满班 -->
          <p class="money">￥{{listDetails.classPrice}}</p>
          <p class="joinBtn">购买</p>
        </div>
        <div class="join-activity join-grey" v-if="!isteam && isnew === 2 && listDetails.activityTimeStatus !== '00'"> <!-- 不是参团且是老生且活动未开始 -->
          <p class="opengroup">去开团</p>
        </div>
        <div class="join-activity join-grey" v-if="!isteam && isnew === 2 && listDetails.activityTimeStatus === '00' && listDetails.remaining === 0"> <!-- 不是参团且是老生且是活动已开始且满班 -->
          <p class="opengroup">去开团</p>
        </div>
        <div class="join-activity join-orange" v-if="!isteam && isnew === 2 && listDetails.activityTimeStatus === '00' && listDetails.remaining !== 0"> <!-- 不是参团且是老生且是活动已开始不满班 -->
          <p class="opengroup" @click="goGroupType">去开团</p>
        </div>
      </div>
    </div>
    <div class="tip-wraper" v-if="showtip"><!--v-if="isteam && isnew === 2 || isFull"-->
      <div class="tipcontent">
        <img src="@/assets/img/smile.png"/>
        <p class="tip-text">{{tiptext}}</p>
        <p class="tip-btn" @click="gopersonal">{{tipbtn}}</p>
      </div>
    </div>
    <pay-success :showSuc="paySuccess" />
    <pay-select :select="showSelect" @selected="selected" />
    <v-loading v-if="showloading"></v-loading>
    <div class="loadingModal" v-show="loadingModal">
      <!--添加内部购买loading-->
      <img src="@/assets/img/loading/loading.svg">
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import paySelect from '@/components/paySelect.vue'
import lessonCover from '@/components/lessonCover.vue'
import paySuccess from '@/components/paySuccess.vue'

@Component({
  components: {
    paySelect,
    lessonCover,
    paySuccess
  }
})
export default class Details extends Vue {
  @Mutation private changeTips: any
  @Prop() private msg!: string
  private showloading: boolean = true
  private listDetails: any = {}
  private isnew: number = 1 // 是否新老生
  private isteam: number = 0 // 是否是参团进来的
  private classCode: string = '' // 该班级的classcode
  private tipbtn: string = '个人中心'
  private tiptext: string = '点击个人中心去开团'
  private showSelect: boolean = false
  private realpay: number = 0 // 下单时候，实际支付的金额
  private isFull: boolean = false // 下单前判断是否 参团名额是否已满
  private showtip: boolean = false // 展示弹框
  private orderId!: string
  private paySuccess: boolean = false
  private loadingModal: boolean = false

  private created () {
    (this as any).$wxService.initWxConfig();
    this.isteam = this.$route.query.tid ? 1 : 0
    this.classCode = String(this.$route.query.class_code);
    // console.log('-=--=--=', this.classCode);
    (this as any).$post('/partnercollage/Index/classDetail', {class_code: this.classCode}).then((res: any) => {
      // console.log(res)
      this.showloading = false
      if (res.status === 1 && res.data) {
        this.listDetails = res.data
        this.isnew = res.data.studentType
        // 判断参团进来的，不管是新老生，先判断是否是同一个学校的，再判断是否已经参团过,最后再判断是老生的话，去个人中心
        if (this.isteam) {
          if (res.data.is_school === 1) { // 不是同一学校
            this.showtip = true;
            this.tiptext = '当前拼团的班级商品与您所在学校不匹配,看看其他班级'
            this.tipbtn = '去商场看看'
          } else if (res.data.is_join === 1) { // 已经参团过
            this.showtip = true;
            this.tiptext = '点击个人中心去开团'
            this.tipbtn = '个人中心'
          } else if (res.data.studentType === 2) {
            this.showtip = true;
            this.tiptext = '点击个人中心去开团'
            this.tipbtn = '个人中心'
          }
        }
      } else {
       this.listDetails = {}
      }
    })
  }
  private gobuy () { // 拼团or购买
    // this.loadingModal = true // 弹出加载动画
    let handle = 0
    if (this.listDetails.join_num === 1) {
      handle = this.listDetails.price
    } else if (this.listDetails.join_num === 2) {
      handle = this.listDetails.twoStudentPrice
    } else {
       handle = this.listDetails.threeStudentPrice
    }
    const params: any = {
      classCode: this.classCode,
      totalMoney: this.listDetails.classPrice,
      handle,
      order_type: this.isteam ? 2 : 1,
      group_id: this.listDetails.group_id, // 参团时用，在url路径中获取
      order_name: this.listDetails.className,
      year: this.listDetails.year,
      quarter_name: this.listDetails.quarterName
    };
    (this as any).$post('/partnercollage/order/doAddOrder', params).then((res: any) => {
      // this.loadingModal = false
      if (res.status === 1) {
        this.showSelect = true // 弹出支付选择框
        this.orderId = res.data.order_id
      } else {
        if (res.msg === '库存已满') {
          this.showtip = true // 弹出已满班框
          this.tiptext = '此团已满人'
          this.tipbtn = '去商城看看'
        }
      }
    })
  }
  private goGroupType (): void { // 去开团
    // this.$router.push('/partnercollage/Group/groupType')
    this.$router.push({
      name: 'groupType',
      query: {
        erp_order_code: this.listDetails.erp_order_code,
        order_code: this.listDetails.order_code,
        class_code: this.listDetails.classCode,
        sg_id: this.listDetails.group_id
      }
    })
    // this.$router.push({ path: '/partnercollage/Group/groupType', query: { erp_order_code, order_code, class_code } })
  }
  private gopersonal () {
    if (this.tipbtn === '个人中心') {
      // 去个人中心页面
      this.$router.push({name: 'about'})
    } else {
      // 去商场首页
      this.$router.push('/')
    }
  }
  private selected (show: boolean, item?: number): void { // item 1微信 2支付宝
    this.showSelect = show
    // 这是按说是唤起支付
    if (item) {
      this.payGo(item)
    }
  }
  private payGo(item: any) {
    // this.showloading = true // 弹出加载动画
    const formData: any = {
      order_id: this.orderId,
      subjectName:  this.listDetails.subjectName,
      subjectCode: this.listDetails.subjectCode,
      gradeName: this.listDetails.gradeName,
      gradeCode: this.listDetails.gradeCode,
      type: item
    };
    // 微信1 支付宝2 type
    (this as any).$post('/partnercollage/Pay/pay', formData).then((res: any) => {
      // this.showloading = false // 关闭加载动画
      console.log(res)
      const opt = res.data.data;
      console.log(opt);
      if (item === 1) {
        (this as any).$wxService.wxPay(opt, this.payResultLater)
      } else {
        // 支付宝支付
        const alipayForm = res.data.replace(/\+/g, '%20')
        this.$router.push({name: 'alipay', query: {alipayForm, order_id: this.orderId}})
      }
    })
  }
  private payResultLater(result: any) {
    console.log(result)
    if (result.errMsg === 'chooseWXPay:ok') {
      this.showloading = true // 加载动画
      const lunxun: any = setInterval(() => { // 订单轮询
        (this as any).$post('/partnercollage/order/wheelTrainingPay', { order_id: this.orderId }).then((res: any) => { // 订单轮询
          if (res.status) {
            this.showloading = false // 轮询成功关闭
            clearInterval(lunxun)
            this.paySuccess = true
          }
        })
      }, 1000)
    } else {
      this.changeTips({ show: true, title: '支付失败' })
    }
  }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .details {
    .detail-content {
      padding-bottom: .48rem;
      .detail-img {
        width: 100%;
        height: 2.81rem;
        font-size:.42rem;
      }
      .original-price{
        padding: .11rem 0;
        background-image: linear-gradient(90deg, #FF6109 0%, #FF8725 100%);
        display: flex;
        justify-content: space-between;
        .price{ // 原价
          font-size: .14rem;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          margin-left: .14rem;
          span{
            display:block;
            &:nth-child(3){
              font-size: .22rem;
            }
          }
        }
        .full-status{ // 满班状态
          display:flex;
          align-items: center;
          margin-right: .14rem;
          .remain-number{
            margin-right: .06rem;
            font-size: .12rem;
            color: #FFFFFF;
            .rest-number{
              font-size: .18rem;
            }
          }
          .will-full {
            width: .48rem;
            height: .15rem;
            img {
              width: 100%;
            }
          }
        }
      }
      .detail-text {
        text-align: left;
        padding: .12rem .16rem 0 .14rem;
        font-size: .16rem;
        color: #333333;
        font-family: PingFangSC-Semibold;
        p{
          &:nth-child(1){
            font-weight: 600;
          }
          &:nth-child(2){
            margin-top: .09rem;
          }
          &:not(:first-child){
            margin-bottom: .03rem;
          }
        }
        .samep{
          display:flex;
          align-items: center;
          font-size: .12rem;
          color:#999999;
          img{
            display: block;
            width: .14rem;
            height: .14rem;
            margin-right: .04rem;
          }
          span{
            display: block;
          }
        }
        .samep-adr{
          display:flex;
          align-items: flex-start;
          font-size: .12rem;
          color:#999999;
          img{
            display: block;
            width: .14rem;
            height: .14rem;
            margin-right: .04rem;
            position: relative;
            top: .02rem;
          }
          span{
            display: block;
            line-height: .18rem;
          }
        }
        .season{
          padding: .01rem .03rem;
          display: inline-block;
          text-align: center;
          border-radius: .02rem;
          line-height: normal;
          background: #4db2ff;
          font-size: .12rem;
          color: #FFFFFF;
          margin-right: .04rem;
        }
      }
      .team-price{
        display: flex;
        padding: 0 .16rem 0 .14rem;
        margin-top: .14rem;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FF8400;
        span{
          display: inline-block;
          margin: .32rem 0rem .08rem .1rem;
        }
        .one-team{
          flex: 1;
          height: .6rem;
          background: url("~@/assets/img/oneteam.png") no-repeat;
          background-size: 100%;
        }
        .two-team{
          flex: 1;
          background: url("~@/assets/img/twoteam.png") no-repeat;
          background-size: 100%;
          margin:0 .07rem;
        }
        .three-team{
          flex: 1;
          background: url("~@/assets/img/threeteam.png") no-repeat;
          background-size: 100%;
        }
      }
    }
    .fotter {
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      .fotter-status{
        width: 100%;
        padding: .07rem 0;
        text-align: center;
        font-size: .14rem;
        color: #FFFFFF;
      }
      .foot-full-status{
        background:#666666;
      }
      .foot-not-start{
        background: #FDB431;
      }
      .fotter-btn{
        width: 100%;
        display: flex;
        height: .48rem;
        line-height: normal;
        background: #FFFFFF;
        box-shadow: 0 0 5px 0 rgba(0,0,0,0.08);
        .returnIndex{
          width: .6rem;
          border-right: .01rem solid #CDCDCD;
          p {
            display: block;
            text-decoration: none;
            font-family: PingFangSC-Regular;
            font-size: .12rem;
            letter-spacing: 0;
            text-align: center;
            color:#A6AFBB;
            &:nth-child(1){
              margin-top:.08rem;
            }
            img {
              width: .16rem;
              height: .16rem;
              text-align: center;
              display: inline-block;
            }
          }
        }
        .describle{
          flex: 1;
          display:flex;
          align-items: center;
          justify-content: flex-end;
          span{
            display:block;
            margin-right: .08rem;
            font-size: .12rem;
            color: #FF4F00;
          }
        }
        .join-activity {
          width: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          p{
            font-family: PingFangSC-Semibold;
            font-size: .2rem;
            color: #FFFFFF;
            width:100%;
            text-align: center;
          }
          .money{
            margin-top: .01rem;
          }
          .joinBtn {
            font-family: PingFangSC-Regular;
            font-size: .12rem;
          }
          .opengroup{
            font-size: .16rem;
            margin-top: .13rem;
          }
        }
        .join-orange{
          background-image: linear-gradient(90deg, #FF6109 0%, #FF8725 100%);
        }
        .join-grey{
          background: #DFE3E5;
        }
      }
    }
    .tip-wraper{
      width: 100%;
      height: 100%;
      z-index:10000;
      position: fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      background: rgba(0,0,0,0.60);
      .tipcontent{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 2.2rem;
        height: 2.2rem;
        transform: translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: .05rem;
        padding: .15rem;
        img {
          display: block;
          width: .4rem;
          height: .4rem;
          margin: .32rem auto .09rem auto;
        }
        .tip-text{
          font-family: PingFangSC-Regular;
          font-size: .14rem;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
          line-height: 24px;
          margin-bottom: .18rem;
        }
        .tip-btn {
          padding: .11rem 0;
          text-align: center;
          margin: auto;
          font-family: PingFangSC-Regular;
          font-size: .16rem;
          color: #FFFFFF;
          background-image: linear-gradient(90deg, #FF6109 0%, #FF8725 100%);
          border-radius: .05rem;
        }
      }
    }
    .paySelect {
      input {
        border: 1!important;
        -webkit-appearance: radio;
        appearance: radio;
      }
    }
    .loadingModal {
      min-height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFF;
      background: rgba(0, 0, 0, 0.6);
      z-index: 999999999999999;
    }
  }
</style>
