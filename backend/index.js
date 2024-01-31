const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const port = process.env.VUE_APP_PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "Everthing looks good",
  });
});

// app.get("/stock/stockSymbol", async (req, res) => {
//   const symbol = req.query.symbol;
//   console.log("in symbol server", symbol);
//   const searchUrl = `https://alpha-vantage.p.rapidapi.com/query?function=SYMBOL_SEARCH&keywords=microsoft&datatype=json`;
//   const options = {
//     method: "GET",

//     headers: {
//       "X-RapidAPI-Key": "fb607afe8dmshdf0cff56cbfcdc8p17c5d5jsn7efdc2db7c42",
//       "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(searchUrl, options);
//     const data = await response.json();
//     const bestMatches = data.bestMatches.map((match) => match["2. name"]);
//     console.log(bestMatches);
//     res.status(200).json(bestMatches);
//   } catch (e) {
//     res.status(500).send({
//       msg: "Server error",
//     });
//   }
// });

app.get("/stock/stockSearch", async (req, res) => {
  const timeSeries = req.query.function;
  const symbol = req.query.symbol;
  const searchUrl = `https://alpha-vantage.p.rapidapi.com/query?function=${timeSeries}&symbol=${symbol}&datatype=json`;
  const options = {
    method: "GET",

    headers: {
      "X-RapidAPI-Key": process.env.VUE_APP_API_KEY,
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(searchUrl, options);
    const data = await response.json();
    console.log(data, "in server");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).send({
      msg: "Server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
