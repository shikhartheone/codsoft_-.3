// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const equationDisplay = document.getElementById('equation');
    const previousResultsDisplay = document.getElementById('previous-results');
    const buttons = document.querySelectorAll('.btn');
    const themeSwitch = document.getElementById('theme-switch');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let currentEquation = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.id === 'clear') {
                clearCalculator();
            } else if (button.id === 'backspace') {
                handleBackspace();
            } else if (button.id === 'equals') {
                handleEquals();
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else {
                handleDigit(value);
            }
        });
    });

    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });

    function clearCalculator() {
        currentInput = '';
        operator = '';
        previousInput = '';
        currentEquation = '';
        display.innerText = '0';
        equationDisplay.innerText = '';
    }

    function handleBackspace() {
        if (currentInput) {
            currentInput = currentInput.slice(0, -1);
            display.innerText = currentInput || '0';
            equationDisplay.innerText = currentEquation + currentInput;
        }
    }

    function handleEquals() {
        if (currentInput && previousInput && operator) {
            currentEquation += currentInput;
            currentInput = evaluate(previousInput, currentInput, operator);
            display.innerText = currentInput;
            operator = '';
            previousInput = '';
            equationDisplay.innerText = '';
            addPreviousResult(currentEquation + ' = ' + currentInput);
            currentEquation = '';
        }
    }

    function handleOperator(value) {
        if (value === '+/-') {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) * -1).toString();
                display.innerText = currentInput;
            }
        } else if (currentInput) {
            if (previousInput && operator) {
                previousInput = evaluate(previousInput, currentInput, operator);
                display.innerText = previousInput;
            } else {
                previousInput = currentInput;
            }
            operator = value;
            currentEquation += currentInput + ' ' + operator + ' ';
            currentInput = '';
        }
    }

    function handleDigit(value) {
        currentInput += value;
        display.innerText = currentInput;
        equationDisplay.innerText = currentEquation + currentInput;
    }

    function evaluate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            case '%':
                return ((a / b) * 100).toString();
            default:
                return '';
        }
    }

    function addPreviousResult(result) {
        const resultElement = document.createElement('div');
        resultElement.innerText = result;
        previousResultsDisplay.prepend(resultElement);
    }
});
