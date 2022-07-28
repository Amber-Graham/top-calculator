// create a display for the calculator with some dummy numbers in there
// the results of the function should display in the calculator display
// to make the calculator work, we must store the first number(input), the operator, and whatever numbers come back after that before they push equals
// the challenge will be figuring out how to store all the operators and numbers 
// remember PEMDAS -- not sure if this means i can store operators by importance or not
// the calc should only evaluate the a single pair of numbers at a time
// answers with long decimal points should be rounded so they don't overflow the display
// pressing = before entering all the numbers results in error
// clear button should wipe out any existing data 
// if the user tries to divide by 0 say "nah fam"

// extra credit:
// add floating point numbers with a . button - make sure they can only push . once in the equation (12.4 versus 1.2.3.4)
// add a backspace button if the user needs rewrite the function (make a clear everything and clear button?)
// add keyboard support (yikes)

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
    calculator.displayValue = displayValue === '0' ? digit:displayValue + digit;
    }
    
    console.log(calculator);
}

function inputDecimal(dot) {
    if(calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }

    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if(firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false; 
    calculator.operator = null;
    console.log(calculator);
}

function backspaceCalculator() {
    calculator.displayValue = '';
    console.log(calculator);
}

function updateDisplay() {
    const display = document.querySelector('.calc-input');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.bottom-calc');
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;
    if(!target.matches('button')) {
    return;
    }

    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'del':
            backspaceCalculator(value);
            break;
        case 'CE':
            resetCalculator();
            break;
        default:
            if(Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});
