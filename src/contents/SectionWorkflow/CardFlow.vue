<template>
    <div class="card-flow" :style="positionProps">
        <img :src="imgSrc" alt="icon">
        <div class="title">{{ title }}</div>
        <div class="content">{{ content }}</div>
    </div>
</template>

<script setup>
defineProps({
    imgSrc: String,
    title: String,
    content: String,
    positionProps: String
})
</script>

<style scoped lang="scss">
.card-flow {
    position: absolute;
    width: 347px;
    padding: 16px;
    text-align: left;
    background-color: #fff;
    box-shadow: 0px 1px 2px rgba(17, 24, 39, 0.1), 0px 1px 3px rgba(17, 24, 39, 0.2);
    border-radius: 12px;
    z-index: 1;

    img {
        margin-bottom: 29px
    }

    .title {
        color: var(--text-primary);
        font-size: 24px;
        font-weight: 600;
        line-height: 29px;
        margin-bottom: 24px;
    }

    .content {
        color: var(--text-secondary);
        font-size: 16px;
        line-height: 24px;
    }
}
</style>