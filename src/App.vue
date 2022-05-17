<template>
  <router-view />
  <full-screen-loading v-if="isLoading" />
  <a-modal
    v-model:visible="showSuggestion"
    title="Get your wallet"
    @ok="redirectToMetaMaskExtension"
    @cancel="setShowSuggestion(false)"
  >
    You need to install MetaMask first
  </a-modal>
</template>

<script setup>
import { computed, nextTick, onMounted } from 'vue'
import { useStateUI } from './store/useStateUI'
import { useContracts } from './store/useContracts'
import { useState } from './hooks'
import FullScreenLoading from './components/FullScreenLoading.vue'

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
onMounted(() => {
  contractStore.getEthereumContract()
})
</script>

<style lang="scss">
/* global */
html,
body {
  font-family: 'Raleway', sans-serif !important;

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
}

button.ant-btn:not(.ant-btn-primary) {
  &:hover {
    color: var(--antd-wave-shadow-color);
    span {
      text-shadow: 0 0 0 black;
    }
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

button.ant-btn {
  border-radius: 3px;

  &.drop-shadow {
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  }
}
</style>
