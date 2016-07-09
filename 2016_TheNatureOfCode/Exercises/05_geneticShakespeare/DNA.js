// Generates a-z or space or period
function newChar(){
  var c = floor(random(64, 122));
  if(c == 64) c = 32;
  return String.fromCharCode(c);
}

// Constructor (makes a random DNA)
function DNA(num){
  // Genetic sequence
  this.genes = [];
  this.fitness = 0;
  for(var i=0; i<num; i++){
    this.genes[i] = newChar();
  }
  
  // Converts genes array to a String
  this.getPhrase = function(){
    return this.genes.join("");
  }
  
  this.calcFitness = function(target){
    var score = 0;
    for(var i=0; i<this.genes.length; i++){
      if(this.genes[i] == target.charAt(i)) score++;
    }
    this.fitness = score/target.length;
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