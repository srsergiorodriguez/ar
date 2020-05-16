let cnv;
let plane;

let x = 0;
function setup() {
  plane = document.querySelector('#plane');
  cnv = createCanvas(512,512);
  frameRate(12);
  cnv.id('cnv');
  cnv.parent('#scene');
  cnv.hide()
  colorMode(HSB);
  background(0,0,0);
  fill(100,100,100);
  noStroke();
  ellipse(width/2,height/2,100,100);
  imageURL = imageFromCanvas();
  plane.setAttribute('src', imageURL);
  console.log("RUNNING");
}

function draw() {
  background(0,0,0);
  x = x > width ? 0 : x + 1;
  fill(random(255),100,100);
  ellipse(x, height/2, 100, 100);
  imageURL = imageFromCanvas();
  plane.setAttribute('src', imageURL);
}

function imageFromCanvas() {
	const canvas = document.getElementById('cnv');
  return canvas.toDataURL('image/png',0.1);
}
