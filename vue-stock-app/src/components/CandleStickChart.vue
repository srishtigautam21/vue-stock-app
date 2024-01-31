<script setup>
import { useStore } from "vuex";
import { onMounted, reactive, ref, watch, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";

const store = useStore();

const { state, getters } = store;
const { stockData } = state;
const { timeSeriesName } = getters;
console.log(stockData, timeSeriesName);
const formattedData = [];

const timeSeries = ref("TIME_SERIES_DAILY");

const formattedStockData = () => {
  Object.entries(stockData[timeSeriesName]).map(([key, value]) => {
    formattedData.push({
      x: new Date(key),
      y: [
        value["1. open"],
        value["2. high"],
        value["3. low"],
        value["4. close"],
        value["5. volume"],
      ],
    });
  });

  // let slicedData = formattedData.slice(0, 50);
  // console.log(slicedData, timeSeriesName);
  return formattedData;
};
let chartOptions = reactive({
  chart: {
    type: "candlestick",
    height: 350,
  },
  title: {
    align: "center",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
});
const series = computed(() => [
  //ref
  {
    data: formattedStockData(),
  },
]);

watch(timeSeries, () => {
  console.log("inside watch", timeSeries.value);
  store.commit("SET_TIME_SERIES", timeSeries.value);
  store.dispatch("fetchSearchStock");
  series.value = [
    {
      data: formattedStockData(),
    },
  ];
});
onMounted(
  () =>
    (series.value = [
      {
        data: formattedStockData(),
      },
    ])
);
</script>

<template>
  <div class="flex items-center justify-center mt-10 mb-10 relative">
    <VueApexCharts
      width="700"
      height="350"
      type="candlestick"
      :options="chartOptions"
      :series="series"
      :key="JSON.stringify(series)"
    ></VueApexCharts>
    <div
      class="absolute bottom-96 left-72 gap-5 w-80 flex items-center justify-center border-slate-300 rounded-2xl"
    >
      <input
        class="input"
        v-model="timeSeries"
        type="radio"
        name="option"
        id="daily"
        value="TIME_SERIES_DAILY"
        :checked="timeSeries === 'TIME_SERIES_DAILY'"
      />
      <label class="w-18 text-center" for="daily">Daily</label>
      <span>|</span>
      <input
        class="input"
        v-model="timeSeries"
        type="radio"
        name="option"
        id="weekly"
        value="TIME_SERIES_WEEKLY"
        :checked="timeSeries === 'TIME_SERIES_WEEKLY'"
      />
      <label class="w-18 text-center" for="weekly">Weekly</label>
      <span>|</span>
      <input
        class="input"
        v-model="timeSeries"
        type="radio"
        name="option"
        id="monthly"
        value="TIME_SERIES_MONTHLY"
        :checked="timeSeries === 'TIME_SERIES_MONTHLY'"
      />
      <label class="w-18 text-center" for="monthly">Monthly</label>
    </div>
    <!-- <div>{{ chartOptions }}</div> -->
  </div>
</template>

<style>
.input {
  display: none;
}
input:checked + label {
  font-weight: bold;
}
label {
  cursor: pointer;
}
</style>
