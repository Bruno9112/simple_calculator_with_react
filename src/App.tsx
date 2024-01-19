// React
import { MouseEvent, useRef, useState } from 'react';

// Componentes
import Button from './components/Button';
import Display from './components/Display';

// CSS
import './App.css';

function useApp(){
  const otherNumber = useRef<string>("");
  const operator = useRef<string>("");
  const restart = useRef<boolean>(false);
  const [display, setDisplay] = useState<string>("");

  function errorDisplay(){
    restart.current = true
    otherNumber.current = ""
    return "Error"
  }

  function handleClickNumber(e: MouseEvent<HTMLButtonElement>){
    const value = e.currentTarget.value;

    if(restart.current){
      setDisplay(value);
      restart.current = false;
    } else {
      if(value === "."){
        if(!display.includes(value)){
          setDisplay(prev => prev + value);
        }
      } else {
        setDisplay(prev => prev === "0" ? value : prev + value);
      }
    }
  }

  function handleClickOperator(e: MouseEvent<HTMLButtonElement>){
    if(!operator.current){
      operator.current = e.currentTarget.value;
      otherNumber.current = display;
      restart.current = true;
    }
  }

  function handleClickEqual(){

    if(otherNumber.current && display){
      const n1 = parseFloat(otherNumber.current);
      const n2 = parseFloat(display);
  
      let resultado: string;
  
      switch(operator.current){
        case "+":
          resultado = String(n1 + n2);
          break;
        case "-":
          resultado = String(n1 - n2);
          break;
        case "/":
          resultado = n2 !== 0 ? String(n1 / n2) : errorDisplay();
          break;
        case "*":
          resultado = String(n1 * n2);
          break;
        default:
          resultado = errorDisplay()
  
      } 

      if(resultado.length <= 15){
        setDisplay(resultado)
      }else{
        const formatter = Intl.NumberFormat("en-US", {notation: "engineering"})
        setDisplay(formatter.format(parseFloat(resultado)))
      }

      operator.current = "";
      otherNumber.current = ""
    }
  }

  function handleClickBackSpace(){
    setDisplay(prev => prev.substring(0, prev.length - 1));
  }

  function handleClickC(){
    setDisplay("");
    restart.current = false;
    otherNumber.current = "";
    operator.current = "";
  }

  function handleClickInvertNumber(){
    setDisplay(prev => String(parseFloat(prev) * -1));
  }

  function handleClickPercent(){
    setDisplay(prev => String(parseFloat(prev) / 100))
  }

  return {
    display,
    handleClickNumber,
    handleClickOperator,
    handleClickEqual,
    handleClickBackSpace,
    handleClickC,
    handleClickInvertNumber,
    handleClickPercent
  };
}

export default function App() {

  const { display, handleClickNumber, handleClickOperator, handleClickEqual,
    handleClickBackSpace, handleClickC, handleClickInvertNumber, handleClickPercent} = useApp()

  return (
    <div className='calculator_area'>
      <div className='calculator_display_area'>
        <Display expression={display} />
      </div>  
      <div className='calculator_keyboard_area'>
        <Button onClick={handleClickC}>C</Button>
        <Button onClick={handleClickBackSpace}>{"<-"}</Button>
        <Button onClick={handleClickPercent} value="%" >%</Button>
        <Button onClick={handleClickOperator} value="/" operator >/</Button>
        <Button onClick={handleClickNumber} value="7" >7</Button>
        <Button onClick={handleClickNumber} value="8" >8</Button>
        <Button onClick={handleClickNumber} value="9" >9</Button>
        <Button onClick={handleClickOperator} value="*" operator >*</Button>
        <Button onClick={handleClickNumber} value="4" >4</Button>
        <Button onClick={handleClickNumber} value="5" >5</Button>
        <Button onClick={handleClickNumber} value="6" >6</Button>
        <Button onClick={handleClickOperator} value="-" operator >-</Button>
        <Button onClick={handleClickNumber} value="1" >1</Button>
        <Button onClick={handleClickNumber} value="2" >2</Button>
        <Button onClick={handleClickNumber} value="3" >3</Button>
        <Button onClick={handleClickOperator} value="+" operator >+</Button>
        <Button onClick={handleClickInvertNumber}>+/-</Button>
        <Button onClick={handleClickNumber} value="0" >0</Button>
        <Button onClick={handleClickNumber} value="." >.</Button>
        <Button onClick={handleClickEqual} operator>=</Button>
      </div>
    </div>
  );
}

