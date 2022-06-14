<template>
    <div class="page session-detail" id="session-detail">
        <section class="session-detail">
            <div class="container">
                <a-row>
                    <a-col :span="12">
                        <div class="wrap-photo">
                            <div class="photo" :style="{ 'background-image': `url(${sessionInstance.imgSrc})` }"></div>
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="card-info">
                            <a-typography-title :level="2">
                                {{ sessionInstance.name }}
                            </a-typography-title>
                            <a-typography-paragraph>
                                {{ sessionInstance.description }}
                            </a-typography-paragraph>
                            <a-typography-paragraph>
                                Owner by <span class="ơwner highlight">Updating</span>
                            </a-typography-paragraph>

                            <a-divider></a-divider>

                            <a-row>
                                <a-col :span="8">
                                    <div class="current-bid">
                                        <a-typography-paragraph class="label">Current Bid</a-typography-paragraph>
                                        <span class="highlight">
                                            <img class="icon" src="../assets/ethereum.svg" alt="ether">
                                            {{ currentBid }}
                                            {{ currency }}
                                        </span>
                                    </div>
                                </a-col>
                                <a-col :span="16">
                                    <div class="countdown">
                                        <a-typography-paragraph class="label">Auctions Ends In</a-typography-paragraph>
                                        <span class="highlight">
                                            {{ endTime }}
                                        </span>
                                    </div>
                                </a-col>
                            </a-row>

                            <a-divider></a-divider>
                            <div v-if="!isActive" class="transaction">
                                <a-typography-paragraph class="label">
                                    Transaction URL
                                </a-typography-paragraph>
                                <a-tooltip>
                                    <template #title>{{ transactionURL }}</template>
                                    <span class="highlight">
                                        {{ transactionURLTrim }}
                                    </span>
                                </a-tooltip>
                            </div>
                            <div v-else>
                                <a-input v-model:value="bidPrice" size="large" class="bid-input"></a-input>
                                <a-button type="primary" style="width: 100%;" @click="handleBid">Place a bid</a-button>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useFirebase } from '../store/useFirebase'
import { useContracts } from '../store/useContracts'
import { onMounted, watchEffect, watch, computed, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'

const route = useRoute()
const firebaseStore = useFirebase()
const contractStore = useContracts()
const { sessionInstance } = storeToRefs(firebaseStore)
const { listSessions } = storeToRefs(contractStore)

const id = route.params.id

const currency = 'ETH'
const sessionDetail = ref(null)
const transactionURL = ref('')
const transactionURLTrim = computed(() => {
    const _first = transactionURL.value.slice(0, 6)
    const _last = transactionURL.value.slice(-4)
    return _first + '...' + _last
})
const isActive = computed(() => sessionDetail.value?.endTime >= (Date.now() / 1000))
const endTime = computed(() => dayjs.unix(sessionInstance.value.endTime).format('DD-MM-YYYY HH:mm'))


watchEffect(() => console.log(sessionInstance.value.endTime))

const bidPrice = ref('')
const currentBid = ref(0)
const setCurrentBid = async () => {
    const response = await contractStore.getHighestBid(sessionDetail.value.index)
    console.log('response', response)
    if (!response) return currentBid.value = sessionDetail.value.startingPrice
    currentBid.value = response.fund.toString()
    transactionURL.value = response['0']
    return
}
const handleBid = async () => {
    await contractStore.placeBid(sessionDetail.value.index, Number(bidPrice.value))
    await contractStore.getHighestBid(sessionDetail.value.index)
}


onMounted(async () => {
    await firebaseStore.fetchSessionDetail(id)
    await contractStore.getAllSessions()
})


const match = (recordOnChain, recordInDB) => {
    return Number(recordOnChain.startTime) === Number(recordInDB.startTime) && Number(recordOnChain.startingPrice) === Number(recordInDB.startingPrice)
}

watch([sessionInstance, listSessions], ([currentSession, currentList]) => {
    const recordFromContract = currentList.filter(session => match(session, currentSession))[0]
    const recordFromDB = currentSession
    sessionDetail.value = Object.assign(recordFromDB, recordFromContract)
})

watch(sessionDetail, () => setCurrentBid())
</script>

<style scoped lang="scss">
.page#session-detail {
    height: 100%;

    section.session-detail {
        margin-top: 40px;
    }

    .wrap-photo {
        max-width: 540px;
        height: 100%;

        .photo {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 12px;
        }

    }

    .card-info {
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 24px 30px;
        height: 100%;

        :deep(.ant-typography .label) {
            font-size: 16px;
            line-height: 30px;
            margin-bottom: 8px;
            color: var(--text-primary) !important;
        }

        .current-bid {
            display: flex;
            flex-direction: column;

            .icon {
                width: 21px;
                height: 30px;
            }
        }

        .countdown {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-end;
        }

        .current-bid,
        .countdown,
        .transaction {
            span {
                font-size: 24px;
                line-height: 30px;
                font-weight: 600;
                color: var(--blue-color);
            }
        }
    }

    .bid-input {
        border-radius: 8px;
        margin-bottom: 32px;
    }
}
</style>