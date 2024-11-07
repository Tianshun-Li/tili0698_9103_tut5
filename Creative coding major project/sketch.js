let img1;
let img2;
let img3;
let particles1 = []; // Array to hold particles for the first image
let particles2 = []; // Array to hold particles for the second image
let particles3 = []; // Array to hold particles for the third image
let partSize1 = 30; // Size of particles for img1
let partSize2 = 25; // Size of particles for img2
let partSize3 = 10; // Size of particles for img3
let bgColor; // Variable for background color (not used here)
let c1, c2, c3; // Colors for the background gradient
let waveHeight = 10, waveSpeed = 0.02; // Wave effect properties
let waveAngle = 0; // Angle for wave oscillation
let waveEllHei = 1; // Vertical scaling factor for wave effect
let boardHei; // Height of the area reserved for instructions

// Preload images before the canvas is created
function preload() {
  img1 = loadImage('Assests/sky1.png'); 
  img2 = loadImage('Assests/water2.png'); 
  img3 = loadImage('Assests/house.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Create canvas with full window size
  boardHei = 100; // Reserve a 100px area at the bottom for instructions
  createParticle(); // Generate particles from the images
}

// Function to create particles from each image
function createParticle() {
  particles1 = [];
  particles2 = [];
  particles3 = [];

  // Resize img1 and generate particles based on its pixels
  let imgCopy1 = img1.get();

// Resize to fit canvas height minus boardHei
  imgCopy1.resize(width, height - boardHei); 
  for (let x = 0; x < imgCopy1.width; x += partSize1) {
    for (let y = 0; y < imgCopy1.height; y += partSize1) {
      let c = imgCopy1.get(x, y); // Get color at (x, y)
      // Only create particles if brightness is above zero
      if (brightness(color(c)) > 0) { 
        particles1.push(new Particle(x, y, c, partSize1, partSize1));
      }
    }
  }

  // Resize img2 and generate particles
  let imgCopy2 = img2.get();
  imgCopy2.resize(width, height - boardHei);
  for (let x = 0; x < imgCopy2.width; x += partSize2) {
    for (let y = 0; y < imgCopy2.height; y += partSize2) {
      let c = imgCopy2.get(x, y);
      if (brightness(color(c)) > 0) {
        particles2.push(new Particle(x, y, c, partSize2 * 2, partSize2 * 0.8)); // Use different dimensions
      }
    }
  }

   // Resize img3 and generate particles
   let imgCopy3 = img3.get();
   imgCopy3.resize(width, height - boardHei);
   for (let x = 0; x < imgCopy3.width; x += partSize3) {
     for (let y = 0; y < imgCopy3.height; y += partSize3) {
       let c = imgCopy3.get(x, y);
       if (brightness(color(c)) > 0) {
         particles3.push(new Particle(x, y, c, partSize3 * 2, partSize3 * 2)); // Use different dimensions
       }
     }
   }
}

// Key press controls for wave properties
function keyPressed() {
  if (key == 'a') {
    if (waveSpeed >= 0.02) {
      waveSpeed -= 0.02
    }
  }
  if (key == 'd') {
    if (waveSpeed < 0.2) {
      waveSpeed += 0.02
    }
  }

  if (key == 'w') {
    if (waveHeight < 40) {
      waveHeight += 10
    }
  }
  if (key == 's') {
    if (waveHeight > 0) {
      waveHeight -= 10
    }
  }
  // Toggle elliptical wave height between 1 and 1.5
  if (key == ' ') {
    waveEllHei += 0.05
    if (waveEllHei >= 1.5) {
      waveEllHei = 1
    }
  }
}

// Handle canvas resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createParticle(); // Re-generate particles to fit new canvas size
}


// Particle class to represent each particle
class Particle {
  constructor(x, y, col, w, h) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.w = w;
    this.h = h;
    this.noiseCol = random(100); // Random value for noise-based brightness change
  }

  display(scl) {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.w * scl, this.h * scl); // Draw particle as an ellipse with scaling
  }
}