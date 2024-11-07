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