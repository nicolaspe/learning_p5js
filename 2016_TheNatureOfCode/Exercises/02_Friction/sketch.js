var liquid;
var particle1;
var particle2;

function setup() {
  createCanvas(640, 360);
  liquid = new Liquid(0, height/2, width, height, 0.1);
  particle1 = new Particle(200, 50, 1.5);
  particle2 = new Particle(400, 50, 3.0);
}

function draw() {
  background(240);
  
  liquid.display();
  
  if(liquid.contains(particle1)){
    // Calculate and apply drag force
    var dragForce = liquid.calculateDrag(particle1);
    particle1.applyForce(dragForce);
  }
  // Calculate and apply mass scaled gravity
  var gravity1 = createVector(0, 0.1*particle1.mass);
  particle1.applyForce(gravity1);
  
  if(liquid.contains(particle2)){
    // Calculate and apply drag force
    var dragForce = liquid.calculateDrag(particle2);
    particle2.applyForce(dragForce);
  }
  // Calculate and apply mass scaled gravity
  var gravity2 = createVector(0, 0.1*particle2.mass);
  particle2.applyForce(gravity2);
  
  particle1.update();
  particle2.update();
  particle1.display();
  particle2.display();
}

function mousePressed(){
  console.log(particle1.pos.y +" - " +particle2.pos.y);
}