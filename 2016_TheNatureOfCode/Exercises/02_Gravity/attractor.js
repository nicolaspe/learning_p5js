function Attractor(x, y){
  this.pos = createVector(x, y);
  this.mass = 20;
  this.G = 2;
  
  this.display = function(){
    ellipseMode(CENTER);
    fill(255);
    ellipse(this.pos.x, this.pos.y, 40, 40);
  }
  
  this.calculateAttraction = function(p){
    // Calculate direction of force
    var force = p5.Vector.sub(this.pos, p.pos);
    // Distance between objects
    var distance = force.mag();
    // Limit the distance to eliminate "extreme" results
    distance = constrain(distance, 5, 25);
    // Normalize vector
    force.normalize();
    // Calculate gravitational force magnitude
    var strength = (this.G *this.mass *p.mass) / (distance *distance);
    // Multiply to obtain force vector
    force.mult(strength);
    return force;
  }
}