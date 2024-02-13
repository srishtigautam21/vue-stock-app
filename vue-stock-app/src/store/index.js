import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    searchInput: "",
    stockData: [],
    timeSeries: "TIME_SERIES_DAILY",
    alertStatus: {
      status: false,
      message: null,
    },
  },
  mutations: {
    SET_SEARCH_INPUT(state, payload) {
      state.searchInput = payload;
    },
    SET_STOCK_DATA(state, payload) {
      state.stockData = payload;
    },
    SET_TIME_SERIES(state, payload) {
      state.timeSeries = payload;
    },

    SET_ALERT_STATUS(state, payload) {
      state.alertStatus = { ...state.alertStatus, ...payload };
    },
  },
  actions: {
    //Api call to the server is made here
    async fetchSearchStock(context) {
      // const url = `http://localhost:3000/stock/stockSearch`;
      const url = `stock/stockSearch`;
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
        const response = await axios.request(url, options);
        const data = response.data;
        if (data["Error Message"]) {
          context.commit("SET_ALERT_STATUS", {
            status: true,
            message:
              "Invalid API call. Please retry with a different symbol like IBM or googl",
          });
          context.commit("SET_STOCK_DATA", []);
        } else {
          context.commit("SET_STOCK_DATA", data);
        }
      } catch (error) {
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
