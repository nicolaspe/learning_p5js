// 2016-07-10 Intro a la programación creativa p5.js
// Nicolás Peña Escarpentier

// variable global
var centerWidth;
var t = 0;

function setup() {
  // camelCase
  // crea un lienzo donde dibujar
  // sintaxis createCanvas(dimHorizontal, dimVertical)
  createCanvas(600, 600);
  // background pinta el color del fondo
  // argumentos entre (0, 255) -> grayscale
  //  1 arg: grayscale
  //  3 arg: RGB
  background(180, 10, 100);
  ellipseMode(CENTER);
  centerWidth = width/2;
  frameRate(60); // default value
  noCursor();
}

function draw() {
  // Limpia el fondo!
  var b;
  if(mouseIsPressed){
    b = 0;
  } else{
    b = 100;
  }
  var r = map(noise(t), 0, 1, 0, 255);
  t += 0.01;
  background(r, 10, b);
  
  // drawMode de la ellipse1
  // ellipse1
  noStroke();
  fill(random(100), random(200), random(100));
  ellipse(300, 300, 30, 50);
  
  // drawMode de la ellipse2
  // ellipse2
  stroke(0);
  strokeWeight(2.5);
  noFill();
  ellipse(centerWidth, height/2, 100, 80);
  
  // drawMode de la ellipse3
  // ellipse3
  var localVariable = 40;
  strokeWeight(1);
  stroke(42, 50);
  fill(179, 90);
  ellipse(mouseX, mouseY, localVariable, localVariable);
  // si ponemos el background acá, NO SE VERÁ NADA!
  
  for(var i=0; i<255; i++){
    fill(0, i, i);
    noStroke();
    ellipse(random(width), random(height), 10, 10);
  }
  
}

function mousePressed(){
  console.log("Jelou!");
}

