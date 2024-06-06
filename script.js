document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const value = button.getAttribute('data-value');

            if (action === 'clear') {
                clearDisplay();
            } else if (action === 'delete') {
                deleteLast();
            } else if (action === 'calculate') {
                calculateResult();
            } else if (value) {
                appendToDisplay(value);
            }
        });
    });

    function clearDisplay() {
        display.value = '';
    }

    function deleteLast() {
        display.value = display.value.slice(0, -1);
    }

    function appendToDisplay(value) {
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
        try {
            display.value = eval(display.value.replace(/%/g, '/100'));
            if (display.value === 'Infinity' || display.value === '-Infinity') {
                display.value = 'Error';
            }
        } catch (e) {
            display.value = 'Error';
        }
    }
});
