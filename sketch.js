const cols = 200;
const rows = 80;
const margin = [80, 100];
const grid = [];

function setup() {
  createCanvas(800, 800);

  // Where do we start and end drawing in terms of (x,y) pixels?
  const xStart = margin[0];
  const yStart = margin[1];

  // How many pixels do we move for each point in the grid
  let xStep = (width - 2 * margin[0]) / (cols - 1);
  let yStep = (height - 2 * margin[1]) / (rows - 1);

  createGridPoints(xStart, yStart, xStep, yStep);

  noLoop(); // Prevents continuous drawing
}

function draw() {
  background(250);
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
  for (let i = 0; i < cols; i++) {
    const columnCoordinates = grid[i];

    beginShape();
    columnCoordinates.forEach((point) => {
      curveVertex(point.x, point.y);
    });
    endShape();
  }
}

function createGridPoints(xStart, yStart, xStep, yStep) {
  // What direction do we want to shift the points in?
  const direction = createVector(1, 0);

  // For each column
  for (let i = 0; i < cols; i++) {
    let col = [];

    // Create an array with the points that make up this column
    for (let j = 0; j < rows; j++) {
      // The original position of this point
      let x = xStart + i * xStep;
      let y = yStart + j * yStep;

      // How much do we want to shift this point?
      let move = getNoiseVal(x, y);

      // We scale this noise value so that it's more visible
      move *= 10;

      // Update the position
      const newX = x + direction.x * move;
      const newY = y + direction.y * move;

      col.push(createVector(newX, newY));
    }

    grid.push(col);
  }
}

function getNoiseVal(x, y) {
  const noiseZoom = 0.005;

  let noiseVal = noise((x + 0) * noiseZoom, (y + 0) * noiseZoom);

  // Map between -1 and 1
  // noiseVal = map(noiseVal, 0, 1, -1, 1);
  noiseVal = transformNoise(noiseVal);

  return noiseVal;
}

// We use a sin wave to transform the noise values into something that oscillates a bit more
// If frequency = 10, then the sine wave goes from -1 to 1 from input values 0 to 0.1
// The sine wave then decreases from 1 to -1 and the input value goes from 0.1 to 0.2 and so on
function transformNoise(x) {
  const frequency = 10;

  x *= frequency;
  x *= 2 * PI;

  let y = sin(x);

  y = map(y, 0, 1, -1, 1);

  return y;
}
