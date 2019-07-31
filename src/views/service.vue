<template>
  <div class="service">
    <label><span>*</span>联系方式</label>
    <input type="text" placeholder="请输入手机号码" v-model="phoneNum">
    <label><span>*</span>意见反馈</label>
    <textarea id="" placeholder="请输入文字" v-model="advice"></textarea>
    <div class="form-group-error-tips" v-show="errorTipsShow">
      <img src="@/assets/img/login/error-tips@2x.png" alt="">
      <span>{{errorTips}}</span>
    </div>
    <button @click="submit">提交</button>
    <div class="tips" v-show="tips.show">
      <h3>{{tips.title}}</h3>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
function mobileReg(num: string) {
  return /1\d{10}/g.test(num)
}

@Component
export default class Home extends Vue {
  private phoneNum: string = ''
  private advice: string = ''
  private errorTips: string = ''
  private errorTipsShow: boolean = false
  private tips: any = {show: false, title: ''}


  @Watch('phoneNum', {immediate: true})
  public changePhoneNum (val: string, oldVal: string) {
    this.errorTips = ''
    this.errorTipsShow = false
  }
  @Watch('advice', {immediate: true})
  public changeAdvice (val: string, oldVal: string) {
    this.errorTips = ''
    this.errorTipsShow = false
  }

  private submit() {
    // 校验
    if (!this.phoneNum) {
      this.errorTipsShow = true
      this.errorTips = '请填写手机号码'
      return false
    } else if (!mobileReg(this.phoneNum)) {
      this.errorTipsShow = true
      this.errorTips = '请填写正确格式的手机号码'
      return false
    }
    if (!this.advice) {
      this.errorTipsShow = true
      this.errorTips = '请填写意见反馈'
      return false
    }
    (this as any).$post('/partnercollage/Profile/customerServer',
    {mobile: this.phoneNum, advince: this.advice}).then((res: any) => {
      if (res.status === 1) {
        // todo 提示框
        this.tips = {show: true, title: res.msg}
        setTimeout(() => {
          this.tips = false
          this.$router.push('/partnercollage/Profile/index')
        }, 2000);
      } else {
        this.tips = {show: true, title: res.msg}
        setTimeout(() => {
          this.tips = false
        }, 2000)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .service {
    padding: .25rem .3rem .3rem;
  }
  label {
    display: block;
    padding-bottom: .05rem;
    font-size: .14rem;
    color: #999;
    span {
      color: #ff4f00;
    }
  }
  input {
    width: 100%;
    height: .44rem;
    margin-bottom: .16rem;
    padding: .14rem .1rem;
    font-size: .14rem;
    background: #F8F8F8;
    border-radius: 5px;
  }
  textarea {
    width: 100%;
    height:2rem;
    padding: .14rem .1rem;
    font-size: .14rem;
    background: #F8F8F8;
    border-radius: 5px;
  }
  button {
    position: fixed;
    bottom: 0.86rem;
    left: .3rem;
    width: 84%;
    height: .44rem;
    font-size: .16rem;
    color: #fff;
    background-image: linear-gradient(225deg, #FF6109 0%, #FF8725 100%);
    border-radius: 5px;
    border: 0;
  }
  .form-group-error-tips {
    margin-top: .06rem;
    color: #ff4f00;
    display: flex;
    img {
      margin-right: .04rem;
    }
  }
  .tips{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    color: #fff;
    h3{
      padding: .08rem .2rem;
      max-width: 80%;
      font-size: .12rem;
      font-weight: 400;
      background-color: rgba(0,0,0,0.6);
      border-radius: 4px;
    }
  }
</style>
