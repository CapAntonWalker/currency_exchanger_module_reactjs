import React from "react";
import classes from './CurrencySelect.module.css';

const CurencySelect = ({currencies, defaultVal, symbol, onChange}) =>{

    return(
        <select value={symbol}
            onChange={event => onChange(event.target.value)}
            className={classes.customSelect}>
            <option disabled value=''>{defaultVal}</option>
            {currencies.map(currency =>
                <option value={currency.symbol} 
                    key={currency.symbol}>
                    {currency.name}
                </option>    
            )}
        </select>
    )
}

export default CurencySelect;