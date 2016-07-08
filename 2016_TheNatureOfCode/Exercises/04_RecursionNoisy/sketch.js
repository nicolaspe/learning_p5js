var seed;

function setup() {
  createCanvas(640, 480);
  frameRate(12);
}

function draw() {
  background(42);
  stroke(255);
  noFill();
  
  seed = random(10000);
  noiseSeed(seed);

  angle = PI / 4;
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
    var n1 = floor(map(noise(gen), 0, 1, 1, 4));
    var alt = -1;
    for (var i = 0; i < n1; i++) {
      var n2 = map(noise(gen*10)+i,  0, 1, 0.9,1.1);
      var n3 = map(noise(gen*100)+i, 0, 1, 0.9,1.1);
      push();
      rotate(alt*angle*n2);
      branch(len*n3, gen);
      pop();
      alt++;
    }
  }

}