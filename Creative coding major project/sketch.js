let img1;
let img2;
let img3;
let particles1 = []; // Array to hold particles for the first image
let particles2 = []; // Array to hold particles for the second image
let particles3 = []; // Array to hold particles for the third image
let partSize1 = 30; // Size of particles for img1
let partSize2 = 25; // Size of particles for img2
let partSize3 = 10; // Size of particles for img3
let c1, c2, c3; // Colors for the background gradient
let waveHeight = 10, waveSpeed = 0.02; // Wave effect properties
let waveAngle = 0; // Angle for wave oscillation
let waveEllHei = 1; // Vertical scaling factor for wave effect  ellipse() https://p5js.org/reference/p5/ellipse/
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

function draw() {
  background(255); // Set background to white
  waveAngle += waveSpeed; // Increment wave angle for animation

  // Define gradient colors
  c1 = color(126, 164, 255);
  c2 = color(255, 178, 68);
  c3 = color(144, 183, 255);

  // Draw gradient background from c1 to c3 through c2  lerpcolor() https://p5js.org/reference/p5/lerpColor/
  for (let y = 0; y < height * 0.5; y += 1) {
    let c = lerpColor(c1, c2, map(y, 0, height * 0.5, 0, 1)); // Interpolate color
    stroke(c);
    strokeWeight(1);
    line(0, y, width, y); // Draw horizontal line for gradient
  }
  for (let y = height * 0.5; y < height; y += 1) {
    let c = lerpColor(c2, c3, map(y, height * 0.5, height, 0, 1));
    stroke(c);
    line(0, y, width, y);
  }

  // Display and update particles' brightness
  for (let i = 0; i < particles1.length; i++) {
    particles1[i].checkMouse(); // Adjust size based on mouse proximity
  }
  for (let i = 0; i < particles3.length; i++) {
    particles3[i].display(1); // Display particles normally
  }
  for (let i = 0; i < particles2.length; i++) {
    particles2[i].displayWave(); // Display particles with wave effect
  }

// Instructions for user controls
fill(0);
textAlign(LEFT, TOP);
textSize(10);
text("Press 'w' to increase the wave height", 0, height - boardHei + 5 + 40);
text("Press 's' to decrease the wave height", 0, height - boardHei * 0.8 + 5 + 40);
text("Press 'a' to decrease the wave speed", width / 2, height - boardHei * 1 + 5 + 40);
text("Press 'd' to increase the wave speed", width / 2, height - boardHei * 0.8 + 5 + 40);
text("Press 'space' to increase the Ell height", 0, height - boardHei * 0.6 + 5 + 40);
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
  checkMouse() {
    let scl = 1;
    let d = dist(this.x, this.y, mouseX, mouseY); // Calculate distance to mouse
    if (d < 100) scl = map(d, 0, 100, 0.1, 1); // Scale based on distance
    this.display(scl); // Display particle with new scale
  }

  displayWave() {
    noStroke();
    let h = hue(this.col);
    let s = saturation(this.col);
    let b = brightness(this.col) * map(noise(this.noiseCol, mouseX * 0.01), 0, 1, 0.7, 1.3); // Adjust brightness with noise
    let a = alpha(this.col);
    colorMode(HSB, 360, 100, 100, 255);

    fill(h, s, b, a); // Fill with updated color
    colorMode(RGB);
    ellipse(this.x, this.y + sin(this.x * 0.01 + waveAngle) * waveHeight * 0.5, this.w, this.h * waveEllHei); // Apply wave effect
  }
}