<template>
  <div class="account-info">
    <div class="account-info__avatar">
      <div class="avatar">
        <!-- <img src="../assets/user.png" alt="user"> -->
        <img src="" alt="user">
      </div>
    </div>
    <div class="account-info__username">
      <a-tooltip v-if="currentAccount">
        <template #title>{{ currentAccount }}</template>
        <a-typography-title class="username">{{ truncatedAccount }}</a-typography-title>
      </a-tooltip>
      <a-typography-title v-else class="username">Anonymous</a-typography-title>
    </div>
    <div class="account-info__wallet">

      <div class="wallet">
        <span class="symbol">
          <img src="../assets/ethereum.svg" alt="ether">
        </span>
        <span class="amount">
          {{ truncatedBalance }}
        </span>
        <span class="currency">{{ currency }}</span>
      </div>
    </div>
    <slot v-if="currentAccount" name="action"></slot>
    <div v-else style="text-align: center; margin-top: 10px">
      <a-button size="small" type="primary" @click="handleConnectToWallet">Get wallet</a-button>
    </div>
    <a-modal v-model:visible="visible" title="Notification" @ok="visible = false">
      You haven't connect to your wallet yet.
      Please connect to your wallet via meta mask
    </a-modal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useContracts } from '../store/useContracts'
import { storeToRefs } from 'pinia'

const contractStore = useContracts()
const { currentAccount, balance } = storeToRefs(contractStore)
const truncatedAccount = computed(() => currentAccount?.value?.slice(0, 10) + '...' || '')
const truncatedBalance = computed(() => balance?.value.slice(0, 7) || '0')

const currency = ref('ETH')


const visible = ref(false)
const handleConnectToWallet = async () => {
  await contractStore.connectWallet()
}

</script>

<style lang="scss" scoped>
.account-info {
  background-color: #f9f9f9;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 6px;
  position: relative;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 30%);

  @media (max-width: 1200px) {
    display: none;
  }

  .account-info__avatar {
    padding-top: 1rem;
    padding-bottom: 1rem;

    .avatar {
      max-width: 90px;
      margin: auto;

      img {
        max-width: 100%;
        border-radius: 50%;
        box-shadow: 1px 3px 5px rgba(0 0 0 / 30%);
      }
    }
  }

  .account-info__username {
    padding-left: 1rem;
    padding-right: 1rem;

    .username {
      display: block;
      text-align: center;
      font-size: 1rem;
      font-weight: bold;
    }
  }

  .account-info__wallet {

    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .wallet {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      vertical-align: middle;

      .symbol {

        img {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }
      }

      .amount {
        font-size: 2rem;
        font-weight: bold;
        margin-right: 4px;
      }

      .currency {
        font-size: 1rem;
        font-weight: bold;
        align-self: flex-end;
        margin-bottom: 4px;
      }
    }
  }
}
</style>