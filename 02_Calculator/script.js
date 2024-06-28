
let btn = document.querySelectorAll(".divbtn");
let eqn = document.querySelector("#eqn");
let ans = document.querySelector("#ans");
let res = "";
let ptr = -1;
let pointflag = 0;
btn.forEach(btn => {
    btn.addEventListener("click", () => {
        let str = btn.innerText;
        str = str.trim();
        if(str == "AC") ac();
        else if(str == "+/-") sign();
        else if(str == "=") ansr();
        else if(str == "%") percent();
        else {
            if(str == "+" || str == "-" || str == "*" || str == "/"){
                pointflag = 0;
                ptr = res.length;
                res += str;
                display(res);
            }
            else {
                if(str == "." && pointflag == 0){
                    pointflag = 1;
                    res += str;
                    display(res);
                }
                else if(str != "."){
                    res += str;
                    display(res);
                }
            }
        }
    })
})

function ac() {
    res = "";
    ptr = -1;
    eqn.innerText = "";
    displayZero();
}

function displayZero(){
    ans.innerText = "0";
}


function sign(){
    let num = res.substring(ptr + 1, res.length);
    res = res.substring(0, ptr+1);
    res += "(-" + num + ")";
    display(res);
}

function percent(){
    pointflag = 1;
    let num = res.substring(ptr+1, res.length);
    res = res.substring(0, ptr+1);
    let n = parseInt(num);
    n = n/100;
    res += n.toString();
    display(res);
}

function display(){
    ans.innerText = res;
}

function ansr(){
    pointflag = 0;
    ptr = -1;
    eqn.innerText = res;
    ans.innerText = eval(res);
    res = eval(res).toString();

}