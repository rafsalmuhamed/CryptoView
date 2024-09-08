import React, { useContext } from 'react'
import './Navbar.css'
import arrowicon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const {setCurrency} = useContext(CoinContext)

    const handleCurrency = (event)=>{
        switch(event.target.value)
        {
            case "usd" :{
                setCurrency({name:"usd", symbol:"$"});
                break;
            }
            case "eur" :{
                setCurrency({name:"eur", symbol:"€"});
                break;
            }
            case "inr" :{
                setCurrency({name:"inr", symbol:"₹"});
                break;
            }
            case "gbp" :{
                setCurrency({name:"gbp", symbol:"£"});
                break;
            }
            case "jpy" :{
                setCurrency({name:"jpy", symbol:"¥"});
                break;
            }
            case "aud" :{
                setCurrency({name:"aud", symbol:"$"});
                break;
            }
            case "cad" :{
                setCurrency({name:"cad", symbol:"$"});
                break;
            }
            default :{
                setCurrency({name:"usd", symbol:"$"});
                break;
            }
            
        }

    }

  return (
    <div className='navbar'>
<Link to={'/'}>
            <h2 className='logo'>CryptoView<span>.com</span></h2>
    
</Link>        <ul>
      <Link to={'/'}>  <li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
        </ul>
        <div className="nav-right">
            <select onChange={handleCurrency}> 
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="jpy">JPY</option>
            <option value="aud">AUD</option>
            <option value="cad">CAD</option>
            </select>
            <button>SignUp <img src={arrowicon} alt="" /></button>
        </div>

    </div>
  )
}

export default Navbar