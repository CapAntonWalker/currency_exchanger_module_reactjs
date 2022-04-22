import React,{useEffect, useState} from "react";
import CurrencyChanger from "./UI/div/CurrencyChanger";

const CurrencyModule = ({currencySymbols}) => {
    
    const [val1, setVal1] = useState(1);
    const [val2, setVal2] = useState(1);

    const [selectedSymbol1, setSelectedSymbol1] = useState(currencySymbols.at(0).symbol);
    const [selectedSymbol2, setSelectedSymbol2] = useState(currencySymbols.at(0).symbol);
    
    const [multplyer, setMultiplyer] = useState(1);
    const [titleVal, setTitleVal] = useState('Exchanger');
    const mainSymbol = 'UAH';

    useEffect(()=>{
        let tempVal = '';
        let hasMainSymbol=true;

        if (selectedSymbol1 !== mainSymbol && selectedSymbol2 !== mainSymbol){
            tempVal = `${selectedSymbol1}_${mainSymbol},${selectedSymbol2}_${mainSymbol}`;
            if (selectedSymbol1 === selectedSymbol2){
                hasMainSymbol=false;
                tempVal = `${selectedSymbol1}_${mainSymbol}`;
            }
        } else if (selectedSymbol1 !== mainSymbol){
            tempVal = `${selectedSymbol1}_${mainSymbol}`;
        } else if (selectedSymbol2 !== mainSymbol){
            tempVal = `${selectedSymbol2}_${mainSymbol}`;
        } else{
            tempVal = '-1';
        }
        console.log('command to api: '+ tempVal);
        
        if(tempVal !== '' || tempVal !== '-1'){
            console.log('command to api sended')
            fetch('https://free.currconv.com/api/v7/convert?'+
            'q='+ tempVal + 
            '&compact=ultra&apiKey=914738d5aaba748df38d')
            .then(response => response.json())
            .then(data => {
                if (!Object.keys(data).includes('error')){
                    if(Object.values(data).length === 2){
                        setMultiplyer(Object.values(data)[0]/Object.values(data)[1]);
                        setTitleVal(`| ${mainSymbol} | ${Object.keys(data)[0].replace(`_${mainSymbol}`, '')}: ${Object.values(data)[0]}, `+ 
                        `${Object.keys(data)[1].replace(`_${mainSymbol}`,'')}: ${Object.values(data)[1]}`);
                    } else{
                        if(hasMainSymbol){
                            setMultiplyer(Object.values(data)[0])
                        } else{
                            setMultiplyer(1)
                        }

                        setTitleVal(`| ${mainSymbol} | ${Object.keys(data)[0].replace(`_${mainSymbol}`,'')}: ${Object.values(data)[0]}`);
                    }
                    
                }
                else{
                    setMultiplyer(1);
                    console.error('ERROR:Problem with api')
                }
            });
        } else{
            setMultiplyer(1);
            if(tempVal !== '-1'){
                console.error('ERROR:Empty selectors')
            }
        }
    },[selectedSymbol1,selectedSymbol2]);

    document.title = titleVal;

    function updateValue(value, code, updateValue){
        
        updateValue(code === 2 
            ? value * multplyer 
            : value / multplyer);
        console.log('multiplaer used: ' + multplyer);
    }

    function updateCurrency(func, val){
        func(val);
        setVal1(0)
        setVal2(0)
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
                moduleName ='Value input field #1'
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