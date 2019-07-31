<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide><img src="@/assets/img/banner@3x.png" class="swiper-img"></swiper-slide>
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'swiperComponent',
  data () {
    return {
      swiperOption: {
        autoplay: false,
        speed: 1000,
        pagination: { // 分页器挂载到swiper-pagination类对应的元素上
          el: '.swiper-pagination'
        },
        loop: false // 暂时关闭轮播图前后循环模式，之后多图轮播时开始loop和autoplay
      }
    }
  },
  methods: {

  }
}
</script>
<style>
.wrapper >>> .swiper-pagination-bullet-active {
   background:#fff
}
</style>

<style lang='scss' scoped>
  .wrapper {
    overflow:hidden;
    width: 100%;
    height: 1.4rem;
    position: relative;
    border-radius: .05rem;
    .swiper-slide{
        width: 100%;
    }
    .swiper-container{
        height: 100%;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .swiper-img {
        width: 100%;
        height: 100%;
        border-radius: .05rem;
        border-top-left-radius: .05rem; /* 左上角 */
        border-top-right-radius: .05rem; /* 右上角 */
        border-bottom-right-radius: .05rem; /* 右下角 */
        border-bottom-left-radius: .05rem; /* 左下角 */
    }
  }
</style>
