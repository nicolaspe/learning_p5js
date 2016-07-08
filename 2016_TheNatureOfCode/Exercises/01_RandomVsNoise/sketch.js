var xoff = 0;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(48);
  
  var y1 = random(0, height);
  var y2 = map(noise(xoff),0,1, 0,height);
  xoff += 0.05;
  
  fill(255);
  ellipse(220, y1, 20, 20);
  ellipse(420, y2, 20, 20);
}