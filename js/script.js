let display = document.getElementById('calc-display');
let buttons = document.querySelectorAll('button');
// gambiarra para conseguir adicionar listeners aos botões não numéricos;
// o texto de um botão aponta para uma função específica que determinará a ação desse botão
// key - value => "texto do botão" - "função com ação do botão"
let nonNumericBtn = {
    "C": cleanDisplay,
    "=": calculate,
}

function cleanDisplay() {
    
}

function calculate() {

}

document.querySelector('#clear').addEventListener('click', function() {
    display.textContent = '';
})

buttons.forEach(function (btn) {
    let btnText = btn.textContent;
    console.log(btn);
})




// Implements keyboard assist for calculator
document.addEventListener('keydown', function(e) {
    let keyCode = e.key.toLowerCase();
    console.log(keyCode);
    // checks key pressed for numeric + operators
    if (keyCode.match('[0-9\-+*/.]')) {
        console.log(keyCode);
        let button; 
        buttons.forEach( function (btn) {
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

function simulateClick(button) {
    // This calls the event listener for the 
    // respective button
    button.click();

    // Simulates button click visually doing:
    // adds an custom class and removes it after 100
    // miliseconds (0.1s)
    button.classList.add('activeState');
    window.setTimeout(function() {
        button.classList.remove('activeState');        
    }, 100);
}