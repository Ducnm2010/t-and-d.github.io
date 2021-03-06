<template>
    <section class="product-grid">
        <div class="product-grid-filter">
            <div class="product-grid-filter__meta" v-if="totalRecords > 0">
                Showing <span class="highlight">{{ currentRecordRange.from }}-{{ currentRecordRange.to }}</span> of over
                <span class="highlight">{{ totalRecords }}</span> results
            </div>
            <div class="product-grid-filter__meta" v-else>
                No result was found
            </div>
            <div class="product-grid-filter__settings">
                <a-select v-model:value="filterBy" class="filter-button grid-select-button" :options="filterOptions" />
                <a-select v-model:value="sortBy" class="sort-button grid-select-button" :options="sortOptions" />
                <template v-if="showGridOptions">
                    <button class="grid-icon grid-2" :class="{ active: gridType === GRID_TYPE.TWO_COL }"
                        @click="gridType = GRID_TYPE.TWO_COL">
                        <span class="icon"></span>
                    </button>
                    <button class="grid-icon grid-3" :class="{ active: gridType === GRID_TYPE.THREE_COL }"
                        @click="gridType = GRID_TYPE.THREE_COL">
                        <span class="icon"></span>
                    </button>
                </template>
            </div>

        </div>
        <div class="product-grid-list" :class="[{
            'grid-two': gridType === GRID_TYPE.TWO_COL,
            'grid-three': gridType === GRID_TYPE.THREE_COL
        }]">
            <a-row :gutter="gutter">
                <a-col v-for="(product, index) in listProducts" :key="index" :span="colSpan">
                    <card-product :item="product"></card-product>
                </a-col>
            </a-row>
        </div>
        <a-pagination v-if="totalRecords > 0" class="product-grid-pagination" v-model:current="pageNumber"
            v-model:pageSize="pageSize" :total="totalRecords" show-less-items />
    </section>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import CardProduct from './CardProduct.vue';
import { useContracts } from '../../store/useContracts'
import { useFirebase } from '../../store/useFirebase';
import { storeToRefs } from 'pinia';
import { useWindowSize } from '../../hooks'

const GRID_TYPE = {
    TWO_COL: 'TWO_COL',
    THREE_COL: 'THREE_COL'
}

const SORT_BY = {
    DEFAULT: 'DEFAULT',
    TIME: 'TIME',
    PRICE: 'PRICE'
}

const FILTER_BY = {
    DEFAULT: 'DEFAULT',
    AVAILABLE: 'AVAILABLE',
    CLOSED: 'CLOSED'
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

const filterOptions = [
    {
        label: 'All',
        value: FILTER_BY.DEFAULT
    },
    {
        label: 'Available Session',
        value: FILTER_BY.AVAILABLE
    },
    {
        label: 'Closed Session',
        value: FILTER_BY.CLOSED
    }
]

const contractStore = useContracts()
const firebaseStore = useFirebase()
const { filterFunction, listSessions, listSessionsPaginated, pagination } = storeToRefs(firebaseStore)
const listProducts = ref([])
const token = ref(0)

const { height, width } = useWindowSize()
const gridType = ref(GRID_TYPE.THREE_COL)
const gutter = computed(() => {
    if (width.value > 1000) {
        return 70
    } else if (width.value > 600) {
        return 15
    } else {
        return 10
    }
})
const colSpan = computed(() => {
    if (width.value > 1000) {
        if (gridType.value === GRID_TYPE.TWO_COL) return 12
        if (gridType.value === GRID_TYPE.THREE_COL) return 8
    }
    if (width.value > 600) {
        return 12
    } else {
        return 24
    }
})
const showGridOptions = computed(() => {
    if (width.value > 1000) return true
    else return false
})
const sortBy = ref({
    label: 'Sort By',
    value: SORT_BY.DEFAULT
})

const filterBy = ref({
    label: 'Filter By',
    value: FILTER_BY.DEFAULT
})

const totalRecords = computed(() => pagination.value.totalRecords || 0)
const showedRecords = computed(() => listSessionsPaginated.value[pageNumber.value - 1]?.length || 0)
const pageSize = computed(() => pagination.value.pageSize)
const pageNumber = computed({
    get: () => pagination.value?.pageNumber || 0,
    set: val => pagination.value.pageNumber = val
})
const currentRecordRange = computed(() => {
    const _skip = (pageNumber.value - 1) * pageSize.value
    return {
        from: _skip + 1,
        to: _skip + showedRecords.value,
    }
})

onMounted(() => {
    contractStore.getAllSessions()
    firebaseStore.fetchSessions()
})

const byId = (a, b) => {
    if (a.id > b.id) return 1
    if (a.id < b.id) return -1
    return 0
}
const byPrice = (a, b) => {
    if (Number(a.startingPrice) > Number(b.startingPrice)) return -1
    if (Number(a.startingPrice) < Number(b.startingPrice)) return 1
    return 0
}
const byTime = (a, b) => {
    if (Number(a.startTime) > Number(b.startTime)) return -1
    if (Number(a.startTime) < Number(b.startTime)) return 1
    return 0
}

watch(sortBy, newVal => {
    if (newVal === SORT_BY.DEFAULT) listSessions.value.sort(byId) && token.value++
    if (newVal === SORT_BY.PRICE) listSessions.value.sort(byPrice) && token.value++
    if (newVal === SORT_BY.TIME) listSessions.value.sort(byTime) && token.value++

    pageNumber.value = 1
}, { immediate: true, deep: true })

watch(filterBy, newVal => {
    if (newVal === FILTER_BY.DEFAULT) filterFunction.value = val => val
    if (newVal === FILTER_BY.AVAILABLE) filterFunction.value = val => val.endTime >= (Date.now() / 1000)
    if (newVal === FILTER_BY.CLOSED) filterFunction.value = val => val.endTime < (Date.now() / 1000)

    pageNumber.value = 1
}, { immediate: true, deep: true })

watch([listSessionsPaginated, pageNumber], ([newList, newPage]) => {
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

            .grid-select-button {
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

        @media (max-width: 600px) {
            flex-direction: column;
            gap: 1rem;
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