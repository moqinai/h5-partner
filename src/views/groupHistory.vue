<template>
  <div class="history">
    <div class="history-content">
      <ul>
        <li v-for="(list, index) in dataList" :key="index">
          <div class="list-top">
            <p>下单时间: {{list.registerTime}}</p>
            <p v-if="list.activityTimeStatus == '02'">拼团结束</p>
            <p v-else-if="list.activityTimeStatus == '00'">已开团</p>
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
          <div class="list-getMoney">
            <p>{{list.return_cash}}</p>
          </div>
          <!-- <div class="list-getMoneyAgain">
            <p>恭喜您又获得助学金250元，您已累计获得助学金1000元</p>
            <p>班级开课*节后请到校区前台领取</p>
          </div> -->
          <div class="list-bottom">
            <p><span>实付</span><span>￥{{list.payMoney}}</span></p>
            <div class="goPay">
              <span>{{list.num}}人参团</span>
              <button @click="lookList(list.classCode)">拼团详情</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <v-loading v-if="showloading"></v-loading>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import lessonCover from '@/components/lessonCover.vue'
@Component({
  components: {
    lessonCover
  }
})
export default class History extends Vue {
  private dataList: any[] = []
  private showloading: boolean = true
  private created () {
    (this as any).$post('/partnercollage/History/groupHistoryList').then((res: any) => {
      this.showloading = true
      if (res.status === 1) {
        this.showloading = false
        this.dataList = res.data
      }
    })
  }
  private lookList (classCode: string): void {
    this.$router.push({name: 'details', query: { class_code: classCode } })
  }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .history {
    // border: 1px solid red;
    background: #F2F2F2 !important;
    min-height: 100vh;
   .history-content {
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
                    // width: 1.65rem;
                    display: inline-block;
                    // width: .48rem;
                    padding: .01rem .02rem;
                    // height:.16rem;
                    font-family: 'MicrosoftYaHei';
                    font-size: .10rem;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    // line-height: .16rem;
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
                  margin-top:.05rem;
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
          .list-getMoney{
            border-top:1px solid #EBEBEB;
            box-shadow: inset 0 0 0 0 #EBEBEB;
            font-family: 'PingFangSC-Regular';
            font-size: .11rem;
            color: #FF8F00;
            letter-spacing: 0;
            text-align: left;
            // height: .4rem;
            // line-height: .4rem;
            p{
              padding:0.1rem 0.06rem 0.1rem 0.06rem;
              line-height: normal;
            }
          }
          .list-bottom{
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
                    font-weight: 700;
                    font-size: .18rem;
                    font-family: 'PingFangSC-Semibold';
                  }
                }
              }
              .goPay{
                span{
                  margin-right: .05rem;
                  font-family: 'PingFangSC-Regular';
                  font-size: .12rem;
                  color: #999999;
                  letter-spacing: 0;
                  text-align: right;
                }
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
