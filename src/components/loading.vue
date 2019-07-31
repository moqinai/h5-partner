<template>
  <div class="loading modal" v-show="loading">
    <!--添加loading-->
    <img src="@/assets/img/loading/loading.svg">
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
  import { State } from 'vuex-class'

  @Component
  export default class Loading extends Vue {
    @State public loading: any
  }
</script>
<style lang="scss">
  .loading{
    min-height: 100vh;
    position:fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    background:transparent;
    display:flex;
    align-items:center;
    justify-content:center;
    background: #FFFFFF;
    z-index:999999999999999;
  }
</style>
