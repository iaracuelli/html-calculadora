function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    let display = document.getElementById('display');
    // Prevent multiple operators in a row
    if (/[+\-*/%]$/.test(display.value) && /[+\-*/%]/.test(value)) {
        return;
    }
    // Prevent multiple decimals in a single number
    if (value === '.' && display.value.split(/[-+*/%]/).pop().includes('.')) {
        return;
    }
    display.value += value;
}

function calculateResult() {
    let display = document.getElementById('display');
    try {
        display.value = eval(display.value.replace(/%/g, '/100'));
        if (display.value === 'Infinity' || display.value === '-Infinity') {
            display.value = 'Error';
        }
    } catch (e) {
        display.value = 'Error';
    }
}
