function Flower(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  
  this.h = random(200, 359);  // Flower hue
  this.r = 10; // Flower size
  this.petals = 16; // # of petals
  this.polen = random(1000, 2000); // Flower life
  this.distance = this.r*3; // Feeding distance
  
  this.drain = function(bees){
    var count = 0;
    // Check for nearby bee
    for (var i = 0; i < bees.length; i++) {
      var d = p5.Vector.dist(this.pos, bees[i].pos);
      // If distance is between ]0, influence]
      if ((d > 0) && (d < this.distance)) {
        this.polen--;  // flower gets drained from polen
      }
    }
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }
  this.update = function() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.borders();
      this.acc.set(0);
      // If it doesn't have any more polen, it dies and reappears somewhere else
      if(this.polen <= 0){
        this.pos = createVector(random(20, width-20), random(20, height-20));
        this.polen = random(1000, 2000);
        this.h = random(200, 359);
      }
    }
  // Border wrapping
  this.borders = function() {
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
  }
  this.display = function() {
    colorMode(HSB);
    // As the flower gets drained, it gets more transparent
    var life = map(this.polen, 1000, 0, 1, 0.1);
    push();
    translate(this.pos.x, this.pos.y);
    // Flower's petals
    strokeWeight(0.1);
    stroke(this.h, 90, 90, life);
    fill(this.h, 80, 65, life);
    var angle = 0;
    for(var i=0; i<16; i++){
      push();
      rotate(angle);
      translate(0, this.r);
      ellipse(0, 0, this.r, this.r*1.5);
      pop();
      angle += TWO_PI/this.petals;
    }
    // Flower's center
    strokeWeight(0.5);
    stroke(0);
    fill(56, 99, 75, life);
    ellipse(0, 0, this.r, this.r);
    pop();
  }
}