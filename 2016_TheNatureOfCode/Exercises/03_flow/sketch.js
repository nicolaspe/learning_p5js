var vehicles = [];
var flowfield;

var debug = true; // to draw all the stuff!

function setup() {
   createCanvas(640, 480);
   flowfield = new FlowField(20);
   for(var i=0; i<30; i++){
     vehicles.push(new Vehicle(random(width), random(height)));
   }
}

function draw() {
  background(42);
  
  for(var i=0; i<vehicles.length; i++){
    vehicles[i].follow(flowfield);
    vehicles[i].update();
    vehicles[i].display();
  }
  //flowfield.display();
}

function keyPressed(){
  flowfield.init();
}