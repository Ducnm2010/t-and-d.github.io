<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">
      <main-header @click-guild="setShowGuide(true)"></main-header>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="layout-footer">
      <main-footer v-if="route.path === '/'"></main-footer>
      <sub-footer v-else></sub-footer>
    </a-layout-footer>
    <a-modal v-model:visible="showGuide" title="Guide to our service" @ok="showGuide = false">
      Our service is based on blockchain platform in order to save all our
      customer's transaction. That ensure you to avoid all matter of scams

      <ol style="margin-top: 1.5rem">
        <li>
          <a class="hyperlink"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Install
            MetaMask extension</a>. This helps us to help you connect to your wallet.
        </li>
        <li>Choose your own account and connect to wallet via meta mask</li>
      </ol>
    </a-modal>
  </a-layout>
</template>

<script setup>
import MainHeader from './MainHeader.vue'
import MainFooter from './MainFooter.vue'
import SubFooter from './SubFooter.vue';
import { useState } from '../../hooks';
import { useRoute } from 'vue-router'

const [showGuide, setShowGuide] = useState(false)
const route = useRoute()
console.log(route)
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex: 1;
  background-color: #ffffff;

  .layout-header {
    background-color: #ffffff;
  }
}

.hyperlink {
  text-decoration: underline;
}

.layout-header {
  position: relative;
  z-index: 100;
  margin-top: 20px;
  margin-bottom: 20px;

  .header {
    display: flex;
    height: 100%;
    max-width: 1200px;
    margin: auto;
    align-items: stretch;
    justify-content: space-between;
  }

  .brand {
    width: 214px;
    height: 60px;

    img {
      object-fit: cover;
    }
  }
}
</style>