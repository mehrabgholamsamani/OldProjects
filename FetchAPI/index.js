const url = 'https://catfact.ninja/fact' ;

async function getData(){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
}

getData();