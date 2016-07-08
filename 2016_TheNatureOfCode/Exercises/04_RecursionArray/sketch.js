var tree = [];
var leaves = [];

function setup() {
  createCanvas(640, 480);

  var b = new Branch(createVector(width / 2, height), createVector(0,-1), 100);
  tree.push(b);
}

function draw() {
  background(42);
  stroke(255);
  
  for (var i = 0; i < tree.length; i++) {
    // Get branch update and draw
    tree[i].update();
    tree[i].render();

    if (tree[i].timeToBranch()) {
      if (tree.length < 1024) {
        tree.push(tree[i].branch(random(10, 40)));
        tree.push(tree[i].branch(-random(10, 40)));
      } else {
        leaves.push(new Leaf(tree[i].end));
      }
    }
  }

  for (var j = 0; j < leaves.length; j++) {
    leaves[j].update();
    leaves[j].display();
  }

}