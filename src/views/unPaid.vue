<template>
  <div class="unPaid">
    <div class="unPaid-content">
      <ul>
        <li v-for="(list, index) in dataList" :key="index">
          <div class="list-top">
            <p>下单时间: {{list.create_time}}</p>
            <p>待支付</p>
          </div>
          <div class="list-info">
            <div class="list-left">
              <div class="list-img">
                <lesson-cover :backIndex="list.rand_picture" class="lesson-cover">{{list.gradeName}}{{list.subjectName}}</lesson-cover>
              </div>
            </div>
            <div class="list-right">
              <!-- <div class="list-pro"> -->
                <div class="class-name">
                  <div class="class-price">
                    ￥{{list.classPrice}}
                    <br>
                    <span>x1</span>
                  </div>
                  <span class="class-title">{{list.subjectName}}</span>
                    {{list.className}}
                </div>
                <p class="class-time"><img src="@/assets/img/startclassdate.png"><span>{{list.beginDate}}~{{list.endDate}}</span></p>
                <p class="class-count"><img src="@/assets/img/lessonnum.png"><span>共{{list.itemCount}}课次</span></p>
                <p class="class-address"><img src="@/assets/img/classadress.png"><span>{{list.areaName}}</span></p>
              <!-- </div> -->
            </div>
          </div>
          <div class="list-bttom">
            <p><span>实付</span><span>￥{{list.order_price}}</span></p>
            <div class="goPay">
              <button @click="goPay(list)">去支付</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <pay-success :showSuc="paySuccess" />
    <pay-select :select="showSelect" @selected="selected" />
    <v-loading v-if="showloading"></v-loading>
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
export default class Unpaid extends Vue {
  @Mutation private changeTips: any
  private dataList: any[] = []
  private showSelect: boolean = false
  private showloading: boolean = true
  private paySuccess: boolean = false
  private listDetails: any = {} // 当前选中
  private created () {
    (this as any).$post('/partnercollage/Pay/getUnPaidData').then((res: any) => {
      if (res.status) {
        this.dataList = res.data
      }
      this.showloading = false
    })
  }
  private goPay (list: any): void { // 唤起支付框
    this.showSelect = true
    this.listDetails = list
  }
  private selected (show: boolean, item?: number): void { // item 1微信 2支付宝
    this.showSelect = show
    if (item) {
      this.payGo(item)
    }
  }
  private payGo(item: any) {
    // this.showloading = true // 弹出加载动画
    const formData: any = {
      order_id: this.listDetails.order_id,
      subjectName:  this.listDetails.subjectName,
      subjectCode: this.listDetails.subjectCode,
      gradeName: this.listDetails.gradeName,
      gradeCode: this.listDetails.gradeCode,
      type: item
    };
    console.log(formData);
    // 微信1 支付宝2 type
    (this as any).$post('/partnercollage/Pay/pay', formData).then((res: any) => {
      // this.showloading = false // 关闭加载动画
      const opt = res.data.data
      if (item === 1) {
        (this as any).$wxService.wxPay(opt, this.payResultLater)
      } else {
        // 支付宝支付
        const alipayForm = res.data.replace(/\+/g, '%20')
        this.$router.push({ name: 'alipay', query: { alipayForm, order_id: this.listDetails.order_id } })
      }
    })
  }
  private payResultLater(result: any) {
    console.log(result)
    if (result.errMsg === 'chooseWXPay:ok') {
      this.showloading = true // 加载动画
      const lunxun: any = setInterval(() => { // 订单轮询
        (this as any).$post('/partnercollage/order/wheelTrainingPay', { order_id: this.listDetails.order_id }).then((res: any) => { // 订单轮询
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
  .unPaid {
    // border: 1px solid red;
    min-height: 100vh;
    background: #F2F2F2 !important;
   .unPaid-content{
     text-align: left;
      // margin: .1rem;
      padding: .01rem;
     ul{
       li{
          margin:.1rem;
          //  background: #ccc;
          background: #FFFFFF;
          box-shadow: 0 0 8px 0 rgba(0,0,0,0.06);
          border-radius: .05rem; 
          .list-top{
            display: flex;
            font-family: 'PingFangSC-Regular';
            font-size: .12rem;
            color: #999999;
            letter-spacing: 0;
            padding: .1rem;
            line-height: normal;
            border-bottom: 1px solid #EBEBEB;
            box-shadow: inset 0 0 0 0 #EBEBEB;
            p{
              &:nth-child(2){
                flex: 1;
                font-family: 'PingFangSC-Regular';
                font-size: .12rem;
                color: #FF4F00;
                letter-spacing: 0;
                text-align: right;
              }
            }

          }
         .list-info{
           display: flex;
           padding: .1rem;
           .list-left{
             .list-img{
              width: 1rem;
              height: .75rem;
              background: #D8D8D8;
              border-radius: 4.85px;
              overflow: hidden;
             }
           }
           .list-right{
              flex:  1;
              margin-left: .1rem;
              .class-name{
                // display: flex;
                font-family: 'PingFangSC-Regular';
                font-size: .12rem;
                color: #333333;
                letter-spacing: 0;
                line-height: .18rem;
                .class-title{
                  display: inline-block;
                  // width: .48rem;
                  padding: .01rem .02rem;
                  // height:.16rem;
                  font-family: 'MicrosoftYaHei';
                  font-size: .10rem;
                  color: #FFFFFF;
                  letter-spacing: 0;
                  line-height: normal;
                  text-align: center;
                  // align-items: center;
                  background: url("~@/assets/img/subject@2x.png") no-repeat;
                }
                .class-price{
                  float: right;
                  // width: 0.5rem;
                  margin-left: 0.1rem;
                  font-size: 0.11rem;
                  text-align: right;
                  font-family: 'PingFangSC-Regular';
                  color: #666666;
                  letter-spacing: 0;
                  span{
                    color: #CDCDCD;
                  }
                }
              }
              .class-time{
                margin-top: .05rem;
              }
              .class-time,.class-count,.class-address{
                // display: flex;
                font-family: 'PingFangSC-Regular';
                font-size: .11rem;
                color: #999999;
                letter-spacing: 0;
                img{
                  margin-right: .04rem;
                  width: .12rem;
                  height: .12rem;
                  vertical-align: middle !important;
                  // text-align: center;
                }
                span{
                  // flex: 1
                  vertical-align: middle;
                }
              }
           }
         }
         .list-bttom{
            display: flex;
            padding: .1rem;
            border-top: 1px solid #EBEBEB;
            height: .5rem;
            background: #FFFFFF;
            box-shadow: inset 0 0 0 0 #EBEBEB;
            border-radius: 0 0 5px 5px;
            p{
              flex: 1;
              font-family: 'PingFangSC-Semibold';
              color: #FF4F00;
              letter-spacing: 0;
              line-height: .3rem;
              span{
                vertical-align: middle;
                &:nth-child(1){
                  font-size: .12rem;
                }
                 &:nth-child(2){
                  font-size: .18rem;
                  font-family: 'PingFangSC-Semibold';
                  font-weight: 700;
                }
              }
            }
            .goPay{
                button{
                  // flex:1;
                  border: none;
                  width: .8rem;
                  height: .3rem;
                  line-height: .3rem;
                  background: url("~@/assets/img/button@2x.png") no-repeat;
                  background-size: 100%;
                  font-family: 'PingFangSC-Regular';
                  font-size: .14rem;
                  color: #FFFFFF;
                  letter-spacing: 0;
                  text-align: center;
                  margin-right: 0
                }
            }
          
         }
       }
     }
   }
  }
</style>
