function Fluid(C, b) {
  this.C = C;   // drag coefficient
  this.b = b;   // border width for the fluid medium
  this.h = 175; // hue

  // Calculates if the particle is within the fluid medium
  this.contains = function(p) {
    var pos = p.pos.copy();
    return (pos.x < this.b || pos.x > width - this.b) &&
      (pos.y < this.b || pos.y > height - this.b)
  }

  this.calculateDrag = function(p) {
    // Direction (vector)
    var direction = p.vel.copy(); // direction of velocity
    direction.mult(-1);           // drag force has opposite direction
    direction.normalize();        // unit vector
    // Magnitude (scalar)
    var speed = p.vel.mag();      // speed is the magnitude of velocity vector
    var magnitude = this.C * speed * speed;
    // Final force vector (direction*magnitude)
    var force = direction.mult(magnitude);
    return force;
  }

  this.display = function() {
    noStroke();
    // Pulsating color effect by using a sine function depending on the time
    colorMode(HSB);
    var auxTime = millis() % 3600;
    auxTime = radians(auxTime / 10);
    auxTime = sin(auxTime) * 50;
    var c = color(this.h + auxTime, 59, 90, 0.4);

    fill(c);
    rect(0, 0, width, b);
    rect(0, height - b, width, height);
    rect(0, b, b, height - 2 * b);
    rect(width - b, b, width, height - 2 * b);
  }
}