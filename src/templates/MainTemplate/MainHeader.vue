<template>
    <div class="header">
        <div class="brand">
            <img src="../../assets/logo.svg" alt="logo" @click="$router.push('/')" style="cursor: pointer" />
        </div>
        <a-menu :selectedKeys="current" mode="horizontal" @select="handleSelect">
            <a-menu-item key="about">
                <template #icon>
                    <home-outlined />
                </template>
                Home
            </a-menu-item>
            <a-menu-item key="guide">
                <template #icon>
                    <book-outlined />
                </template>
                Guide
            </a-menu-item>
            <a-menu-item key="session-create">
                <template #icon>
                    <dingding-outlined></dingding-outlined>
                </template>
                Create Session
            </a-menu-item>
            <a-menu-item key="bidding">
                <template #icon>
                    <transaction-outlined />
                </template>
                Start Bidding
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { HomeOutlined, TransactionOutlined, BookOutlined, DingdingOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const emit = defineEmits(['click-guild'])

const current = computed(() => {
    return [route.name]
})

const handleSelect = (selected) => {
    if (selected.key === 'about') return router.push({ name: 'about' })
    if (selected.key === 'guide') return emit('click-guild')
    if (selected.key === 'session-create') return router.push({ name: 'session-create' })
    if (selected.key === 'user') return null
    else router.push(`/${selected.key}`)
}
</script>