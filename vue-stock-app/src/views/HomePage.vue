<script setup>
// import LoadersComponent from "@/components/LoadersComponent.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const val = store.state.autoCompleteArr;
const { loading } = store.state;
// console.log(val);
const input = ref(); //used as useState in vue
const unclickable = ref(false);
const routeToStockPage = () => {
  if (
    store.state.searchInput !== ""
    // &&
    // store.state.searchInput !== store.state.searchInput
  ) {
    // console.log(e.target.value);
    store.commit("SET_SEARCH_INPUT", store.state.searchInput);
    localStorage.setItem("searchInput", store.state.searchInput);
    localStorage.setItem("timeSeries", store.state.timeSeries);
    store.dispatch("fetchSearchStock");
    unclickable.value = true;
    // store.commit("SET_LOADING", true);
    console.log("load", loading);
    // router.push({
    //   name: "StockSearchResult",
    //   params: { symbol: store.state.searchInput },
    // });
    setTimeout(() => {
      router.push({
        name: "StockSearchResult",
        params: { symbol: store.state.searchInput },
      });
      // store.commit("SET_LOADING", false);
    }, 2000);
  }
};
// const debounce = function (fn, delay) {
//   let timer;
//   console.log(this);
//   return function () {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(this);
//     }, delay);
//   };
// };
// const debounceHandler = debounce(function (event) {
//   console.log(event);
//   store.commit("SET_SEARCH_INPUT", event);
//   // store.dispatch("fetchSearchSymbol");
// }, 300);
const handleSearchSymbol = (e) => {
  console.log(e.target.value);
  store.commit("SET_SEARCH_INPUT", e.target.value);
  // debounceHandler(e.target.value);
  // store.dispatch("fetchSearchSymbol", e.target.value);
};
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center relative">
    <!-- <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 z-50 opacity-50"
      v-if="loading"
    >
      <LoadersComponent></LoadersComponent>
    </div> -->

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
