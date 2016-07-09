function Population(targ, mutRate, pMax) {
  this.generations = 1;
  this.target = targ;
  this.popMax = pMax;
  this.mutationRate = mutRate;
  this.perfectScore = 1;

  this.best = "";

  this.population = [];
  // Create creatures
  for (var i = 0; i < this.popMax; i++) {
    this.population[i] = new DNA(this.target.length);
  }
  this.matingPool = [];

  // Fill fitness array for each member of the population
  this.calcFitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }
  this.calcFitness();
  
  // Generate mating pool
  this.naturalSelection = function(){
    // Clear mating array
    this.matingPool = [];
    
    var maxFit = 0;
    for(var i=0; i<this.population.length; i++){
      if(this.population[i].fitness > maxFit){
        maxFit = this.population[i].fitness;
      }
    }
    
    for(var i=0; i<this.population.length; i++){
      var fit = map(this.population[i].fitness, 0, maxFit, 0, 1);
      var n = floor(fit*100);
      for(var j=0; j<n; j++){
        this.matingPool.push(this.population[i]);
      }
    }
  }
  
  // Create a new generation
  this.reproduce = function(){
    // Refill population with children from the mating pool
    for(var i=0; i<population.length; i++){
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = this.partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }
  
}