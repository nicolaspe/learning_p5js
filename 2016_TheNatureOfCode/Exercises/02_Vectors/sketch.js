var particle;

function setup() {
  createCanvas(480,360);
  particle = new Particle();
}

function draw() {
  background(42);
  particle.update();
  particle.display();
}
