import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  const handleConvert = () => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return;
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    setResult((amount * rate).toFixed(1)); // Adjust decimal places for better UI
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gradient-to-b from-purple-700 to-black text-white p-10 rounded-lg shadow-lg max-w-md text-center border border-blue-300">
        <div className="title">
        <h1 className="text-3xl font-bold mb-3 title1">Currency Converter</h1>
        <hr className="border-t-2 border-white w-20 my-2 mx-auto" />
        </div>

  <div className="flex items-center justify-center mb-4 space-x-6 container1">
  <div>
    <label className="text-sm fto">from</label>
    <select
      className="p-2 rounded bg-white text-black mt-1 currency"
      value={fromCurrency}
      onChange={(e) => setFromCurrency(e.target.value)}
    >
      {Object.keys(exchangeRates).map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  
    <label className="text-sm fto">to</label>
    <select
      className="p-2 rounded bg-white mt-1 currency"
      value={toCurrency}
      onChange={(e) => setToCurrency(e.target.value)}
    >
      {Object.keys(exchangeRates).map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
</div>


        <div className="mb-4 container2">
          <label className="text-sm amount">Enter Amount</label>
          <div className="container3">
          <input
            type="number"
            className="w-full p-2 mt-1 rounded inputnumber"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        </div>

        <div className="mt-4 btresult">
          <button
            className="bg-black text-white px-6 py-3 rounded border-2 border-white transition hover:bg-white hover:text-black convertb"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>

        <div className="mt-5">
          <p className="text-sm resultout">Result</p>
          <h2 className="text-4xl font-bold resultout2">{result !== null ? result : "0.00"}</h2>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
