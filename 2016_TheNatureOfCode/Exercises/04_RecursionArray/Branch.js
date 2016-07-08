function Branch(start, vel, n){
  this.start = start.copy();
  this.end = start.copy();
  this.vel = vel.copy();
  this.timerstart = n;
  this.timer = n;
  this.growing = true;
  
  this.update = function(){
    if(this.growing){
      this.end.add(this.vel);
    }
  }
  
  this.render = function(){
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
  
  this.timeToBranch = function(){
    this.timer--;
    if(this.timer <= 0 && this.growing){
      this.growing = false;
      return true;
    } else{
      return false;
    }
  }
  
  this.branch = function(angle){
    var theta = vel.heading();  // current growing direction
    var speed = vel.mag();      // velocity magnitude
    theta += radians(angle);    // rotate
    var newVel = createVector(speed*cos(theta), speed*sin(theta));
    var b = new Branch(this.end, newVel, this.timerstart*0.65);
    return b
  }
  
}