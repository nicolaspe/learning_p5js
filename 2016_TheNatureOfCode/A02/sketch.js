// Space Tension
// This sketch provides a set of particles which attract each other. 
// They are connected to the nearest particles by a line.
// With a mouse click, you can create a black hole to attract them!
// By pressing 'f' you can toggle a fluid viscous border!
// by Nicolas Escarpentier


var particles = []; // Particle array
var blackHole;      // Black Hole object
var fluid;          // Viscous fluid gives external bounds
var C = 0.1;        // Viscosity coefficient
var G = 1.0;        // Gravity constant
var boolF = false;  // boolean to see if fluid is activated or not

function setup() {
  createCanvas(720, 480);
  // Creates random particles across the canvas
  for (var i = 0; i < 35; i++) {
    particles[i] = new Particle(random(100, width - 100), random(100, height - 100), random(1, 2.5));
  }
  // Initializes the black hole!
  blackHole = new BlackHole();
  // Initializes the viscous medium
  fluid = new Fluid(this.C, 100);
}

function draw() {
  background(240);

  // Gravitational forces
  for (var i = 0; i < particles.length; i++) {
    for (var j = 0; j < particles.length; j++) {
      if (i != j) {
        var force = particles[i].calculateAttraction(particles[j], this.G);
        particles[i].applyForce(force);
      }
    }
  }
  
  // Drag forces (only if toggled!)
  if (boolF) {
    for (var i = 0; i < particles.length; i++) {
      if (fluid.contains(particles[i])) {
        var force = fluid.calculateDrag(particles[i]);
        particles[i].applyForce(force);
      }
    }
    fluid.display();
  }

  // Black Hole attraction only while mouse is being pressed
  if (mouseIsPressed) {
    blackHole.setPosition(mouseX, mouseY);
    for (var i = 0; i < particles.length; i++) {
      var force = blackHole.calculateAttraction(particles[i], this.G);
      particles[i].applyForce(force);
    }
    blackHole.display();
  }

  // Update variables after all forces have been applied
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  this.drawLines(particles);
  this.drawTextBox();
}

function keyPressed() {
  // Pressing 'r' resets the canvas
  if (key == 'r' || key == 'R') {
    for (var i = 0; i < particles.length; i++) {
      particles[i] = new Particle(random(100, width - 100), random(100, height - 100), random(1, 2.5));
    }
    blackHole = new BlackHole();
  }
  // Pressing 'f' toggles the fluid border
  if (key == 'f' || key == 'F') {
    this.boolF = !this.boolF;
  }
}


// Draws lines between the different particles but only to the nearest particles
this.drawLines = function(p) {
  // Double loop to get every i-j combination.
  for (var i = 0; i < p.length - 1; i++) {
    // This loops starts from i+1, because I don't want to repeat the lines
    for (var j = i + 1; j < p.length; j++) {
      if (i != j) { // Just in case... This shouldn't happen
        // First we get the coordinates from both particles
        var x1 = p[i].pos.x;
        var y1 = p[i].pos.y;
        var x2 = p[j].pos.x;
        var y2 = p[j].pos.y;
        // Calculating the distance
        var distance = dist(x1, y1, x2, y2);
        // Only connects with the nearest particles
        if (distance < 75) {
          strokeWeight(1);
          stroke(50, 0.7);
          line(x1, y1, x2, y2);
        }
      }
    }
  }
}

this.drawTextBox = function() {
  ellipseMode(CENTER);
  stroke(42);
  strokeWeight(0.5);
  fill(42);
  ellipse(width - 150, 30, 20, 20);
  text("Press mouse to create", width - 135, 28);
  text("a BLACK HOLE!", width - 135, 42);
  text("Press [ f ] to toggle", width - 135, 68);
  text("FLUID borders", width - 135, 82);
  text("Press [ r ] to RESET", width - 135, 108);
}