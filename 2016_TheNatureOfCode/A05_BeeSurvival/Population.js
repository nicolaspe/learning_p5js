// Class to store and manage the population of bees
// Also, displays Queen Bee and saves the best Bee's genes
function Population(m, num, max, hiveX, hiveY, dist){
	this.mutationRate = m;
	this.maxPopulation = max;
	this.bees = [];

	// BEE CREATION
	// Every bee should appear near each other
  noiseSeed(random(10000));
  var nx = 0; // x position noise variable
  var ny = 0; // y position noise variable
  var nv = 0; // velocity noise variable
  // Bees creation
  for(var i=0; i<num; i++){
   	// Position according to noise
	  var posx = hiveX +floor(map(noise(nx, 0, 0), 0, 1, -dist, dist));
   	var posy = hiveY +floor(map(noise(0, ny, 0), 0, 1, -dist, dist));
   	var vel  = map(noise(0, 0, nv), 0, 1, 0, TWO_PI);
   	var genes = new DNA();
   	this.bees.push(new Bee(posx, posy, vel, genes));
   	nx += 0.2;
   	ny += 0.2;
   	nv += 0.2;
  }

  // FITNESS AND BEST DNA SELECTION
	this.bestDNA;
	this.maxFitness = 0;

	this.calcFitness = function(){
		for (var i = 0; i< this.bees.length; i++) {
			var f = this.bees[i].calcFitness();
			if(f > this.maxFitness){
				this.maxFitness = f;
				this.bestDNA = this.bees[i].dna;
			} 
		}
	}

	this.calcFitness();

	this.live = function(){
		// Check every bee
  	for(var i=0; i<this.bees.length; i++){
  		// Bee movement
    	this.bees[i].applySteering(this.bees, flowers, hive);
    	this.bees[i].update();
    	// Check whether the current bee is still alive
    	if(this.bees[i].life <= 0){
    		this.bees.splice(i,1);
    		break;
    	}
    	// Updates fitness values
    	this.calcFitness();
    	// Display
    	this.bees[i].display();
  	}
	}

	this.displayInfo = function(){
		noStroke();
		fill(20);
		textAlign(LEFT);
		textSize(13);
		text("Max Fitness: " + this.maxFitness.toFixed(2), 10, 15);
		textAlign(RIGHT);
		text("Best DNA", 	100, 35);
		textSize(10);
		text("Speed:", 		90, 45);
		text("Capacity:", 90, 55);
		text("Toughness:",90, 65);
		text("Vision:", 	90, 75);
		text("Separation:", 90, 85);
		text("Influence:", 	90, 95);
		text("Flock Separation:",	90, 105);
		text("Flock Cohesion:", 	90, 115);
		text("Flock Alignment:",90, 125);
		text("Search factor:",	90, 135);
		text("Return factor:",	90, 145);
		text("Lifespan:", 90, 155);
		textAlign(CENTER);
		for (var i = 0; i < this.bestDNA.genes.length; i++) {
			text(this.bestDNA.genes[i].toFixed(2), 112, 45+10*i);
		};
	}
}