
function getValues() {
  var number1 = parseInt(document.getElementById('a').value);
  var number2 = parseInt(document.getElementById('b').value);
  return { a: number1, b: number2 };
}

function calc(operator) {
  var values = getValues();
  var number1 = values.a;
  var number2 = values.b;
  var result;

  if (isNaN(number1) || isNaN(number2)) {
    result = "Please enter values for A and B";
  } else if (operator === '+')   { result = number1 + number2; }
  else if (operator === '-')     { result = number1 - number2; }
  else if (operator === '*')     { result = number1 * number2; }
  else if (operator === '/')     { result = number2 !== 0 ? number1 / number2 : "Can't divide by zero"; }
  else if (operator === 'and')   { result = number1 & number2; }
  else if (operator === 'or')    { result = number1 | number2; }

  document.getElementById('result').textContent = result;
}
function calc(operator) {
  var values = getValues();
  var number1 = values.a;
  var number2 = values.b;
  var result;

  if (isNaN(number1) || isNaN(number2)) {
    result = "Please enter values for A and B";
  } else if (operator === '+')   { result = number1 + number2; }
  else if (operator === '-')     { result = number1 - number2; }
  else if (operator === '*')     { result = number1 * number2; }
  else if (operator === '/')     { result = number2 !== 0 ? number1 / number2 : "Can't divide by zero"; }
  else if (operator === 'and')   { result = number1 & number2; }
  else if (operator === 'or')    { result = number1 | number2; }

  document.getElementById('result').textContent = result;
  console.log("Result: " + result);  // <-- add this
}