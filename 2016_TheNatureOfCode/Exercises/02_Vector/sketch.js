var particle;

function setup() {
  createCanvas(480,360);
  particle = new Particle();
}

function draw() {
  background(42);
  
  var gravity = createVector(0.0, 0.2);
  var wind = createVector(0.5, 0.0);
  
  particle.applyForce(gravity);
  if(mouseIsPressed){
    particle.applyForce(wind);
  }
  
  particle.update();
  particle.edges();
  particle.display();
}