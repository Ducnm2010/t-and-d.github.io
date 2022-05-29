<template>
  <div class="page home">
    <section-intro></section-intro>

    <div class="pattern pattern-1" style="background-image: url('../assets/rectangle-1.svg')"></div>
    <div class="pattern pattern-2" style="background-image: url('../assets/rectangle-2.svg')"></div>
    <div class="pattern pattern-3" style="background-image: url('../assets/rectangle-3.svg')"></div>
  </div>
</template>

<script setup>
import SectionIntro from '../contents/SectionIntro.vue'
</script>

<style scoped lang="scss">
.page.home {
  .pattern {
    width: 200px;
    height: 200px;
    background-size: contain;
    background-position: center;

    &.pattern-1 {}

    &.pattern-2 {}

    &.pattern-3 {}
  }
}
</style>