function BlackHole() {
  this.pos = createVector(0, 0);
  this.mass = random(15, 70);

  this.setPosition = function(x, y) {
    this.pos = createVector(x, y);
  }
  
  this.calculateAttraction = function(p, G) {
    // Direction (vector)
    var direction = p5.Vector.sub(this.pos, p.pos); // substraction of vectors
    var distance = direction.mag(); // distance is the magnitude of direction
    distance = constrain(distance, 5, 30); // artificial constraint
    direction.normalize(); // magnitude of direction = 1
    // Magnitude (scalar)
    var magnitude = (G * this.mass * p.mass) / (distance * distance);
    // Final force vector (direction*magnitude)
    var force = direction.mult(magnitude);
    return force;
  }

  this.display = function() {
    ellipseMode(CENTER);

    // Pulsating effect by using a sine function depending on the time
    var auxTime = millis()%3600;
    auxTime = radians(auxTime/10);
    auxTime = abs(sin(auxTime)) +1;
    // Black Hole display
    var diam = this.mass *auxTime;
    noStroke();
    for (var d = diam; d > 0; d--) {
      var transp = (diam - d) * 100 / diam;
      fill(0, transp);
      ellipse(this.pos.x, this.pos.y, d, d);
    }

  }
}