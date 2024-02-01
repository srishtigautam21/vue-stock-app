<script setup>
import HeaderComp from "../components/HeaderComp.vue";
import CardComp from "@/components/CardComp.vue";
import CandleStickChart from "@/components/CandleStickChart.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";

const store = useStore();
const router = useRouter();
const { state } = store;
const { searchInput, stockData } = state;

const showComp = ref(true);
const timeSeries = computed(() => store.getters.timeSeriesName);
if (stockData.length === 0) {
  showComp.value = false;
  router.push({
    name: "Home",
    path: "/",
  });
} else if (stockData.length === undefined) {
  showComp.value = true;
}
</script>

<template>
  <HeaderComp />
  <div
    class="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 relative"
  >
    <h1 class="text-lg text-text2 font-bold mt-5 p-5">
      {{ searchInput }} Last Market Session {{ timeSeries }} Information
    </h1>
    <CardComp v-show="stockData" />
    <CandleStickChart v-if="showComp" />
  </div>
</template>
