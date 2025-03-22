let files;

let earsImg, headImg, browsImg, eyesImg, nosesImg, mouthImg, hairImg, beardImg;
let earsSelect, headSelect, browsSelect, eyesSelect, nosesSelect, mouthSelect, hairSelect, beardSelect;
let showBeard, showBrows;

function preload() {
  files = loadJSON("images/image-files.json", () => {
    createUI(); // Create dropdowns after JSON loads
    loadRandomImages(); // Load default random images
  });
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  if (earsImg) image(earsImg, 0, 0, 400, 400);
  if (headImg) image(headImg, 0, 0, 400, 400);
  if (showBrows && browsImg) image(browsImg, 0, 0, 400, 400);
  if (eyesImg) image(eyesImg, 0, 0, 400, 400);
  if (nosesImg) image(nosesImg, 0, 0, 400, 400);
  if (mouthImg) image(mouthImg, 0, 0, 400, 400);
  if (hairImg) image(hairImg, 0, 0, 400, 400);
  if (showBeard && beardImg) image(beardImg, 0, 0, 400, 400);
}

// Load random images initially
function loadRandomImages() {
  earsImg = loadImage("images/" + random(files.ears));
  headImg = loadImage("images/" + random(files.head));
  eyesImg = loadImage("images/" + random(files.eyes));
  nosesImg = loadImage("images/" + random(files.noses));
  mouthImg = loadImage("images/" + random(files.mouths));
  hairImg = loadImage("images/" + random(files.hair));

  showBeard = random() < 0.25;
  if (showBeard) {
    beardImg = loadImage("images/" + random(files.facialhair));
  }

  showBrows = random() < 0.9;
  if (showBrows) {
    browsImg = loadImage("images/" + random(files.brows));
  }
}

// Create dropdowns for selecting images
function createUI() {
  earsSelect = createSelect();
  earsSelect.position(10, 410);
  files.ears.forEach(img => earsSelect.option(img));
  earsSelect.changed(() => earsImg = loadImage("images/" + earsSelect.value()));

  headSelect = createSelect();
  headSelect.position(10, 440);
  files.head.forEach(img => headSelect.option(img));
  headSelect.changed(() => headImg = loadImage("images/" + headSelect.value()));

  browsSelect = createSelect();
  browsSelect.position(10, 470);
  files.brows.forEach(img => browsSelect.option(img));
  browsSelect.changed(() => browsImg = loadImage("images/" + browsSelect.value()));

  eyesSelect = createSelect();
  eyesSelect.position(10, 500);
  files.eyes.forEach(img => eyesSelect.option(img));
  eyesSelect.changed(() => eyesImg = loadImage("images/" + eyesSelect.value()));

  nosesSelect = createSelect();
  nosesSelect.position(10, 530);
  files.noses.forEach(img => nosesSelect.option(img));
  nosesSelect.changed(() => nosesImg = loadImage("images/" + nosesSelect.value()));

  mouthSelect = createSelect();
  mouthSelect.position(10, 560);
  files.mouths.forEach(img => mouthSelect.option(img));
  mouthSelect.changed(() => mouthImg = loadImage("images/" + mouthSelect.value()));

  hairSelect = createSelect();
  hairSelect.position(10, 590);
  files.hair.forEach(img => hairSelect.option(img));
  hairSelect.changed(() => hairImg = loadImage("images/" + hairSelect.value()));

  beardSelect = createSelect();
  beardSelect.position(10, 620);
  files.facialhair.forEach(img => beardSelect.option(img));
  beardSelect.option("None"); // Option to remove beard
  beardSelect.changed(() => {
    let selected = beardSelect.value();
    if (selected === "None") {
      showBeard = false;
      beardImg = null;
    } else {
      showBeard = true;
      beardImg = loadImage("images/" + selected);
    }
  });
}

