function Particle(){
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  
  this.friction = 0.8;
  
  this.update = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.set(0, 0);
  }
  
  this.display = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 35, 35);
  }
  
  this.applyForce = function(force){
    this.acc.add(force);
  }
  
  this.edges = function(){
    if(this.pos.y > height){
      this.vel.y *= -1.0;
      this.pos.y = height;
    }
    
    if(this.pos.x > width){
      this.vel.x *= -this.friction;
      this.pos.x = width;
    }
    if(this.pos.x < 0){
      this.vel.x *= -this.friction;
      this.pos.x = 0;
    }
  }
}