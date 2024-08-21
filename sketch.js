const cols = 100;
const rows = 80;
const margin = [80, 100];
const grid = [];

function setup() {
  createCanvas(800, 800);

  // Where do we start and end drawing in terms of (x,y) pixels?
  const xStart = margin[0];
  const yStart = margin[1];

  // How many pixels do we move for each point in the grid
  let xStep = (width - (2*margin[0])) / (cols - 1);
  let yStep = (height - (2*margin[1])) / (rows - 1);

  createGridPoints(xStart, yStart, xStep, yStep);

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
    //   curveVertex(p1.x, p1.y);
    //   curveVertex(p1.x, p1.y);
    //   curveVertex(p2.x, p2.y);
    //   curveVertex(p2.x, p2.y);
      endShape();
    }
  }

  // Draw vertical lines between rows
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols; i++) {
      let p1 = grid[i][j];
      let p2 = grid[i][j + 1];
      // Draw a line between points in neighboring rows
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}


function createGridPoints(xStart, yStart, xStep, yStep) {
  // For each column
  for (let i = 0; i < cols; i++) {
    let col = [];

    // Create an array with the points that make up this column
    for (let j = 0; j < rows; j++) {
      const x = xStart + i * xStep;
      const y = yStart + j * yStep;

      const move = getNoiseVal(x, y);

      // Now we want to distort this point using Perlin noise

      col.push(createVector(x*move, y));
    }
    grid.push(col);
  }
}


function getNoiseVal(x, y) {
    const noiseZoom = 0.001;
    
    const noiseVal = noise((x + 0) * noiseZoom, (y + 0) * noiseZoom);

    return noiseVal;
}