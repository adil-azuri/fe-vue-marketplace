<script setup>
import { reactive } from "vue";
import shopAnimation from "../assets/lottie/Shopping.json";
import LottieAnimation from "../components/LottieAnimation.vue";
import { RouterLink } from "vue-router";

const form = reactive({
  username: "",
  password: "",
  remember: true,
});

const onSubmit = () => {
  console.log("Form submitted:", form);
  alert("Login submitted! Check console for data.");
};
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-white">
    <div
      class="w-full md:w-1/2 bg-amber-600 p-8 relative flex items-center justify-center order-first md:order-last"
    >
      <div class="w-full max-w-md text-white text-center">
        <!-- Bisa diganti dengan Lottie nanti -->
        <LottieAnimation :animationData="shopAnimation" :loop="true" />
      </div>
    </div>

    <!-- Kolom kiri: Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
      <div
        class="w-full max-w-md bg-white md:bg-transparent rounded-lg p-6 md:p-0"
      >
        <h1 class="text-4xl font-bold mb-6">Welcome to ZuriStore!</h1>

        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Email -->
          <div class="flex flex-col">
            <label class="text-gray-500 mb-1">Enter an Email</label>
            <input
              v-model="form.username"
              type="email"
              placeholder="Enter your Email here"
              class="py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500"
              required
              minlength="8"
            />
          </div>

          <!-- Password -->
          <div class="flex flex-col">
            <label class="text-gray-500 mb-1">Enter password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Enter your password here"
              class="py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500"
              required
              minlength="6"
            />
          </div>

          <!-- Remember me & Forgot password -->
          <div class="flex justify-between items-center mb-6">
            <label class="flex items-center text-gray-500">
              <input type="checkbox" v-model="form.remember" class="mr-2" />
              Remember me
            </label>
            <a href="#" class="text-sm text-gray-500 hover:text-amber-600">
              Forgot password?
            </a>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full h-10 bg-amber-700 hover:bg-amber-800 border-none rounded-lg shadow-md text-white font-semibold cursor-pointer"
          >
            Login
          </button>

          <!-- Don't have an account -->
          <div class="text-center mt-6 text-sm text-gray-500">
            Don't have an account?
            <RouterLink
              to="/register"
              class="text-amber-600 font-semibold hover:text-amber-700"
            >
              Register Here
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
