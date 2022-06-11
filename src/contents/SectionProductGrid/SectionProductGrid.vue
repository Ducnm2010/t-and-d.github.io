<template>
    <section class="product-grid">
        <div class="product-grid-filter">
            <div class="product-grid-filter__meta">
                Showing <span class="highlight">1-12</span> of over
                <span class="highlight">{{ totalRecords }}</span> results
            </div>
            <div class="product-grid-filter__settings">
                <a-select v-model:value="sortBy" class="sort-button" :options="sortOptions">
                </a-select>
                <button class="grid-icon grid-2" :class="{ active: gridType === GRID_TYPE.TWO_COL }"
                    @click="gridType = GRID_TYPE.TWO_COL">
                    <span class="icon"></span>
                </button>
                <button class="grid-icon grid-3" :class="{ active: gridType === GRID_TYPE.THREE_COL }"
                    @click="gridType = GRID_TYPE.THREE_COL">
                    <span class="icon"></span>
                </button>
            </div>

        </div>
        <div class="product-grid-list">
            <a-row :gutter="70">
                <a-col v-for="(product, index) in listProducts" :key="index" :span="colSpan">
                    <card-product :item="product"></card-product>
                </a-col>
            </a-row>
        </div>
        <a-pagination class="product-grid-pagination" v-model:current="pageNumber" :total="totalRecords"
            show-less-items />
    </section>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import CardProduct from './CardProduct.vue';
import { useContracts } from '../../store/useContracts'
import { storeToRefs } from 'pinia';

const GRID_TYPE = {
    TWO_COL: 'TWO_COL',
    THREE_COL: 'THREE_COL'
}

const SORT_BY = {
    DEFAULT: 'DEFAULT',
    TIME: 'TIME',
    PRICE: 'PRICE'
}

const sortOptions = [
    {
        label: 'Sort by default',
        value: SORT_BY.DEFAULT
    },
    {
        label: 'Sort by time',
        value: SORT_BY.TIME
    },
    {
        label: 'Sort by price',
        value: SORT_BY.PRICE
    }
]

const contractStore = useContracts()
const { listSession, listSessionPaginated, pagination } = storeToRefs(contractStore)
const listProducts = ref([])

const gridType = ref(GRID_TYPE.THREE_COL)
const colSpan = computed(() => {
    if (gridType.value === GRID_TYPE.TWO_COL) return 12
    if (gridType.value === GRID_TYPE.THREE_COL) return 8
})
const sortBy = ref({
    label: 'Sort By',
    value: SORT_BY.DEFAULT
})

const totalRecords = computed(() => pagination.value.totalRecords || 0)
const pageNumber = computed({
    get: () => pagination.value?.pageNumber || 0,
    set: val => pagination.value.pageNumber = val
})

onMounted(() => {
    contractStore.getAllSessions()
})

watch(sortBy, newVal => {
    if (newVal === SORT_BY.DEFAULT) {
        listSession.value.sort((a, b) => {
            if (a.id > b.id) return 1
            if (a.id < b.id) return -1
            return 0
        })
    }
    if (newVal === SORT_BY.PRICE) {
        listSession.value.sort((a, b) => {
            if (Number(a.startingPrice) > Number(b.startingPrice)) return 1
            if (Number(a.startingPrice) < Number(b.startingPrice)) return -1
            return 0
        })
    }
    if (newVal === SORT_BY.TIME) {
        listSession.value.sort((a, b) => {
            if (a.startingTime > b.startingTime) return 1
            if (a.startingTime < b.startingTime) return -1
            return 0
        })
    }
    pageNumber.value = 1
}, { immediate: true, deep: true })

watch([listSessionPaginated, pageNumber], ([newList, newPage]) => {
    listProducts.value = newList[newPage - 1] ? newList[newPage - 1] : []
}, { immediate: true, deep: true })
</script>

<style scoped lang="scss">
.product-grid {
    .product-grid-filter {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;

        .product-grid-filter__meta {
            font-size: 1rem;
        }

        .product-grid-filter__settings {
            display: flex;
            align-items: center;

            .sort-button {
                width: 180px;
                height: 40px;
                margin-right: 20px;

                :deep(.ant-select-selector) {
                    border-radius: 8px;
                    height: 100%;
                }

                :deep(.ant-select-selection-item) {
                    line-height: 40px;
                }
            }


            .grid-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border: 1px solid #E5E7EB;
                border-radius: 8px;
                margin: 0 4px;
                cursor: pointer;

                .icon {
                    display: block;
                    width: 24px;
                    height: 24px;
                    mask-position: center;
                    mask-size: contain;
                    mask-repeat: no-repeat;
                    -webkit-mask-position: center;
                    -webkit-mask-size: contain;
                    -webkit-mask-repeat: no-repeat;
                    background-color: #757575;
                }

                &.grid-2 {
                    .icon {

                        mask-image: url('../../assets/icons/grid-2.svg');
                        -webkit-mask-image: url('../../assets/icons/grid-2.svg');
                    }
                }

                &.grid-3 {
                    .icon {
                        mask-image: url('../../assets/icons/grid-3.svg');
                        -webkit-mask-image: url('../../assets/icons/grid-3.svg');
                    }
                }

                &.active {
                    background-color: rgba(41, 121, 255, 0.1);
                    border-color: rgba(41, 121, 255, 0.1);

                    .icon {
                        background-color: #2979FF;
                    }
                }
            }
        }
    }

    // .product-grid-list {}

    .product-grid-pagination {
        width: fit-content;
        margin: 50px auto 120px;

        :deep(li) {
            border-radius: 4px;
        }
    }
}
</style>