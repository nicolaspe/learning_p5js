/*  Nicolás Peña Escarpentier
	THE NATURE OF CODE, ASSIGNMENT 5
    npescarpentier@gmail.com

  Bees that go looking for food to bring home
    The bees move at different speeds and have different capacity
  When a bee delivers the food, it mates with the Queen Bee
    The Queen Bee reproduces with that bee. and has a fitness evaluation function.
    If that bee is the best at the moment, she stores that DNA info to create a better
    offspring (random new bees created 1-3). The lower the fitness in comparisson to
    the best one, the higher the chance to kill it. Also has a population cap.
*/

//var bees = [];
var population;   // Bee population
var hive = [];    // Hive array
var flowers = []; // Flower array


function setup() {
  createCanvas(720, 480);
  colorMode(HSB, 360, 100, 100, 100);
  
  // Create hive at the center of the canvas
  var hiveX = width/2;
  var hiveY = height/2;
  createHive(hiveX, hiveY);
  // Initialize bee population
  //createBees(30, width/2, height/2, 30);
  var mutRate = 0.02;
  var startPop = 30;
  var maxPop = 50;
  population = new Population(mutRate, startPop, maxPop, hiveX, hiveY, 30);
  // Create flowers
  createFlowers(4);
}

function draw() {
  background(color(109, 38, 84));
  
  // Hive storage and replication.
  for(var i=0; i<hive.length; i++){
    hive[i].store(population.population);
    hive[i].update();
    hive[i].display();

    if(hive[i].timeToReplicate() && hive.length<1024){
      var newCell = hive[i].replicate();
      for(var j=0; j<newCell.length; j++){
        hive.push(newCell[j]);
      }
    }
  }
  
  // Bee life
  population.live();
  // for(var i=0; i<bees.length; i++){
  //   bees[i].applySteering(bees, flowers, hive);
  //   bees[i].update();
  //   // Check whether the current bee is still alive
  //   if(bees[i].life <= 0){
  //     bees.splice(i,1);
  //     break;
  //   }
  //   bees[i].display();
  // }
  
  // Flower growth and exhaustion
  for(var i=0; i<flowers.length; i++){
    flowers[i].drain(population.population);
    flowers[i].update();
    flowers[i].display();
  }
}

// Creates the hive at posx, posy
function createHive(posx, posy){
  var h = new Hive(posx, posy, 1000);
  hive.push(h);
}
// OBSOLETE AFTER POPULATION INCLUSION
// Creates "n" bees at a maximum "dist" around hiveX, hiveY
function createBees(n, hiveX, hiveY, dist){
  // Every bee should appear near each other
  noiseSeed(random(10000));
  var nx = 0; // x position noise variable
  var ny = 0; // y position noise variable
  var nv = 0; // velocity noise variable
  // Bees creation
  for(var i=0; i<n; i++){
    // Position according to noise
    var posx = hiveX + map(noise(nx, 0, 0), 0, 1, -dist, dist);
    var posy = hiveY + map(noise(0, ny, 0), 0, 1, -dist, dist);
    var vel  = map(noise(0, 0, nv), 0, 1, 0, TWO_PI);
    var genes = new DNA();
    bees.push(new Bee(posx, posy, vel, genes));
    nx += 0.2;
    ny += 0.2;
    nv += 0.2;
  }
}
// Creates "n" flowers scattered around the canvas
function createFlowers(n) {
  for(var i=0; i<n; i++){
    flowers.push(new Flower(random(20, width-20), random(20, height-20)));
  }
}