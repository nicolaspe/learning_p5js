var w;

function setup() {
  createCanvas(640,360);
  w = new Walker();
}

function draw() {
  background(48);
  w.update();
  w.display();
}

function Walker(){
  this.d = 20;
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0.0, 0.0);
  this.acc = p5.Vector.fromAngle(random(TWO_PI));
  this.acc.setMag(0.5);
  this.damp = 0.8;
  
  this.update = function(){
    this.acc.rotate(random(TWO_PI));
    
    if(this.pos.x -this.d/2 <=1 || this.pos.x +this.d/2 >=width-1){
      this.vel.x = this.vel.x *(-this.damp);
    }
    if(this.pos.y -this.d/2 <=1 || this.pos.y +this.d/2 >=height-1){
      this.vel.y = this.vel.y *(-this.damp);
    }
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  
  this.display = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.d, this.d);
  }
}