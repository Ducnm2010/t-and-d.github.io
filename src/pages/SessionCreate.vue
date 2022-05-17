<template>
  <div class="page session-create">
    <div
      class="spacer"
      style="height: 3rem"
    ></div>
    <a-typography-title>
      Create your own session now
    </a-typography-title>
    <div
      class="spacer"
      style="height: 1rem"
    ></div>
    <div class="container">
      <a-row>
        <a-col :span="24">
          <div class="wrap-col form">
            <a-form
              :model="formSession"
              layout="vertical"
              autocomplete="off"
              @keypress="handleKeyPress"
            >
              <a-form-item
                label="Starting price"
                name="startingPrice"
              >
                <a-input
                  v-model:value="formSession.startingPrice"
                  type="number"
                />
              </a-form-item>

              <a-row>
                <a-col :span="12">
                  <a-form-item
                    label="Choose a date"
                    name="date"
                  >
                    <a-date-picker
                      v-model:value="formSession.date"
                      :allow-clear="true"
                      format="DD-MM-YYYY"
                    ></a-date-picker>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item
                    label="Time start"
                    name="timeStart"
                    style="text-align: right"
                  >
                    <a-time-picker
                      v-model:value="formSession.timeStart"
                      format="HH:mm"
                    ></a-time-picker>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-form-item style="text-align: right">
                <a-button
                  type="primary"
                  @click="handleCreate"
                >Create</a-button>
              </a-form-item>
            </a-form>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContracts } from '../store/useContracts'
import dayjs from 'dayjs'

const contractStore = useContracts()
const router = useRouter()


const formSession = ref({
  startingPrice: '',
  date: '',
  timeStart: ''
})

const handleKeyPress = (event) => {
  if (event.key === 'enter') handleCreate()
}

const handleCreate = async () => {
  const _date = dayjs(formSession.value.date).format('YYYY-MM-DD')
  const _time = dayjs(formSession.value.timeStart).format('HH:mm')
  const dateTime = dayjs(`${_date} ${_time}`).unix()
  await contractStore.createSession(dateTime, formSession.value.startingPrice)
  router.push('/bidding')
}

</script>

<style scoped lang="scss">
.page.session-create {
  text-align: center;

  .wrap-col.form {
    max-width: 300px;
    margin: auto;
  }
}
</style>