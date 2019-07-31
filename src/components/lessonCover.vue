<template>
  <div class="lesson-cover" :style="{backgroundImage:'url('+lessonCoverList[backIndex]+')'}">
    <p class="lesson-title">
      <slot></slot>
    </p>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import cover1 from '@/assets/img/lessoncover/cover1@2x.png'
import cover2 from '@/assets/img/lessoncover/cover2@2x.png'
import cover3 from '@/assets/img/lessoncover/cover3@2x.png'
import cover4 from '@/assets/img/lessoncover/cover4@2x.png'
import cover5 from '@/assets/img/lessoncover/cover5@2x.png'
import cover6 from '@/assets/img/lessoncover/cover6@2x.png'
@Component
export default class LessonCover extends Vue {
  @Prop({
    default: 0
  }) private backIndex!: 0
  private lessonCoverList: any = [cover1, cover2, cover3, cover4, cover5, cover6]
}
</script>

<style lang="scss" scope>
  
  .lesson-cover{
    width:100%;
    height:100%;
    padding-top:13%;
    background-image:url('./../assets/img/lessoncover/cover1.png');
    background-size:100% 100%;
  }
  .lesson-title{
    font-size:.8em;
    text-align:center;
    color:#fff;
    font-weight:bold;
  }
</style>