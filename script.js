let btn = document.querySelector("form button");
let amount = document.querySelector(".amount input");
let exc_data = document.getElementsByClassName("ex_data")[0];

let selects = document.querySelectorAll("select");
for(let select of selects){
    for(let currCode in countryList){        
        let newOp = document.createElement("option");
        newOp.innerHTML = currCode;
        newOp.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOp.selected = true;
        }
        else if(select.name === "to" && currCode === "INR"){
            newOp.selected = true;
        }
        select.appendChild(newOp);
    }
    select.addEventListener("change", (e)=>{
        updateFlag(e.target)
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// to wala select
let sel_to = document.getElementsByName("to");
let sel_to_value = sel_to[0].value;
sel_to[0].addEventListener("change", ()=>{
    sel_to_value = sel_to[0].value;
})

//from wala select
btn.addEventListener("click", async (e)=>{
    e.preventDefault();
    let select = document.querySelector("select");
    let sel_val = select.value;
    let exc_rate = await api(sel_val, sel_to_value);
    exc_data.innerHTML = `${amount.value} ${selects[0].value} = ${amount.value*exc_rate.toFixed(2)} ${selects[1].value}`;
})

let swap = document.getElementById("swap");
swap.addEventListener("click", (e)=>{
    let temp_value = selects[0].value;
    selects[0].value = selects[1].value;
    selects[1].value = temp_value;
    sel_to_value = selects[1].value;
    updateFlag(selects[0]);
    updateFlag(selects[1]);
})

let api = async function(sel_val, sel_to_value){
    const url = await fetch(`https://open.er-api.com/v6/latest/${sel_val}`);
    const data = await url.json();
    return data.rates[sel_to_value];
}
