<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const {
  alertStatus: { status }, // destructured alertStatus from store state
} = store.state;

const input = ref();
const unclickable = ref(false);
const routeToStockPage = () => {
  if (store.state.searchInput !== "") {
    store.commit("SET_SEARCH_INPUT", store.state.searchInput);
    localStorage.setItem("searchInput", store.state.searchInput);
    localStorage.setItem("timeSeries", store.state.timeSeries);
    unclickable.value = true;
    store.dispatch("fetchSearchStock");

    watch(status, () => {
      if (!status) {
        setTimeout(() => {
          router.push({
            name: "StockSearchResult",
            params: { symbol: store.state.searchInput },
          });
        }, 2000);
      }
    });

    setTimeout(() => {
      router.push({
        name: "StockSearchResult",
        params: { symbol: store.state.searchInput },
      });
    }, 2000);
  }
};

const handleSearchSymbol = (e) => {
  store.commit("SET_SEARCH_INPUT", e.target.value);
};
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center relative">
    <!-- <LoadersComponent></LoadersComponent> -->
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
    <button
      class="w-28 h-12 bg-purple-600 text-white font-semibold rounded-lg mt-4 cursor-pointer hover:bg-purple-500"
      @click="routeToStockPage"
      v-if="!unclickable"
    >
      Search
    </button>
    <button
      class="w-28 h-12 bg-purple-400 text-white font-semibold rounded-lg mt-4 cursor-not-allowed hover:bg-purple-500"
      v-if="unclickable"
    >
      Search
    </button>
  </div>
</template>
