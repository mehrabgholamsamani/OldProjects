/// this is the first tiny project i made when first time learning async,

const stocks = {
    flavor: ["strawberry" , "banana" , "apple"],
    holder: ["cone" , "cup"],
    toppings: ["choclate" , "sprinkles" , "fruits"]
}

function stepOne(){
    return new Promise(function(resolve,reject){
        let isAvailable = true;
        if(isAvailable){
            setTimeout(() => {resolve("your ice cream flavor is " + stocks.flavor[0])} , 2000);
        }else{
            reject("we dont have this flavor");
        }
    })
}

function stepTwo(flavored){
    return new Promise(function(resolve , reject){
        let isAvailable = true;
        if(isAvailable){
            setTimeout( () => {resolve(flavored + " and its in a " + stocks.holder[1])} , 1000)
        }else{
            reject("we dont have this holder");
        }
    })
}
