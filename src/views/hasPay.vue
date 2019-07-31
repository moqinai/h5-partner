<template>
  <div class="hasPay">
    <ul class="order-ul">
      <li v-for="(item, index) in dataList" :key="index">
        <div class="order-status">
          <span>下单时间：{{item.registerTime.replace(/-/g,".")}}</span>
          <span class="w-orange">{{item.isQuit==1?'已退费':'支付成功'}}</span>
        </div>
        <div class="order-info">
          <!-- 图片自己合成 -->
          <div class="order-left">
            <div class="order-pic">
              <lesson-cover :backIndex="item.rand_picture">{{item.gradeName}}{{item.subjectName}}</lesson-cover>
            </div>
          </div>
          <ul class="class-info">
            <li class="claName">
              <div>
                ¥{{item.classPrice}}
                <br>
                <span>x1</span>
              </div>
              <label>{{item.subjectName}}</label>
              {{item.className}}
            </li>
            <li>
              <img src="@/assets/img/startclassdate.png">
              <span>{{ item.beginDate.substr(0,4) +'.'+ item.beginDate.substr(4,2)+'.'+item.beginDate.substr(6,2)+'~' + item.endDate.substr(0,4) +'.'+ item.endDate.substr(4,2)+'.'+item.endDate.substr(6,2) }}</span>
            </li>
            <li>
              <img src="@/assets/img/lessonnum.png">
              <span>总课次{{ item.itemCount }}</span>
            </li>
            <li>
              <img src="@/assets/img/classadress.png">
              <span>{{item.areaName}}</span>
            </li>
          </ul>
        </div>
        <div class="order-price">
          <p>
            实付
            <span>¥{{item.payMoney}}</span>
          </p>
          <!-- 拼团 结束，退费，满团的 TODO 成团人数目前写死3个为一个团  isQuit是否退费。已退费显示去开团置灰且不可点-->
          <button :class="[{activeBtn: !(item.activityTimeStatus === '02' || item.count === 3 || item.isQuit === '1')}, 'btn']" @click="goNewTeam(item, !(item.activityTimeStatus === '02' || item.count === 3 || item.isQuit === '1'))"
          >{{ item.activityTimeStatus === "02" || item.count === 3 ? '拼团结束' : '去开团' }}</button><!--   activityTimeStatus活动时间状态01未开始02已结束00在范围内 count为已参团人数 -->
        </div>
      </li>
    </ul>
    <v-loading v-if="showloading"></v-loading>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LessonCover from '@/components/lessonCover.vue'
import {State, Mutation} from 'vuex-class'

@Component({
  components: {LessonCover}
})
export default class HasPay extends Vue {

  private dataList: any[] = [];
  private showloading: boolean = true
  private created() {
    (this as any).$post('/partnercollage/Order/reportedOrderData').then((res: any) => {
      if (res.status === 1) {
        this.dataList = res.data;
        this.showloading = false
      }
    })
  }
  private goNewTeam(item: any, status: boolean): void { // 去开团
    if (status) {
      this.$router.push({
        name: 'groupType',
        query: {
          erp_order_code: item.studentRegisterCode, // item.erp_order_code,
          order_code: item.appOrderCode, // item.order_code,
          class_code: item.classCode,
          sg_id: item.sg_id
        }
      })
      // this.$router.push({ path: '/partnercollage/Group/groupType', query: { erp_order_code, order_code, class_code } })
      // this.$router.push('/Group/groupType?erp_order_code=' + erp_order_code + '&order_code' + order_code)
    }
  }
}
</script>
<style lang="scss" scoped>
.hasPay {
  .order-ul {
    padding: 0.1rem;
    background: #f2f2f2;
    > li {
      margin-bottom: 0.1rem;
      background: #fff;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.06);
      border-radius: 5px;
      color: #999;
      > div {
        display: flex;
        padding: 0.1rem;
      }
      .order-status {
        justify-content: space-between;
        font-size: 0.12rem;
        .w-orange {
          color: #ff4f00;
        }
      }
      .order-info {
        border-top: 0.5px solid #f2f2f2;
        border-bottom: 0.5px solid #f2f2f2;
        .order-pic {
          width: 1rem;
          height: 0.75rem;
          margin-right: .1rem;
          background: #d8d8d8 url("../assets/img/my@3x.png") no-repeat fixed
            center;
          border-radius: 0.05rem;
        }
        .class-info {
          width: 100%;
          >li {
            >img {
              height: .12rem;
              // width: auto;
              margin-right: .04rem;
              vertical-align: middle;
            }
            >span {
              font-size:.11rem;
            }
          }
          .claName {
            // display: flex;
            // justify-content: space-between;
            font-size: .12rem;
            color: #333;
            label {
              padding: .01rem .02rem;
              font-size: .1rem;
              color: #fff;
              background: #ff4f00;
              border-radius: .01rem;
            }
            div {
              // float: right;
              // width: .5rem;
              // margin-left: .1rem;
              // font-size: .11rem;
              // text-align: right;
              // color: #666;
              float: right;
              margin-left: .1rem;
              font-size: .11rem;
              text-align: right;
              font-family: PingFangSC-Regular;
              color: #666;
              letter-spacing: 0;
              span {
                color: #cdcdcd;
              }
            }
          }
        }
      }
      .order-price {
        justify-content: space-between;
        align-items: center;
        p {
          color: #ff4f00;
          font-size: .12rem;
          span {
            // margin-left: .04rem;
            font-size: .18rem;
            font-weight: 600;
            vertical-align: middle;
          }
        }
        .btn {
          width: .8rem;
          height: .3rem;
          font-size: .14rem;
          color: #fff;
          background: #dfe3e5;
          border-radius: .05rem;
          border: 0;
          &.activeBtn{
            background-image: linear-gradient(90deg, #FF6109 0%, #FF8725 100%);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

