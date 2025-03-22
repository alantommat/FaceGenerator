let files

let earsImg
let headImg
let browsImg
let eyesImg
let nosesImg
let mouthImg
let hairImg
let beardImg
let showBeard, showBrows; // Boolean to determine if a beard and brows should be shown

function preload(){
  files = loadJSON("images/image-files.json");
  
}

function setup() {
  createCanvas(400, 400);
  // print(files.ears)
  earsImg = loadImage("images/" + random(files.ears))
  headImg = loadImage("images/" + random(files.head))
  browsImg = loadImage("images/" + random(files.brows))
  eyesImg = loadImage("images/" + random(files.eyes))
  nosesImg = loadImage("images/" + random(files.noses))
  mouthImg = loadImage("images/" + random(files.mouths))
  hairImg = loadImage("images/" + random(files.hair))
   // 25% chance to load the beard
    showBeard = random() < 0.4; 
    if (showBeard) {
      beardImg = loadImage("images/" + random(files.facialhair));
    }
    // 90% chance to load the brows
    showBrows = random() < 0.9; 
    if (showBrows) {
      browsImg = loadImage("images/" + random(files.brows));
    }
}

function draw() {
  background(255);
  
  image(earsImg, 0, 0, 400, 400)
  image(headImg, 0, 0, 400, 400)
  if (showBrows && browsImg) image(browsImg, 0, 0, 400, 400);
  image(eyesImg, 0, 0, 400, 400)
  image(nosesImg, 0, 0, 400, 400)
  image(mouthImg, 0, 0, 400, 400)
  image(hairImg, 0, 0, 400, 400)
  // Only draw the beard if it was selected
  if (showBeard && beardImg) image(beardImg, 0, 0, 400, 400);
}
