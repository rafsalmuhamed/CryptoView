import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

    const { allCoin, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);

    // search function
    const [input, setInput] = useState('')
    const inputHandler = (event) => {
        setInput(event.target.value);
        
        if (event.target.value === ""){
            setDisplayCoin(allCoin)
        }

    }

    const searchHandler = async (event) => {
        event.preventDefault();
        const coins = await allCoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins);

    }

    useEffect(() => {
        setDisplayCoin(allCoin);
    }, [allCoin])

    return (
        <div className='home'>
            <div className="hero">
                <h1>Crypto Live <span>:</span><br />  Track Prices, Charts, and Market Data in Real-Time<span>.</span></h1>
                <p>Step into the globe’s biggest cryptocurrency marketplace! Sign up now and dive deeper into the world of cryptocurrencies.</p>

                <form onSubmit={searchHandler}>
                    <input onChange={inputHandler} value={input} type="text" placeholder='Search Crypto..' required  list='coinlist'/>

                    {/* creating suggestion list */}

                    <datalist id='coinlist'>
                        {allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}

                    </datalist>
                    <button>Search</button>

                </form>

            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p>24H Change</p>
                    <p className='market-cap'>Market Cap</p>
                </div>
                {
                    displayCoin.slice(0, 10).map((item, index) => (
                        <Link to={`/coin/${item.id}`} 
                        className="table-layout" key={index}>
                            <p>{item.market_cap_rank}</p>
                            <div>
                                <img src={item.image} alt="" />
                                <p>{item.name} - {item.symbol}</p>
                            </div>
                            <p className='price-text'>{currency.symbol} {item.current_price}</p>
                            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>{Math.floor(item.price_change_percentage_24h * 100) / 100}%</p>
                            <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>

                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Home