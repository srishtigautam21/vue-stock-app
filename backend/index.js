const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "Everthing looks good",
  });
});

app.get("/stock/stockSymbol", async (req, res) => {
  const symbol = req.query.symbol;
  console.log("in symbol server", symbol);
  const searchUrl = `https://alpha-vantage.p.rapidapi.com/query?function=SYMBOL_SEARCH&keywords=microsoft&datatype=json`;
  const options = {
    method: "GET",
    // url: 'https://alpha-vantage.p.rapidapi.com/query',
    // params: {
    //   keywords: 'microsoft',
    //   function: 'SYMBOL_SEARCH',
    //   datatype: 'json'
    // },
    headers: {
      "X-RapidAPI-Key": "fb607afe8dmshdf0cff56cbfcdc8p17c5d5jsn7efdc2db7c42",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };
  // const searchUrl =
  //   "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=Y7DMEJSF39VYK876";
  try {
    const response = await fetch(searchUrl, options);
    const data = await response.json();
    // console.log("data", data);
    const bestMatches = data.bestMatches.map((match) => match["2. name"]);
    console.log(bestMatches);
    res.status(200).json(bestMatches);
  } catch (e) {
    res.status(500).send({
      msg: "Server error",
    });
  }
});

app.get("/stock/stockSearch", async (req, res) => {
  console.log("inserver", req.query);
  // query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=Y7DMEJSF39VYK876
  const timeSeries = req.query.function;
  const symbol = req.query.symbol;
  const searchUrl = `https://alpha-vantage.p.rapidapi.com/query?function=${timeSeries}&symbol=${symbol}&datatype=json`;
  const options = {
    method: "GET",
    // url: "https://alpha-vantage.p.rapidapi.com/query?functionTIME_SERIES_DAILY&symbol=MSFT&datatype=json",
    // params: {
    //   function: "TIME_SERIES_DAILY",
    //   symbol: "MSFT",
    //   outputsize: "compact",
    //   datatype: "json",
    // },
    headers: {
      "X-RapidAPI-Key": "fb607afe8dmshdf0cff56cbfcdc8p17c5d5jsn7efdc2db7c42",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(searchUrl, options);
    const data = await response.json();

    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({
      msg: "Server error",
    });
  }
});

app.listen(port, () => {
  console.log("Server running on port 3000");
});
