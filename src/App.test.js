import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Smoke test. Make sure the calc is rendered on the screen
// Test delete button
// Test clear button
// Calculate varies examples

// Examples
// calculate "1 + 2" gives 3
// calculate "4*5/2" gives 10
// calculate "-5+-8--11*2" gives 9
// calculate "-.32       /.5" gives -0.64
// calculate "(4-2)*3.5" gives 7
// calculate "2+-+-4" gives Syntax Error (or similar)
// calculate "19 + cinnamon" gives Invalid Input (or similar)

const setup = () => {
  return render(
      <App />
  );
}

describe("Calculator", () => {
  test("Something appear in the output when a number button is pressed", () => {
    setup();
    const oneBtn = screen.getByRole("button", { name: /1/i });
    userEvent.click(oneBtn);
    const currentOperand = screen.getByTestId("current-operand");
    expect(currentOperand.textContent).toBe("1");
  });

  test("Deletion button works", () => {
    setup();
    const oneBtn = screen.getByRole("button", { name: /1/i });
    userEvent.dblClick(oneBtn);
    const currentOperand = screen.getByTestId("current-operand");
    const delBtn = screen.getByRole("button", { name: /DEL/i });
    userEvent.click(delBtn);
    expect(currentOperand.textContent).toBe("1");
  });

  test("AC (All clear) button works", () => {
    setup();
    const oneBtn = screen.getByRole("button", { name: /1/i });
    userEvent.dblClick(oneBtn);
    const currentOperand = screen.getByTestId("current-operand");
    const acBtn = screen.getByRole("button", { name: /AC/i });
    userEvent.click(acBtn);
    expect(currentOperand.textContent).toBe("");
  });

  // calculate "1 + 1" gives 2
  test("Simple addition", () => {
    setup();
    const oneBtn = screen.getByRole("button", { name: /1/i });
    const additionBtn = screen.getByRole("button", { name: /\+/i });
    const calculateBtn = screen.getByRole("button", { name: /=/i });
    const currentOperand = screen.getByTestId("current-operand");
    userEvent.click(oneBtn);
    userEvent.click(additionBtn);
    userEvent.click(oneBtn);
    userEvent.click(calculateBtn);
    expect(currentOperand.textContent).toBe("2");
  });

  // calculate "4*5/2" gives 10
  test("Two operations, * and /", () => {
    setup();
    const fourBtn = screen.getByRole("button", { name: /4/i });
    const fiveBtn = screen.getByRole("button", { name: /5/i });
    const twoBtn = screen.getByRole("button", { name: /2/i });
    const multiplyBtn = screen.getByRole("button", { name: /\*/i });
    const divideBtn = screen.getByRole("button", { name: /\//i });
    const calculateBtn = screen.getByRole("button", { name: /=/i });
    const currentOperand = screen.getByTestId("current-operand");
    userEvent.click(fourBtn);
    userEvent.click(multiplyBtn);
    userEvent.click(fiveBtn);
    userEvent.click(divideBtn);
    userEvent.click(twoBtn);
    userEvent.click(calculateBtn);
    expect(currentOperand.textContent).toBe("10");
  });

  // calculate "-.32       /.5" gives -0.64
  test("Decimal numbers", () => {
    setup();
    const threeBtn = screen.getByRole("button", { name: /3/i });
    const fiveBtn = screen.getByRole("button", { name: /5/i });
    const twoBtn = screen.getByRole("button", { name: /2/i });
    const decimalBtn = screen.getByRole("button", { name: /\./i });
    const subtractionBtn = screen.getByRole("button", { name: /-/i });
    const divideBtn = screen.getByRole("button", { name: /\//i });
    const calculateBtn = screen.getByRole("button", { name: /=/i });
    const currentOperand = screen.getByTestId("current-operand");
    userEvent.click(subtractionBtn);
    userEvent.click(decimalBtn);
    userEvent.click(threeBtn);
    userEvent.click(twoBtn);
    userEvent.click(divideBtn);
    userEvent.click(decimalBtn);
    userEvent.click(fiveBtn);
    userEvent.click(calculateBtn);
    expect(currentOperand.textContent).toBe("-0.64");
  });

  test("For a case like: 3/-++3", () => {
    setup();
    const threeBtn = screen.getByRole("button", { name: /3/i });
    const additionBtn = screen.getByRole("button", { name: /\+/i });
    const subtractionBtn = screen.getByRole("button", { name: /-/i });
    const divideBtn = screen.getByRole("button", { name: /\//i });
    const calculateBtn = screen.getByRole("button", { name: /=/i });
    const currentOperand = screen.getByTestId("current-operand");
    userEvent.click(threeBtn);
    userEvent.click(divideBtn);
    userEvent.click(subtractionBtn);
    userEvent.click(additionBtn);
    userEvent.click(additionBtn);
    userEvent.click(threeBtn);
    userEvent.click(calculateBtn);
    expect(currentOperand.textContent).toBe("6"); // 3+3
  });

  test("For a case like: ..3", () => {
    setup();
    const threeBtn = screen.getByRole("button", { name: /3/i });
    const decimalBtn = screen.getByRole("button", { name: /\./i });
    const calculateBtn = screen.getByRole("button", { name: /=/i });
    const currentOperand = screen.getByTestId("current-operand");
    userEvent.dblClick(decimalBtn);
    userEvent.click(threeBtn);
    userEvent.click(calculateBtn);
    expect(currentOperand.textContent).toBe("0.3");
  });

  test("For a case like: .7.7", () => {
    // TODO: The program rounds down. .7.7 shouldn't be allowed and needs to be fixed
    setup();
    const sevenBtn = screen.getByRole("button", { name: /7/i });
    const decimalBtn = screen.getByRole("button", { name: /\./i });
    const calculateBtn = screen.getByRole("button", { name: /=/i });
    const currentOperand = screen.getByTestId("current-operand");
    userEvent.dblClick(decimalBtn);
    userEvent.click(sevenBtn);
    userEvent.dblClick(decimalBtn);
    userEvent.click(sevenBtn);
    userEvent.click(calculateBtn);
    expect(currentOperand.textContent).toBe("0.7");
  });
});