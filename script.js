class Simbol{
    constructor(naziv){
        this.naziv = naziv;
        this.provereno = false;
    }
}

const simboli = ["karo","pik", "zvezda", "srce", "tref","skocko"];
let odigrano = [];
let brojPoteza = brProvere = 1;
let kombinacija = nasumicnaKombinacija();
let krajIgre = false;

function ispisSimbola() {
    let e = document.getElementById("simboli");
    e.innerHTML = "";
    for (let i = 0; i < simboli.length; i++) {
        e.innerHTML += `
            <div id="${simboli[i]}" onclick='potez(this)'>
                <img src='img/${simboli[i]}.png'/>
            </div>
        `
    }
}

function ispisPolja() {
    let e = document.getElementById("ciklusi");
    let brPolja = 1;
    let brProvera = 1;
    e.innerHTML = "";

    for (let i = 0; i < 6; i++) {

        for (let j = 0; j < 4; j++) {
            e.innerHTML += `<div class="polje" id='polje${brPolja}'></div>`; 
            brPolja ++;  
        }
        for (let j = 0; j < 4; j++) {
            e.innerHTML += `<div class="provera" id='provera${brProvera}'></div>`;
            brProvera ++;
        }
    }
}

function ispisRezultata() {
    let e = document.getElementById("resenje");
    e.innerHTML ="";
    for (let i = 0; i < 4; i++) {
        e.innerHTML += `
            <div id='resenje${i}'></div>
        `      
    }
}

function nasumicnaKombinacija() {
    let kom = [];
    for (let i = 0; i < 4; i++) {
        let br = Math.ceil(Math.random()*60);
        if      ( br <= 10) kom[i] = new Simbol("karo");
        else if (br <=20) kom[i] = new Simbol("pik"); 
        else if (br <=30) kom[i] = new Simbol("srce");
        else if (br <=40) kom[i] = new Simbol("skocko");
        else if (br <=50) kom[i] = new Simbol("tref");
        else             kom[i] = new Simbol("zvezda");     
    }
    return kom;
}

function potez(e) {
    if(!krajIgre){
    odigrano.push(new Simbol(e.id));
    let el = document.getElementById(`polje${brojPoteza}`);
    el.innerHTML += `<img src='img/${e.id}.png' />`;
    if (brojPoteza % 4 == 0){
        proveraKombinacije();
    }
    brojPoteza ++;
    }
}

function proveraKombinacije() {
    let naMestu = 0;
    let postoje = 0;

    for (let i = 0; i < 4; i++) {
        if(odigrano[i].naziv == kombinacija[i].naziv) {
            odigrano[i].provereno = true;
            kombinacija[i].provereno = true;
            naMestu ++;
        }
        else{
            kombinacija[i].provereno = false;
        }
    }

    for (let i = 0; i < 4; i++) {
        if(kombinacija[i].provereno == false){
            for (let j = 0; j < 4; j++) {
                if(kombinacija[i].naziv == odigrano[j].naziv && odigrano[j].provereno == false){
                    odigrano[j].provereno == true;
                    postoje ++;
                    break;
                }
            }
        } 
    }

    rezultatCiklusa(naMestu,postoje);
    odigrano = [];

    if(naMestu == 4 || brojPoteza == 24){
        ispisResenja();
        krajIgre = true;
    }
}

function rezultatCiklusa(naMestu, postoje) {
    for (let i = 0; i < naMestu; i++) {
        let e = document.getElementById(`provera${brProvere}`);
        e.style.backgroundColor = "red";
        brProvere ++;
    }
    for (let i = 0; i < postoje; i++) {
        let e = document.getElementById(`provera${brProvere}`);
        e.style.backgroundColor = "yellow";
        brProvere ++;
    }
    brProvere = brojPoteza + 1;
}

function ispisResenja() {
    for (let i = 0; i < 4; i++) {
        let e = document.getElementById(`resenje${i}`);
        e.innerHTML = `<img src='img/${kombinacija[i].naziv}.png'>`
    }
}

function start() {
    ispisSimbola();
    ispisPolja();
    ispisRezultata();
}

function restart() {
    odigrano = [];
    brojPoteza = brProvere = 1;
    kombinacija = nasumicnaKombinacija();
    krajIgre = false;
    start();
}

start();