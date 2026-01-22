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
let data = 0;

///////NUMBERS///////////
elements.num1.onclick = function(){
    show += "1";
    elements.display.textContent = show;
};
elements.num2.onclick = function(){
    show += "2";
    elements.display.textContent = show;
};
elements.num3.onclick = function(){
    show += "3";
    elements.display.textContent = show;
};
elements.num4.onclick = function(){
    show += "4";
    elements.display.textContent = show;
};
elements.num5.onclick = function(){
    show += "5";
    elements.display.textContent = show;
};
elements.num6.onclick = function(){
    show += "6";
    elements.display.textContent = show;
};
elements.num7.onclick = function(){
    show += "7";
    elements.display.textContent = show;
};
elements.num8.onclick = function(){
    show += "8";
    elements.display.textContent = show;
};
elements.num9.onclick = function(){
    show += "9";
    elements.display.textContent = show;
};
elements.num0.onclick = function(){
    show += "0";
    elements.display.textContent = show;
};

//////FUNCTIONS////////
elements.plus.onclick = function(){
    show += "+";
    elements.display.textContent = show;
};
elements.minus.onclick = function(){
    show += "−";
    elements.display.textContent = show;
};
elements.multiplication.onclick = function(){
    show += "×";
    elements.display.textContent = show;
};
elements.division.onclick = function(){
    show += "÷";
    elements.display.textContent = show;
};
/////////////////////////////////
elements.clear.onclick = function(){
    show = "";
    elements.display.textContent = show;
};
/////////////////////////////////

elements.equal.onclick = function(){
    let numberList = [];
    let char = 0;
    for(let i = 0; i < show.length; i++){
        if(show.charAt(i) === '+'){
            numberList.push(parseInt( show.slice(char , i ) ));
            numberList.push('+');
            char = i + 1;
        }

        if(show.charAt(i) === '−'){
            numberList.push(parseInt( show.slice(char , i ) ));
            numberList.push('−');
            char = i + 1 ;
        }

        if(show.charAt(i) === '×'){
            numberList.push(parseInt( show.slice(char , i ) ));
            numberList.push('×');
            char = i + 1;
        }

        if(show.charAt(i) === '÷'){
            numberList.push(parseInt( show.slice(char , i ) ));
            numberList.push('÷');
            char = i + 1;
        }
        

    }
    numberList.push(parseInt(show.slice(char , show.length)));

    for (let i = 0; i < numberList.length; i++) {
        if (numberList[i] === '×') {
            numberList[i - 1] = numberList[i - 1] * numberList[i + 1];
            numberList = numberList.filter((_, index) => index !== i && index !== i + 1);
            i--;
        }
        if (numberList[i] === '÷') {
            numberList[i - 1] = numberList[i - 1] / numberList[i + 1];
            numberList = numberList.filter((_, index) => index !== i && index !== i + 1);
            i--;
        }
    }
    console.log(numberList)
};

