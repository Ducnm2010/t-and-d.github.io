<template>
  <router-view />
  <full-screen-loading v-if="isLoading" />
  <a-modal v-model:visible="showSuggestion" title="Get your wallet" @ok="redirectToMetaMaskExtension"
    @cancel="setShowSuggestion(false)">
    You need to install MetaMask first in order to join
  </a-modal>
  <a-modal v-model:visible="showGuidance" title="Wallet connected fail" @ok="contractStore.showGuidance = false"
    @cancel="contractStore.showGuidance = false">
    The request has been sent to you. Please check your meta mask to login.
  </a-modal>
</template>

<script setup>
import { computed, nextTick, onMounted } from 'vue'
import { useStateUI } from './store/useStateUI'
import { useContracts } from './store/useContracts'
import { useState } from './hooks'
import FullScreenLoading from './components/FullScreenLoading.vue'

console.log(process.env.NODE_ENV);

const { screenLoading, setScreenLoading } = useStateUI()
const isLoading = computed(() => screenLoading.value)
window.onload = function () {
  setScreenLoading(true)
  nextTick(() => {
    setScreenLoading(false)
  })
}

const [showSuggestion, setShowSuggestion] = useState(false)
const metaMaskExtensionUrl = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
const redirectToMetaMaskExtension = () => {
  window.open(metaMaskExtensionUrl, '_blank').focus()
}

const contractStore = useContracts()
const showGuidance = computed(() => contractStore.showGuidance)

const { ethereum } = window;
ethereum.on('accountsChanged', (accounts) => {
  window.location.reload()
});

onMounted(() => {
  contractStore.getEthereumContract()
})
</script>

<style lang="scss">
/* global */

// variable
:root {
  --text-primary: #111827;
  --text-secondary: #757575;
  --primary-color: #2979FF;
}


html,
body {
  font-family: "Inter", sans-serif !important;

  * {
    font-variant-numeric: lining-nums;
    font-feature-settings: "lnum";
    -moz-font-feature-settings: "lnum";
    -moz-font-feature-settings: "lnum=1";
    -ms-font-feature-settings: "lnum";
    -o-font-feature-settings: "lnum";
    -webkit-font-feature-settings: "lnum";
  }
}

#app {
  display: flex;
  flex: 1;

  .page {
    min-height: 100vh;
  }


  // overwrite ant styles
  .ant-layout-header .ant-menu,
  .ant-menu-horizontal>.ant-menu-item::after,
  .ant-menu-horizontal>.ant-menu-submenu::after,
  .ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-item:hover::after,
  .ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-submenu:hover::after,
  .ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-item-active::after,
  .ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-submenu-active::after,
  .ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-item-open::after,
  .ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-submenu-open::after,
  .ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-item-selected::after,
  .ant-menu-horizontal:not(.ant-menu-dark)>.ant-menu-submenu-selected::after {
    border-bottom: none;
  }

  h1.ant-typography {}

  h2.ant-typography {
    color: var(--text-primary);
    font-size: 30px;
    font-weight: 600;
  }

  div.ant-typography {
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: 400;
    line-height: 24px;
  }

  .ant-btn {
    border-radius: 12px;
    padding: 12px 24px;
    height: unset;
    width: unset;
    font-size: 1rem;
    font-weight: 600;
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  box-shadow: 0 0 0 30px white inset !important;
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

::-webkit-scrollbar {
  width: 5px;
  border-radius: 10px;
  background-color: #ccc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.highlight {
  font-weight: bold;
  color: var(--primary-color)
}
</style>
