<script setup>
// setup??
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const input = ref(); //ye vala puchna hai
const routeToStockPage = () => {
  router.push("/stock");
};
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <div class="text-text2 text-4xl m-8 font-bold">Welcome to Mock Stock</div>
    <div class="text-text2 text-lg m-8">
      Search for the data of stocks on a simple click!!
    </div>
    <input
      placeholder="Search stock name"
      v-model="input"
      class="w-96 h-14 outline-none p-5 rounded-lg"
    />
    <p>{{ input }}</p>
    <button
      class="w-28 h-12 bg-purple-600 text-white font-semibold rounded-lg mt-4 cursor-pointer hover:bg-purple-500"
      @click="routeToStockPage"
    >
      Search
    </button>
  </div>
</template>
