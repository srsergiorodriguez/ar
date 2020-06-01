let plane;
let cnv;
const res = 256;
const ratioW = 2; // The width proportion of the canvas
const ratioH = 2;
const canvasW = res*ratioW;
const canvasH = res*ratioH;
let t = 0;
let found = false;

let palettes = {
  a: {shapes:["#faff81","#ffc53a","#e06d06"],bg:"#161032"},
  b: {shapes:["#0496ff","#ffbc42","#d81159"],bg:"#161032"},
  c: {shapes:["#f4e3b2","#efc88b","#cf5c36"],bg:"#050517"},
  d: {shapes:["#FFF3B0","#E09F3E","#9E2A2B"],bg:"#335C67"},
  e: {shapes:["#DCED31","#0CCE6B","#EF2D56"],bg:"#363537"}
	};

let actual_palette;
let colors;

let fluids = [];
const fluidNames = ["Drip","Splat","Smudge","Blobby","Doodle"];

const a = new Aventura('es');
let grm = {
  base: ["<back>,<middle>,<front>"],
  back: ["<bs>,<bsa>,<bsb>,<bsb>"],
  middle: ["<ms>,<ms>,<ms>,<ms>"],
  front: ["<fs>,<fs>,<fs>,<fs>"],
  bs: ["Drip","Drip","Splat","None","None"],
  bsa: ["Splat","Splat","Drip","None","None","None"],
  bsb: ["Splat","None","None","None","None"],
  ms: ["Smudge","Smudge","Doodle","Doodle","Blobby","None","None"],
  fs: ["Blobby","Blobby","Doodle","None","None"]
}
a.setGrammar(grm);

function setup() {
  frameRate(8);
  angleMode(DEGREES);
  actual_palette = random(Object.keys(palettes));
  colors = palettes[actual_palette].shapes;

  plane = $('#plane');

  cnv = createCanvas(canvasW,canvasH);
  cnv.id('cnv');
  cnv.parent('#scene');
  cnv.hide()
	
  background(palettes[actual_palette].bg);

  const result = split(a.developGrammar('base'),",");
  let i = 0;
  for (let layer=0;layer<3;layer++) {
    for (let x=0;x<ratioW;x++) {
      for (let y=0;y<ratioH;y++) {
        const tempshape = result[i]; // random(fluidNames);
        i++;
        const size = res/2*(random()+0.3);
        const xpos = x*res+(res/2);
        const ypos = y*res+(res/2);
        createFluid(tempshape,size,xpos,ypos,random(colors));
      }
    }
  }
  plane.setAttribute('src',imageFromCanvas());
  $('#marker').addEventListener("markerFound",()=>{
    console.log("FOUND!!!!");
    found = true;
  })
  $('#marker').addEventListener("markerLost",()=>{
    console.log("LOST!!!!");
    found = false;
  })
}

function draw() {
  if (found) {
    background(palettes[actual_palette].bg);
    t+=1;
    if (t>400) {
      noLoop();
    }
    for (let i=0;i<fluids.length;i++) {
      if (i%9==0) {background(0,0,0,15)}
      displayFluid(fluids[i],t);
    }
    plane.setAttribute('src',imageFromCanvas());
  }
}

$ = (query) => document.querySelector(query);
function imageFromCanvas() {
  return $('#cnv').toDataURL('image/png',0.1);
}