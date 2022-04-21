import React from "react";
import CurrencyInput from "../input/CurrencyInput";
import CurrencySelect from "../select/CurrencySelect";
import classes from './CurrencyChanger.module.css';

const CurrencyChanger = ({currencySymbols, 
    moduleName, valIn, setVal1, setVal2, 
    selectedSymbol, setSelectedSymbol}) => {
    
    return(
        <div className={classes.box}>
            <CurrencyInput 
                name={moduleName}
                val={valIn} 
                setVal1={jnChangeVal => setVal1(jnChangeVal)} 
                setVal2={onBlurVal => setVal2(onBlurVal)}/>
            <CurrencySelect 
                symbol={selectedSymbol}
                onChange={inSymbol => setSelectedSymbol(inSymbol)}
                currencies={currencySymbols} 
                defaultVal='Select currency'/>
        </div>
    )
}

export default CurrencyChanger;