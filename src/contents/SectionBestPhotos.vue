<template>
  <section class="best-photos">
    <div class="container">
      <a-typography-title :level="2" class="section-title">
        See Our Best Photos
      </a-typography-title>
      <a-typography-paragraph class="section-headline">
        sit amet consectetur adipisicing elit. Assumenda eius ab nostrum libero
        pariatur at necessitatibus tempore veniam! Nemo, voluptatem tenetur.
      </a-typography-paragraph>
      <div style="height: 40px;"></div>
      <div class="section-carousel">
        <swiper class="custom-swiper" :modules="modules" :slides-per-view="4" :slides-per-group="4" :space-between="30"
          :pagination="{ clickable: true }" :scrollbar="{ draggable: true }" @swiper="onSwiper"
          @slide-change="onSlideChange">
          <swiper-slide v-for="(slide, index) in listSlides" :key="index">
            <img class="slide-image" :class="[index % 2 === 0 ? 'even' : 'odd']" :src="slide.imgSrc"
              :alt="`product-${index}`">
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import imgSrc5 from '../assets/image-5.jpg'
import imgSrc6 from '../assets/image-6.jpg'
import imgSrc7 from '../assets/image-7.jpg'
import imgSrc8 from '../assets/image-8.jpg'
import imgSrc9 from '../assets/image-9.jpg'
import imgSrc10 from '../assets/image-10.jpg'
import imgSrc11 from '../assets/image-11.jpg'
import imgSrc12 from '../assets/image-12.jpg'
import imgSrc13 from '../assets/image-13.jpg'
import imgSrc14 from '../assets/image-14.jpg'
import imgSrc15 from '../assets/image-15.jpg'
import imgSrc16 from '../assets/image-16.jpg'
import imgSrc17 from '../assets/image-17.jpg'
import imgSrc18 from '../assets/image-18.jpg'
import imgSrc19 from '../assets/image-19.jpg'
import imgSrc20 from '../assets/image-20.jpg'

const onSwiper = (swiper) => {
  console.log('swiper', swiper)
}
const onSlideChange = () => {
  console.log('slide change')
}

const listSlides = [
  {
    imgSrc: imgSrc5
  },
  {
    imgSrc: imgSrc6
  },
  {
    imgSrc: imgSrc7
  },
  {
    imgSrc: imgSrc8
  },
  {
    imgSrc: imgSrc9
  },
  {
    imgSrc: imgSrc10
  },
  {
    imgSrc: imgSrc11
  },
  {
    imgSrc: imgSrc12
  },
  {
    imgSrc: imgSrc13
  },
  {
    imgSrc: imgSrc14
  },
  {
    imgSrc: imgSrc15
  },
  {
    imgSrc: imgSrc16
  },
  {
    imgSrc: imgSrc17
  },
  {
    imgSrc: imgSrc18
  },
  {
    imgSrc: imgSrc19
  },
  {
    imgSrc: imgSrc20
  }
]

const modules = [Pagination, A11y]
</script>

<style scoped lang="scss">
.section-title {
  text-align: center;
}

.section-headline {
  max-width: 460px;
  margin: auto;
  text-align: center;
}

.custom-swiper {

  padding-bottom: 54px;

  .slide-image {
    width: 270px;
    height: 360px;
    object-fit: cover;
    border-radius: 12px;

    &.even {
      margin-bottom: 60px;
    }

    &.odd {
      margin-top: 60px;
    }
  }

}


/* IE < 8 */
</style>