// Class for Hive fractal object
function Hive(x, y, cap) {
  this.pos = createVector(x, y);
  this.cap = cap; // capacity of each cell
  this.size = map(cap, 50, 1000, 10, 50); // size proportional to capacity
  this.polen = 0;     // amount of polen stored
  this.full = false;  // whether the cell is full or not
  this.replicated = false;  // whether the cell has already replicated or not
  if(cap <= 100) { this.replicated = true;}  // can't replicate if it's too small
  this.r = 1; // max radius of current state of the hive cell

  // Function that stores the polen from the bees in the hive cell 
  this.store = function(bees) {
    for (var i = 0; i < bees.length; i++) {
      var d = p5.Vector.dist(this.pos, bees[i].pos);
      var storeDist = max(this.size, 25)
      if ((d > 0) && (d < storeDist) && this.polen < this.cap && !bees[i].search) {
        bees[i].polen--;
        this.polen++;
      }
    }
    if (this.polen >= this.cap) { // Checks if it's full, so it won't accept more polen
      this.full = true;
    }
  }
  
  // Checks whether the hive cell can replicate or not
  this.timeToReplicate = function() {
    return (this.full && !this.replicated);
  }

  // Creates new hive cells
  this.replicate = function() {
    var h = [];
    var angle = TWO_PI / 6;
    for (var a = 0; a < TWO_PI-0.1; a += angle) {
      var sx = this.pos.x + cos(a) * this.r*1.2;
      var sy = this.pos.y + sin(a) * this.r*1.2;
      h.push(new Hive(sx, sy, cap*0.5));
    }
    this.replicated = true;
    return h;
  }

  // Makes the cell grow
  this.update = function() {
    if (this.r < this.size) {
      this.r++;
    }
  }

  this.display = function() {
    colorMode(HSB, 360, 100, 100, 100);
    strokeWeight(1);
    stroke(58, 80, 84, 75);
    fill(58, 85, 99, 75);

    var angle = TWO_PI / 6;
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
      var sx = cos(a) * this.r;
      var sy = sin(a) * this.r;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }

}