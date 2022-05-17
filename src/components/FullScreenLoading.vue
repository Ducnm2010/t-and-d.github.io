<template>
    <div class="full-screen-loading">
        <div class="loading-image">
            <img src="../assets/loading.gif" alt="loading-gif">
        </div>
    </div>
</template>

<script setup></script>

<style scoped lang="scss">
.full-screen-loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    z-index: 1000;

    .loading-image {
        width: 300px;
        height: 300px;
        background: #dfdfde; // match with the gif background
        border-radius: 50%;
        overflow: hidden;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>