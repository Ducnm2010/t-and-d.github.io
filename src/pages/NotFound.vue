<template>
    <div class="page not-found">
        <div class="note">
            <a-typography-title>404 Not Found</a-typography-title>
            <a-typography-paragraph>
                Your page you're looking for is not here
            </a-typography-paragraph>
            <a-button type="link" @click="$router.push('/')">Back</a-button>
        </div>
    </div>
</template>

<script setup></script>

<style scoped lang="scss">
.page.not-found {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .note {
        margin-bottom: 100px;
    }
}
</style>