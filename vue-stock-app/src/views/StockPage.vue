<script setup>
import HeaderComp from "../components/HeaderComp.vue";
import CardComp from "@/components/CardComp.vue";
import CandleStickChart from "@/components/CandleStickChart.vue";
import { useStore } from "vuex";
const store = useStore();
const { state, getters } = store;
const { searchInput } = state;
const { timeSeriesName } = getters;
</script>

<template>
  <HeaderComp />
  <div class="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
    <h1 class="text-lg text-text2 font-bold mb-5 mt-5 p-5">
      {{ searchInput }} Last Market Session {{ timeSeriesName }} Information
    </h1>
    <CardComp />
    <CandleStickChart />
  </div>
</template>
