<template>
  <div class="page bidding">
    <div class="container">
      <a-row :gutter="32">
        <a-col :xl="19" :span="24">
          <div class="wrap-col list-sessions">
            <div class="space" style="height: 2rem"></div>
            <a-typography-title style="font-size: 2.5rem;">
              List of the available bidding sessions
            </a-typography-title>
            <a-typography-paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, esse natus tempore
              dignissimos
              rerum aspernatur asperiores mollitia neque eos voluptatum.
            </a-typography-paragraph>
            <div class="space" style="height: 4rem"></div>
            <section class="section-sesson">
              <ul class="list-sessions">
                <list-session-item v-for="(item) in listSessions" :key="item.id" :id="item.id" :starting-price="item.startingPrice" :starting-time="item.startingTime" :img-src="item.imgSrc" @click="$router.push(`/session/detail/${item.id + 1}`)" />
              </ul>
            </section>
            <div class="space" style="height: 5rem"></div>
          </div>
        </a-col>
        <a-col :xl="5">
          <div class="wrap-col account-info">
            <account-info>
              <template #action>
                <a-row class="user-action" type="flex" justify="center" style="row-gap: 5px">
                  <a-button type="primary" size="small" @click="$router.push('/session/create')">
                    <template #icon>
                      <plus-outlined class="icon-action small" />
                    </template>
                    New session
                  </a-button>
                </a-row>
              </template>
            </account-info>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-modal v-model:visible="showRedirectNotify" title="Notify" @cancel="redirectToAboutPage" @ok="redirectToAboutPage">
      You have not connected to your account or wallet,
      Please connect first and comeback
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { PlusOutlined, FilterOutlined, WalletOutlined } from '@ant-design/icons-vue'
import ListSessionItem from '../components/ListSessionItem.vue'
import AccountInfo from '../components/AccountInfo.vue'
import { useState } from '../hooks'
import { useContracts } from '../store/useContracts'
import { storeToRefs } from 'pinia'

const router = useRouter()

const [showRedirectNotify, setShowRedirectNotify] = useState(false)
const redirectToAboutPage = () => {
  setShowRedirectNotify(false)
  router.push('/')
}

const contractStore = useContracts()
const { listSession } = storeToRefs(contractStore)

const listSessions = computed(() => listSession.value || [])

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
  background-color: #eeeeee;
  overflow-y: auto;

  .container {
    max-width: 1200px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin: auto;
  }

  .wrap-col.list-sessions {
    max-width: 1000px;
    margin: auto;
  }

  .wrap-col.account-info {
    position: sticky;
    top: 2rem;
    bottom: 2rem;
  }

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