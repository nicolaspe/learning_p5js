var vehicle;

function setup() {
   createCanvas(640, 480);
   vehicle = new Vehicle(320, 180);
}

function draw() {
  background(42);
  
  var target = createVector(mouseX, mouseY);
  vehicle.arrive(target);
  
  vehicle.update();
  vehicle.display();
}