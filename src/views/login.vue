<template>
  <transition name="fade">
    <div class="lpc-login" :style="{backgroundImage:'url('+bgImg+')'}">
      <div class="form-container">
        <div class="form-group form-group-school">
          <div class="group-content school-content">
            <div class="school-logo">
              <p class="school-title">{{schoolTitleStr}}</p>
              <p class="school-choose-icon"><img src="@/assets/img/login/choose@2x.png" alt=""></p>
            </div>
            <div class="school-list" v-show ="urlType ==='link'">
              <div id="trigger">请选择分校</div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="group-title">姓名</div>
          <div class="group-content">
            <input type="text" 
            placeholder="请输入真实姓名" 
            v-model="studentName"
            @focus="inputFocusFun">
          </div>
        </div>
        <div class="form-group">
          <div class="group-title">手机号</div>
          <div class="group-content">
            <input type="text" 
            class="mobile" 
            placeholder="请输入手机号"
            v-model="mobileNum"
            @focus="inputFocusFun"
            >
            <span class="get-check-word" 
              :style="{color:isVerifyLoading?'#CDCDCD':''}"
              @click="getVerifyCode"

            >{{verifyWord}}</span>
          </div>
        </div>
        <div class="form-group form-group-sms">
          <div class="group-title">短信验证码</div>
          <div class="group-content">
            <input type="text" 
            placeholder="请输入短信验证码"
            v-model="verfiyCode"
            @focus ="inputFocusFun"
            >
          </div>
        </div>
        <div class="form-group form-group-error-tips" v-show="errorTipsShow">
          <p>
            <img src="@/assets/img/login/error-tips@2x.png" alt="">
            <span>{{errorTips}}</span>
          </p>
        </div>
        <div class="form-group form-group-agreement">
          <p>
            <label @click="agreementCheck = !agreementCheck">
              <img src="@/assets/img/login/check.png" alt="" v-show="!agreementCheck">
              <img src="@/assets/img/login/checked.png" alt="" v-show="agreementCheck">
              <span :style="{color: '#C0C0C0'}">我同意</span>
            </label>
            <span @click.stop.prevent="watchAgreement">《朴新教育平台服务协议》</span>
          </p>
        </div>
        <div class="form-group form-group-tips">
          <p>朴新学员，验证身份后可直接登录。</p>
          <p>非朴新学员，我们会根据您的登录信息作为默认注册账户。</p>
        </div>
        <div class="form-group form-group-submit">
          <p @click="stuLoginFun">登录</p>
        </div>
      </div>
      <div class="loading" v-show="loading">
        <img src="@/assets/img/loading/loading.svg" alt="">
      </div>
      <introduction :is-show-intr="isShowAgreement" :question-oragree="questionOragreement" @closeInParent="closeAgreement"></introduction>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Prop, Vue , Watch} from 'vue-property-decorator'
import introduction from '@/components/introduction.vue'
import {State, Action, namespace} from 'vuex-class'
import mobileSelect from 'mobile-select'
import bgImg from '@/assets/img/login/bg@2x.png'
const someModule = namespace('login')
function mobileReg(num: string) {
  return /1\d{10}/g.test(num)
}
@Component({
  components: {introduction}
})
export default class Login extends Vue {
  @someModule.State((state) => state.schoolList) public schoolList!: any[]
  @someModule.Action('getSchool') public getSchool: any

  // 进入方式
  public urlType: string = 'link'
  public schoolTitleStr: string = '选择分校'

  // 学员信息 Model
  public mobileNum: string = ''
  public studentName: string = ''
  public verfiyCode: string = ''
  private schoolId: string = ''
  private schoolName: string = ''
  @Prop() private type!: string
  private city: string = ''
  private mobileSelectSchool!: any
  private agreementCheck: boolean = false
  private bgImg: any = bgImg
  private errorTipsShow: boolean = false
  private errorTips: string = '错误信息'
  // loading加载
  private loading: boolean = false

  // 协议展示
  private isShowAgreement: boolean = false
  private questionOragreement: string = 'agreement'

  // 获取验证码
  private verifyWord: string = '获取验证码'
  private isVerifyLoading: boolean = false
  private interValVerify!: any
  // 参数
  private tid: string = ''
  private classCode: string = ''

  @Watch('schoolList', {deep: true})
  public schoolListChange() {
      this.initMobileSelct()
      if (this.urlType === 'posters') {
        const activeSchoolList =  this.schoolList.filter((item: any) => {
          return item.code === this.schoolId
        })
        if (activeSchoolList.length > 0) {
          const activeSchool = activeSchoolList[0]
          this.schoolId = activeSchool.code
          this.schoolTitleStr = this.schoolName = activeSchool.name
        }
      }
  }
  // 关闭协议
  public closeAgreement(show: boolean) {
    this.isShowAgreement = show
  }
  private created () {
    // console.log(this.type) // type 为link则链接进入需先选择城市和分校， posters则海报进，直接带来分校名称
    // 海报进的判断新生老生， 新生登录完进入参团页，老生进个人中心
    // 链接进的判断新生老生，新生进首页商城页，老生登录完进入个人中心页
    // this.urlType = this.type
    this.schoolId = this.$route.query.schoolCode ? String(this.$route.query.schoolCode) : ''
    this.tid = this.$route.query.tid ? String(this.$route.query.tid) : ''
    this.classCode = this.$route.query.class_code ? String(this.$route.query.class_code) : ''
    if (this.schoolId && this.schoolId !== 'undefined') {
      this.urlType = 'posters'
    }
  }
  private mounted () {
    this.getSchool()
  }
  private inputFocusFun() {
    this.errorTipsShow = false
    this.errorTips = ''
  }
  private initMobileSelct() {
    this.mobileSelectSchool = new mobileSelect({
      trigger: '#trigger',
      title: '选择校区',
      wheels: [
        {data: this.schoolList}
      ],
      callback: (indexArr: any, data: any) => {
        if (data && data.length > 0) {
          this.schoolId = data[0].code
          this.schoolName = data[0].name
        }
      },
      keyMap: {
        id: 'code',
        value: 'name'
      }
    })
  }
  private getVerifyCode() {
    if (this.isVerifyLoading) {
      return
    }
    if (mobileReg(this.mobileNum)) {
      const fomrData: any = {
        mobile: this.mobileNum
      };
      (this as any).$post('/partnercollage/Login/SendVerify', fomrData).then((res: any) => {
        if (res.status === 1) {
          let time = 60
          this.interValVerify = setInterval(() => {
            this.isVerifyLoading = true
            this.verifyWord = time + '秒后重发'
            time --
            if (time < 0) {
              this.verifyWord = '获取验证码'
              this.isVerifyLoading = false
              clearInterval(this.interValVerify)
            }
          }, 1000)
        } else {
          this.errorTips = res.msg
          this.errorTipsShow = true
        }
      })
    } else {
      this.errorTipsShow = true
      this.errorTips = '请输入正确的手机号'
    }
  }
  private stuLoginFun () {
    if (!this.studentName) {
      this.errorTips = '请输入姓名'
      this.errorTipsShow = true
      return false
    }
    if (!mobileReg(this.mobileNum)) {
      this.errorTips = '请输入正确的手机号'
      this.errorTipsShow = true
      return false
    }
    if (!this.verfiyCode) {
      this.errorTips = '请输入短信验证码'
      this.errorTipsShow = true
      return false
    }
    if (!this.agreementCheck) {
      this.errorTips = '请勾选《朴新教育平台服务协议》'
      this.errorTipsShow = true
      return false
    }
    if (!this.schoolId) {
      this.errorTips = '请选择分校'
      this.errorTipsShow = true
      return false
    }
    const formData: any = {
      studentName: this.studentName,
      mobile: this.mobileNum,
      verifyCode: this.verfiyCode,
      schoolCode: this.schoolId,
      schoolName: this.schoolName,
      tid: this.tid,
      class_code: this.classCode
    }
    this.loading = true;
    (this as any).$post('/partnercollage/Login/doLogin', formData).then((res: any) => {
      if (res.status === 1) {
        window.location.href = res.data.url
      } else {
        this.errorTips = res.msg
        this.errorTipsShow = true
        if (res.data.errCode === '305001') {
          this.urlType = 'link'
          this.schoolTitleStr = '选择分校'
          this.schoolId = ''
        }
      }
      this.loading = false
      clearInterval(this.interValVerify)
      this.verifyWord = '获取验证码'
      this.isVerifyLoading = false
    })
  }
  // 查看协议
  private watchAgreement () {
    this.isShowAgreement = true
  }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .loading{
    position:fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    background:transparent;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  input{
    height:.44rem;
    display:block;
    width:100%;
    padding-left:.05rem;
    font-size:.14rem;
    background: #F8F8F8;
    border-radius: 5px;
  }
  input:focus{
    outline:0px
    
  }
  input::placeholder{
    color: #DEE2E4;
    line-height: 21px;
  }
  .lpc-login {
    background: #FFF;
    min-height: 100vh;
    background-repeat:no-repeat;
    background-size:100%;
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .form-container{
    padding-left:8%;
    padding-right:8%;
    padding-bottom:8%;
    padding-top:.24rem;
  }
  .form-group{
    position: relative;
    margin-bottom: .15rem;
    .group-title{
      margin-bottom:.05rem;
      font-size: 14px;
      color: #999999;
    }
    .group-content{
      position:relative;
      input.mobile{
        padding-right:1.1rem;
      }
      .get-check-word{
        position:absolute;
        line-height:.44rem;
        height:.44rem;
        top:0;
        right:0;
        width:1.1rem;
        text-align:center;
        font-size: 14px;
        color: #FF4F00;
      }
    }
    &.form-group-school{
      margin-bottom:.38rem;
      .school-content{
        display:flex;
        align-items:center;
        justify-content: space-between;
        .school-title{
          font-size:.22rem;
          font-weight:bold;

        }
        .school-choose-icon{
          width:.88rem;
          margin-top:.04rem;
          img{
            width:100%;
          }
        }
        .school-list{
          width:1.6rem;
          height:.44rem;
          background-image: linear-gradient(-225deg, #FF8725 0%, #FF6109 100%);
          border-radius: 5px;
          text-align:center;
          #trigger{
            line-height:.44rem;
            font-size: 14px;
            color: #FFFFFF;
          }
        }
      }
    }
    &.form-group-sms{
      margin-bottom:.08rem;
    }
    &.form-group-agreement{
      p{
        color:.12rem;
        display:flex;
        align-items:center;
        // line-height:.21rem;
        img{
          margin-right:.06rem;
        }
      }
    }    
    &.form-group-tips{
      margin-top:1.08rem;
      p{
        font-size: .12rem;
        color: #FF4F00;
      }
    }
    &.form-group-submit{
      p{
        height:.44rem;
        line-height:.44rem;
        text-align:center;
        
        background-image: linear-gradient(-225deg, #FF8725 0%, #FF6109 100%);
        border-radius: 5px;
        font-size: 16px;
        color: #FFFFFF;
      }
    }
    &.form-group-error-tips{
      margin-bottom:.07rem;
      p{
        display:flex;
        align-items:center;

        span{
          font-size: .1rem;
          color: #FF4F00;
        }
        img{
          margin-right:.04rem;
          width:.1rem;
          height:.1rem;
        }
      }
    }
  }
  

  .lpc-bottom-btn {
      // border: 1px solid red;
      // text-align: center;
      button {
        border: 1px solid rgb(192, 231, 208);
        background: rgb(70, 214, 142);
        border-radius: 6px;
        width: 80%;
        padding: .05rem;
        line-height: normal;
        color: #FFF;
      }
  }
</style>
