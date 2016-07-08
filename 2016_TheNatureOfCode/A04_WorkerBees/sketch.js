/* Nicolas Peña Escarpentier
The Nature of Code, Assignment 4

This sketch simulates a group of bees that searchs for food (flowers) to
feed their hive. 
The bees have flocking patterns and are attracted to flowers, but once
they are "full", they search for the hive to unload the gathered resources.
The hive is a recursive pattern that grows the more food it gets.
*/

var bees = [];
var hive = [];
var flowers = [];

function setup() {
  createCanvas(720, 480);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Every bee should appear near each other
  noiseSeed(random(10000));
  var nx = 0; // x position noise variable
  var ny = 0; // y position noise variable
  var nv = 0; // velocity noise variable
  // Bees creation
  for(var i=0; i<30; i++){
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
  for(var i=0; i<4; i++){
    flowers.push(new Flower(random(20, width-20), random(20, height-20)));
  }
  // The Hive is located at the middle of the canvas
  var h = new Hive(width/2, height/2, 1000);
  hive.push(h);
}

function draw() {
  background(color(109, 80, 90));
  
  // Hive storage and replication.
  for(var i=0; i<hive.length; i++){
    hive[i].store(bees);
    hive[i].update();
    hive[i].display();
    
    if(hive[i].timeToReplicate() && hive.length<1024){
      var newCell = hive[i].replicate();
      for(var j=0; j<newCell.length; j++){
        hive.push(newCell[j]);
      }
    }
  }
  
  // Bees movement
  for(var i=0; i<bees.length; i++){
    bees[i].applySteering(bees, flowers, hive);
    bees[i].update();
    bees[i].display();
  }
  
  // Flower growth and exhaustion
  for(var i=0; i<flowers.length; i++){
    flowers[i].drain(bees);
    flowers[i].update();
    flowers[i].display();
  }
}