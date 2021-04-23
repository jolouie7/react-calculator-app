# react-calculator-app

### Problem
Write a calculator program. The program should let a user enter a math problem as a string and get an answer.

### Instructions
In this project I have created 2 programs. I read the problem and assumed I need to build a calculator similar to the one on our phones, but I was wrong. All I ask is that you took a look at the calculator because I spent around 4hours on it. The real program is called CalculatorInput. **To use the program type out a simple math equation, similar to something you would type out on your phone calculator. This program doesn't support parentheses.**
### Installation

#### Clone project

```
git clone git@github.com:jolouie7/react-calculator-app.git
```

#### Change in the directory
```
cd react-calculator-app
```

#### open in your code editor
```
code .
```

#### install dependencies
```
npm install
```

#### run application
```
npm start
```

#### run tests
```
npm test
```
### Improvements
- [ ] Add ability to use parentheses in the equation
  - In order allow the program to take in parentheses I would need to check for parentheses first in the calculate function.


### Closing thoughts
This was a fun project. I got to use Regex in react/javascript for the first time and I got to use testing in it's basic form. I realized from googling that I could have approached calculating the incoming string equation 2 ways. 1. I could split the string based on an operators level of priority. I could have split based on PEMDAS. This would result in a tree like structure, which I can then parse through recursively. 2. I found out there was something called Tokenizing. Tokenizing is the act of taking the incoming equation string and spliting it up into elements in an array. For example, "2+3*5" -> ["2", "+", "3", "*", "5"]. After this I would parse the the array.

### Resources
- https://stackoverflow.com/questions/32292231/how-to-code-a-calculator-in-javascript-without-eval