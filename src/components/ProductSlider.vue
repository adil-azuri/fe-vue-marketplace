<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ShoppingCart, Search } from "lucide-vue-next";

// --- Type Definitions ---
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  photo_product: string;
}

// --- Props ---
const props = defineProps<{
  sliderProducts: Product[];
  loading?: boolean;
  error?: boolean;
  imageUrl: string;
}>();
</script>

<template>
  <Swiper
    v-if="!props.loading && !props.error"
    :modules="[Autoplay, Pagination, Navigation]"
    :slides-per-view="1"
    :breakpoints="{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }"
    :space-between="15"
    :loop="true"
    :autoplay="{ delay: 2000, disableOnInteraction: false }"
    :pagination="{ clickable: true }"
    class="my-swiper custom-swiper"
  >
    <SwiperSlide
      v-for="item in props.sliderProducts"
      :key="item.id"
      class="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <img
        :src="`${props.imageUrl}/${item.photo_product}`"
        class="w-full h-40 sm:h-48 object-contain"
      />

      <div class="p-3 grid grid-cols-2">
        <div>
          <h3
            class="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2"
          >
            {{ item.name }}
          </h3>

          <p class="text-green-600 font-bold mt-1 text-sm sm:text-base">
            Rp{{ item.price.toLocaleString() }}
          </p>

          <p class="text-gray-500 text-sm sm:text-base mt-1">
            Only {{ item.stock }} left
          </p>
        </div>

        <div class="flex flex-col items-end space-y-2 sm:space-y-3">
          <button
            class="flex items-center bg-amber-500 border-2 hover:bg-white hover:border-blue-500 hover:text-blue-500 text-white px-3 py-1 rounded-full transition-all text-sm sm:text-base cursor-pointer"
          >
            <ShoppingCart class="w-4 h-4" />
            Add to Cart
          </button>

          <button
            class="flex items-center border-2 border-amber-500 text-amber-500 px-3 py-1 rounded-full transition-all text-sm sm:text-base hover:bg-blue-500 hover:text-white hover:border-blue-500"
          >
            <Search class="w-4 h-4" />
            Detail
          </button>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
