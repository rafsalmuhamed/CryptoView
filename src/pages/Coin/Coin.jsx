import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { Link, useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
// icon
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext)

  const fetchCoinData = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-vGXXRBTrkDkuexteftDF8MRL' } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }

  // for chart
  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-vGXXRBTrkDkuexteftDF8MRL' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  },[currency,coinId])

  if (coinData, historicalData) {
    const { market_data } = coinData;
    const priceChange24h = market_data.price_change_percentage_24h;
    return (
      <div className='coin'>
        <Link to={'/'}> <IoArrowBackCircleOutline className='back-icon' /></Link>
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name}({coinData.symbol.toUpperCase()})</b></p>
          <p className={priceChange24h > 0 ? 'positive-change' : 'negative-change'}>
            {priceChange24h.toFixed(2)}%
          </p>

        </div>

        {/* chart */}
        <div className='coin-chart'>
          <LineChart historicalData={historicalData} />

        </div>
        {/* coin data */}
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>


        </div>


      </div>
    )
  } else {
    return (

      // loading wheel
      <div className="center-container">
        <div className="lds-default">

          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>

    )
  }

}

export default Coin