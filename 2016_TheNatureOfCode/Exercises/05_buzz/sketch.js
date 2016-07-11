var osc;
var mod;
var info = "";
var modType = 0;
var type = "sine";

function setup() {
  createCanvas(400, 400);
  setupOsc();
}

function draw() {
  background(255);
  updateOsc();
  displayInfo();
}

function setupOsc() {
  osc = new p5.Oscillator();
  osc.setType(type);
  osc.freq(441);
  osc.amp(0.7);
  osc.start();
}

function updateOsc() {
  switch(modType){
    case 0:
      type = "sine";
      break;
    case 1:
      type = "triangle";
      break;
    case 2:
      type = "sawtooth";
      break;
    case 3:
      type = "square";
      break;
  }
  osc.setType(type);
  var freq = map(mouseX, 0, width, 200, 800);
  osc.freq(freq);
}

function displayInfo(){
  var freq = map(mouseX, 0, width, 50, 500);
  text("Freq: " +freq, 20, 20);
  text("Type: " +type, 20, 40);
}

function mousePressed(){
  modType++;
  if(modType > 3) modType = 0;
}