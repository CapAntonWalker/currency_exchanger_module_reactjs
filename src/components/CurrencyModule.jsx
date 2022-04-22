import React,{useEffect, useState} from "react";
import CurrencyChanger from "./UI/div/CurrencyChanger";

const CurrencyModule = ({currencySymbols}) => {
    
    const [val1, setVal1] = useState(1);
    const [val2, setVal2] = useState(1);

    const [selectedSymbol1, setSelectedSymbol1] = useState(currencySymbols.at(0).symbol);
    const [selectedSymbol2, setSelectedSymbol2] = useState(currencySymbols.at(0).symbol);
    
    const [multplyer, setMultiplyer] = useState(1);
    const [titleVal, setTitleVal] = useState('Exchanger UAH');


    useEffect(()=>{
        let tempVal = ''

        Object.keys(currencySymbols).forEach(element => {
            if (element < Object.keys(currencySymbols).length - 1){
                tempVal = Object.values(currencySymbols[element])[0] +'_UAH';
                fetch('https://free.currconv.com/api/v7/convert?'+
                'q='+ tempVal + 
                '&compact=ultra&apiKey=914738d5aaba748df38d')
                .then(response => response.json())
                .then(data => {
                if (!Object.keys(data).includes('error')){ 
                    tempVal = JSON.stringify(data).slice(1,-1)
                    while (tempVal.indexOf('"') !== -1){
                        tempVal = tempVal.replace('"','')
                    }
                    tempVal = tempVal.replace('_UAH','')
                    setTitleVal(titleVal + ' | ' + tempVal);
                }
                else{
                    console.log('Problem with api')
                }
            });
            }
        });
        console.log('trigered change of title')
    },[titleVal,currencySymbols]);
    
    document.title = titleVal;
    
    fetch('https://free.currconv.com/api/v7/convert?'+
    'q='+ selectedSymbol1 +'_' + selectedSymbol2 + 
    '&compact=ultra&apiKey=914738d5aaba748df38d')
    .then(response => response.json())
    .then(data => {
        if (!Object.keys(data).includes('error')){ 
            setMultiplyer(Object.values(data)[0]);
        }
        else{
            setMultiplyer(1);
            console.log('Problem with api')
        }
    });

    function updateValue(value, code, updateValue){
        
        updateValue(code === 2 
            ? value * multplyer 
            : value / multplyer);
        console.log(multplyer);
    }

    function updateCurrency(func, val){
        func(val);
        setVal1(0); 
        setVal2(0);
    }
    

    return(
        <div>
            <CurrencyChanger currencySymbols = {currencySymbols}
                moduleName ='Value input field #1'
                valIn = {val1} 
                setVal1 = {onChangeVal => setVal1(onChangeVal)}
                setVal2 = {onBlurVal => 
                    updateValue(onBlurVal, 2, setVal2)}
                selectedSymbol = {selectedSymbol1}
                setSelectedSymbol = {tempSymbol => 
                    updateCurrency(setSelectedSymbol1,tempSymbol)}/>
            <CurrencyChanger currencySymbols = {currencySymbols}
                moduleName ='Value input field #2'
                valIn = {val2} 
                setVal1 = {onChangeVal => setVal2(onChangeVal)}
                setVal2 = {onBlurVal =>
                    updateValue(onBlurVal, 1, setVal1)}
                selectedSymbol = {selectedSymbol2}
                setSelectedSymbol = {tempSymbol => 
                    updateCurrency(setSelectedSymbol2,tempSymbol)}/>
        </div>
    )
}

export default CurrencyModule;