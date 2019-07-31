<template>
  <div class="pending">
    <p>恭喜您已支付成功,请回到微信查看支付详情</p>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AlipaySuccess extends Vue {
  // @Prop() private msg!: string;
  public created () {

  }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .pending{
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;

    flex-wrap: wrap;
    p{
      font-size:.16rem;
      font-weight:bold;
      color:#009900;
    }
  }
</style>
