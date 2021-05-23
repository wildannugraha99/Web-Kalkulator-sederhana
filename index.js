const kalkulator = {
    displayNumber:'0',
    operator:null,
    firstNumber:null,
    waitingSecondNumber:false
};

function updateDisplay(){
    document.getElementById('display-number').innerText= kalkulator.displayNumber;
}

function clearKalkulator(){
    kalkulator.displayNumber= '0';
    kalkulator.operator = null;
    kalkulator.firstNumber = null;
    kalkulator.waitingSecondNumber = false; 
}

function inputDigit(digit){
    if(kalkulator.displayNumber === '0'){
        kalkulator.displayNumber = digit;
    }else{
    kalkulator.displayNumber += digit;
    }
};

function negatifNumber(){
    if(kalkulator.displayNumber === '0'){
        return;
    }
    kalkulator.displayNumber = kalkulator.displayNumber * -1;
}

function handleOperator(operator){
    if(!kalkulator.waitingSecondNumber){
        kalkulator.operator = operator;
        kalkulator.waitingSecondNumber = true;
        kalkulator.firstNumber = kalkulator.displayNumber;
       
        kalkulator.displayNumber = '0'
    }else{
        alert ('Operator sudah ditetapkan!')
    }
}

function hasilHitung(){
    if(kalkulator.firstNumber == null || kalkulator == null){
        alert('Anda belum menetapkan operator');
        return;
    }
    let result = 0
    if(kalkulator.operator === '+'){
        result = parseInt(kalkulator.firstNumber) + parseInt(kalkulator.displayNumber);
    }else if(kalkulator.operator === '*'){
        result = parseInt(kalkulator.firstNumber) * parseInt(kalkulator.displayNumber);
    }else if(kalkulator.operator === '/'){
        result = parseInt(kalkulator.firstNumber) / parseInt(kalkulator.displayNumber);
    }else{
        result = parseInt(kalkulator.firstNumber) - parseInt(kalkulator.displayNumber);
    }

    const history = {
        firstNumber : kalkulator.firstNumber,
        secondNumber : kalkulator.displayNumber,
        operator : kalkulator.operator,
        result : result
    }
    putHistory(history);
    kalkulator.displayNumber = result;
    renderHistory();

}



const buttons = document.querySelectorAll('.button');
for(let button of buttons){
    button.addEventListener('click', function(event){
        const target = event.target; // mendapatkan objek element yang di klik
        if(target.classList.contains('clear')){
            clearKalkulator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('negative')){
            negatifNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')){
            hasilHitung();
            updateDisplay();
            return;
        }

        if(target.classList.contains('operator')){
            handleOperator(target.innerText);
            return;
        }
        
        inputDigit(target.innerText);
        updateDisplay();
    });
}

