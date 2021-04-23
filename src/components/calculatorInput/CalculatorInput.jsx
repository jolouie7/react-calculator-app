import React, {useState} from 'react'
import "./calculatorInput.css"

const CalculatorInput = () => {
  const [currentOperand, setCurrentOperand] = useState("")
  const [calculationOutput, setCalculationOutput] = useState("")

  const handleChange = (e) => {
    const currVal = e.target.value
    setCurrentOperand(currVal)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    evaluateExpression(currentOperand);
  }

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
    let re = /[a-zA-Z]/ // look for letters
    let re2 = /[\\(\\)]/; // look for parentheses

    // Check the input for letters before calculating
    if (re.exec(currentOperand)) {
      console.log("There is letter in the equation!");
      return setCalculationOutput("Invalid Input!");
    }

    // Check for parentheses
    if (re2.exec(currentOperand)) {
      console.log("There is parentheses in the equation!");
      return setCalculationOutput("Program doesn't support Parentheses yet. Sorry!");
    }

    const currExpression = currentOperand.toString();
    if (
      currentOperand === "" ||
      currentOperand === "." ||
      currentOperand === "+" ||
      currentOperand === "-" ||
      currentOperand === "/" ||
      currentOperand === "*"
    ) {
      setCalculationOutput("");
      console.log("Input a number or decimal");
    } else {
      let result = calculate(parseCalculationString(currExpression));
      // Check for a case like: 23*3*
      if (result === "NaN" || result === undefined) {
        result = "Syntax Error";
        return setCalculationOutput(result);
      }
      result = result.toString();
      if (isNaN(result) || result === undefined) {
        console.log("NaN or undefined error");
        // If this program is used by a non-technical user, include a reason for error or include a custom error code that they can refer to
        result = "Syntax Error";
        setCalculationOutput(result);
      } else {
        setCalculationOutput(result);
      }
    }
  };

  return (
    <div className="calc-container">
      <form className="calc-form" onSubmit={handleSubmit}>
        <div>
          <div className="calc-label-container">
            <label>Calculator</label>
          </div>
          <br />
          <input
            data-testid="calc-input"
            className="calc-input"
            type="text"
            name="currentOperand"
            value={currentOperand}
            onChange={handleChange}
            placeholder="Enter a math equation like: 4*5/2"
          ></input>
        </div>
        <div className="calc-button-container">
          <button className="primary-btn" type="submit">
            Calculate
          </button>
        </div>
      </form>
      <div data-testid="calculationOutput">Answer: {calculationOutput}</div>
    </div>
  );
}

export default CalculatorInput