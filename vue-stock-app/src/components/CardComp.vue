<script setup>
import { useStore } from "vuex";
// import { useToast } from "vue-toastification";

const store = useStore();
// const toast = useToast;
const {
  state: { stockData },
  getters: { timeSeriesName },
} = store;
console.log(stockData.length);
// if (stockData.length == 0 || timeSeriesName === "") {
//   toast(
//     "You exceeded API query limit. Please wait press the back button and reload again.",
//     {
//       position: "center",
//       timeout: 5000,
//       closeOnClick: true,
//       pauseOnFocusLoss: true,
//       pauseOnHover: true,
//       draggable: true,
//       draggablePercent: 0.6,
//       showCloseButtonOnHover: false,
//       hideProgressBar: true,
//       closeButton: "button",
//       icon: "fas fa-rocket",
//       rtl: false,
//     }
//   );
// } else {
let arrayData = [];
let stockDataLastDayInfo = [];
if (stockData.length === 0) {
  arrayData = [];
} else if (stockData.length === undefined) {
  arrayData = Object.keys(stockData[timeSeriesName]).map((item) => ({
    [item]: stockData[timeSeriesName][item],
  }));
  console.log("arr", arrayData);
  stockDataLastDayInfo = arrayData["0"][Object.keys(arrayData["0"])];
  console.log("in cards", stockDataLastDayInfo);
  // }
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
