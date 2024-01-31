<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const moveBackToHome = () => {
  router.push({
    name: "Home",
    path: "/",
  });
};
</script>
<!-- justify-between items-center -->
<template>
  <nav
    class="w-full h-20 flex gap-4 items-start p-5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"
  >
    <div class="cursor-pointer">
      <img @click="moveBackToHome" src="../assets/bull-stock.png" alt="bull" />
    </div>
    <!-- <div>
      <input
        placeholder="searchResult"
        @input="handleInputChange"
        class="w-96 h-8 outline-none p-5 rounded-lg"
      />
    </div> -->
  </nav>
</template>
