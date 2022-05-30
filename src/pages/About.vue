<template>
  <div class="page home">
    <section-intro></section-intro>
    <div style="height: 120px"></div>
    <section-on-experiences></section-on-experiences>
    <div style="height: 120px"></div>


    <div class="pattern pattern-1" :style="{ 'background-image': `url(${pattern1})` }"></div>
    <div class="pattern pattern-2" :style="{ 'background-image': `url(${pattern2})` }"></div>
    <div class="pattern pattern-3" :style="{ 'background-image': `url(${pattern3})` }"></div>
    <div class="pattern pattern-4" :style="{ 'background-image': `url(${pattern4})` }"></div>
    <div class="pattern pattern-5" :style="{ 'background-image': `url(${pattern5})` }"></div>
  </div>
</template>

<script setup>
import pattern1 from '../assets/rectangle-1.svg'
import pattern2 from '../assets/rectangle-2.svg'
import pattern3 from '../assets/rectangle-3.svg'
import pattern4 from '../assets/rectangle-4.svg'
import pattern5 from '../assets/rectangle-5.svg'
import SectionIntro from '../contents/SectionIntro.vue'
import SectionOnExperiences from '../contents/SectionOnExperiences.vue'
</script>

<style scoped lang="scss">
.page.home {
  .pattern {
    width: 200px;
    height: 200px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;

    &.pattern-1 {
      width: 351px;
      height: 351px;
      top: calc(23px - 74px);
      right: 0;
      background-position: center right;
      z-index: 199;
    }

    &.pattern-2 {
      width: 328px;
      height: 328px;
      right: 0;
      top: 23px;
      background-position: center right;
      z-index: 200;
    }

    &.pattern-3 {
      width: 400px;
      height: 400px;
      left: 0;
      top: 452px;
      background-position: center left;
      z-index: 200;
    }

    &.pattern-4 {
      width: 400px;
      height: 400px;
      right: 0;
      top: 1186px;
      background-position: center right;
      z-index: 200;
    }

    &.pattern-5 {
      width: 400px;
      height: 400px;
      left: 0;
      top: 2430px;
      background-position: center left;
      z-index: 200;
    }
  }
}
</style>