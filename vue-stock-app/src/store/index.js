import { createStore } from "vuex";
import axios from "axios";
// import { useRouter } from "vue-router";

// const router = useRouter();

// Create a new store instance.
const store = createStore({
  state: {
    searchInput: "",
    stockData: [],
    timeSeries: "TIME_SERIES_DAILY",
    autoCompleteArr: [],
    loading: false,
    alertStatus: {
      status: false,
      message: null,
    },
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
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ALERT_STATUS(state, payload) {
      state.alertStatus = { ...state.alertStatus, ...payload };
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
      const url = "http://localhost:3000/stock/stockSymbol";
      const query = {
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
        const response = await axios.request(url, options);
        const data = response.data;
        console.log("in store symbols", data);
        context.commit("SET_AUTO_COMPLETE_ARRAY", data);
        console.log(context);
        // context.commit("SET_SEARCH_INPUT", data);
      } catch (error) {
        console.error("Error fetching search symbols:", error);
        // Handle error as needed
      }
    },
    async fetchSearchStock(context) {
      context.commit("SET_LOADING", true);
      console.log("loading in store", context.state.loading);
      const url = `http://localhost:3000/stock/stockSearch`;
      const query = {
        function: context.state.timeSeries,
        // function: localStorage.getItem("searchInput"),
        // symbol: localStorage.getItem("timeSeries"),
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
        // let stockData = data[context.getters.timeSeriesName];
        // console.log("stoxkDta", stockData);
        // let arrayData = Object.keys(data[context.getters.timeSeriesName]).map(
        //   (item) => ({
        //     [item]: data[context.getters.timeSeriesName][item],
        //   })
        // );
        // console.log("data", arrayData, arrayData.length);
        context.commit("SET_STOCK_DATA", data);
        context.commit("SET_LOADING", false);
      } catch (error) {
        console.log("in error", context.state.alertStatus);
        context.commit("SET_ALERT_STATUS", {
          status: true,
          message:
            "Invalid API call. Please retry with a different symbol like IBM or googl",
        });
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
