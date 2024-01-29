<script setup>
import { useStore } from "vuex";
const store = useStore();
import VueApexCharts from "vue3-apexcharts";
// import { createChart } from "lightweight-charts";

const { state, getters } = store;
const { stockData } = state;
const { timeSeriesName } = getters;
console.log(stockData, timeSeriesName);
let formattedData = [];
// let orderedData = [];
// Object.entries(stockData[timeSeriesName]).map((entry) => {
//   console.log(entry);
// });
const formattedStockData = () => {
  Object.entries(stockData[timeSeriesName]).map(([key, value]) => {
    // formattedData.push({
    //   time: key,
    //   open: value["1. open"],
    //   high: value["2. high"],
    //   low: value["3. low"],
    //   close: value["4. close"],
    //   volume: value["5. volume"],
    // });
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
    // const order = ["time", "open", "high", "low", "close", "volume"];

    //     orderedData = Object.fromEntries(
    //       order.map((k, index) => [k, formattedData[index][k]])
    //     );
  });
  //   let dataArray = store?.state?.stockData.map((item) => {
  //     console.log("time: ", Object.keys(item));
  //     return {
  //       time: Object.keys(item),
  //       open: item[Object.keys(item)]["1. open"],
  //       jigh: item[Object.keys(item)]["2. high"],
  //       low: item[Object.keys(item)]["3. low"],
  //       close: item[Object.keys(item)]["4. close"],
  //       volume: item[Object.keys(item)]["5. volume"],
  //     };
  //   });
  //   const order = ["time", "open", "high", "low", "close", "volume"];

  //   const orderedData = Object.fromEntries(
  //     order.map((key, index) => [key, formattedData[index][key]])
  //   );
  //   console.log("irdered", orderedData);
  return formattedData;
  //   return orderedData;
};
let chartOptions = {
  chart: {
    type: "candlestick",
    height: 350,
  },
  title: {
    // text: "CandleStick",
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
};
const series = [
  {
    data: formattedStockData(),
  },
];
// console.log(formattedStockData());
const handleBtnClick = (e) => {
  console.log(e.target.value);
  store.commit("SET_TIME_SERIES", e.target.value);
  store.dispatch("fetchSearchStock");
};
// const chart = createChart(document.body, { width: 400, height: 300 });
// const candlestickSeries = chart.addCandlestickSeries({
//   upColor: "#26a69a",
//   downColor: "#ef5350",
//   borderVisible: false,
//   wickUpColor: "#26a69a",
//   wickDownColor: "#ef5350",
// });
// candlestickSeries.setData(formattedStockData());
// chart.timeScale().fitContent();
</script>

<template>
  <div class="flex items-center justify-center mt-10 mb-10 relative">
    <VueApexCharts
      width="700"
      height="350"
      type="candlestick"
      :options="chartOptions"
      :series="series"
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
        @change="handleBtnClick"
        checked
      />
      <label class="w-18 text-center" for="daily">Daily</label>
      <span>|</span>
      <input
        class="input"
        v-model="timeSeries"
        type="radio"
        name="option"
        id="weekly"
        @change="handleBtnClick"
        value="TIME_SERIES_WEEKLY"
      />
      <label lass="w-18 text-center" for="weekly">Weekly</label>
      <span>|</span>
      <input
        class="input"
        v-model="timeSeries"
        type="radio"
        name="option"
        id="monthly"
        @change="handleBtnClick"
        value="TIME_SERIES_MONTHLY"
      />
      <label lass="w-18 text-center" for="monthly">Monthly</label>
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
