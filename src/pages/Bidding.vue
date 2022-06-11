<template>
  <div class="page bidding">
    <div class="container">
      <div class="space" style="height: 2rem"></div>
      <div class="page-header" style="max-width: 817px;">
        <a-typography-title :level="2">
          List of the available bidding sessions
        </a-typography-title>
        <a-typography-paragraph style="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, esse natus tempore
          dignissimos
          rerum aspernatur asperiores mollitia neque eos voluptatum.
        </a-typography-paragraph>
      </div>
      <div class="space" style="height: 50px;"></div>
      <section-product-grid></section-product-grid>
      <div class="space" style="height: 5rem"></div>
    </div>
    <a-modal v-model:visible="showRedirectNotify" title="Notify" @cancel="redirectToAboutPage"
      @ok="redirectToAboutPage">
      You have not connected to your account or wallet,
      Please connect first and comeback
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '../hooks'
import { useContracts } from '../store/useContracts'
import SectionProductGrid from '../contents/SectionProductGrid/SectionProductGrid.vue'

const router = useRouter()

const [showRedirectNotify, setShowRedirectNotify] = useState(false)
const redirectToAboutPage = () => {
  setShowRedirectNotify(false)
  router.push('/')
}

const contractStore = useContracts()

onMounted(async () => {
  try {
    await contractStore.connectWallet()
    await contractStore.getBalance()
    await contractStore.getAllSessions()
  } catch (error) {
    console.log(error)
  }
})
</script>

<style lang="scss" scoped>
.page.bidding {
  height: 100%;
  overflow-y: auto;

  ul.list-sessions {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 3rem;
    column-gap: 1rem;
    padding-left: 0;
  }

  .user-action {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
    row-gap: 4px;
    column-gap: 4px;

    .icon-action {
      &.small {
        font-size: 11px;
      }
    }
  }
}
</style>