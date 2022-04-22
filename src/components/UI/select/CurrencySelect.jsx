import React from "react";
import classes from './CurrencySelect.module.css';

const CurencySelect = ({currencies, defaultVal, symbol, onChange}) =>{

    return(
        <div className={classes.customSelect}>
        <select value={symbol}
            onChange={event => onChange(event.target.value)}>
            <option disabled value=''>{defaultVal}</option>
            {currencies.map(currency =>
                <option value={currency.symbol} 
                    key={currency.symbol}>
                    {currency.name}
                </option>    
            )}
        </select>
        <span className={classes.customArrow}></span>
        </div>
    )
}

export default CurencySelect;