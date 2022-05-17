import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import Antd from 'ant-design-vue';
import App from './App.vue'
import VWave from 'v-wave'
import 'ant-design-vue/dist/antd.less'

const piniaStore = createPinia()
const app = createApp(App)

app.use(VWave)
app.use(router)
app.use(Antd)
app.use(piniaStore)
app.mount('#app')