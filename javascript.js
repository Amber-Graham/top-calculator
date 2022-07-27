// The calculator will contain functions for all of the basic math operators
// including: add, subtract, multiply, divide
    // I believe i will need to tie the function to each button, similar to what i did in the etch a sketch lesson
// create an operator function that takes an operator and 2 numbers and then calls one of the above functions on the numbers
// create a basic HTML calculator with buttons for each digit, each basic math operator, an equals key, and a clear 
    // focus on this before doing the JS
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

function updateDisplay() {
    const display = document.querySelector('.calc-input');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.bottom-calc');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if(!target.matches('button')) {
    return;
    }

    if(target.classList.contains('operator-button')) {
        handleOperator(target.value);
        updateDisplay();
    }

    if(target.classList.contains('clear')) {
        console.log('clear', target.value);
        return;
    }

    if(target.classList.contains('backspace')) {
        console.log('backspace', target.value);
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

function inputDigit(digit) {
    const { displayValue } = calculator;
    calculator.displayValue = displayValue === '0' ? digit:displayValue + digit;
    console.log(calculator);
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if(firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

// user input will be stored in this function and used later 
    // depending on the operator selected
// all inputs will be event listeners
// store numbers function

    // addition = function()

    // subtraction = function()

    // multiply = function()

    // divide = function()

// clear = function()

// backspace = function()