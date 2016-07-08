function Leaf(pos){
  this.pos = pos.copy();
  this.dim = random(2.5, 4.5);
  
  this.display = function(){
    noStroke();
    colorMode(HSB, 360, 100, 100, 255);
    fill(141, 76, 99, 100);
    ellipse(this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  this.update = function(){
    
  }
}