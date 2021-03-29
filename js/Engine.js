import NG from "./NOISE.js";
import CA from "./Celular_Automaton.js";

let noise_density = localStorage.getItem("generator_density");
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let MAP_HEIGHT = canvas.height;
let MAP_WIDTH = canvas.width;
let TILE_SIZE = 20;
let TILEn_HOR = MAP_WIDTH / TILE_SIZE;
let TILEn_VERT = MAP_HEIGHT / TILE_SIZE;

let NoiseGen = new NG();
let Automaton = new CA(TILEn_HOR,TILEn_VERT);

alert("When page loads: Noise map generated \n Click 1: Apply celular automaton 8 iterations \n Click 2: Fill border \n Click 3: last iteration");

let map = NoiseGen.generate(TILEn_VERT,TILEn_HOR,noise_density);

drawMap();
Auto();

function drawMap() {
    console.log(map[0][0]);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,MAP_WIDTH,MAP_HEIGHT);

    ctx.fillStyle = "#000";
    let posY = 0;
    for (let i=0; i<map.length; i++){
        let row = map[i];
        let posX = 0;
        for (let j=0; j<row.length; j++){
            if (row[j] == 0){
                ctx.fillRect(posX,posY,TILE_SIZE,TILE_SIZE);
            }
            posX += TILE_SIZE;
        }
        posY += TILE_SIZE;
    }
}

function* Auto() {
    for (let i=0; i<8; i++){
        map = Automaton.iterate(map);
    }
    drawMap();
    yield;
    for (let i=0; i<map[0].length; i++){
        map[0][i] = 0;
        map[map.length-1][i] = 0;
    }
    for (let i=0; i<map.length; i++){
        map[i][0] = 0;
        map[i][map[0].length-1] = 0;
    }
    drawMap();
    yield;
    map = Automaton.iterate(map);
    drawMap();
}
let gen = Auto();

canvas.addEventListener("click", ()=>{
    gen.next();
});