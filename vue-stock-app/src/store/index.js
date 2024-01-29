import { createStore } from "vuex";
import axios from "axios";
// import { useRouter } from "vue-router";

// const router = useRouter();

// Create a new store instance.
const store = createStore({
  state: {
    searchInput: "",
    stockData: "facebook",
    timeSeries: "TIME_SERIES_DAILY",
    autoCompleteArr: [],
  },
  mutations: {
    SET_SEARCH_INPUT(state, payload) {
      state.searchInput = payload;
    },
    SET_AUTO_COMPLETE_ARRAY(state, payload) {
      state.autoCompleteArr = payload;
    },
    SET_STOCK_DATA(state, payload) {
      state.stockData = payload;
    },
    SET_TIME_SERIES(state, payload) {
      state.timeSeries = payload;
    },
  },
  actions: {
    // fetchSearchSymbol({ commit }) {
    //   const url = "http://localhost:8080/stock/stockSearch";
    //   const data = fetch(url);
    //   let response=data.json()
    //   console.log(data);
    //   commit("SET_AUTO_COMPLETE_ARRAY", data);
    //   //   context.commit("SET_AUTO_COMPLETE_ARRAY", data);
    // },
    async fetchSearchSymbol(context) {
      try {
        const url = "http://localhost:3000/stock/stockSymbol";
        const response = await axios.get(url);
        const data = response.data;
        console.log("in store", data);
        // commit("SET_AUTO_COMPLETE_ARRAY", data);
        console.log(context);
        context.commit("SET_SEARCH_INPUT", data);
      } catch (error) {
        console.error("Error fetching search symbols:", error);
        // Handle error as needed
      }
    },
    async fetchSearchStock(context) {
      const url = `http://localhost:3000/stock/stockSearch`;
      const query = {
        function: context.state.timeSeries,
        symbol: context.state.searchInput,
      };
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: query,
      };
      try {
        // ?function=${context.state.timeSeries}&symbol=${context.state.searchInput}

        const response = await axios.request(url, options);
        const data = response.data;
        console.log("in store", data);
        // commit("SET_AUTO_COMPLETE_ARRAY", data);
        let arrayData = Object.keys(data[context.getters.timeSeriesName]).map(
          (item) => ({
            [item]: data[context.getters.timeSeriesName][item],
          })
        );
        console.log("data", arrayData, arrayData.length);
        context.commit("SET_STOCK_DATA", arrayData);
        // router.push({
        //   name: "StockSearchResult",
        //   params: { symbol: context.state.searchInput },
        // });
      } catch (error) {
        console.error("Error in fetching stock data", error);
      }
    },
  },
  getters: {
    //Getter function for deciding which time series function will be used based on the selected option in CandlestickChart Component (Daily-Weekly-Monthly)
    timeSeriesName(state) {
      switch (state.timeSeries) {
        case "TIME_SERIES_DAILY":
          return "Time Series (Daily)";
        case "TIME_SERIES_WEEKLY":
          return "Weekly Time Series";
        case "TIME_SERIES_MONTHLY":
          return "Monthly Time Series";
      }
    },
  },
});

export default store;
