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
  this.minLimit = [];
  this.maxLimit = [];
  // Establish limits for genes' values
  this.minLimit.push(1);   this.maxLimit.push(10); // 0 Speed
  this.minLimit.push(20);  this.maxLimit.push(80); // 1 Capacity
  this.minLimit.push(0.2); this.maxLimit.push( 1); // 2 Toughness
  this.minLimit.push(10);  this.maxLimit.push(30); // 3 Vision
  this.minLimit.push(3);   this.maxLimit.push(10); // 4 Separation
  this.minLimit.push(3);   this.maxLimit.push(15); // 5 Influence
  this.minLimit.push(1.5); this.maxLimit.push(10); // 6 Flock Separation
  this.minLimit.push(1.5); this.maxLimit.push(10); // 7 Flock Cohesion
  this.minLimit.push(1.5); this.maxLimit.push(10); // 8 Flock Alignment
  this.minLimit.push(2.5); this.maxLimit.push(15); // 9 Feed search factor
  this.minLimit.push(2.5); this.maxLimit.push(20); // 10 Feed return factor
  this.minLimit.push(500); this.maxLimit.push(1500); // 11 Lifespan
  // Genetic sequence
  if(arguments.length > 1){
    this.genes = newgenes;
  } else{
    this.genes = [];
    for (var i = 0; i < this.minLimit.length; i++) {
      var val = random(this.minLimit[i], this.maxLimit[i]);
      this.genes.push(val);
    }
  }
  this.fitness = 0;
  
  this.crossover = function(partner){
    var child = new DNA();
    var midpoint = floor(random(this.genes.length));
    
    for(var i=0; i<this.genes.length; i++){
      if(i>midpoint){ child.genes[i] = this.genes[i];} 
      else{ child.genes[i] = partner.genes[i];}
    }
    return child;
  }
  
  this.mutation = function(rate){
    for(var i=0; i<this.genes.length; i++){
      if(random(1) < rate){
        var val = random(this.minLimit[i], this.maxLimit[i]);
        this.genes[i] = val;
      }
    }
  }
  
}