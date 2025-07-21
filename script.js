let currentInput = "0";
let calculationSequence = []; // Stores the complete calculation sequence
let shouldResetScreen = false;

const display = document.getElementById("display");

// Helper function to format the display string
function getDisplayString() {
  let displayStr = calculationSequence.join(" ");
  if (!shouldResetScreen && currentInput !== "0") {
    displayStr += " " + currentInput;
  }
  return displayStr.trim();
}

function appendNumber(number) {
  if (currentInput === "0" || shouldResetScreen) {
    currentInput = "";
    shouldResetScreen = false;
  }
  currentInput += number;
  display.textContent = getDisplayString();
}

function appendDecimal() {
  if (shouldResetScreen) {
    currentInput = "0.";
    shouldResetScreen = false;
  } else if (!currentInput.includes(".")) {
    currentInput += currentInput === "" ? "0." : ".";
  }
  display.textContent = getDisplayString();
}

function clearAll() {
  currentInput = "0";
  calculationSequence = [];
  shouldResetScreen = false;
  display.textContent = "0";
}

function backspace() {
  if (currentInput.length <= 1) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  display.textContent = getDisplayString();
}

function setOperation(operator) {
  if (currentInput !== "0" || calculationSequence.length > 0) {
    calculationSequence.push(currentInput);

    // If we already have an operation pending, calculate it first
    if (calculationSequence.length >= 3) {
      calculateIntermediate();
    }

    calculationSequence.push(operator);
    shouldResetScreen = true;
    display.textContent = getDisplayString();
  }
}

function calculateIntermediate() {
  try {
    const expression = calculationSequence
      .join(" ")
      .replace(/×/g, "*")
      .replace(/÷/g, "/");
    const result = eval(expression).toString();

    // Keep the result and continue with next operation
    calculationSequence = [result];
    currentInput = "0";
    shouldResetScreen = true;
  } catch (e) {
    clearAll();
    display.textContent = "Error";
  }
}

function calculate() {
  if (calculationSequence.length === 0) return;

  calculationSequence.push(currentInput);
  display.textContent = getDisplayString();

  setTimeout(() => {
    try {
      const expression = calculationSequence
        .join(" ")
        .replace(/×/g, "*")
        .replace(/÷/g, "/");
      const result = eval(expression).toString();

      currentInput = result;
      calculationSequence = [];
      shouldResetScreen = true;
      display.textContent = result;
    } catch (e) {
      clearAll();
      display.textContent = "Error";
    }
  }, 100);
}

function updateDisplay() {
  display.textContent = getDisplayString() || "0";
}
