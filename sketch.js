let cols = 50;
let rows = 80;
let grid = [];

function setup() {
  createCanvas(800, 800);
  let xStep = width / (cols - 1);
  let yStep = height / (rows - 1);

  // Create the grid of points
  for (let i = 0; i < cols; i++) {
    let col = [];
    for (let j = 0; j < rows; j++) {
      col.push(createVector(i * xStep, j * yStep));
    }
    grid.push(col);
  }

  noLoop(); // Prevents continuous drawing
}

function draw() {
  background(255);
  stroke(0);
  noFill();

  // Draw horizontal curves between columns
  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows; j++) {
      let p1 = grid[i][j];
      let p2 = grid[i + 1][j];
      // Draw a curve between points in neighboring columns
      beginShape();
      curveVertex(p1.x, p1.y);
      curveVertex(p1.x, p1.y);
      curveVertex(p2.x, p2.y);
      curveVertex(p2.x, p2.y);
      endShape();
    }
  }

  // Draw vertical lines between rows
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols; i++) {
      let p1 = grid[i][j];
      let p2 = grid[i][j + 1];
      // Draw a line between points in neighboring rows
    //   line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}
