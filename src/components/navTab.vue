<template>
  <div class="tab">
    <div class="tab-item" @click="tabItem('home')">
      <!-- <router-link to="/partnercollage/Index/index"> 首页 </router-link> -->
      <a href="javascript:void(0)" :class="{'active': linkActive === 'home'}">
        <p><img :src="linkActive === 'home' ? homeImg : homeImgnot" alt=""></p>
        <p href="javascript:void(0)">首页</p>
      </a>
    </div>
    <div class="tab-item" @click="tabItem('my')">
      <!-- <router-link to="/partnercollage/About/about"> 我的 </router-link> -->
      <a href="javascript:void(0)" :class="{'active': linkActive === 'my'}" >
        <p><img :src="linkActive === 'my' ? myImg : myImgnot" alt=""></p>
        <p>我的</p>
      </a>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Navtab extends Vue {
  @State public linkActiveaaa: any
  public index: number = 1
  public linkActive: string = 'home'
  public homeImg: string = require('@/assets/img/home@2x.png')
  public myImg: string = require('@/assets/img/my@2x.png')
  public homeImgnot: string = require('@/assets/img/homenot@2x.png')
  public myImgnot: string = require('@/assets/img/mynot@2x.png')

  @Watch('$route', { immediate: true })
  public changeLinkActive (val: string, oldVal: string) {
    this.linkActive = this.$route.meta.linkActive
  }
  public created () {
    // console.log(this.linkActiveaaa)
    // console.log(this.$route.meta.linkActive)

    // if (this.linkActive === 'home') {
    //   this.$router.push('/partnercollage/Index/index')
    // } else if (this.linkActive === 'my') {
    //   this.$router.push('/partnercollage/Profile/index')
    // }
  }
  public tabItem (item: string) {
    this.linkActive = item
    if (item === 'home') {
      this.$router.push('/partnercollage/Index/index')
    } else if (item === 'my') {
      this.$router.push('/partnercollage/Profile/index')
    }
  }

}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .tab {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: .1rem 0;
    line-height: normal;
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.08);
    display: flex;
    .tab-item {
      flex: 1;
      text-align: center;
      p {
        display: block;
        text-decoration: none;
        color: rgb(77,85,93);
        font-family: PingFangSC-Regular;
        font-size: .09rem;
        letter-spacing: 0;
        text-align: center;
        img {
          width: .2rem;
          height: .2rem;
          text-align: center;
          display: inline-block;
        }
      }
      a.active {
        p {
          color: #FF4F00;
        }
        
      }
    }
  }
</style>
