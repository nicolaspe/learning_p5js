/* Nicolas Peña Escarpentier
The Nature of Code, Assignment 3

This sketch simulates the flocking of bees to feed on flowers.
The flowers can be drained, in which case, they dissapear and reappear
somewhere else.
*/

var bees = [];    // bees array
var flowers = []; // flowers array
var sepSlider;
var cohSlider;
var aliSlider;
var foodSlider;

function setup() {
  createCanvas(720, 480);
  colorMode(HSL);
  // Sliders initialization
  sepSlider = createSlider(0, 5, 1, 0.1);
  cohSlider = createSlider(0, 5, 1, 0.1);
  aliSlider = createSlider(0, 5, 1, 0.1);
  foodSlider = createSlider(0, 5, 1, 0.1);
  // Every element should appear near each other, but with it's own independent seed
  noiseSeed(random(10000));
  var nx = 0; // x position noise variable
  var ny = 0; // y position noise variable
  var nv = 0; // velocity noise variable
  // Bees creation
  for(var i=0; i<60; i++){
    // Position according to noise
    var posx = map(noise(nx, 0, 0), 0, 1, 0, width);
    var posy = map(noise(0, ny, 0), 0, 1, 0, height);
    var vel  = map(noise(0, 0, nv), 0, 1, 0, TWO_PI);
    bees.push(new Bee(posx, posy, vel));
    nx += 0.2;
    ny += 0.2;
    nv += 0.2;
  }
  // Flowers creation, they are placed completely random around the canvas
  for(var i=0; i<8; i++){
    flowers.push(new Flower(random(20, width-20), random(20, height-20)));
  }
}

function draw() {
  background(color(109, 80, 90));
  // Bees movement
  for(var i=0; i<bees.length; i++){
    bees[i].applySteering(bees, flowers);
    bees[i].update();
    bees[i].display();
  }
  // Flowers stay still, but can be burnt or exhausted
  for(var i=0; i<flowers.length; i++){
    flowers[i].drain(bees);
    flowers[i].update();
    flowers[i].display();
  }
}