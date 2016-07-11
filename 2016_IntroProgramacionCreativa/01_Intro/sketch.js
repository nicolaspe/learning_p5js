// 2016-07-10 Intro a la programación creativa p5.js
// Nicolás Peña Escarpentier

// variable global
var centerWidth;
var r;
var t = 0;
var osc; // oscilador :O

function setup() {
  // camelCase
  // crea un lienzo donde dibujar
  // sintaxis createCanvas(dimHorizontal, dimVertical)
  createCanvas(windowWidth, windowHeight);
  // background pinta el color del fondo
  // argumentos entre (0, 255) -> grayscale
  //  1 arg: grayscale
  //  3 arg: RGB
  background(180, 10, 100);
  ellipseMode(CENTER);
  centerWidth = width / 2;
  frameRate(60); // default value
  noCursor();
  setupOsc();
}

function draw() {
  drawBackground();
  drawEllipses();
  drawRect();
  updateOsc();
  drawConfetti();
}

function drawBackground() {
  // Limpia el fondo!
  var b;
  if (mouseIsPressed) {
    b = 0;
  } else {
    b = 100;
  }
  r = map(noise(t), 0, 1, 0, 255);
  t += 0.01;
  background(r, 10, b);
}

function drawEllipses() {
  // drawMode de la ellipse1
  // ellipse1
  noStroke();
  fill(random(100), random(200), random(100));
  ellipse(width / 2, height / 2, 30, 50);

  // drawMode de la ellipse2
  // ellipse2
  centerWidth = width / 2;
  stroke(0);
  strokeWeight(2.5);
  noFill();
  ellipse(centerWidth, height / 2, 100, 80);

  // drawMode de la ellipse3
  // ellipse3
  var localVariable = 40;
  strokeWeight(1);
  stroke(42, 50);
  fill(179, 90);
  ellipse(mouseX, mouseY, localVariable, localVariable);
}

function drawConfetti() {
  for (var i = 0; i < 255; i++) {
    fill(0, i, i);
    noStroke();
    ellipse(random(width), random(height), 10, 10);
  }
}

function drawRect() {
  var posx = [];
  var posy = [];
  posx[0] = width * 0.2;
  posx[1] = width * 0.2;
  posx[2] = width * 0.8;
  posx[3] = width * 0.8;
  posy[0] = height * 0.2;
  posy[1] = height * 0.8;
  posy[2] = height * 0.8;
  posy[3] = height * 0.2;
  for (var i = 0; i < 4; i++) {
    push();
    translate(posx[i], posy[i]);
    var theta = radians(frameCount % 90);
    rotate(theta);
    rectMode(CENTER);
    var y = map(r, 0, 255, 150, 250);
    fill(r, r, 0, 200);
    rect(0, 0, 150, 150);
    pop();
  }
}

function mousePressed() {
  console.log("Jelou!");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// setup del oscilador
function setupOsc() {
  osc = new p5.Oscillator();
  osc.setType("sine");
  osc.freq(441);
  osc.amp(0.7);
  osc.start();
}

function updateOsc() {
  var freq = map(mouseX, 0, width, 200, 800);
  osc.freq(freq);
}