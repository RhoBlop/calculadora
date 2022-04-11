let display = document.getElementById('calc-display');
let buttons = document.querySelectorAll('button');
// gambiarra para conseguir adicionar listeners aos botões não numéricos;
// o texto de um botão aponta para uma função específica que determinará a ação desse botão
// key - value => "texto do botão" - "função com ação do botão"
let nonNumericBtn = {
    "C": cleanDisplay,
    "=": calculate,
}

// adds every button event listener
buttons.forEach(function (btn) {
    let btnText = btn.textContent;
    if (btnText.match('[0-9\-+*/.]')) {
        btn.addEventListener('click', function(e) {
            // refreshs the display with the button clicked
            display.textContent += btnText;
        });
    } else if (nonNumericBtn[btnText] !== undefined) {
        btn.addEventListener('click', nonNumericBtn[btnText]);
    }
})

function cleanDisplay() {
    // empties calc display
    display.textContent = '';
}
function calculate() {
    // evaluates current expression on calc display
    display.textContent = eval(display.textContent);
}


// Implements keyboard assist for calculator
document.addEventListener('keydown', function(e) {
    let keyCode = e.key.toLowerCase();
    console.log(keyCode);
    // checks key pressed for numeric + operators and simulates the button click
    if (keyCode.match('[0-9\-+*/.]')) {
        console.log(keyCode);
        let button; 
        buttons.forEach(function (btn) {
            if (btn.textContent === keyCode) {
                button = btn;
            }
        })
        simulateClick(button);

    // vários else if porque não achei uma lógica melhor
    } else if (keyCode === 'enter') {
        simulateClick(document.querySelector('#equals'));
    } else if (keyCode === 'escape') {
        simulateClick(document.querySelector('#clear'));
    } else if (keyCode === 'backspace') {
        // deletes last character from display
        display.textContent = display.textContent.slice(0, -1);
    }
})

function simulateClick(btn) {
    // This calls the event listener for the 
    // respective button
    btn.click();

    // Simulates button click visually by adding an custom class
    // and removing it after 100 miliseconds (0.1s)
    btn.classList.add('activeState');
    window.setTimeout(function() {
        btn.classList.remove('activeState');        
    }, 100);
}