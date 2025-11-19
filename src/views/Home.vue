<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Search, ShoppingCart } from "lucide-vue-next";

// Import Swiper
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

//Custom Hooks
import { useProducts } from "../CustomHooks/useProducts";
import { IMAGE_URL } from "../services/api";

const { products, sliderProducts, loading, error } = useProducts(5);
</script>

<template>
  <!-- SEARCH BAR -->
  <div class="m-2 p-4 mb-3 shadow-xl rounded-2xl">
    <h1 class="text-2xl font-bold text-amber-600 mb-2">Welcome to ZuriStore</h1>

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
          class="border-2 border-amber-600 rounded-2xl px-3 text-lg py-1 font-bold text-amber-600 text-center hover:bg-blue-500 hover:text-white hover:border-blue-500"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/register"
          class="bg-amber-600 rounded-2xl px-3 py-1 text-lg font-bold text-white border-2 hover:bg-white hover:border-2 hover:border-blue-500 hover:text-blue-500"
        >
          Register
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- ========================= -->
  <!--       LOADING STATE      -->
  <!-- ========================= -->
  <div v-if="loading" class="text-center py-10">
    <p class="text-amber-600 font-bold text-xl animate-pulse">
      Loading products...
    </p>
  </div>

  <!-- ERROR -->
  <div v-if="error" class="text-center py-10">
    <p class="text-red-600 font-bold">{{ error }}</p>
  </div>

  <!-- ========================= -->
  <!--       SLIDESHOW           -->
  <!-- ========================= -->
  <Swiper
    v-if="!loading && !error"
    :modules="[Autoplay, Pagination, Navigation]"
    :slides-per-view="3"
    :space-between="25"
    :loop="true"
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
        :src="`${IMAGE_URL}/${item.photo_product}`"
        class="w-full h-48 object-contain"
      />

      <!-- CONTENT -->
      <div class="p-3 grid grid-cols-2">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">
            {{ item.name }}
          </h3>

          <p class="text-green-600 font-bold mt-1">
            Rp{{ item.price.toLocaleString() }}
          </p>

          <p class="text-gray-500 text-sm mt-1">Only {{ item.stock }} left</p>
        </div>

        <!-- BUTTONS -->
        <div class="flex flex-col items-end space-y-3">
          <button
            class="flex items-center bg-amber-500 border-2 hover:bg-white hover:border-2 hover:border-blue-500 hover:text-blue-500 text-white px-4 py-2 rounded-full transition-all cursor-pointer"
          >
            <ShoppingCart class="w-5 h-4" />
            Add to Cart
          </button>

          <button
            class="flex items-center border-2 border-amber-500 text-amber-500 px-4 py-2 rounded-full transition-all cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500"
          >
            <Search class="w-5 h-4" />
            <span class="px-2">Detail</span>
          </button>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>

  <!-- ========================= -->
  <!--       GRID PRODUK         -->
  <!-- ========================= -->
  <div v-if="!loading && !error" class="p-3">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        v-for="item in products"
        :key="item.id"
        class="bg-white shadow-2xl rounded-xl p-3 hover:shadow-lg transition"
      >
        <img
          :src="`${IMAGE_URL}/${item.photo_product}`"
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
            class="flex items-center text-sm bg-amber-600 text-white rounded-lg px-2 py-2 w-1/2 justify-center cursor-pointer hover:bg-white hover:border-2 hover:border-blue-500 hover:text-blue-500"
          >
            <ShoppingCart class="w-4 h-4 mr-1" />
            <span>Add to cart</span>
          </button>

          <button
            class="flex items-center border-2 border-amber-500 text-amber-500 text-sm px-2 py-2 rounded-lg w-1/2 justify-center cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500"
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
