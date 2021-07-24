"use strict"

const right = document.getElementById('ri-img');
const middle = document.getElementById('mi-img');
const left = document.getElementById('le-img');

const maxAtt = 25;
let counter = 0;
let votesArr = [];
let viewsArr = [];

function Final(names, source) {
    this.names = names;
    this.source = source;
    this.votes=0;
    this.views=0;

    Final.golbArr.push(this);
}
Final.golbArr = [];
new Final('bag', 'img/bag.jpg');
new Final('banana', 'img/banana.jpg');
new Final('bathroom', 'img/bathroom.jpg');
new Final('boots', 'img/boots.jpg');
new Final('breakfast', 'img/breakfast.jpg');
new Final('bubblegum', 'img/bubblegum.jpg');
new Final('chair', 'img/chair.jpg');
new Final('cthulhu', 'img/cthulhu.jpg');
new Final('dog-duck', 'img/dog-duck.jpg');
new Final('dragon', 'img/dragon.jpg');
new Final('pen', 'img/pen.jpg');
new Final('pet-sweep', 'img/pet-sweep.jpg');
new Final('scissors', 'img/scissors.jpg');
new Final('shark', 'img/shark.jpg');
new Final('sweep', 'img/sweep.png');
new Final('tauntaun', 'img/tauntaun.jpg');
new Final('unicorn', 'img/unicorn.jpg');
new Final('water-can', 'img/water-can.jpg');
new Final('wine-glass', 'img/wine-glass.jpg');

console.log(Final.golbArr);

function geneRand() {
    return Math.floor(Math.random() * Final.golbArr.length);

}

let rightIndex;
let middleIndex;
let leftIndex;

function renderImg() {
    rightIndex = geneRand();
    middleIndex = geneRand();
    leftIndex = geneRand();

    while (leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex) {
        leftIndex = geneRand();
        middleIndex = geneRand();
        rightIndex = geneRand();
    }

    right.src = Final.golbArr[rightIndex].source;
    Final.golbArr[rightIndex].views++;

    middle.src = Final.golbArr[middleIndex].source;
    Final.golbArr[middleIndex].views++;

    left.src = Final.golbArr[leftIndex].source;
    Final.golbArr[leftIndex].views++;

}
renderImg();

let section = document.getElementById("first");
section.addEventListener("click", handelClick);
let btnE;
function handelClick(event) {
    counter++;
    if (maxAtt > counter) {
        if (event.target.id === 'le-img') {
            Final.golbArr[leftIndex].votes++;
        } else if (event.target.id === 'mi-img') {
            Final.golbArr[middleIndex].votes++;
        } else if (event.target.id === 'ri-img') {
            Final.golbArr[rightIndex].votes++;
        } else {
            counter--;
            return
        }
        renderImg();

    } else {
        btnE = document.getElementById('btn');
        btnE.addEventListener("click", handelShow);
        section.removeEventListener("click", handelClick);
    }

}

function handelShow() {

    renderList();
    btnE.removeEventListener("click", handelShow);
}


function renderList() {

    const ul = document.getElementById("unlist");
    for (let i = 0; i < Final.golbArr.length; i++) {
        viewsArr.push(Final.golbArr[i].views);
        votesArr.push(Final.golbArr[i].votes);
        let li = document.createElement("li");
        ul.appendChild(li);
        li.textContent = `${Final.golbArr[i].names} had ${Final.golbArr[i].votes} votes, and was seen ${Final.golbArr[i].views} times. `

    }
    saveTool();


}

function saveTool(){
    const convertedArr = JSON.stringify(Final.golbArr);
    localStorage.setItem('unList', convertedArr);
}

function getFromLs(){

    let data = localStorage.getItem("unList");
    if (data){
        let parsData = JSON.parse(data);
        Final.golbArr = parsData;

    }
}
getFromLs()

let parent = document.getElementById('second');
let tableElem = document.createElement('table');
parent.appendChild(tableElem);
