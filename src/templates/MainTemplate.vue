<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">
      <div class="header">
        <div class="brand">
          <img
            src="../assets/T&D.png"
            alt="logo"
            @click="$router.push('/')"
            style="cursor: pointer"
          >
        </div>
        <a-menu
          :selectedKeys="current"
          mode="horizontal"
          theme="dark"
          @select="handleSelect"
        >
          <a-menu-item key="about">
            <template #icon>
              <home-outlined />
            </template>
            About
          </a-menu-item>
          <!-- <a-menu-item key="login">
            <template #icon>
              <login-outlined />
            </template>
            Login
          </a-menu-item> -->
          <a-menu-item key="guide">
            <template #icon>
              <book-outlined />
            </template>
            Guide
          </a-menu-item>
          <a-menu-item key="bidding">
            <template #icon>
              <transaction-outlined />
            </template>
            Start Bidding
          </a-menu-item>
          <a-menu-item key="user">
            <template #icon>
              <user-outlined />
            </template>
            User
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="layout-footer"> © Copyright by T&D </a-layout-footer>
    <a-modal
      v-model:visible="showGuide"
      title="Guide to our service"
      @ok="showGuide = false"
    >
      Our service is based on blockchain platform in order to save all our customer's transaction.
      That ensure you to avoid all matter of scams

      <ol style="margin-top: 1.5rem">
        <li>
          <a class="hyperlink" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
            Install MetaMask extension.
          </a>
          This helps us to help you connect to your wallet.
        </li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, excepturi?</li>
        <li>Lorem, ipsum dolor.</li>
      </ol>
    </a-modal>
  </a-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HomeOutlined, LoginOutlined, TransactionOutlined, BookOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useState } from '../hooks';

const router = useRouter()
const route = useRoute()

const current = computed(() => {
  return [route.name]
})

const [showGuide, setShowGuide] = useState(false)

const handleSelect = (selected) => {
  if (selected.key === 'about') return router.push({ name: 'about' })
  if (selected.key === 'guide') return setShowGuide(true)
  if (selected.key === 'user') return null
  else router.push(`/${selected.key}`)
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex: 1;
  background-color: #ffffff;
}

.hyperlink {
  text-decoration: underline;
}

.layout-header {
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
  z-index: 100;

  .header {
    display: flex;
    height: 100%;
    align-items: stretch;
    justify-content: space-between;
  }

  .brand {
    width: 214px;
    height: 60px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}


.layout-footer {
  background-color: #001529;
  color: #ffffff;
  box-shadow: 1px -3px 5px rgb(0 0 0 / 30%);
}
</style>