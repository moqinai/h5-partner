<template>
<div>
  <div class="home" v-if="dataList && dataList.length">
    <div class="top-banner">
      <swiper-tel />
    </div>
    <!-- <div class="top-search">
      <input type="text" class="search-input" :placeholder="tip" @keyup.enter="inputSearch">
      <img src="@/assets/img/search.png" alt="" @click="inputSearch">
    </div> -->
    <div class="lpc-listClass">
      <div class="liclass-title">班级列表</div>
      <ul>
        <li v-for="(list, index) in dataList" @click.stop="lookList(list.classCode)" :key="index">
          <div class="top">
            <div class="left">
              <div class="left-img">
                <lesson-cover :backIndex="list.rand_picture" class="lesson-cover">{{list.gradeName}}{{list.subjectName}}</lesson-cover>
              </div>
            </div>
            <div class="right">
              <div class="class-decrible">
                <p><span class="season">{{list.quarterName}}</span><span class="year-sub">{{list.classYear}} | {{list.subjectName }}{{ list.gradeName}}</span></p>
                <p><img src="@/assets/img/startclassdate.png"><span>{{ list.beginDate + '~' + list.endDate }}</span></p>
                <p><img src="@/assets/img/lessonnum.png"><span>总课次:{{ list.classHours }}</span></p>
                <p><img src="@/assets/img/classadress.png"><span>{{list.areaName}}</span></p>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="left-text">
                <p class="remain-number" v-if="list.remaining !== 0">
                  剩余<span class="rest-number">{{list.remaining >= 3 ? 3 : list.remaining}}</span>个名额
                </p>
                <p class="will-full"><img v-if="list.remaining === 0" src="@/assets/img/alreadyfull.png"/><img v-else src="@/assets/img/willfull.png"/></p>
              </div>
            </div>
            <div class="bottom-right">
              <div class="class-btn">
                <!-- 修改这个价格的逻辑，后台再返回一个字段，根据那个字段来看是三人成团（选择三人成团的价格）还是二人成团（选择二人成团的价格）-->
                <span v-if="list.threeStudentPrice">￥{{list.threeStudentPrice}}</span><span v-else-if="list.twoStudentPrice">{{list.twoStudentPrice}}</span><span v-else>{{list.price}}</span>
                <span :class="list.remaining === 0 ? 'openteam-grey' : 'openteam-active'">开团</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="nostart" v-if="!dataList.length">
    <div class="nostart-top">
      <img src="@/assets/img/nostart.png"/>
      <p class="thank">感谢您的关注</p>
      <p class="thank-text">当前学校暂无活动</p>
    </div>
    <div class="nostart-bottom">
        <img src="@/assets/img/3071563962511_.pic_hd@2x.png"/>
      <div class="code-text">
        <p>长按识别二维码</p>
        <p>关注公众号<span>朴新教育</span></p>
        <p>了解更多优惠活动信息</p>
      </div>
    </div>
  </div>
  <v-loading v-if="showloading"></v-loading>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import swiperTel from '@/components/swiper.vue'
import navTab from '@/components/navTab.vue'
import lessonCover from '@/components/lessonCover.vue'

@Component({
  components: {
    swiperTel,
    navTab,
    lessonCover
  }
})
export default class Home extends Vue {
  // private dataList: Array<any> = []
  private dataList: any[] = []
  private activePage: number = 1
  private scrollTop: number = 1
  private serachtext: string = '' //  搜索框内容
  private tip: string = '请输入年级、科目' //  搜索框内容
  private showloading: boolean = true // showloading
  private initRequest: boolean = false
  private created () {
    this.showloading = true;
    this.getclassList()
  }
  private mounted () {
    // this.activeCityName === '请选择城市' ? this.iscitydialog = false : this.iscitydialog = true
    window.addEventListener('scroll', this.scrollToTop)
    window.addEventListener('scroll', this.scrollGetList)
  }
  private activated () {
    document.body.scrollTop = this.scrollTop;
    document.documentElement.scrollTop = this.scrollTop;
    window.addEventListener('scroll', this.scrollToTop)
    window.addEventListener('scroll', this.scrollGetList)
  }
  private deactivated () {
    window.removeEventListener('scroll', this.scrollToTop)
    window.removeEventListener('scroll', this.scrollGetList)
  }
  private scrollGetList () {
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    // 滚动条滚动距离
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    // 窗口可视范围高度
    const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
    // console.log(scrollHeight, clientHeight, scrollTop)
    if (scrollHeight - (clientHeight + scrollTop) < 15) {
      if (this.initRequest) {
        this.initRequest = false
        this.activePage += 1
        this.getclassList()
      }
    }
  }
  private getclassList () {
    if (this.initRequest) {
      return
    }
    (this as any).$post('/partnercollage/Index/indexList', {pageSize: 15, pageNum: this.activePage }).then((res: any) => {
      if (res.status === 1) {
        if (this.activePage === 1) {
          this.dataList = res.data
        } else {
          this.dataList = this.dataList.concat(res.data)
        }
        if (res.data.length === 0) {
          this.initRequest = false
        } else {
          this.initRequest = true;
        }
        this.showloading = false;
      } else {
        this.showloading = true;
      }
    })
  }
  private lookList (classCode: string): void {
    this.$router.push({name: 'details', query: { class_code: classCode}})
  }
  private scrollToTop () {
    const that = this
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 获取页面向上滚动了多少像素
    that.scrollTop = scrollTop
  }
  private destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
    window.removeEventListener('scroll', this.scrollGetList)
  }
}
</script>

<style lang="scss" scoped>
  .nostart{
    width: 100%;
    height: 100%;
    z-index: 10000;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: #FFFFFF url('~@/assets/img/nostartbg.png') center bottom no-repeat !important;
    background-size: 100% 100% !important;
    padding-bottom: 0 !important;
    .nostart-top{
      margin-top: .65rem;
      margin-bottom: .57rem;
      img{
        display:block;
        width: 1.6rem;
        height: 1.6rem;
        margin: auto;
      }
      .thank{
        font-weight: 600;
        font-size: .18rem;
        color: #333333;
        text-align: center;
        margin: .08rem 0 .12rem 0;
      }
      .thank-text {
        font-size: 16px;
        color: #666666;
        text-align: center;
      }
    }
    .nostart-bottom{
      width: 3.25rem;
      // height: 1.3rem;
      padding: .16rem;
      margin: auto;
      background: #FFFFFF;
      border-radius: .2rem;
      display: flex;
      justify-content: space-between;
      img{
        width: 1.1rem;
        height: 1.1rem;
        display:block;
      }
      .code-text{
        margin-left: .16rem;
        p{
          font-size: .16rem;
          color: #666666;
          text-align:right;
          font-family: PingFangSC-Regular;
          &:nth-child(1){
            margin-top: .2rem;
          }
          &:nth-child(2){
            margin: .03rem 0 .03rem 0;
            span{
              font-weight: 600;
              color: #333333;
              font-size: .16rem;
              // font-family: PingFangSC-Semibold;
              margin-left: .04rem;
            }
          }
        }
      }
    }
  }
  .home {
    background: #F2F2F2 !important;
    padding-top: .1rem !important;
    min-height: 100vh;
    .top-search {
      width: 3.55rem;
      margin-left: .1rem;
      position: relative;
      .search-input{
        padding-left:.4rem;
        width:100%;
        height:.35rem;
        background: #FFFFFF;
        border-radius: .05rem;
        border-top-left-radius: .05rem; /* 左上角 */
        border-top-right-radius: .05rem; /* 右上角 */
        border-bottom-right-radius: .05rem; /* 右下角 */
        border-bottom-left-radius: .05rem; /* 左下角 */
        box-sizing:border-box;
        font-family: PingFangSC-Regular;
        font-size: .14rem;
        color: #CDCDCD;
        &::-webkit-input-placeholder {
          color:#CDCDCD;
        }
        &:-moz-placeholder{
          color:#CDCDCD;
        }
        &：-ms-input-placeholder{
          color:#CDCDCD;
        }
      }
      img{
        position: absolute;
        top: .07rem;
        left: .15rem;
        width: .2rem;
        height: .2rem;
      }
    }
    .top-banner{
      height: 1.4rem;
      margin:0 .1rem .1rem .1rem;
      border-radius: .05rem;
    }
    .lpc-listClass {
      margin: 0 .1rem;
      .liclass-title{
        font-family: PingFangSC-Medium;
        font-size: .16rem;
        color: #666666;
        letter-spacing: 0;
        text-align: left;
        margin: .11rem 0 .08rem 0;
      }
      ul {
        li {
          margin-bottom: .1rem;
          background: #FFFFFF;
          box-shadow: 0 0 8px 0 rgba(0,0,0,0.06);
          border-radius: .05rem;
          padding: .1rem;
          .top{
            display: flex;
            margin-bottom: .02rem;
            .left {
              // display: inline-block;
              width: 1.2rem;
              height: 100%;
              .left-img {
                width: 1.2rem;
                height: .9rem;
                border-radius: .05rem;
                .lesson-cover{
                  border-radius: .05rem;
                }
                img{
                  width: 100%;
                  height: 100%;
                  border-radius: .05rem;
                }
              }
            }
            .right {
              padding-left: .1rem;
              text-align: left;
              font-size: .12rem;
              color: #999999;
              flex: 1;
              // display: inline-block;
              .class-decrible{
                p{
                  height: .17rem;
                  display: flex;
                  align-items: center;
                  span{
                    display: block;
                  }
                  img{
                    width: .14rem;
                    height: .14rem;
                    display:block;
                    margin-right: .04rem;
                  }
                  &:nth-child(1){
                    height: .22rem;
                    margin: .02rem 0 .05rem 0;
                  }
                  &:nth-child(3){
                    margin: .03rem 0;
                  }
                  &:last-child{
                    height: auto;
                    align-items: baseline ;
                    img{
                      position: relative;
                      top: .03rem;
                    }
                  }
                }
                .season{
                  width: .3rem;
                  padding-top: .01rem;
                  padding-bottom: .01rem;
                  display: inline-block;
                  text-align: center;
                  border-radius: .02rem;
                  line-height: normal;
                  background: #4db2ff;
                  font-size: .12rem;
                  color: #FFFFFF;
                  margin-right: .04rem;
                }
                .year-sub{
                  max-width: 1.5rem;
                  font-size: .16rem;
                  color: #666666;
                  font-family: PingFangSC-Semibold;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  font-weight: 600;
                }
              }
            }
          }
          .bottom{
            display: flex;
            align-items: center;
            .bottom-left {
              width: 1.2rem;
              height: 100%;
              .left-text {
                margin-bottom: .03rem;
                font-size: .12rem;
                color: #999999;
                display: flex;
                .remain-number{
                  margin-right: .048rem;
                  font-size: .1rem;
                  .rest-number{
                    color: #FF4F00;
                  }
                }
                .will-full{
                  width: .48rem;
                  height: .15rem;
                  img {
                    width: 100%;
                  }
                }
              }
            }
            .bottom-right {
              flex: 1;
              .class-btn{
                display: flex;
                justify-content: flex-end;
                span{
                  display: block;
                  &:nth-child(1){
                    font-size: .18rem;
                    color:#FF4F00;
                    height: .3rem;
                    line-height: .3rem;
                  }
                  &:nth-child(2){
                    font-size: .14rem;
                    color:#FFFFFF;
                    width: .6rem;
                    height: .3rem;
                    text-align: center;
                    line-height: .3rem;
                    margin-left: .07rem;
                  }
                }
                .openteam-active{
                    background: url("~@/assets/img/openteam.png") no-repeat;
                    background-size: 100%;
                }
                .openteam-grey{
                    background: url("~@/assets/img/openteamgrey.png") no-repeat;
                    background-size: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

