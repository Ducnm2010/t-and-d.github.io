<template>
  <li
    class="list-session-item"
    v-wave
    @click="$emit('click')"
  >
    <div class="session-item">
      <div
        v-if="hasEnded"
        class="session-item__label"
      >Closed</div>
      <div class="session-item__info">
        <div class="info-time ended-time">
          <span class="info-time__icon">
            <field-time-outlined />
          </span>
          <span class="info-time__text">
            {{ formattedTime.endedTime }}
          </span>
        </div>
        <div class="info-time ended-date">
          <span class="info-time__icon">
            <calendar-outlined />
          </span>
          <span class="info-time__text">
            {{ formattedTime.endedDate }}
          </span>
        </div>
        <div class="info-price">
          <span class="info-price__text">{{ startingPrice }}</span>
          <money-collect-outlined class="icon-money" />
        </div>
      </div>
      <div
        class="session-item__photo"
        :style="{ 'background-image': `url(${imgSrc})` }"
      ></div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { MoneyCollectOutlined, FieldTimeOutlined, CalendarOutlined } from '@ant-design/icons-vue'
import { sessionDuration, timeFormat, dateFormat } from '../utils/constant'
import moment from 'moment'

const props = defineProps({
  id: {
    type: [Number, String]
  },
  startingTime: String,
  startingPrice: String,
  imgSrc: String,
})

const formattedTime = computed(() => {
  const startedTime = moment.unix(props.startingTime).format(timeFormat)
  const startedDate = moment.unix(props.startingTime).format(dateFormat)
  const endedMoment = Number(props.startingTime) + sessionDuration
  const endedTime = moment.unix(endedMoment).format(timeFormat)
  const endedDate = moment.unix(endedMoment).format(dateFormat)
  return {
    endedMoment,
    startedTime,
    startedDate,
    endedTime,
    endedDate
  }
})

const hasEnded = computed(() => {
  // console.log('%c formattedTime.value.endedMoment', 'background: red; color: white', moment.unix(formattedTime.value.endedMoment).format('DD-MM-YYYY HH:mm'))
  // console.log('%c new Date().getTime()', 'background: green; color: white', moment().format('DD-MM-YYYY HH:mm'))

  console.log('%c formattedTime.value.endedMoment', 'background: red; color: white', moment.unix(formattedTime.value.endedMoment) / 1000)
  console.log('%c new Date().getTime()', 'background: green; color: white', moment().unix())
  return moment.unix(formattedTime.value.endedMoment) / 1000 <= moment().unix()
})
</script>

<style scoped lang="scss">
.list-session-item {
  flex: 47%;
  flex-grow: 0;
  position: relative;

  .session-item {
    display: flex;
    background-color: #fafafa;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 3px 5px 7px rgb(0 0 0 / 30%);
    transition: all 500ms ease-in-out;

    .session-item__label {
      position: absolute;
      right: -12px;
      top: 20px;
      color: #fff;
      background: red;
      padding-left: 20px;
      padding-right: 20px;
      transform: rotate(45deg);
      box-shadow: 3px 3px 10px rgb(0 0 0 / 30%);

      &::after,
      &::before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 100%;
        border-color: red;
        position: absolute
      }

      &::after {
        right: calc(-100% + 1px);
        top: 0;
        border-top: 20px solid transparent;
        border-bottom: 0px solid transparent;
        border-left: 15px solid red;
      }

      &::before {
        right: calc(100% - 1px);
        bottom: 0;
        top: 0;
        border-top: 20px solid transparent;
        border-bottom: 0px solid transparent;
        border-right: 15px solid red;
      }
    }

    .session-item__info {
      flex: 40%;
      padding: 1rem;
      position: relative;
      box-shadow: 3px 3px 3px rgba(0 0 0 / 30%);
      transition: all 500ms ease-in-out;

      .info-name {
        font-size: 1rem;
        font-weight: bold;
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .info-price {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 3rem;

        .icon-money {
          font-size: 1.5rem;
          margin-left: 5px;
        }
      }

      .info-time {
        .info-time__icon {
          margin-right: 6px;
        }
      }
    }

    .session-item__photo {
      flex: 60%;
      display: block;
      padding-bottom: 40%;
      background-position: center;
      background-size: auto;
      background-repeat: no-repeat;
      background-color: rgba(0 0 0 / 30%);
      background-blend-mode: overlay;
      transition: all 500ms ease-in-out;
    }

    // hover state
    &:hover {
      box-shadow: 1px 3px 10px -3px rgba(0 0 0 / 30%);

      .session-item__info {
        flex: 70%;

        .info-name {
          max-width: 200px;
        }
      }

      .session-item__photo {
        flex: 30%;
        background-color: rgba(0 0 0 / 15%);
      }
    }
  }
}
</style>