<script setup lang="ts">
import { Search, ShoppingCart } from "lucide-vue-next";

//Custom Hooks
import { useProducts } from "../CustomHooks/useProducts";
import { IMAGE_URL } from "../services/api";
import SearchBar from "../components/SearchBar.vue";
import ProductSlider from "../components/ProductSlider.vue";

const { products, loading, error } = useProducts(5);
</script>

<template>
  <div class="w-full">
    <!-- CONTAINER UTAMA -->
    <div class="max-w-[1920px] mx-auto px-4">
      <h1 class="px-3 pt-2 text-2xl font-bold text-amber-600 mb-2">
        Welcome to ZuriStore
      </h1>
      <SearchBar />

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

      <!--       SLIDESHOW           -->
      <ProductSlider
        v-if="!loading && !error"
        :slider-products="products"
        :loading="loading"
        :error="error"
        :image-url="IMAGE_URL"
      />
      <!--       GRID PRODUK         -->
      <!-- GRID PRODUK -->
      <div v-if="!loading && !error" class="p-2">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div
            v-for="item in products"
            :key="item.id"
            class="bg-white shadow-md rounded-xl p-3 hover:shadow-lg transition"
          >
            <!-- GAMBAR PRODUK -->
            <img
              :src="`${IMAGE_URL}/${item.photo_product}`"
              class="w-full h-32 sm:h-40 object-contain rounded-lg"
            />

            <!-- NAMA PRODUK -->
            <h3
              class="text-sm sm:text-base font-semibold text-gray-800 mt-2 line-clamp-2"
            >
              {{ item.name }}
            </h3>

            <!-- HARGA -->
            <p class="text-green-600 font-bold text-sm sm:text-base mt-1">
              Rp{{ item.price.toLocaleString() }}
            </p>

            <!-- STOK -->
            <p class="text-gray-500 text-xs sm:text-sm">
              Only {{ item.stock }} left
            </p>

            <!-- BUTTONS -->
            <div class="flex gap-2 mt-3">
              <!-- ADD TO CART -->
              <button
                class="flex items-center justify-center w-1/2 gap-1 bg-amber-600 text-white text-[10px] sm:text-sm py-1.5 rounded-lg hover:bg-amber-700 transition"
              >
                <ShoppingCart class="w-3 h-3 sm:w-4 sm:h-4" />
                Add
              </button>

              <!-- DETAIL -->
              <button
                class="flex items-center justify-center w-1/2 gap-1 border border-amber-500 text-amber-500 text-[10px] sm:text-sm py-1.5 rounded-lg hover:bg-amber-500 hover:text-white transition"
              >
                <Search class="w-3 h-3 sm:w-4 sm:h-4" />
                Detail
              </button>
            </div>
          </div>
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
