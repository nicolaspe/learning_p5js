function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(42);
  stroke(255);
  noFill();
  
  angle = map(sin(frameCount / 100), -1, 1, PI / 8, PI / 3);
  tree(width / 2, height, 150);
}

function tree(x, y, len) {
  push();
  translate(x, y);
  branch(len, 1);
  pop();
}

function branch(len, gen) {
  strokeWeight(map(gen, 1, 8, 8, 0.5));
  line(0, 0, 0, -len); // draw branch line

  translate(0, -len); // go to end of branch
  len *= 0.64; // shrink branch

  gen++;

  if (len > 2) {
    push();
    rotate(angle);    // 1st branch rotation
    branch(len, gen); // 1st branch draw
    pop();
    
    push();
    rotate(-angle);   // 2nd branch rotation
    branch(len, gen); // 2nd branch drawing
    pop();
  }

}