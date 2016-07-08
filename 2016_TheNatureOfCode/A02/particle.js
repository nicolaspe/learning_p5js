function Particle(x, y, m){
  this.pos = createVector(x, y);  // Position vector
  this.vel = createVector(0, 0);  // Velocity vector
  this.acc = createVector(0, 0);  // Acceleration vector
  this.mass = m;            // mass
  this.h = random(0, 359);  // hue
  
  // Calculates the attraction from this particle towards another one
  // Input: particle p, constant of gravity G
  this.calculateAttraction = function(p, G){
    // Direction (vector)
    var direction = p5.Vector.sub(this.pos, p.pos); // substraction of vectors
    var distance = direction.mag();                 // distance is the magnitude of direction
    distance = constrain(distance, 5, 30);          // artificial constraint
    direction.normalize();                          // magnitude of direction = 1
    // Magnitude (scalar)
    var magnitude = -(G *this.mass *p.mass)/(distance*distance);
    // Final force vector (direction*magnitude)
    var force = direction.mult(magnitude);
    return force;
  }
  
  this.applyForce = function(force){
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }
  
  // Updates the variables and keeps the particle inside the canvas
  this.update = function(){
    this.vel.add(this.acc);
    if(this.vel.mag() > 15){
      this.vel.setMag(8);     // artificial speed cap
    }
    this.pos.add(this.vel);
    
    this.acc.mult(0);
  }
  
  // Display function
  this.display = function(){
    strokeWeight(1);
    stroke(42);
    colorMode(HSB);
    var c = color(this.h, 59, 90, 0.9);
    fill(c);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.mass*8, this.mass*8);
  }
  
  
}