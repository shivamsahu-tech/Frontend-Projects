let boxes = document.querySelectorAll(".boxes");
let restart = document.querySelector("#restart");
let play_again = document.querySelector("#play-again");
let result = document.querySelector("#result")

let s1 = document.querySelector("#s1")
let s2 = document.querySelector("#s2")

let score_p1 = 0;
let score_p2 = 0;

name_p1 = localStorage.getItem("name_p1");
name_p2 = localStorage.getItem("name_p2");

document.querySelector("#name_p1").innerText = name_p1;
document.querySelector("#name_p2").innerText = name_p2;

let p1_border = document.querySelector("#p1-board");
let p2_border = document.querySelector("#p2-board");

p1_border.style.borderColor = "rgb(252, 164, 0)";
let x = "X";
let o = "O";

let count = 0;

let curr_player = x;

let space = [null, null, null, null, null, null, null, null, null]

let win_combo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function update_score(){
    s1.innerText = score_p1;
    s2.innerText = score_p2;
}

function reslt(res, combi){
    var name = res == x ? name_p1 : name_p2 
    result.innerText = `${name} won the Match`
    if(res == x) score_p1++;
    else score_p2++;
    update_score();
    for(let idx of combi){
        boxes[idx].style.color = "green";
    }
}

function draw(){
    result.innerText = `Match Draw`;
    count = 0;
}

function hasWin() {
    for(let combi of win_combo){
        let [a, b, c] = combi;
        if(space[a] != 0 && space[a] !== null && (space[a] == space[b] && space[a] == space[c])){
            reslt(space[a],combi);
            return true;
        }
    }
    return false;
}

boxes.forEach(element => {
    element.addEventListener("click", () => {
        let id = element.getAttribute("id");
        if(space[id] == null) {
            count++;
            changeBorder();
            space[id] = curr_player;
            element.innerText = curr_player;
            curr_player = (curr_player == x) ? o : x ;
        }  
        if(count == 9) draw();
        if(hasWin()){
            space.fill(0);
        }
    })
});

function again() {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.color = "#FA9500"
    })
    initial();  
}

play_again.onclick = () => {
    again();
}
    
restart.onclick = () => {
    again();
    score_p1 = 0;
    score_p2 = 0;
    update_score();
}

function changeBorder() {
    if(curr_player == o){
        p1_border.style.borderColor = "rgb(252, 164, 0)";
        p2_border.style.borderColor = "#8499B1";
    }
    else {
        p2_border.style.borderColor = "rgb(252, 164, 0)";
        p1_border.style.borderColor = "#8499B1";
    }
}

function initial(){
    document.querySelector("#p1-board").style.borderColor = "rgb(252, 164, 0)";
    document.querySelector("#p2-board").style.borderColor = "#8499B1";
    result.innerText = "";
    space.fill(null);
    curr_player = x;
    count = 0;
}
