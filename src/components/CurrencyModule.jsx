import React,{useEffect, useState} from "react";
import CurrencyChanger from "./UI/div/CurrencyChanger";

const CurrencyModule = ({currencySymbols}) => {
    //USD-EUR / RUB-EUR = RUB-USD
    
    const [val1, setVal1] = useState(1);
    const [val2, setVal2] = useState(1);

    const [selectedSymbol1, setSelectedSymbol1] = useState(currencySymbols.at(0).symbol);
    const [selectedSymbol2, setSelectedSymbol2] = useState(currencySymbols.at(0).symbol);
    
    let multplyer = 1;
    let titleVal = 'Exchanger';

    useEffect(()=>{
        let tempStr = '';
        currencySymbols.forEach(element => {
            tempStr += element.symbol + ',';
        });
        tempStr = tempStr.slice(0,-1);

        fetch('http://api.exchangeratesapi.io/v1/latest' +
            '?access_key=acb7050b95a2e2cfd3962ab3c843248c' +
            '&symbols=' + tempStr)
        .then(response => response.json())
        .then(data => {
            if(Object.keys(data)[0] !== 'error'){
                tempStr = JSON.stringify(data.rates);
                tempStr = tempStr.slice(1,-1);
                while(tempStr.indexOf('"') !== -1){
                    tempStr = tempStr.replace('"','')
                }
                document.title = titleVal + '|' + tempStr;
            }
            else 
                console.error('Api serverside problem')
        });
    },[]);

    useEffect(() =>{
        fetch('http://api.exchangeratesapi.io/v1/latest' +
            '?access_key=acb7050b95a2e2cfd3962ab3c843248c' +
            '&symbols=' + selectedSymbol2 +
            ',' + selectedSymbol1)
        .then(response => response.json())
        .then(data => {
            if(Object.keys(data)[0] !== 'error'){
                if(Object.keys(data.rates).length === 2){
                    const convertPart1 = Object.values(data.rates)[0];
                    const convertPart2 = Object.values(data.rates)[1];

                    multplyer = convertPart1 / convertPart2;

                    return(multplyer);
                }
                else{
                    console.log('error: wrong ammount of rates');
                }
            }
            else 
                console.error('Api serverside problem')
        });
    });

    function updateValue(value, code, updateValue){
        
        updateValue(code === 2 
            ? value * multplyer 
            : value / multplyer);
        console.log(multplyer);
    }
    

    return(
        <div>
            <CurrencyChanger currencySymbols = {currencySymbols}
                moduleName ='from'
                valIn = {val1} 
                setVal1 = {onChangeVal => setVal1(onChangeVal)}
                setVal2 = {onBlurVal => 
                    updateValue(onBlurVal, 2, setVal2)}
                selectedSymbol = {selectedSymbol1}
                setSelectedSymbol = {tempSymbol => 
                    (setSelectedSymbol1(tempSymbol),
                    setVal1(0), setVal2(0))}/>
            <CurrencyChanger currencySymbols = {currencySymbols}
                moduleName ='to'
                valIn = {val2} 
                setVal1 = {onChangeVal => setVal2(onChangeVal)}
                setVal2 = {onBlurVal =>
                    updateValue(onBlurVal, 1, setVal1)}
                selectedSymbol = {selectedSymbol2}
                setSelectedSymbol = {tempSymbol => 
                    (setSelectedSymbol2(tempSymbol), 
                    setVal1(0), setVal2(0))}/>
        </div>
    )
}

export default CurrencyModule;