import React from "react";
import CurrencyModule from "./components/CurrencyModule";
import './styles/App.css';

function App() {
  const currencySymbols = [
    {symbol: 'EUR',name: 'Euro'},
    {symbol: 'USD',name: 'United States Dollar'},
    {symbol: 'PLN',name: 'Polish Zloty'},
    {symbol: 'RUB',name: 'Russian Ruble'},
    {symbol: 'UAH',name: 'Ukrainian Hryvnia'}]

  return (
    <div className="App">

      <CurrencyModule currencySymbols={currencySymbols}/>
    </div>
  );
}

export default App;
