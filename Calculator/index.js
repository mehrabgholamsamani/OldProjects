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
    ////FUNCTIONS////
    clear: document.getElementById("clear"),
    plus: document.getElementById("plus"),
    minus: document.getElementById("minus"),
    multiplication: document.getElementById("multiplication"),
    division: document.getElementById("division"),
    equal: document.getElementById("equal"),
}
///////DATA/////////////
let show = "";
let result = "";
let data = 0;

///////NUMBERS///////////
elements.num1.onclick = function(){
    result += "1";
    show += "1";
    elements.display.textContent = show;
};
elements.num2.onclick = function(){
    result += "2";
    show += "2";
    elements.display.textContent = show;
};
elements.num3.onclick = function(){
    result += "3";
    show += "3";
    elements.display.textContent = show;
};
elements.num4.onclick = function(){
    result += "4";
    show += "4";
    elements.display.textContent = show;
};
elements.num5.onclick = function(){
    result += "5";
    show += "5";
    elements.display.textContent = show;
};
elements.num6.onclick = function(){
    result += "6";
    show += "6";
    elements.display.textContent = show;
};
elements.num7.onclick = function(){
    result += "7";
    show += "7";
    elements.display.textContent = show;
};
elements.num8.onclick = function(){
    result += "8";
    show += "8";
    elements.display.textContent = show;
};
elements.num9.onclick = function(){
    result += "9";
    show += "9";
    elements.display.textContent = show;
};
elements.num0.onclick = function(){
    result += "0";
    show += "0";
    elements.display.textContent = show;
};

//////FUNCTIONS////////
elements.clear.onclick = function(){
    data = 0;
    result = "";
    show = "";
    elements.display.textContent = show;
};
elements.plus.onclick = function(){
    data += parseInt(result);
    result = "";
    show += "+";
    elements.display.textContent = show;
};
elements.minus.onclick = function(){
    data -= parseInt(result);
    show += "-";
    elements.display.textContent = show;
};
elements.multiplication.onclick = function(){
    data *= parseInt(result);
    show += "×";
    elements.display.textContent = show;
};
elements.division.onclick = function(){
    data /= parseInt(result);
    show += "÷";
    elements.display.textContent = show;
};
elements.equal.onclick = function(){
    show = "";
    result = "";
    elements.display.textContent = data;
};

