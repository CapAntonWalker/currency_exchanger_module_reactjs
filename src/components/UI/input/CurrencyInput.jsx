import React from "react";
import classes from './CurrencyInput.module.css'
const CurencyInput = ({name,val,setVal1,setVal2}) =>{
    

    return(
        <div className={classes.clearInput}>
            <input 
                type="text" 
                value={val} 
                onChange={event=>setVal1(event.target.value)}
                onBlur={event=>setVal2(event.target.value)}
                placeholder={name}
            />
        </div>
    )
}

export default CurencyInput;