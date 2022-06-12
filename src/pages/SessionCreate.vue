<template>
  <div class="page session-create">
    <div class="spacer" style="height: 3rem"></div>
    <a-typography-title>
      Create your own session now
    </a-typography-title>
    <div class="spacer" style="height: 1rem"></div>
    <div class="container">
      <a-row>
        <a-col :span="24">
          <div class="wrap-col form">
            <a-form :model="formSession" layout="vertical" autocomplete="off" @keypress="handleKeyPress">

              <a-form-item label="Your photo name" name="name" required>
                <a-input v-model:value="formSession.name" size="large"></a-input>
              </a-form-item>

              <a-form-item label="Desciption" name="description" required>
                <a-input v-model:value="formSession.description" size="large"></a-input>
              </a-form-item>

              <a-form-item label="Your photo">
                <a-upload v-model:file-list="listFiles" name="file" :multiple="false" class="button-upload"
                  :before-upload="beforeUpload" @change="handleChangeFile">
                  <a-button>
                    <upload-outlined></upload-outlined>
                    Click to Upload
                  </a-button>
                </a-upload>
              </a-form-item>

              <a-form-item label="Starting price" name="startingPrice">
                <a-input v-model:value="formSession.startingPrice" type="number" size="large" />
              </a-form-item>


              <div class="time-control">
                <a-form-item label="Choose a date" name="date" class="time-control__item">
                  <a-date-picker v-model:value="formSession.date" :allow-clear="true" format="DD-MM-YYYY" size="large">
                  </a-date-picker>
                </a-form-item>
                <a-form-item label="Time start" name="timeStart" style="text-align: right" class="time-control__item">
                  <a-time-picker v-model:value="formSession.timeStart" format="HH:mm" size="large"></a-time-picker>
                </a-form-item>
              </div>

              <a-form-item id="form-item__button">
                <a-button type="primary" @click="handleCreate">Create Session</a-button>
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
import { useFirebase } from '../store/useFirebase';
import { UploadOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs'
import { sessionDuration } from '../utils/constant';

const contractStore = useContracts()
const firebaseStore = useFirebase()
const router = useRouter()


const formSession = ref({
  name: '',
  description: '',
  startingPrice: '',
  date: '',
  timeStart: ''
})

const listFiles = ref([])

const beforeUpload = (file, fileList) => {
  console.log(file, fileList)
  return false
}
const handleChangeFile = (data) => {
  console.log('@change', data)
}

const handleKeyPress = (event) => {
  if (event.key === 'enter') handleCreate()
}

const handleCreate = async () => {
  const _date = dayjs(formSession.value.date).format('YYYY-MM-DD')
  const _time = dayjs(formSession.value.timeStart).format('HH:mm')
  const dateTime = dayjs(`${_date} ${_time}`).unix()
  console.log(dateTime, formSession.value.startingPrice)
  console.log('listFiles', listFiles.value)
  try {
    const imgUrl = await firebaseStore.uploadImage(listFiles.value[0])
    if (!imgUrl) throw new Error()
    const response = await contractStore.createSession(dateTime, formSession.value.startingPrice)
    if (!response) throw new Error()
    await firebaseStore.createNewSession({ ...formSession.value, startTime: dateTime, endTime: dateTime + sessionDuration, imgSrc: imgUrl })
    router.push('/bidding')
  } catch (error) {
    console.log(error)
  }
}

</script>

<style scoped lang="scss">
.page.session-create {
  text-align: center;

  .wrap-col.form {
    max-width: 534px;
    margin: auto;
  }

  :deep(.ant-input-lg) {
    padding: 8.5px 11px;
    border-radius: 8px;
  }

  :deep(.ant-upload .ant-btn) {
    padding: 8.5px 24px !important;
    border-radius: 8px;

    span {
      font-size: 14px;
    }
  }

  .time-control {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 24px;

    .time-control__item {
      width: 100%;

      :deep(.ant-picker) {
        width: 100%;
        border-radius: 8px;
      }
    }
  }


  .button-upload {
    display: flex;
  }

  #form-item__button :deep(.ant-btn) {
    padding-left: 70px;
    padding-right: 70px
  }
}
</style>