<template>
    <div class="subfooter">
        <social-links></social-links>
        <copyright style="margin-top: 12px;"></copyright>
    </div>
</template>

<script setup>
import SocialLinks from '../../components/SocialLinks.vue';
import Copyright from '../../components/Copyright.vue';
</script>

<style scoped lang="scss">
.subfooter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 34px;
    margin-bottom: 34px;
}
</style>