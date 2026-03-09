
function getValues() {
  var a = parseInt(document.getElementById('a').value);
  var b = parseInt(document.getElementById('b').value);
  return { a: a, b: b };
}

function calc(op) {
  var vals = getValues();
  var a = vals.a;
  var b = vals.b;
  var result;

  if (isNaN(a) || isNaN(b)) {
    result = "Please enter values for A and B";
  } else if (op === '+')   { result = a + b; }
  else if (op === '-')     { result = a - b; }
  else if (op === '*')     { result = a * b; }
  else if (op === '/')     { result = b !== 0 ? a / b : "Can't divide by zero"; }
  else if (op === 'and')   { result = a & b; }
  else if (op === 'or')    { result = a | b; }

  document.getElementById('result').textContent = result;
}
function calc(op) {
  var vals = getValues();
  var a = vals.a;
  var b = vals.b;
  var result;

  if (isNaN(a) || isNaN(b)) {
    result = "Please enter values for A and B";
  } else if (op === '+')   { result = a + b; }
  else if (op === '-')     { result = a - b; }
  else if (op === '*')     { result = a * b; }
  else if (op === '/')     { result = b !== 0 ? a / b : "Can't divide by zero"; }
  else if (op === 'and')   { result = a & b; }
  else if (op === 'or')    { result = a | b; }

  document.getElementById('result').textContent = result;
  console.log("Result: " + result);  // <-- add this
}