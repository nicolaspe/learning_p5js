var particle;
var attractor;

function setup() {
  createCanvas(640, 360);
  particle = new Particle(width/2, 20, 1);
  particle.vel = createVector(2.5, 0);
  attractor = new Attractor(width/2, height/2);
}

function draw() {
  background(42);
  
  var force = attractor.calculateAttraction(particle);
  particle.applyForce(force);
  
  particle.update();
  particle.display();
  
  attractor.display();
}