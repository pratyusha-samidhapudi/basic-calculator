// DOM Elements

const valueElement = document.querySelector('.value');

const ac = document.querySelector('.ac');
const plusMinus = document.querySelector('.plusMinus');
const percent = document.querySelector('.percent');

const addition = document.querySelector('.addition');
const subtraction = document.querySelector('.subtraction');
const multiplication = document.querySelector('.multiplication');
const division = document.querySelector('.division');
const equal = document.querySelector('.equal');

const decimal = document.querySelector('.decimal');
const digit0 = document.querySelector('.number-0');
const digit1 = document.querySelector('.number-1');
const digit2 = document.querySelector('.number-2');
const digit3 = document.querySelector('.number-3');
const digit4 = document.querySelector('.number-4');
const digit5 = document.querySelector('.number-5');
const digit6 = document.querySelector('.number-6');
const digit7 = document.querySelector('.number-7');
const digit8 = document.querySelector('.number-8');
const digit9 = document.querySelector('.number-9');
const numbersArray = [
    digit0, digit1, digit2, digit3, digit4,
    digit5, digit6, digit7, digit8, digit9
];


// variables
let valueStrInMemory = null;
let operatorInMemory = null;


// Functions

//Gets rid of commas in string
const getValueAsString = () => valueElement.textContent.split(',').join('');

const getValueAsNumber = () => {
  return parseFloat(getValueAsString());
};

//sets the value as string
const setStringAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === '.') {
    valueElement.textContent += '.';
    return;
  }

  const [wholeNumberString, decimalString] = valueStr.split('.');
  if (decimalString) {
    valueElement.textContent = parseFloat(wholeNumberString).toLocaleString() + '.' + decimalString;
  } else {
    valueElement.textContent = parseFloat(wholeNumberString).toLocaleString();
  }
};

const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsString();
  if (currentValueStr === '0') {
    setStringAsValue(numStr);
  } else {
    setStringAsValue(currentValueStr + numStr);
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNumber();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === 'addition') {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === 'subtraction') {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === 'multiplication') {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === 'division') {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsString();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStringAsValue('0');
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStringAsValue('0');
};

// Add Event Listeners to functions
ac.addEventListener('click', () => {
  setStringAsValue('0');
  valueStrInMemory = null;
  operatorInMemory = null;
});
plusMinus.addEventListener('click', () => {
  const currentValueNum = getValueAsNumber();
  const currentValueStr = getValueAsString();

  if (currentValueStr === '-0') {
    setStringAsValue('0');
    return;
  }
  if (currentValueNum >= 0) {
    setStringAsValue('-' + currentValueStr);
  } else {
    setStringAsValue(currentValueStr.substring(1));
  }
});
percent.addEventListener('click', () => {
  const currentValueNum = getValueAsNumber();
  const newValueNum = currentValueNum / 100;
  setStringAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});


// add event listeners to operators
addition.addEventListener('click', () => {
  handleOperatorClick('addition');
});
subtraction.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});
multiplication.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});
division.addEventListener('click', () => {
  handleOperatorClick('division');
});
equal.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStringAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});


// Adding Event Listeners to the numbers(0-9) and the decimal
for (let i=0; i < numbersArray.length; i++) {
  const numberElement = numbersArray[i];
  numberElement.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
}
decimal.addEventListener('click', () => {
  const currentString = getValueAsString();
  if (!currentString.includes('.')) {
    setStringAsValue(currentString + '.');
  }
});

