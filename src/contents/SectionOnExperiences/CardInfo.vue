<template>
    <div class="card-info">
        <img :src="iconPath" alt="icon">
        <div class="title">{{ title }}</div>
        <div class="content">{{ content }}</div>
    </div>
</template>

<script setup>
defineProps({
    iconPath: String,
    title: String,
    content: String
})
</script>

<style scoped lang="scss">
.card-info {
    img {
        margin-bottom: 20px;
    }

    .title {
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
    }

    .content {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
    }
}
</style>