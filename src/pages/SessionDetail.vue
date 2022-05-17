<template>
    <div class="page session-detail">
        <a-typography-title
            align="center"
            style="padding-top: 3rem; color: #fff"
        >
            The session will end in:
        </a-typography-title>


        <div class="timebox">
            <div class="time-left timebox-days">
                <label>Day</label>
                <span>{{ formattedTimeLeft.days }}</span>
            </div>
            <div class="time-left timebox-hours">
                <label>Hour</label>
                <span>{{ formattedTimeLeft.hours }}</span>
            </div>
            <div class="time-left timebox-minutes">
                <label>Minute</label>
                <span>{{ formattedTimeLeft.minutes }}</span>
            </div>
            <div class="time-left timebox-seconds">
                <label>Second</label>
                <span>{{ formattedTimeLeft.seconds }}</span>
            </div>
        </div>

        <a-typography-title
            :level="4"
            class="current-highest-price"
        >
            {{ startingPrice }}
            <span class="currency" style="font-size: 2rem">ETH</span>
        </a-typography-title>

        <a-form
            class="bidding-form"
            :model="formState"
            layout="vertical"
            align="center"
        >
            <a-form-item name="bidPrice">
                <a-input v-model:value="formState.bidPrice" />
            </a-form-item>
            <a-form-item>
                <a-button
                    @click="handleSubmit"
                    type="primary"
                >Bid</a-button>
            </a-form-item>
        </a-form>

    </div>
</template>

<script setup>
import moment from 'moment'
import { ref, computed, watch, onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import { useContracts } from '../store/useContracts';
import { formatTimestampIntoUnits } from '../utils/formatter'
import { sessionDuration, timeStep } from '../utils/constant'

const route = useRoute()
const contractStore = useContracts()
const { listSession } = storeToRefs(contractStore)

const currentSession = computed(() => {
    const isCurrentSession = item => (item.id + 1) === Number(route.params.id)
    const foundIndex = listSession?.value?.findIndex(isCurrentSession)
    if (foundIndex > -1) return listSession.value[foundIndex]
    else return null
})
const startingPrice = computed(() => currentSession.value?.startingPrice || 0)
const startingTime = computed(() => Number(currentSession.value?.startingTime))
const endTime = computed(() => Number(startingTime.value) + sessionDuration)

const timeLeft = ref(0) // timestamp
const formattedTimeLeft = computed(() =>
    formatTimestampIntoUnits(timeLeft.value * 1000) /** epoch by milliseconds */
    || { days: 0, hours: 0, minutes: 0, seconds: 0 }
)
const countdownInterval = ref(null)
const countdown = () => { --timeLeft.value }

watch(endTime, (newVal) => {
    if (!newVal) return
    timeLeft.value = endTime.value - moment(new Date()).unix()
    countdownInterval.value = setInterval(countdown, timeStep)
}, { immediate: true })
watchEffect(() => {
    if (timeLeft.value <= 0) {
        clearInterval(countdownInterval.value)
    }
})

const formState = ref({
    bidPrice: ''
})
const handleSubmit = () => {

}

onMounted(() => {
    contractStore.getAllSessions()
})
</script>

<style scoped lang="scss">
.page.session-detail {
    height: 100%;

    .timebox {
        display: flex;
        width: 100%;
        max-width: 500px;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        text-align: center;
        font-size: 2rem;

        .time-left {
            display: flex;
            flex-direction: column;
            width: 90px;
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 2rem;
            color: #001529;
            background-color: #ffffff;
            border-radius: 10px;
            // box-shadow: 1px 3px 10px rgb(0 0 0 / 30%);

            label {
                font-size: 1rem;
            }

            span {
                line-height: 1;
                margin-left: 4px;
                margin-right: 4px;
                margin: auto;
            }
        }
    }


    .current-highest-price {
        // color: #ffffff;
        text-align: center;
        font-size: 4rem;
        text-shadow: 1px 1px rgba(255 255 255 / 15%)
    }

    .bidding-form {
        max-width: 400px;
        margin: auto;
    }
}
</style>