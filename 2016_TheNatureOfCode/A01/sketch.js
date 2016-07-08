// LADYBUG THAT MOVES IN RANDOM DIRECTION, LEAVING A TRAIL OF IT'S SHADOW BEHIND

var b;  // bug object
var t;  // time variable
var c;  // background color

function setup() {
  createCanvas(760,480);    // square board
  colorMode(HSB);           // HSB color mode
  c = color(127,50,99,0.4); // "grass" background
  
  b = new Bug;  // bug creation
  t = 0.01;     // time initialize
}

function draw() {
  fill(c);
  noStroke();
  rect(0,0,width,height); // transparent background to have a trail
  
  b.update();
  b.draw();
  t += 0.01;  // noise time passing
}

function Bug(){
  this.diam = 40;       // body size (diameter)
  this.friction = -0.8; // friction factor
  this.angle = 0.0;     // starting angle
  this.pos = createVector(width/2, height/2); // position vector
  this.vel = createVector(0.0, 0.0);          // velocity vector
  this.acc = p5.Vector.fromAngle(this.angle); // acceleration vector
  
  this.update = function(){
    this.acc = p5.Vector.fromAngle(random(TWO_PI)); // random direction
    // further rotation in [-45°; 45°] with noise function makes it less shaky
    this.acc.rotate(noise(t)*PI -PI/2);

    this.vel.add(this.acc);   // velocity update
    this.vel.limit(15.0);     // max velocity cap
    this.pos.add(this.vel);   // position update
    
    // bounce if it chrashes with the borders
    // friction reduces the velocity in the corresponding direction
    if(this.pos.x <=this.diam/2){
      this.vel.x = this.vel.x *this.friction;
      this.pos.x = (this.diam/2 +10);
    }
    if(this.pos.x >= width -this.diam/2){
      this.vel.x = this.vel.x *this.friction;
      this.pos.x = width -(this.diam/2 +10);
    }
    if(this.pos.y <= this.diam/2){
      this.vel.y = this.vel.y *this.friction;
      this.pos.y = (this.diam/2 +10);
    }
    if(this.pos.y >= height -this.diam/2){
      this.vel.y = this.vel.y *this.friction;
      this.pos.y = height -(this.diam/2 +10);
    }
    
    // angle of the velocity vector is the direction the bug is facing
    this.angle = this.vel.heading();
  }
  
  this.draw = function(){
    push();   // saves the current state of the position matrix
    
    translate(this.pos.x, this.pos.y);// moves to the center of the bug
    rotate(this.angle);               // rotates in the direction the bug's facing
    strokeWeight(3);
    stroke(0);
    fill(0);
    ellipse(this.diam/2, 0, this.diam*0.4, this.diam*0.4);  // bug's head
    fill(color(359,99,99));
    ellipse(0, 0, this.diam, this.diam);    // bug's body
    line(-this.diam/2, 0, this.diam/2, 0);  // wing's separation
    line( 20, -5, 30, -5);   // antenna #1
    line( 20,  5, 30,  5);   // antenna #1
    noStroke();
    fill(0);
    ellipse(  0,-15, 12, 8); // dot #1
    ellipse( 10, -7,  8, 6); // dot #2
    ellipse(-11, -6, 10, 6); // dot #3
    ellipse( 0,   0, 12, 8); // dot #4
    ellipse(  1, 15, 12, 8); // dot #5
    ellipse(-10,  7,  8, 6); // dot #6
    ellipse( 11,  7, 10, 6); // dot #7
    
    pop();    // restores the global position matrix
  }
}