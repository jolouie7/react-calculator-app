import React, {useState} from 'react'

const Calculator = () => {
  const [prevOperand, setPrevOperand] = useState("123+123")
  const [currentOperand, setCurrentOperand] = useState("456");
  // const [endingOperand, setEndingOperand] = useState("");

  const handleClick = (e) => {
    console.log(e.target.value)
    const currVal = (e.target.value).toString()
    setCurrentOperand(currentOperand + currVal)
  }

  const handleAllClear = () => {
    setCurrentOperand("")
  }

  const handleDelete = () => {
    const expression = currentOperand.slice(0, currentOperand.length-1)
    console.log(expression)
    setCurrentOperand(expression);
  }

  return (
    <div className="calculator-grid">
      <div className="output">
        <div data-prev-operand className="prev-operand">{prevOperand}</div>
        <div data-current-operand className="current-operand">{currentOperand}</div>
      </div>
      <button onClick={handleAllClear} data-all-clear className="span-two">AC</button>
      <button onClick={handleDelete} data-delete>DEL</button>
      <button onClick={handleClick} value={"÷"} data-operation>÷</button>
      <button onClick={handleClick} value={1} data-number>1</button>
      <button onClick={handleClick} value={2} data-number>2</button>
      <button onClick={handleClick} value={3} data-number>3</button>
      <button onClick={handleClick} value={"*"} data-operation>*</button>
      <button onClick={handleClick} value={4} data-number>4</button>
      <button onClick={handleClick} value={5} data-number>5</button>
      <button onClick={handleClick} value={6} data-number>6</button>
      <button onClick={handleClick} value={"+"} data-operation>+</button>
      <button onClick={handleClick} value={7} data-number>7</button>
      <button onClick={handleClick} value={8} data-number>8</button>
      <button onClick={handleClick} value={9} data-number>9</button>
      <button onClick={handleClick} value={"-"} data-operation>-</button>
      <button onClick={handleClick} value={"."} data-number>.</button>
      <button onClick={handleClick} value={0} data-number>0</button>
      <button data-equals className="span-two">=</button>
    </div>
  );
}

export default Calculator