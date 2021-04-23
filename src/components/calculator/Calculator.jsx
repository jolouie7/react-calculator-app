import "../../App.css";
import React, { useState } from "react";

const Calculator = () => {
  const [prevOperand, setPrevOperand] = useState("");
  const [currentOperand, setCurrentOperand] = useState("");
  const [pressedDecimal, setPressedDecimal] = useState(0); // prevent e.g. 34.. or ..3 -> if 0: can add decimal, if 1: can't add decimal until /,*,+,- is pressed
  const [lastButtonPress, setLastButtonPress] = useState("");

  const [currentInputExpression, setCurrentInputExpression] = useState("");

  const handleClick = (e) => {
    const currVal = e.target.value.toString();
    setLastButtonPress(currVal);
    if (
      // if the current last char in currentOperand is a operation symbol and currVal is a operation symbol, replace last char with currVal symbol
      (currentOperand[currentOperand.length - 1] === "/" ||
        currentOperand[currentOperand.length - 1] === "*" ||
        currentOperand[currentOperand.length - 1] === "+" ||
        currentOperand[currentOperand.length - 1] === "-") &&
      "/*+-".includes(currVal)
    ) {
      const newOperand = currentOperand.slice(0, currentOperand.length - 1);
      setCurrentOperand(newOperand + currVal);
    } else if (
      // we want a number
      currentOperand[currentOperand.length - 1] === "." &&
      currVal === "."
    ) {
      // This else if is to catch cases like ..3 and .3.3
      console.log("No Decimal");
    } else {
      // There is already a decimal
      setCurrentOperand(currentOperand + currVal);
    }
  };

  const handleAllClear = () => {
    setCurrentOperand("");
  };

  const handleDelete = () => {
    const expression = currentOperand.slice(0, currentOperand.length - 1);
    setCurrentOperand(expression);
  };

  const parseCalculationString = (s) => {
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
  };

  const calculate = (calc) => {
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
  };

  const evaluateExpression = () => {
    const currExpression = currentOperand.toString();
    if (
      currentOperand === "" ||
      currentOperand === "." ||
      currentOperand === "+" ||
      currentOperand === "-" ||
      currentOperand === "/" ||
      currentOperand === "*"
    ) {
      console.log("Input something");
    } else {
      let result = calculate(parseCalculationString(currExpression));
      // Check for a case like: 23*3* -> = is pressed
      if (result === "NaN" || result === undefined) {
        console.log("Error");
        return alert("Error: Invalid");
      }
      result = result.toString();
      if (result === "NaN" || result === undefined) {
        console.log("NaN error");
        result = "Error";
        setCurrentOperand(result);
      } else {
        setCurrentOperand(result);
        setPrevOperand(currExpression);
      }
    }
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="prev-operand">
          {prevOperand}
        </div>
        <div data-testid="current-operand" className="current-operand">
          {currentOperand}
        </div>
      </div>
      <button onClick={handleAllClear} className="span-two">
        AC
      </button>
      <button onClick={handleDelete}>
        DEL
      </button>
      <button onClick={handleClick} value={"/"}>
        /
      </button>
      <button onClick={handleClick} value={1}>
        1
      </button>
      <button onClick={handleClick} value={2}>
        2
      </button>
      <button onClick={handleClick} value={3}>
        3
      </button>
      <button onClick={handleClick} value={"*"} data-operation>
        *
      </button>
      <button onClick={handleClick} value={4}>
        4
      </button>
      <button onClick={handleClick} value={5}>
        5
      </button>
      <button onClick={handleClick} value={6}>
        6
      </button>
      <button onClick={handleClick} value={"+"}>
        +
      </button>
      <button onClick={handleClick} value={7}>
        7
      </button>
      <button onClick={handleClick} value={8}>
        8
      </button>
      <button onClick={handleClick} value={9}>
        9
      </button>
      <button onClick={handleClick} value={"-"}>
        -
      </button>
      <button onClick={handleClick} value={"."}>
        .
      </button>
      <button onClick={handleClick} value={0}>
        0
      </button>
      <button onClick={evaluateExpression} className="span-two">
        =
      </button>
    </div>
  );
};

export default Calculator;
