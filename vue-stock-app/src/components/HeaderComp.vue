<script setup>
const handleInputChange = (event) => {
  console.log("Input", event.target.value);
};
</script>

<template>
  <nav
    class="w-full h-20 flex gap-4 justify-between items-center px-5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"
  >
    <!-- <ul class="flex justify-between items-center"> -->
    <div><img src="../assets/bull-stock.png" alt="bull" /></div>
    <div>
      <input
        placeholder="searchResult"
        @input="handleInputChange"
        class="w-96 h-8 outline-none p-5 rounded-lg"
      />
    </div>
    <!-- </ul> -->
  </nav>
</template>
