<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Search, ShoppingCart } from "lucide-vue-next";

// Import Swiper Styles
import "swiper/swiper-bundle.css";

// Custom Hooks
import { useProducts } from "../CustomHooks/useProducts";
import { IMAGE_URL } from "../services/api";

// Components
import SearchBar from "../components/SearchBar.vue";
import ProductSlider from "../components/ProductSlider.vue";

// Get products (ambil 5 produk)
const { products, sliderProducts, loading, error } = useProducts(5);
</script>

<template>
  <div class="w-full">
    <!-- CONTAINER UTAMA -->
    <div class="max-w-[1920px] mx-auto px-4">
      <!-- SEARCH BAR -->
      <div class="p-3">
        <div class="flex flex-col sm:flex-row justify-between">
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center w-full sm:space-x-10 my-2"
          >
            <h1
              class="text-2xl sm:text-3xl font-bold text-amber-500 mb-3 sm:mb-0"
            >
              ZuriStore
            </h1>

            <!-- Search full width di mobile -->
            <div class="flex w-full sm:max-w-5xl">
              //Komponen Seach bar
              <SearchBar />
            </div>
          </div>

          <!-- BUTTONS -->
          <div class="flex sm:px-10 justify-end sm:justify-start mt-3 sm:mt-0">
            <div class="space-x-2 sm:space-x-5 flex items-center">
              <RouterLink
                to="/login"
                class="border-2 border-amber-600 rounded-xl px-2 py-1 text-sm sm:text-lg font-bold text-amber-600 text-center hover:bg-blue-500 hover:text-white hover:border-blue-500"
              >
                Login
              </RouterLink>

              <RouterLink
                to="/register"
                class="bg-amber-600 rounded-xl px-2 py-1 text-sm sm:text-lg font-bold text-white border-2 hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Register
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-10">
        <p class="text-amber-600 font-bold text-xl animate-pulse">
          Loading products...
        </p>
      </div>

      <!-- ERROR -->
      <div v-if="error" class="text-center py-10">
        <p class="text-red-600 font-bold">{{ error }}</p>
      </div>

      <!-- SLIDESHOW -->
      <div class="lg:px-10">
        <ProductSlider
          v-if="!loading && !error"
          :slider-products="sliderProducts"
          :loading="loading"
          :error="error"
          :image-url="IMAGE_URL"
        />

        <!-- GRID PRODUK -->
        <div v-if="!loading && !error" class="">
          <div
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            <div
              v-for="item in products"
              :key="item.id"
              class="bg-white shadow-md sm:shadow-xl rounded-xl p-2 sm:p-3 hover:shadow-lg transition"
            >
              <img
                :src="`${IMAGE_URL}/${item.photo_product}`"
                class="w-full h-32 sm:h-40 object-contain rounded-lg"
              />

              <div class="mt-2 sm:mt-3">
                <h3
                  class="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-2"
                >
                  {{ item.name }}
                </h3>

                <p class="text-green-600 font-bold mt-1 text-sm sm:text-base">
                  Rp{{ item.price.toLocaleString() }}
                </p>

                <p class="text-gray-500 text-xs sm:text-sm">
                  Only {{ item.stock }} left
                </p>
              </div>

              <div class="flex justify-between gap-1 mt-2 sm:mt-3">
                <button
                  class="flex items-center text-xs sm:text-sm bg-amber-600 text-white rounded-lg px-1.5 sm:px-2 py-1 sm:py-2 w-1/2 justify-center cursor-pointer hover:bg-white hover:border-blue-500 hover:text-blue-500 border-2 border-transparent"
                >
                  <ShoppingCart class="w-4 h-4 mr-1" />
                  <span>Add</span>
                </button>

                <button
                  class="flex items-center border-2 border-amber-500 text-amber-500 text-xs sm:text-sm px-1.5 sm:px-2 py-1 sm:py-2 rounded-lg w-1/2 justify-center cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500"
                >
                  <Search class="w-4 h-4 mr-1" />
                  <span>Detail</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
