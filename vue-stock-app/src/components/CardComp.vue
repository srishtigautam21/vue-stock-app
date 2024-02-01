<script setup>
import { useStore } from "vuex";
const store = useStore();

const {
  state: { stockData },
  getters: { timeSeriesName },
} = store;

let arrayData = [];
let stockDataLastDayInfo = [];
if (stockData.length === 0) {
  arrayData = [];
} else if (stockData.length === undefined) {
  arrayData = Object.keys(stockData[timeSeriesName]).map((item) => ({
    [item]: stockData[timeSeriesName][item],
  }));
  stockDataLastDayInfo = arrayData["0"][Object.keys(arrayData["0"])];
}
</script>

<template>
  <!-- Last Market Session Daily-Weekly-Montly Information is shown in this component as cards -->
  <div class="grid grid-cols-5 gap-8 p-5">
    <!-- Card for showing the last OPEN data -->
    <div class="bg-orange text-white p-5 shadow-shadow">
      <p class="mb-2">OPEN ($)</p>
      <p v-if="stockDataLastDayInfo" class="font-extrabold text-xl">
        {{ Number(stockDataLastDayInfo["1. open"]).toLocaleString("en-US") }}
      </p>
    </div>
    <!-- Card for showing the last HIGH data -->
    <div class="bg-lightPurple text-white p-5 shadow-shadow">
      <p class="mb-2">HIGH ($)</p>
      <p v-if="stockDataLastDayInfo" class="font-extrabold text-xl">
        {{ Number(stockDataLastDayInfo["2. high"]).toLocaleString("en-US") }}
      </p>
    </div>
    <!-- Card for showing the last LOW data -->
    <div class="bg-green text-white p-5 shadow-shadow">
      <p class="mb-2">LOW ($)</p>
      <p v-if="stockDataLastDayInfo" class="font-extrabold text-xl">
        {{ Number(stockDataLastDayInfo["3. low"]).toLocaleString("en-US") }}
      </p>
    </div>
    <!-- Card for showing the last CLOSE data -->
    <div class="bg-mypink text-white p-5 shadow-shadow">
      <p class="mb-2">CLOSE ($)</p>
      <p v-if="stockDataLastDayInfo" class="font-extrabold text-xl">
        {{ Number(stockDataLastDayInfo["4. close"]).toLocaleString("en-US") }}
      </p>
    </div>
    <!-- Card for showing the last VOLUME data -->
    <div class="bg-blue text-white p-5 shadow-shadow">
      <p class="mb-2">VOLUME ($)</p>
      <p v-if="stockDataLastDayInfo" class="font-extrabold text-xl">
        {{ Number(stockDataLastDayInfo["5. volume"]).toLocaleString("en-US") }}
      </p>
    </div>
  </div>
</template>
