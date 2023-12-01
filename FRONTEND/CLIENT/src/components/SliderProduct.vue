<template>
    <swiper
        :slides-per-view="3"
        :space-between="20"
        @swiper="onSwiper"
        @slideChange="onSlideChange">
        <swiper-slide v-for="(item, index) in dataSlider" :key="index">
            <img :src="item.dirImg" alt="img-product" :width="250" />
        </swiper-slide>
    </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        dataSlider: {
            type: Array,
        },
    },
    setup() {
        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log("slide change");
        };
        return {
            onSwiper,
            onSlideChange,
        };
    },
};
</script>
