const canvas = document.getElementById('canvas');
const audio = new Audio('assets/MacintoshPlus.wav');
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

// Define the logo class
class Logo {
  constructor(x, y, vx, vy, img) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.img = img;
    this.scaledWidth = this.img.width * 0.5;
    this.scaledHeight = this.img.height * 0.5;
  }

update() {
  this.x += this.vx;
  this.y += this.vy;
  if (this.x + this.scaledWidth >= canvas.width) {
    this.vx = -this.vx;
    this.x = canvas.width - this.scaledWidth;
  } else if (this.x <= 0) {
    this.vx = -this.vx;
    this.x = 0;
  }
  if (this.y + this.scaledHeight >= canvas.height) {
    this.vy = -this.vy;
    this.y = canvas.height - this.scaledHeight;
  } else if (this.y <= 0) {
    this.vy = -this.vy;
    this.y = 0;
  }
}

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.scaledWidth, this.scaledHeight);
  }
}

// Create an array to hold logos
const logos = [];
const logoImages = [];

// Preload the logo images
for (let i = 1; i <= 8; i++) {
  const img = new Image();
  img.src = 'assets/dvdlogo-0' + i + '.svg';
  logoImages.push(img);
}
// Create a function to add a new logo
let currentLogoNumber = 1;
function addLogo() {
  const x = Math.random() * (canvas.width - 50);
  const y = Math.random() * (canvas.height - 50);
  const vx = Math.random() * 6 - 5;
  const vy = Math.random() * 6 - 5;
  const img = new Image();
  img.src = 'assets/dvdlogo-0' + currentLogoNumber +'.svg';
  const logo = new Logo(x, y, 5, 5, img);
  logos.push(logo);
  if (logos.length >= 128) {
    button.disabled = true;
  }
  currentLogoNumber = (currentLogoNumber % 8) + 1;

  if (audio.paused) {
      audio.play();
  }
}

// Update and draw all logos
function updateLogos() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const logo of logos) {
    logo.update();
    logo.draw();
  }
}

// Main animation loop
function loop() {
  updateLogos();
  requestAnimationFrame(loop);
}

// Start the animation loop
loop();

// Add a click event listener to the button
const button = document.querySelector('button');
button.addEventListener('click', addLogo);
const xButton = document.querySelector('#x-button');
xButton.addEventListener('click', addLogo);


