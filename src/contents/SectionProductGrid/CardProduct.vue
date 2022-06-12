<template>
    <div class="card-product">
        <div v-wave class="card-product__image" :style="{ 'background-image': `url(${item.imgSrc})` }"
            @click="handleClick(item.id)"></div>
        <div class="card-product__title" @click="handleClick(item.id)">{{ item.name }}</div>
        <div class="card-product__content">{{ item.description }}</div>
        <div class="card-product__time">
            <div class="starting-date">
                <img :src="CalendarIcon" alt="calendar">
                {{ startingDate }}
            </div>
            <div class="starting-time">
                <img :src="ClockIcon" alt="clock">
                {{ startingTime }}
            </div>
        </div>
        <div class="card-product__status" :class="{ 'active': isActive }">
            <label>Status:</label>
            <span class="status">
                {{ isActive ? 'Active' : 'Closed' }}
            </span>
        </div>
        <div class="card-product__cta">
            <div class="starting-price">
                <img class="icon" src="../../assets/ethereum.svg" alt="eth">
                <span class="price">{{ item.startingPrice }}</span>
                <span class="currency"> ETH</span>
            </div>
            <a-button v-wave type="primary" size="small" @click="handleClick(item.id)">
                {{ status }}
            </a-button>

        </div>
        <!-- <div>
            {{ endTime }}
        </div>
        <div>
            {{ now }}
        </div> -->
    </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { watchEffect, computed } from 'vue';
import CalendarIcon from '../../assets/icons/calendar-2.svg'
import ClockIcon from '../../assets/icons/clock.svg'
import { useRouter } from 'vue-router';
const props = defineProps({
    item: {
        type: Object,
        default: () => ({
            id: '',
            imgSrc: '',
            name: '',
            description: '',
            address: '',
            startingTime: '',
            startingPrice: '',
            isCanceled: false
        })
    },
})

const router = useRouter()

const startingDate = computed(() => dayjs.unix(props.item.startTime).format('DD/MM/YYYY'))
const startingTime = computed(() => dayjs.unix(props.item.startTime).format('HH:mm'))
const endTime = computed(() => dayjs.unix(props.item.endTime).format('DD/MM/YYYY HH:mm'))
const now = computed(() => dayjs.unix(Date.now() / 1000).format('DD/MM/YYYY HH:mm'))
const isExpired = computed(() => props.item.endTime < (Date.now() / 1000))
const isActive = computed(() => !isExpired.value && !props.item.isCanceled)
const status = computed(() => {
    if (props.item.isCanceled) return 'Canceled'
    if (isExpired.value) return 'See result'
    return 'Bid now'
})

const handleClick = (id) => {
    router.push('/session/detail/' + id)
}
</script>

<style scoped lang="scss">
.card-product {
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0px 1px 2px rgba(17, 24, 39, 0.06), 0px 1px 3px rgba(17, 24, 39, 0.1);
    transition: 300ms ease;

    &:hover {
        box-shadow: 0px 1px 2px rgba(17, 24, 39, 0.1), 0px 1px 3px rgba(17, 24, 39, 0.3);

        .card-product__title {
            color: var(--primary-color)
        }
    }

    .card-product__image {
        width: 100%;
        padding-bottom: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 12px;
        margin-bottom: 16px;
        cursor: pointer;
    }

    .card-product__title {
        font-size: 20px;
        line-height: 30px;
        font-weight: 600;
        margin-bottom: 8px;
        transition: 300ms ease;
        cursor: pointer;
    }

    .card-product__content {
        color: var(--text-secondary);
        font-size: 16px;
        margin-bottom: 12px;
    }

    .card-product__time {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        margin-bottom: 12px;
    }

    .card-product__status {
        margin-bottom: 30px;

        label {
            color: var(--text-primary);
            margin-right: 8px;
        }

        .status {
            color: #F44336;
            background-color: rgba(244, 67, 54, 0.1);
            padding: 4px 16px;
            border-radius: 753px;
        }

        &.active {
            .status {
                color: #4CAF50;
                background-color: rgba(76, 175, 80, 0.1);
            }
        }
    }

    .card-product__cta {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .starting-price {
            color: var(--primary-color);
            font-weight: 600;
            font-size: 24px;
            line-height: 30px;

            .icon {
                width: 21px;
                height: 30px;
                margin-right: 8px;
            }
        }
    }
}
</style>