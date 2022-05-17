<template>
    <div class="page login">
        <a-row>
            <a-col :span="20" :offset="2">
                <a-row>
                    <a-col :span="12">
                        <div class="cover">
                            <img src="../assets/cover-2.webp" alt="cover">
                        </div>
                    </a-col>
                    <a-col :span="12">
                        <div class="space"></div>
                        <a-typography-title align="center">Join us now</a-typography-title>
                        <a-form :model="accountInfo" layout="vertical" class="custom">
                            <a-form-item label="Your Username" name="username" :rules="[usernameRequired]">
                                <a-input v-model:value="accountInfo.username" size="large" />
                            </a-form-item>
                            <a-form-item label="Password" name="password" :rules="[passwordRequired]">
                                <a-input-password v-model:value="accountInfo.password" size="large" />
                            </a-form-item>
                            <a-form-item style="text-align: right">
                                <a-button class="custom" type="primary" size="large" :loading="isSubmitting">Connect To
                                    Your Wallet</a-button>
                            </a-form-item>
                        </a-form>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useContracts } from '../store/useContracts'

const { getEthereumContract } = useContracts()

const setRule = (rule) => (message) => ({
    ...rule,
    message
})

const usernameRequired = setRule({ required: true })('Please enter your username')
const passwordRequired = setRule({ required: true })('Please enter your password')

const accountInfo = ref({
    username: '',
    password: ''
})

const isSubmitting = ref(false)
</script>

<style scoped lang="scss">
.page.login {
    height: 100%;
    max-width: 1200px;
    margin: auto;

    .space {
        height: 3rem;
    }

    .cover {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            max-width: 100%;
            max-height: 70vh;
            object-fit: cover;
        }
    }
}


// custom
.ant-form.custom {
    max-width: 320px;
    margin: auto;
}

.ant-btn.custom {
    margin-left: auto;
}
</style>