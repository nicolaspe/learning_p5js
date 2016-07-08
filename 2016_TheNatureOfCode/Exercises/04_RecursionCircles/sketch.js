function setup() {
  createCanvas(640,480);
}

function draw() {
  background(42);
  stroke(255);
  noFill();
  
  drawCircle(width/2, height/2, 260);
  noLoop();
}

function drawCircle(x, y, d){
  ellipse(x, y, d, d);
  if(d > 10){
    drawCircle(x +d/2, y, d/2);
    drawCircle(x -d/2, y, d/2);
    drawCircle(x, y +d/2, d/2);
    drawCircle(x, y -d/2, d/2);
  }
}