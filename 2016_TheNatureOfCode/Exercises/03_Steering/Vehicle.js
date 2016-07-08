function Vehicle(x, y){
  this.pos = createVector(x,y); 
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  
  this.r = 5;
  this.maxspeed = 7;
  this.maxforce = 0.5;
  
  this.seek = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxspeed);
    
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    this.applyForce(steering);
  }

  this.arrive = function(target){
    var desired = p5.Vector.sub(target, this.pos);

    // Arrive behaviour
    var d = desired.mag();
    if(d<100){
      // map according to distance
      var m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else{
      desired.setMag(this.maxspeed);
    }
    
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxforce);
    this.applyForce(steering);
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
}