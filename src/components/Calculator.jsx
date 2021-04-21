import React, {useState, useEffect} from 'react'

const Calculator = () => {
  const [prevOperand, setPrevOperand] = useState("")
  const [currentOperand, setCurrentOperand] = useState("");

  // useEffect(() => {
  //   if (currentOperand !== "" && ".÷*-+".includes(currentOperand[currentOperand.length-1])) {
  //     const newOperand = currentOperand.slice(0, currentOperand.length)
  //     setCurrentOperand(newOperand)
  //   }
  // }, [currentOperand])

  const handleClick = (e) => {
    console.log(e.target.value)
    const currVal = (e.target.value).toString()
    if (
      currentOperand[currentOperand.length - 1] === "/" ||
      currentOperand[currentOperand.length - 1] === "*" ||
      currentOperand[currentOperand.length - 1] === "+" ||
      currentOperand[currentOperand.length - 1] === "-"
    ) {
      const newOperand = currentOperand.slice(0, currentOperand.length - 1);
      setCurrentOperand(newOperand + currVal);
    } else {
      setCurrentOperand(currentOperand + currVal);
    }
  }

  const handleAllClear = () => {
    setCurrentOperand("")
  }

  const handleDelete = () => {
    const expression = currentOperand.slice(0, currentOperand.length-1)
    console.log(expression)
    setCurrentOperand(expression);
  }

  function parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    var calculation = [],
      current = "";
    for (var i = 0, ch; (ch = s.charAt(i)); i++) {
      if ("^*/+-".indexOf(ch) > -1) {
        if (current == "" && ch == "-") {
          current = "-";
        } else {
          calculation.push(parseFloat(current), ch);
          current = "";
        }
      } else {
        current += s.charAt(i);
      }
    }
    if (current != "") {
      calculation.push(parseFloat(current));
    }
    return calculation;
  }

  function calculate(calc) {
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [
        { "^": (a, b) => Math.pow(a, b) },
        { "*": (a, b) => a * b, "/": (a, b) => a / b },
        { "+": (a, b) => a + b, "-": (a, b) => a - b },
      ],
      newCalc = [],
      currentOp;
    for (var i = 0; i < ops.length; i++) {
      for (var j = 0; j < calc.length; j++) {
        if (ops[i][calc[j]]) {
          currentOp = ops[i][calc[j]];
        } else if (currentOp) {
          newCalc[newCalc.length - 1] = currentOp(
            newCalc[newCalc.length - 1],
            calc[j]
          );
          currentOp = null;
        } else {
          newCalc.push(calc[j]);
        }
      }
      calc = newCalc;
      newCalc = [];
    }
    if (calc.length > 1) {
      console.log("Error: unable to resolve calculation");
      return calc;
    } else {
      return calc[0];
    }
  }

  const evaluateExpression = () => {
    console.log("evaluate")
    const currExpression = currentOperand.toString();
    if (
      currentOperand === "" ||
      currentOperand === "." ||
      currentOperand === "+" ||
      currentOperand === "-" ||
      currentOperand === "/" ||
      currentOperand === "*"
    ) {
      console.log("Input something")
    } else {
      let result = calculate(parseCalculationString(currExpression)).toString()
      if (result === "NaN") {
        console.log("NaN error")
        result = "Error"
        setCurrentOperand(result);
      } else {
        setCurrentOperand(result);
        setPrevOperand(currExpression)
      }
    }
  }

  return (
    <div className="calculator-grid">
      <div className="output">
        <div data-prev-operand className="prev-operand">{prevOperand}</div>
        <div data-current-operand className="current-operand">{currentOperand}</div>
      </div>
      <button onClick={handleAllClear} data-all-clear className="span-two">AC</button>
      <button onClick={handleDelete} data-delete>DEL</button>
      <button onClick={handleClick} value={"/"} data-operation>/</button>
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
      <button onClick={evaluateExpression} data-equals className="span-two">=</button>
    </div>
  );
}

export default Calculator