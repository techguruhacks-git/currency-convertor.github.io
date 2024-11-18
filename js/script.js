const list = document.querySelectorAll(".drop-list select"),
currency1 = document.querySelector(".currency1 select"),
currency2 = document.querySelector(".currency2 select"),
btn = document.querySelector("form button");

for(let i = 0; i < list.length; i++){
    for(currency_code in country_code){
        let selected;
        if(i == 0 ){
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if(i == 1){
            selected = currency_code == "INR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        list[i].insertAdjacentHTML("beforeend", optionTag);
    }
    list[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}
function loadFlag(element){
for(code in country_code){
    if(code  == element.value){
        let imgTag = element.parentElement.querySelector("img");
        imgTag.src = `https://flagsapi.com/${country_code[code]}/shiny/64.png`
    }
}
}
window.addEventListener("load", () =>{
    getExchangeRate();
});
btn.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate(){
    const price = document.querySelector(".price input"),
    exchangerateTXT = document.querySelector(".exchange-rate");
    let priceVal = price.value;
    if(priceVal == "" || priceVal == "0"){
        price.value = "1";
        priceVal = 1;
    }
    exchangerateTXT.innerText = "Getting Exchange Rate..."
    let url = `https://v6.exchangerate-api.com/v6/491bb8cc0773f72238fcd293/latest/${currency1.value}`;
    fetch(url).then(Response => Response.json()).then(result =>{
        let exchangerate = result.conversion_rates[currency2.value];
        let totalExchangerate = (priceVal * exchangerate).toFixed(2);
        exchangerateTXT.innerHTML = `${priceVal} ${currency1.value} = ${totalExchangerate} ${currency2.value}`
    });
}