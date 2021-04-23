import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

const setup = () => {
  return render(<App />);
};

// Examples
// calculate "1 + 2" gives 3
// calculate "4*5/2" gives 10
// calculate "-5+-8--11*2" gives 9
// calculate "-.32       /.5" gives -0.64
// calculate "(4-2)*3.5" gives 7
// calculate "2+-+-4" gives Syntax Error (or similar)
// calculate "19 + cinnamon" gives Invalid Input (or similar)

describe("CalculatorInput", () => {
  test("Input field appears on screen", () => {
    setup();
    const inputField = screen.getByTestId("calc-input");
    expect(inputField).toBeInTheDocument();
  })

  test("Button appears on screen", () => {
    setup();
    const calculateBtn = screen.getByRole("button", { name: /Calculate/i });
    expect(calculateBtn).toBeInTheDocument();
  })

  test("1 + 2", () => {
    setup()
    const inputField = screen.getByTestId("calc-input");
    const calculationOutput = screen.getByTestId("calculationOutput");
    const calculateBtn = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.change(inputField, { target: { value: "1 + 2" } });
    userEvent.click(calculateBtn)
    expect(calculationOutput.textContent).toEqual("Answer: 3");
  })

  test("4*5/2", () => {
    setup();
    const inputField = screen.getByTestId("calc-input");
    const calculationOutput = screen.getByTestId("calculationOutput");
    const calculateBtn = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.change(inputField, { target: { value: "4*5/2" } });
    userEvent.click(calculateBtn);
    expect(calculationOutput.textContent).toEqual("Answer: 10");
  });

  test("-5+-8--11*2", () => {
    setup();
    const inputField = screen.getByTestId("calc-input");
    const calculationOutput = screen.getByTestId("calculationOutput");
    const calculateBtn = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.change(inputField, { target: { value: "-5+-8--11*2" } });
    userEvent.click(calculateBtn);
    expect(calculationOutput.textContent).toEqual("Answer: 9");
  });

  test("-.32       /.5", () => {
    setup();
    const inputField = screen.getByTestId("calc-input");
    const calculationOutput = screen.getByTestId("calculationOutput");
    const calculateBtn = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.change(inputField, { target: { value: "-.32       /.5" } });
    userEvent.click(calculateBtn);
    expect(calculationOutput.textContent).toEqual("Answer: -0.64");
  });

  test("(4-2)*3.5", () => {
    setup();
    const inputField = screen.getByTestId("calc-input");
    const calculationOutput = screen.getByTestId("calculationOutput");
    const calculateBtn = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.change(inputField, { target: { value: "(4-2)*3.5" } });
    userEvent.click(calculateBtn);
    expect(calculationOutput.textContent).toEqual(
      "Answer: Program doesn't support Parentheses yet. Sorry!"
    );
  });

  test("23*3*", () => {
    setup();
    const inputField = screen.getByTestId("calc-input");
    const calculationOutput = screen.getByTestId("calculationOutput");
    const calculateBtn = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.change(inputField, { target: { value: "23*3*" } });
    userEvent.click(calculateBtn);
    expect(calculationOutput.textContent).toEqual("Answer: Syntax Error");
  });

  test("2+-+-4", () => {
    setup();
    const inputField = screen.getByTestId("calc-input");
    const calculationOutput = screen.getByTestId("calculationOutput");
    const calculateBtn = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.change(inputField, { target: { value: "2+-+-4" } });
    userEvent.click(calculateBtn);
    expect(calculationOutput.textContent).toEqual("Answer: Syntax Error");
  });

  test("19 + cinnamon", () => {
    setup();
    const inputField = screen.getByTestId("calc-input");
    const calculationOutput = screen.getByTestId("calculationOutput");
    const calculateBtn = screen.getByRole("button", { name: /Calculate/i });
    fireEvent.change(inputField, { target: { value: "19 + cinnamon" } });
    userEvent.click(calculateBtn);
    expect(calculationOutput.textContent).toEqual("Answer: Invalid Input!");
  });
})