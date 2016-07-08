function FlowField(n){
  this.resolution = n;
  this.cols = width/n;
  this.rows = height/n;
  
  println(this.cols +" | " +this.rows);
  
  this.make2Darray = function(X){
    var array = [];
    for(var i=0; i<X; i++){
      array[i] = [];
    }
    return array;
  } 
  this.field = this.make2Darray(this.cols);
  
  this.init = function(){
    // Reseed noise to get a new flow field every time
    noiseSeed(Math.floor(random(10000)));
    var xoff = 0;
    for(var i=0; i<this.cols; i++){
      var yoff = 0;
      for(var j=0; j<this.rows; j++){
        var theta = map(noise(xoff,yoff), 0, 1, 0, TWO_PI);
        this.field[i][j] = p5.Vector.fromAngle(theta);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
    
  }
  this.init();
  println(8);
  
  this.lookup = function(table){
    var i = Math.floor(constrain(table.x/this.resolution, 0, this.cols-1));
    var j = Math.floor(constrain(table.y/this.resolution, 0, this.rows-1));
    
    return this.field[i][j].copy();
  }
  
  this.display = function(){
    for(var i=0; i<this.cols; i++){
      for(var j=0; j<this.rows; j++){
        this.drawVector(this.field[i][j], i*this.resolution, j*this.resolution, this.resolution-2);
      }
    }
  }
  this.drawVector = function(val, x, y, sca){
    push();
    var asize = 4;
    translate(x,y);
    stroke(210);
    rotate(val.heading());
    var l = val.mag() *sca;
    line(0,0, l,0);
    //line(l,0, l-asize, +asize/2);
    //line(l,0, l-asize, -asize/2);
  }
}