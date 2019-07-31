<template>
  <div id="app">
    <!-- <keep-alive :include="includePath">
      <router-view></router-view>
      <Tips />
    </keep-alive> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Tips />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tips from '@/components/tips.vue'

@Component({
  components: {
    Tips
  }
})
export default class Home extends Vue {
  private students: number = 1
  private includePath: string[] = ['Home']
  public created () {
     (this as any).$wxService.initWxConfig()
    // (this as any).$post('init/api').then((res: any) => {
    //   if (res.status) {
    //     this.students = res.data.students
    //     if (!res.data.islogin) { // 是否登录过
    //       if (res.data.students === 0) {
    //         // this.$router.push('/partnercollage/login/' + res.data.type) // 新生去登录页
    //       } else {
    //         // this.$router.push('/partnercollage/about') // 老生去个人中心
    //       }
    //     } else {
    //     }
    //   }
    // })
  }
  public mounted() {
    (this as any).$wxService.hidenMenuFun()
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

</style>
