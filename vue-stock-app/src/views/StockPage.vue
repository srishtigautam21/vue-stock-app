<script setup>
import HeaderComp from "../components/HeaderComp.vue";
import CardComp from "@/components/CardComp.vue";
import CandleStickChart from "@/components/CandleStickChart.vue";
import LoadersComponent from "@/components/LoadersComponent.vue";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const { state } = store;
const { searchInput, loading, stockData } = state;
// const { timeSeriesName } = getters;
const timeSeries = computed(() => store.getters.timeSeriesName);
</script>

<template>
  <HeaderComp />
  <div
    class="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 relative"
  >
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 z-50 opacity-50"
      v-if="loading"
    >
      <LoadersComponent></LoadersComponent>
    </div>
    <h1 class="text-lg text-text2 font-bold mb-5 mt-5 p-5">
      {{ searchInput }} Last Market Session {{ timeSeries }} Information
    </h1>
    <CardComp v-show="stockData" />
    <CandleStickChart />
  </div>
</template>
