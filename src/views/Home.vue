<script setup lang="ts">
import { ref, onMounted } from "vue";

// Swiper
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { getProducts } from "../services/productServices";
import { Search, ShoppingCart } from "lucide-vue-next";

const products = ref<any[]>([]);
const sliderProducts = ref<any[]>([]);

onMounted(async () => {
  const res = await getProducts();

  products.value = res.data.data.data;

  sliderProducts.value = products.value.slice(0, 5);
});
</script>

<template>
  <!-- SEARCH BAR -->
  <div class="p-3">
    <h1 class="text-2xl font-bold text-amber-600 mb-2">Welcome to My Store</h1>
    <div class="flex w-full justify-between pr-10">
      <div
        class="flex border-2 border-amber-700 max-w-3xl items-center space-x-3 rounded-2xl p-2 w-full"
      >
        <span class="text-amber-600 font-bold">Search</span>
        <input
          type="text"
          placeholder="Search Product"
          class="bg-gray-100 w-full text-amber-800 rounded-2xl p-1 pl-2"
        />
      </div>
      <div class="space-x-3">
        <button
          class="border-2 border-amber-600 rounded-2xl px-3 py-1 font-bold text-black"
        >
          Login
        </button>
        <button class="bg-amber-600 rounded-2xl px-3 py-1 font-bold text-white">
          Register
        </button>
      </div>
    </div>
  </div>

  <!-- SLIDESHOW -->
  <Swiper
    :modules="[Autoplay, Pagination, Navigation]"
    :slides-per-view="3"
    :space-between="25"
    :loop="true"
    :centered-slides="false"
    :autoplay="{ delay: 2000, disableOnInteraction: false }"
    :pagination="{ clickable: true }"
    navigation
    class="my-swiper custom-swiper"
  >
    <SwiperSlide
      v-for="item in sliderProducts"
      :key="item.id"
      class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
    >
      <!-- IMAGE -->
      <img
        :src="`http://127.0.0.1:8000/storage/${item.photo_product}`"
        class="w-full h-48 object-contain"
      />

      <!-- CONTENT -->
      <div class="p-4 flex justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">
            {{ item.name }}
          </h3>

          <p class="text-green-600 font-bold mt-1">
            Rp{{ item.price.toLocaleString() }}
          </p>

          <p class="text-gray-500 text-sm mt-1">Only {{ item.stock }} left</p>
        </div>
        <!-- BUTTON ADD TO CART -->
        <div class="flex flex-col items-end space-y-3">
          <button
            class="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all"
          >
            <ShoppingCart class="w-4 h-4" />
            Add to Cart
          </button>
          <button
            class="flex items-center border-2 border-blue-500 hover:border-blue-400 text-black px-4 py-2 rounded-full transition-all"
          >
            <Search class="w-4 h-4" />
            <span class="px-2">Detail</span>
          </button>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>

  <!-- GRID PRODUK -->
  <div class="p-4">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        v-for="item in products"
        :key="item.id"
        class="bg-white shadow rounded-xl p-3 hover:shadow-lg transition cursor-pointer"
      >
        <img
          :src="`http://127.0.0.1:8000/storage/${item.photo_product}`"
          class="w-full h-40 object-contain rounded-lg"
        />

        <h3 class="mt-2 text-sm font-medium line-clamp-2">
          {{ item.name }}
        </h3>

        <p class="text-green-600 font-bold mt-1">
          Rp{{ item.price.toLocaleString() }}
        </p>

        <div class="flex items-center text-black text-sm">
          Only {{ item.stock }} left
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-swiper {
  padding-bottom: 40px;
}

.my-swiper .swiper-pagination {
  bottom: 10px !important;
}
</style>
