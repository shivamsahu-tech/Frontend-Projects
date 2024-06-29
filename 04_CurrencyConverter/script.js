let list = document.querySelectorAll(".select");
let btn = document.querySelector("button");
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const URL = "https://v6.exchangerate-api.com/v6/88eb9db84cefe04a0d767166/latest/"

let flag = 0;

list.forEach((select) => {
    for (let code in countryList) {
        let country = document.createElement("option");
        country.innerText = code;
        country.setAttribute("value", countryList[code]);
        select.appendChild(country);
        if(flag === 0 && code === "USD"){
            country.selected = "selected";
            flag = 1;
        }
        else if (code === "INR" && flag === 1) {
            country.selected = "selected";
        }
    }
})

var fromCountry  = "USD";
var toCountry = "INR";

update(fromCountry, toCountry);

let selectedCountry = document.querySelectorAll('.select');

selectedCountry.forEach((select) => {
    select.addEventListener("change", () => {
        let id = select.getAttribute('id')
        let img = document.querySelector(`.${id}`)
            let code = select.options[select.selectedIndex];
            img.setAttribute("src", `https://flagsapi.com/${code.value}/flat/64.png` );
            if(select.getAttribute("id") === "from"){
                fromCountry = code.innerText;
            }
            else{
                toCountry = code.innerText;
            }
        })
})

let swap = document.querySelector('i');
swap.addEventListener('click', () => {
    let from = document.querySelector('#from')
    let to = document.querySelector('#to')

    let fromto = from.options[from.selectedIndex].value;
    let tempto = to.options[to.selectedIndex].value;
    from.value = tempto;
    to.value = fromto

    document.querySelector('#fromimg').setAttribute('src', `https://flagsapi.com/${tempto}/flat/64.png`);
    document.querySelector('#toimg').setAttribute('src', `https://flagsapi.com/${fromto}/flat/64.png`);


    fromCountry = from.options[from.selectedIndex].innerText;
    toCountry = to.options[to.selectedIndex].innerText;


})


btn.addEventListener("click", () => {
    update(fromCountry, toCountry)
});


async function update(fr, to){

    let fromAmt = document.querySelector("#amount");
    let amt = fromAmt.value;
    if(isNaN(amt)){
        alert("Enter valid Number!")
        amt = 1;
    }
    

    if(amt < 1 || amt === ""){
        amt = 1;
        fromAmt.value = "1";
    }

    let response = await fetch(URL+fr);
    let data = await response.json();
    let rate = data.conversion_rates[to]

    let toAmt = amt * rate;

    let msg = document.querySelector("#msg");
    msg.innerText = `${amt} ${fr} = ${toAmt} ${to}`;
}












