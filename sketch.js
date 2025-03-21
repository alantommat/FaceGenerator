let files

let earsImg
let headImg
let browsImg
let eyesImg
let nosesImg
let mouthImg
let hairImg
let beardImg

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
  beardImg = loadImage("images/" + random(files.facialhair))
  
}

function draw() {
  background(fff);
  
  image(earsImg, 0, 0, 400, 400)
  image(headImg, 0, 0, 400, 400)
  image(browsImg, 0, 0, 400, 400)
  image(eyesImg, 0, 0, 400, 400)
  image(nosesImg, 0, 0, 400, 400)
  image(mouthImg, 0, 0, 400, 400)
  image(hairImg, 0, 0, 400, 400)
  image(beardImg, 0, 0, 400, 400)
}
