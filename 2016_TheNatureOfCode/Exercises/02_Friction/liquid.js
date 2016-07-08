function Liquid(x1, y1, x2, y2, visc){
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.c = visc;
  
  this.contains = function(p){
    var pos = p.pos;
    return (pos.x > this.x1 && pos.x < this.x2 &&
            pos.y > this.y1 && pos.y < this.y2);
  }
  
  this.calculateDrag = function(p){
    // Magnitude = coef * speed^2
    var speed = p.vel.mag();
    var dragMagnitude = this.c *speed *speed;
    
    // Drag force is inverse of velocity
    var dragForce = p.vel.copy();
    dragForce.mult(-1);
    
    // Scale according to magnitude
    dragForce.setMag(dragMagnitude);
    
    return dragForce;
  }
  
  this.display = function(){
    noStroke();
    colorMode(HSB)
    fill(color(186, 59, 92, 0.5));
    rect(this.x1, this.y1, this.x2, this.y2);
  }
  
}