function Bee(x, y, v) {
  this.pos = createVector(x, y);
  this.vel = p5.Vector.fromAngle(v);
  this.acc = createVector(0, 0);

  this.r = 4;           // Bee size
  this.maxspeed = 7;    // Bee max speed
  this.maxforce = 0.5;  // Bee max steering force
  this.life = true;     // Bee life (boolean)
  
  this.flock_sep = this.r*8;  // flock desired SEParation
  this.flock_inf = this.r*15; // distance of INFluence of the flock
  this.vision = this.r*20     // vieweing (or smelling) distance to detect nearby flowers
  
  
  this.applySteering = function(bees, flowers){
    // Flock conduct with other bees: separation, cohesion, alignment
    var sf = this.separate(bees, this.flock_sep);
    var cf = this.cohesion(bees, this.flock_inf);
    var af = this.align(bees, this.flock_inf);
    var ff = this.feed(flowers);
    
    // Sliders
    sf.mult(sepSlider.value());
    af.mult(aliSlider.value());
    cf.mult(cohSlider.value());
    ff.mult(foodSlider.value());
    
    // Force application
    this.applyForce(sf);
    this.applyForce(cf);
    this.applyForce(af);
    this.applyForce(ff);
  }
  
  // Steers away from other nearby objects
  /*  array =  array of possible objects to be separated of
  tolerance =  maximum separation influence distance
  */
  this.separate = function(array, tolerance) {
    var count = 0;
    var desired = createVector(0, 0);
    // Check for every object in the array
    for (var i = 0; i < array.length; i++) {
      var d = p5.Vector.dist(this.pos, array[i].pos);
      // If distance is between ]0, tolerance]
      if ((d > 0) && (d < tolerance)) {
        var d_vel = p5.Vector.sub(this.pos, array[i].pos);
        // desired velocity inversely proportional to distance
        d_vel.setMag(map(d, 0, tolerance, this.maxspeed, 0));
        desired.add(d_vel);
        count++;  // keeping track
      }
    }
    // Average
    if(count > 0) desired.div(count);
    // If non null forces are being applied, implement Reynolds
    var steering = createVector(0, 0);
    if(desired.mag() > 0){
      desired.setMag(this.maxspeed);
      steering = p5.Vector.sub(desired, this.vel);
      steering.limit(this.maxforce);
    }
    return steering;
  }
  // Keeps the nearby flock together
  /*  array =  array of possible objects to be separated of
  influence =  maximum flock influence distance
  */
  this.cohesion = function(array, influence){
    var count = 0;
    var target = createVector(0, 0); // vector will save the average flock location
    // Check for every object in the array
    for (var i = 0; i < array.length; i++) {
      var d = p5.Vector.dist(this.pos, array[i].pos);
      // If distance is between ]0, influence]
      if ((d > 0) && (d < influence)) {
        target.add(array[i].pos);
        count++;  // keeping track
      }
    }
    // Average
    if(count > 0){
      target.div(count);
      return this.seek(target);
    } else {
      return createVector(0,0);
    }
  }
  // Aligns the direction of the flock 
  /*  array =  array of possible objects to be separated of
  influence =  maximum flock influence distance
  */
  this.align = function(array, influence){
    var count = 0;
    var flockV = createVector(0, 0); // vector will save the average flock velocity
    // Check for every object in the array
    for (var i = 0; i < array.length; i++) {
      var d = p5.Vector.dist(this.pos, array[i].pos);
      // If distance is between ]0, influence]
      if ((d > 0) && (d < influence)) {
        flockV.add(array[i].pos);
        count++;  // keeping track
      }
    }
    // Average
    if(count > 0){
      flockV.div(count);
      flockV.setMag(this.maxspeed);
      // Implement Reynolds
      var steering = p5.Vector.sub(flockV, this.vel);
      steering.limit(this.maxforce);
      return steering;
    } else {
      return createVector(0,0);
    }
  }
  // Locates the nearest flower to go feed on it
  this.feed = function(flowers){
    var count = 0;
    var target = createVector(0, 0); // vector will save the flowers locations
    // Check for every object in the array
    for (var i = 0; i < flowers.length; i++) {
      var d = p5.Vector.dist(this.pos, flowers[i].pos);
      // If distance is between ]0, influence]
      if ((d > 0) && (d < this.vision)) {
        target.add(flowers[i].pos);
        count++;  // keeping track
      }
    }
    // Average
    if(count > 0){
      target.div(count);
      return this.arrive(target);
    } else {
      return createVector(0,0);
    }
  }
  // Steers towards a target
  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxspeed);

    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    return steering;
  }
  // Steers towards a target, but stops when arrives (at a min distance)
  this.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);

    // Arrive behaviour
    var d = desired.mag();
    if (d < 100) {
      // map according to distance
      var m = map(d, 20, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    return steering;
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
  }
  // Border wrapping
  this.borders = function(){
    if(this.pos.x < -this.r) this.pos.x = width  +this.r;
    if(this.pos.y < -this.r) this.pos.y = height +this.r;
    if(this.pos.x > width  +this.r) this.pos.x = -this.r;
    if(this.pos.y > height +this.r) this.pos.y = -this.r;
  }
  this.display = function() {
    colorMode(HSB);
    var theta = this.vel.heading() - PI/2;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    
    // Bee's head
    noStroke();
    fill(0)
    ellipse(0, this.r/2, this.r*3/2, this.r*3/2);
    // Bee's body
    strokeWeight(1);
    stroke(0);
    fill(54, 99, 99);
    ellipse(0, -this.r/2, this.r*2, this.r*2);
    // Bee's lines
    push();
    translate(0, -this.r/2);
    line(this.r, 0, -this.r, 0); // line #1
    line(this.r*.71,  this.r/2, -this.r*.71,  this.r/2); // line #2
    line(this.r*.71, -this.r/2, -this.r*.71, -this.r/2); // line #3
    pop();
    // Bee's wings
    push(); // wing #1
    translate(-this.r/2, this.r/2);
    rotate(radians(-45));
    translate(0, -this.r);
    stroke(40, 0.5);
    fill(250, 0.5);
    ellipse(0, 0, this.r, this.r*2);
    pop();
    push(); // wing #2
    translate(this.r/2, this.r/2);
    rotate(radians(45));
    translate(0, -this.r);
    stroke(40, 0.5);
    fill(250, 0.5);
    ellipse(0, 0, this.r, this.r*2);
    pop();
    pop();
  }
}