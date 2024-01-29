<script setup>
// setup??
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const val = store.state.autoCompleteArr;
// console.log(val);
const input = ref(); //used as useState in vue
const routeToStockPage = () => {
  if (
    store.state.searchInput !== ""
    // &&
    // store.state.searchInput !== store.state.searchInput
  ) {
    // console.log(e.target.value);
    store.commit("SET_SEARCH_INPUT", store.state.searchInput);
    store.dispatch("fetchSearchStock");
    setTimeout(() => {
      router.push({
        name: "StockSearchResult",
        params: { symbol: store.state.searchInput },
      });
    }, 2000);
  }
};
const handleSearchSymbol = (e) => {
  console.log(e.target.value);
  store.commit("SET_SEARCH_INPUT", e.target.value);
  // store.dispatch("fetchSearchSymbol", e.target.value);
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
      @change="handleSearchSymbol"
    />
    <!-- <p>{{ val }}</p> -->
    <div v-if="val.length !== 0" class="w-52 bg-white">
      <div
        class="p-2 text-text2 cursor-pointer hover:bg-pink-200"
        v-for="(option, index) in val"
        :key="index"
      >
        {{ option }}
      </div>
    </div>
    <button
      class="w-28 h-12 bg-purple-600 text-white font-semibold rounded-lg mt-4 cursor-pointer hover:bg-purple-500"
      @click="routeToStockPage"
    >
      Search
    </button>
  </div>
</template>
