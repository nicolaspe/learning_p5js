function Vehicle(x, y){
  this.pos = createVector(x,y);
  //this.vel = createVector(0,0);
  this.vel = p5.Vector.fromAngle(random(TWO_PI));
  this.acc = createVector(0,0);
  
  this.r = 5;
  this.maxspeed = random(5,7);
  this.maxforce = 0.5;
  

  this.follow = function(flow){
    var desired = flow.lookup(this.pos);
    desired.setMag(this.maxspeed);
    
    var steer= p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  this.applyForce = function(force){
    var f = force.copy();
    //f.div(this.mass);
    this.acc.add(f);
  }
  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.borders();
    this.acc.set(0);
  }
  this.display = function(){
    fill(240, 150);
    strokeWeight(1);
    stroke(180);

    var theta = this.vel.heading() +PI/2;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(      0, -this.r *2);
    vertex(-this.r,  this.r *2);
    vertex( this.r,  this.r *2);
    endShape(CLOSE);
    pop();
  }
  this.borders = function(){
    if(this.pos.x < -this.r) this.pos.x = width  +this.r;
    if(this.pos.y < -this.r) this.pos.y = height +this.r;
    if(this.pos.x > width  +this.r) this.pos.x = -this.r;
    if(this.pos.y > height +this.r) this.pos.y = -this.r;
  }
}