const elements = {
    ///DISPLAY///
    display: document.getElementById("display"),
    ///NUMBERS///
    num1: document.getElementById("num1"),
    num2: document.getElementById("num2"),
    num3: document.getElementById("num3"),
    num4: document.getElementById("num4"),
    num5: document.getElementById("num5"),
    num6: document.getElementById("num6"),
    num7: document.getElementById("num7"),
    num8: document.getElementById("num8"),
    num9: document.getElementById("num9"),
    num0: document.getElementById("num0"),
    dot: document.getElementById("dot"),
    ////FUNCTIONS////
    backspace: document.getElementById("backspace"),
    clear: document.getElementById("clear"),
    plus: document.getElementById("plus"),
    minus: document.getElementById("minus"),
    multiplication: document.getElementById("multiplication"),
    division: document.getElementById("division"),
    equal: document.getElementById("equal"),
};

///////DATA/////////////
let show = "";
let canUseDot = false;

const operators = ["+", "−", "×", "÷"];

function updateDisplay() {
    elements.display.textContent = show === "" ? "0" : show;
}

function lastChar() {
    return show.charAt(show.length - 1);
}

function isOperator(ch) {
    return operators.includes(ch);
}

function addOperator(op) {
    if (show === "") return;

    const last = lastChar();

    if (isOperator(last) || last === ".") {
        show = show.slice(0, -1) + op;
    } else {
        show += op;
    }

    canUseDot = false;
    updateDisplay();
}

function backspaceOne() {
    if (show.length === 0) return;
    show = show.slice(0, -1);

    let j = show.length - 1;
    while (j >= 0 && !isOperator(show[j])) j--;
    const chunk = show.slice(j + 1);
    canUseDot = chunk.length > 0 && !chunk.includes(".");

    updateDisplay();
}

function clearAll() {
    show = "";
    canUseDot = false;
    updateDisplay();
}

///////NUMBERS///////////
elements.num1.onclick = function(){
    show += "1";
    elements.display.textContent = show;
    canUseDot = true;
};
elements.num2.onclick = function(){
    show += "2";
    elements.display.textContent = show;
    canUseDot = true;
};
elements.num3.onclick = function(){
    show += "3";
    elements.display.textContent = show;
    canUseDot = true;
};
elements.num4.onclick = function(){
    show += "4";
    elements.display.textContent = show;
    canUseDot = true;
};
elements.num5.onclick = function(){
    show += "5";
    elements.display.textContent = show;
    canUseDot = true;
};
elements.num6.onclick = function(){
    show += "6";
    elements.display.textContent = show;
    canUseDot = true;
};
elements.num7.onclick = function(){
    show += "7";
    elements.display.textContent = show;
    canUseDot = true;
};
elements.num8.onclick = function(){
    show += "8";
    elements.display.textContent = show;
    canUseDot = true;
};
elements.num9.onclick = function(){
    show += "9";
    elements.display.textContent = show;
    canUseDot = true;
};
elements.num0.onclick = function(){
    show += "0";
    elements.display.textContent = show;
    canUseDot = true;
};

elements.dot.onclick = function(){
    if(canUseDot){
        show += ".";
        elements.display.textContent = show;
    }
    canUseDot = false;
};

elements.backspace.onclick = function () {
    backspaceOne();
};

//////FUNCTIONS////////
elements.plus.onclick = function(){
    addOperator("+");
};
elements.minus.onclick = function(){
    addOperator("−");
};
elements.multiplication.onclick = function(){
    addOperator("×");
};
elements.division.onclick = function(){
    addOperator("÷");
};

/////////////////////////////////
elements.clear.onclick = function(){
    show = "";
    elements.display.textContent = show;
    canUseDot = false;
};
/////////////////////////////////

document.addEventListener("keydown", (e) => {
    const k = e.key;

    if (k >= "0" && k <= "9") {
        show += k;
        updateDisplay();
        canUseDot = true;
        return;
    }

    if (k === "." || k === ",") {
        if (canUseDot) {
            show += ".";
            updateDisplay();
            canUseDot = false;
        }
        return;
    }

    if (k === "+") return addOperator("+");
    if (k === "-") return addOperator("−");
    if (k === "*" || k.toLowerCase() === "x") return addOperator("×");
    if (k === "/") return addOperator("÷");

    if (k === "Enter" || k === "=") {
        e.preventDefault();
        elements.equal.click();
        return;
    }

    if (k === "Backspace") {
        e.preventDefault();
        backspaceOne();
        return;
    }

    if (k === "Escape") {
        clearAll();
        return;
    }
});

elements.equal.onclick = function(){
    if (show === "") { updateDisplay(); return; }
    while (show.length && (isOperator(lastChar()) || lastChar() === ".")) {
        show = show.slice(0, -1);
    }
    if (show === "") { updateDisplay(); return; }

    let numberList = [];
    let char = 0;

    for(let i = 0; i < show.length; i++){
        if(show.charAt(i) === '+'){
            numberList.push(parseFloat(show.slice(char , i)));
            numberList.push('+');
            char = i + 1;
        }
        if(show.charAt(i) === '−'){
            numberList.push(parseFloat(show.slice(char , i)));
            numberList.push('−');
            char = i + 1;
        }
        if(show.charAt(i) === '×'){
            numberList.push(parseFloat(show.slice(char , i)));
            numberList.push('×');
            char = i + 1;
        }
        if(show.charAt(i) === '÷'){
            numberList.push(parseFloat(show.slice(char , i)));
            numberList.push('÷');
            char = i + 1;
        }
    }

    numberList.push(parseFloat(show.slice(char)));

    for (let i = 0; i < numberList.length; i++) {
        if (numberList[i] === '×') {
            numberList[i - 1] = numberList[i - 1] * numberList[i + 1];
            numberList = numberList.filter((_, index) => index !== i && index !== i + 1);
            i--;
            continue;
        }
        if (numberList[i] === '÷') {
            if (numberList[i + 1] === 0) {
                show = "Cannot divide by zero";
                canUseDot = false;
                updateDisplay();
                return;
            }
            numberList[i - 1] = numberList[i - 1] / numberList[i + 1];
            numberList = numberList.filter((_, index) => index !== i && index !== i + 1);
            i--;
            continue;
        }
    }

    for (let i = 0; i < numberList.length; i++) {
        if (numberList[i] === '+') {
            numberList[i - 1] = numberList[i - 1] + numberList[i + 1];
            numberList = numberList.filter((_, index) => index !== i && index !== i + 1);
            i--;
            continue;
        }
        if (numberList[i] === '−') {
            numberList[i - 1] = numberList[i - 1] - numberList[i + 1];
            numberList = numberList.filter((_, index) => index !== i && index !== i + 1);
            i--;
            continue;
        }
    }

    if (!Number.isFinite(numberList[0])) {
        show = "Error";
        canUseDot = false;
        updateDisplay();
        return;
    }

    elements.display.textContent = numberList[0];
    show = numberList[0].toString();
    canUseDot = show !== "" && !show.includes(".");
};
