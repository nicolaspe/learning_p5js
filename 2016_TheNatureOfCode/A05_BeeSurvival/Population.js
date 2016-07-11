// Class to store and manage the population of bees
// Also, displays Queen Bee and saves the best Bee's genes
function Population(m, num, max, hiveX, hiveY, dist){
	this.mutationRate = m;
	this.maxPopulation = max;
	this.bees = [];
	this.performTolerance = 0.65; 	// Performance tolerance

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
		// Display Queen Bee
		this.queenBee();
		// Check every bee
  	for(var i=0; i<this.bees.length; i++){
  		// Bee movement
    	this.bees[i].applySteering(this.bees, flowers, hive);
    	this.bees[i].update();
    	// Checks whether the bee is loaded or has finishes unloading
    	this.bees[i].loaded();
    	if(this.bees[i].unloaded()){
    		// If the bee has finished unloading, it might reproduce
    		this.reproduce(this.bees[i], i);
    	}
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

	// Produce offspring and might kill parent
	this.reproduce = function(bee, index){
		var numOffspring = floor(random(1, 3));
		if(this.bees.length < this.maxPopulation){
			for (var i = 0; i < numOffspring; i++) {
				var child;
				// 50% chance any is the parent
				if(random(1)<0.5){
					child = this.bestDNA.crossover(bee.dna);
				} else{
					child = bee.dna.crossover(this.bestDNA);
				}
				// Mutation
				child.mutation(this.mutationRate);
				// Child creation
				var posx = hiveX +random(-20, 20);
				var posy = hiveY +random(-20, 20);
				this.bees.push(new Bee(posx, posy, vel, child));
			}
		}
		var performance = constrain(bee.fitness/this.maxFitness, 0, 1);
		var killChance = 0.01;
		// If the bee doesn't perform well, it might get killed!
		if(performance < this.performTolerance){
			killChance = map(performance, 0, this.performTolerance, 0.9, 0.3);
			if(random(1) < killChance){
				this.bees.splice(i, 1);
			}
		}
	}

	this.displayInfo = function(){
		noStroke();
		fill(20);
		textAlign(LEFT);
		textSize(12);
		text("Max Fitness: " + this.maxFitness.toFixed(2), 10, 15);
		text("Current population: " + this.bees.length +"/50", 10, 30);
		textAlign(CENTER);
		text("Best DNA", 	670, 15);
		textAlign(RIGHT);
		textSize(10);
		text("Speed:", 		670, 25);
		text("Capacity:", 670, 35);
		text("Toughness:",670, 45);
		text("Vision:", 	670, 55);
		text("Separation:", 670, 65);
		text("Influence:", 	670, 75);
		text("Flock Separation:",	670, 85);
		text("Flock Cohesion:", 	670, 95);
		text("Flock Alignment:",670, 105);
		text("Search factor:",	670, 115);
		text("Return factor:",	670, 125);
		text("Lifespan:", 670, 135);
		textAlign(LEFT);
		for (var i = 0; i < this.bestDNA.genes.length; i++) {
			text(this.bestDNA.genes[i].toFixed(2), 672, 25+10*i);
		};
	}

	this.queenBee = function(){
		var fram = radians(frameCount%360);
		var queenSize = 8 +sin(fram)/2;
		var theta = random(-5, 5);
		push();
    translate(hiveX, hiveY);
    rotate(radians(theta));
    
    // Bee's head
    stroke(255);
    fill(0)
    ellipse(0, -queenSize/1.1, queenSize, queenSize);

    // Bee's tail
    strokeWeight(1);
    stroke(0);
    fill(42, 99, 95);
    ellipse(0, queenSize, queenSize, queenSize*2);

    // Bee's body
    strokeWeight(1);
    stroke(255);
    fill(0);
    ellipse(0, 0, queenSize*1.2, queenSize*1.2);

    // Bee's lines
    stroke(25);
    push();
    translate(0, queenSize);
    line(queenSize/2, 0, -queenSize/2, 0); // line #1
    line(queenSize/2.5,  queenSize/2, -queenSize/2.5,  queenSize/2); // line #2
    line(queenSize/2.5, -queenSize/2, -queenSize/2.5, -queenSize/2); // line #3
    pop();

    // Bee's wings
    push(); // wing #1
    translate(-queenSize/2, 0);
    rotate(radians(-175));
    translate(0, -queenSize/2);
    stroke(40, 50);
    fill(250, 50);
    ellipse(0, 0, queenSize, queenSize*2);
    pop();
    push(); // wing #2
    translate(queenSize/2, 0);
    rotate(radians(175));
    translate(0, -queenSize/2);
    stroke(40, 50);
    fill(250, 50);
    ellipse(0, 0, queenSize, queenSize*2);
    pop();
    pop();
	}
}