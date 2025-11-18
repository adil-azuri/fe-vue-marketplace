<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Search, ShoppingCart } from "lucide-vue-next";

// Import Swiper
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

//Custom Hooks
import { useProducts } from "../CustomHooks/useProducts";
const { products, sliderProducts, loading, error } = useProducts(5);
</script>

<template>
  <!-- SEARCH BAR -->
  <div class="m-2 p-4 mb-3 shadow-xl rounded-2xl">
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
        <RouterLink
          to="/login"
          class="border-2 border-amber-600 rounded-2xl px-3 py-1 font-bold text-black"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/register"
          class="bg-amber-600 rounded-2xl px-3 py-1 font-bold text-white"
        >
          Register
        </RouterLink>
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
      class="bg-white rounded-2xl shadow-lg overflow-hidden"
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
            class="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full transition-all cursor-pointer"
          >
            <ShoppingCart class="w-5 h-4" />
            Add to Cart
          </button>
          <button
            class="flex items-center border-2 border-amber-500 text-amber-500 px-4 py-2 rounded-full transition-all cursor-pointer hover:font-bold"
          >
            <Search class="w-5 h-4" />
            <span class="px-2">Detail</span>
          </button>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>

  <!-- GRID PRODUK -->
  <div class="p-3">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        v-for="item in products"
        :key="item.id"
        class="bg-white shadow-2xl rounded-xl p-3 hover:shadow-lg transition"
      >
        <img
          :src="`http://127.0.0.1:8000/storage/${item.photo_product}`"
          class="w-full h-40 object-contain rounded-lg"
        />

        <div>
          <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">
            {{ item.name }}
          </h3>

          <p class="text-green-600 font-bold mt-1">
            Rp{{ item.price.toLocaleString() }}
          </p>

          <p class="text-gray-500 text-sm">Only {{ item.stock }} left</p>
        </div>

        <div class="flex justify-between gap-1 mt-3">
          <button
            class="flex items-center text-sm bg-amber-600 hover:bg-amber-700 hover:font-bold text-white rounded-lg transition-all px-2 py-2 w-1/2 justify-center whitespace-nowrap cursor-pointer"
          >
            <ShoppingCart class="w-4 h-4 mr-1" />
            <span>Add to cart</span>
          </button>
          <button
            class="flex items-center border-2 border-amber-500 hover:border-amber-400 text-amber-500 hover:font-bold text-sm px-2 py-2 rounded-lg transition-all w-1/2 justify-center whitespace-nowrap cursor-pointer"
          >
            <Search class="w-4 h-4 mr-1" />
            <span>Detail</span>
          </button>
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
