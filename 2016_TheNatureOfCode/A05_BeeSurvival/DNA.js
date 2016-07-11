/* Bee's genes (genotype and phenotype)
  Speed     -> The faster, the bigger the wings
  Capacity  -> The more capacity, the bigger the bee 
               (but also slower)
  Toughness -> Max force it can resist
  Vision    -> Field of view of the bee
  Separation-> Desired flock separation
  Influence -> Distance of influence of the flock
  Steering  -> Each steering force has a factor coded in genes!
*/


function DNA(newgenes){
  // Genetic sequence
  if(arguments.length > 0){
    this.genes = newgenes;
  } else{
    this.genes = [];
    this.genes.push(random(1, 10));  // 0 Speed
    this.genes.push(random(20, 80)); // 1 Capacity
    this.genes.push(random(0.2, 1)); // 2 Toughness
    this.genes.push(random(10, 30)); // 3 Vision
    this.genes.push(random(3, 10));  // 4 Separation
    this.genes.push(random(3, 15));  // 5 Influence
    this.genes.push(random(1.5, 10)); // 6 Separation factor
    this.genes.push(random(1.5, 10)); // 7 Cohesion factor
    this.genes.push(random(1.5, 10)); // 8 Alignment factor
    this.genes.push(random(2.5, 15)); // 9 Feed flower-searching factor
    this.genes.push(random(2.5, 20)); // 10 Feed hive-returning factor
    this.genes.push(500+random(1000));// 11 Max lifespan
  }
  this.fitness = 0;
  
  this.calcFitness = function(){
    
  }
  
  this.crossover = function(partner){
    var child = new DNA(this.genes.length);
    var midpoint = floor(random(this.genes.length));
    
    for(var i=0; i<this.genes.length; i++){
      if(i>midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }
  
  this.mutation = function(rate){
    for(var i=0; i<this.genes.length; i++){
      if(random(1)<rate){
        this.genes[i] = newChar();
      }
    }
  }
  
}