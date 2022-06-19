<template>
    <div class="page session-detail" id="session-detail">
        <section class="session-detail">
            <div class="container">
                <a-row>
                    <a-col :lg="12" :span="24">
                        <div class="wrap-photo">
                            <div v-wave class="photo">
                                <img :src="sessionInstance.imgSrc" alt="photos">
                            </div>
                        </div>
                    </a-col>
                    <a-col :lg="12" :span="24">
                        <div class="card-info">
                            <a-typography-title :level="2">
                                {{ sessionInstance.name }}
                            </a-typography-title>
                            <a-typography-paragraph>
                                {{ sessionInstance.description }}
                            </a-typography-paragraph>
                            <a-typography-paragraph>
                                <a-tooltip>
                                    <template #title>
                                        {{ ownerAddress }}
                                    </template>
                                    Owner by
                                    <span class="ơwner highlight">
                                        {{ isOwner ? 'Me' : ownerAddressTrim }}
                                    </span>
                                </a-tooltip>
                            </a-typography-paragraph>

                            <a-divider></a-divider>

                            <a-row>
                                <a-col :span="12">
                                    <div class="current-bid">
                                        <a-typography-paragraph class="label">Current Bid</a-typography-paragraph>
                                        <span class="highlight">
                                            <img class="icon" src="../assets/ethereum.svg" alt="ether">
                                            {{ currentBidFormatted }}
                                            {{ currency }}
                                        </span>
                                    </div>
                                </a-col>
                                <a-col :span="12">
                                    <div class="countdown">
                                        <a-typography-paragraph class="label">Auctions Ends In</a-typography-paragraph>
                                        <span class="highlight">
                                            {{ endTime }}
                                        </span>
                                    </div>
                                </a-col>
                            </a-row>

                            <a-divider></a-divider>
                            <div v-if="hasNotBegin">
                                <a-typography-paragraph class="transaction">
                                    Status: <span class="highlight">Pending</span>
                                </a-typography-paragraph>
                                <a-typography-paragraph class="transaction">

                                </a-typography-paragraph>
                            </div>
                            <template v-else-if="isActive">
                                <div>
                                    <a-input v-model:value="bidPrice" size="large" class="bid-input"></a-input>
                                    <a-button type="primary" style="width: 100%;" @click="handleBid">
                                        Place a bid
                                    </a-button>
                                </div>
                            </template>

                            <template v-else>
                                <div v-if="isNoOneJoin">
                                    <a-typography-paragraph class="transaction">
                                        Status: No one has joined this session
                                    </a-typography-paragraph>
                                </div>
                                <div v-else-if="!isNoOneJoin" class="transaction">
                                    <a-typography-paragraph class="label">
                                        <!-- Transaction URL -->
                                        The winner is:
                                    </a-typography-paragraph>
                                    <a-tooltip>
                                        <template #title>{{ transactionURL }}</template>
                                        <span class="highlight">
                                            {{ transactionURLTrim }}
                                        </span>
                                    </a-tooltip>
                                </div>
                            </template>
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
import { onMounted, watchEffect, watch, computed, ref, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import { ethers } from 'ethers';
import formatter from '../utils/formatter'
import dayjs from 'dayjs'

const route = useRoute()
const firebaseStore = useFirebase()
const contractStore = useContracts()
const { sessionInstance } = storeToRefs(firebaseStore)
const { listSessions, currentAccount } = storeToRefs(contractStore)

const id = route.params.id

const currency = 'Wei'
const sessionDetail = ref(null)
const transactionURL = ref('')
const transactionURLTrim = computed(() => {
    const _first = transactionURL.value.slice(0, 6)
    const _last = transactionURL.value.slice(-4)
    return _first + '...' + _last
})
const ownerAddress = ref('')
const ownerAddressTrim = computed(() => {
    const _first = ownerAddress.value?.slice(0, 6) || '...'
    const _last = ownerAddress.value?.slice(-4) || '...'
    return _first + '...' + _last
})
const isActive = computed(() => sessionDetail.value?.endTime >= (Date.now() / 1000) && sessionDetail.value?.startTime < (Date.now() / 1000))
// const isOwner = computed(() => ethers.utils.recoverAddress(currentAccount.value) === ethers.utils.recoverAddress(ownerAddress.value))

const timeNow = ref(Date.now() / 1000)
const interval = ref(null)
onMounted(() => {
    interval.value = setInterval(() => {
        timeNow.value += 1
    }, 1000)
})
onUnmounted(() => {
    interval.value = null
})
const isOwner = computed(() => currentAccount.value === ownerAddress.value)
const hasNotBegin = computed(() => sessionDetail.value?.startTime > timeNow.value)
const hasEnded = computed(() => sessionDetail.value?.endTime < timeNow.value)
const endTime = computed(() => dayjs.unix(sessionInstance.value.endTime).format('DD-MM-YYYY HH:mm'))
const reason = ref('')
const message = ref('')
const isNoOneJoin = computed(() => reason.value === 'NO_ONE_JOIN_THIS_SESSION')
const bidPrice = ref('')
const currentBid = ref(0)
const currentBidFormatted = computed(() => formatter.appendThousandSeparator(currentBid.value) || 0)
const setCurrentBid = async () => {
    const response = await contractStore.getHighestBid(sessionDetail.value.index)
    if (response.reason) {
        currentBid.value = sessionDetail.value.startingPrice // fallback to default
        reason.value = response.reason
    }
    if (response.fund) {
        currentBid.value = response.fund.toString()
        transactionURL.value = response['0']
    }
    return
}

watch(isNoOneJoin, newVal => {
    if (newVal) message.value = 'No one has joined this session'
})

const handleBid = async () => {
    await contractStore.placeBid(sessionDetail.value.index, Number(bidPrice.value))
    const response = await contractStore.getHighestBid(sessionDetail.value.index)
    console.log(response)
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
    ownerAddress.value = sessionDetail.value.address
})

watch(sessionDetail, () => setCurrentBid())

watchEffect(() => console.log(sessionInstance.value))
watchEffect(() => console.log('ownerAddress', typeof ownerAddress.value, ownerAddress.value))
watchEffect(() => console.log('currentAccount', typeof currentAccount.value, currentAccount.value))
// watchEffect(() => console.log('isOwner', isOwner.value))

watch(hasEnded, (newVal, oldVal) => {
    if (newVal) {
        console.log(sessionDetail.value.index)
        contractStore.endSession(sessionDetail.value.index)
    }
})
</script>

<style scoped lang="scss">
.page#session-detail {
    height: 100%;

    section.session-detail {
        margin-top: 40px;
    }

    .wrap-photo {
        @media (min-width: 992px) {
            max-width: 540px;
            height: 100%;
        }

        margin-bottom: 30px;

        .photo {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            overflow: hidden;
            min-height: 300px;

            img {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
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