function DNA(){
  // Genetic sequence
  this.genes = [];
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