function setup() {
  createCanvas(640,480);
}

function draw() {
  background(42);
  stroke(255);
  noFill();
  
  cantor(20, 30, 600);
  noLoop();
}

function cantor(x, y, len){
  line(x, y, x+len, y);
  
  if(len >= 1){
    cantor(x, y+20, len/3);
    cantor(x+len*2/3, y+20, len/3);
  }
}