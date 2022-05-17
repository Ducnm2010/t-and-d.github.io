<template>
    <div class="page session-result">
        <div class="wrap-result">
            <a-typography-title :level="3">
                The session {{ sessionName }} has finished
            </a-typography-title>

            <div v-if="isWinner" :level="2" class="result winning">
                <span class="winning__text">
                    Congratulation to {{ username }}
                </span>

            </div>
            <div v-else class="result notify">
                <span class="notify__text">
                    The winner is {{ username }}
                </span>
            </div>
            <div class="greeting">
                <span>Thank you for trusting our community</span>
                <a-button>Back to bidding</a-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

defineProps({
    username: {
        type: String,
        default: 'Mr A'
    }
})

const sessionName = 'Product xyz'
const isWinner = computed(() => false)
</script>

<style scoped lang="scss">
.page.session-result {

    .wrap-result {
        max-width: 700px;
        margin: 3rem auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        .result {
            &.winning {
                .winning__text {
                    // 
                }
            }

            &.notify {

                .notify__text {
                    // 
                }
            }
        }

        .greeting {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            font-size: 1.2rem;
        }
    }
}
</style>