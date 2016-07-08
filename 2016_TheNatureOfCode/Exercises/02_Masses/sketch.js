var b1;
var b2;

function setup() {
  createCanvas(600, 360);
  b1 = new Ball(200, 100, 3);
  b2 = new Ball(400, 100, 1);
}

function draw() {
  background(42);
  var wind = createVector(0.1, 0);
  
  var gravity1 = createVector(0, 0.2*b1.mass);
  b1.applyForce(gravity1);
  var gravity2 = createVector(0, 0.2*b2.mass);
  b2.applyForce(gravity2);
  
  if(mouseIsPressed){
    b1.applyForce(wind);
    b2.applyForce(wind);
  }
  
  b1.update();
  b2.update();
  b1.edges();
  b2.edges();
  b1.display();
  b2.display();
}