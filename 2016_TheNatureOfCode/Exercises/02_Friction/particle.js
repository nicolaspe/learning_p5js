function Particle(x, y, m){
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;
  
  
  this.update = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.edges();
  }
  
  this.display = function(){
    strokeWeight(1.0);
    stroke(42);
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.mass*10, this.mass*10);
  }
  
  this.applyForce = function(force){
    var aux = force.copy();
    aux.div(this.mass);
    this.acc.add(force);
  }
  
  this.edges = function(){
    if(this.pos.y > height){
      this.vel.y *= -1.0;
      this.pos.y = height;
    }
    
    if(this.pos.x > width){
      this.vel.x *= -1.0;
      this.pos.x = width;
    }
    if(this.pos.x < 0){
      this.vel.x *= -1.0;
      this.pos.x = 0;
    }
  }
}