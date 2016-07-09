var population;
var target;
var popMax;
var mutationRate;

var bestPhrase;
var stats;


function setup() {
  createCanvas(640, 420);
  background(255);
  
  bestPhrase = createP("Best phrase:");
  
  target = "To be or not to be";
  popMax = 200;
  mutationRate = 0.01;
  
  // Create population
  population = new Population(target, mutationRate, popMax);
}

function draw() {
  // Generate mating pool
  population.naturalSelection();
  // Create next generation
  population.reproduce();
  
  // Calculate fitness
  population.calcFitness();
  population.evaluate();
  
  // Stops if we find the correct phrase
  if(population.isFinished()){
    noLoop();
  }
  
}