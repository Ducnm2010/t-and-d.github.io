<template>
    <section class="product-grid">
        <div class="product-grid-filter">
            <div class="product-grid-filter__meta">
                Showing <span class="highlight">1-12</span> of over <span class="highlight">500</span> results
            </div>
            <div class="product-grid-filter__settings"></div>

        </div>
        <div class="product-grid-list">
            <a-row>
                <a-col v-for="(product, index) in listProducts" :key="index">
                    <card-product></card-product>
                </a-col>
            </a-row>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue'
import CardProduct from './CardProduct.vue';
import { useContracts } from '../../store/useContracts'
import { storeToRefs } from 'pinia';

const contractStore = useContracts()
const {} = storeToRefs(contractStore)


onMounted(() => {
    contractStore.getAllSessions()
})
</script>

<style scoped lang="scss">
.product-grid {
    .product-grid-filter {
        .product-grid-filter__meta {
            font-size: 1rem;
        }

        .product-grid-filter__settings {}
    }

    .product-grid-list {}
}
</style>