// Class to store and manage the population of bees
// Also, displays Queen Bee and saves the best Bee's genes
function Population(m, num, hiveX, hiveY, dist){
	this.mutationRate = m;
	this.population = [];

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
  
	this.bestDNA;
}