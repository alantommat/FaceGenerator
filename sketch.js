let files;

let earsImg, headImg, browsImg, eyesImg, nosesImg, mouthImg, hairImg, beardImg;
let earsSelect, headSelect, browsSelect, eyesSelect, nosesSelect, mouthSelect, hairSelect, beardSelect;
let showBeard, showBrows, showHair;
let randomizeButton;

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
  if (showHair && hairImg) image(hairImg, 0, 0, 400, 400);
  if (showBeard && beardImg) image(beardImg, 0, 0, 400, 400);
}

// Load random images initially and for the randomize button
function loadRandomImages() {
  earsImg = loadImage("images/" + random(files.ears));
  headImg = loadImage("images/" + random(files.head));
  eyesImg = loadImage("images/" + random(files.eyes));
  nosesImg = loadImage("images/" + random(files.noses));
  mouthImg = loadImage("images/" + random(files.mouths));

  showHair = random() < 0.9; // 90% chance to have hair
  hairImg = showHair ? loadImage("images/" + random(files.hair)) : null;

  showBeard = random() < 0.25; // 25% chance to have a beard
  beardImg = showBeard ? loadImage("images/" + random(files.facialhair)) : null;

  showBrows = random() < 0.9; // 90% chance to have brows
  browsImg = showBrows ? loadImage("images/" + random(files.brows)) : null;

  // Update dropdown selections
  earsSelect.selected(earsImg.src.split("/").pop());
  headSelect.selected(headImg.src.split("/").pop());
  eyesSelect.selected(eyesImg.src.split("/").pop());
  nosesSelect.selected(nosesImg.src.split("/").pop());
  mouthSelect.selected(mouthImg.src.split("/").pop());

  browsSelect.selected(showBrows ? browsImg?.src.split("/").pop() : "None");
  hairSelect.selected(showHair ? hairImg?.src.split("/").pop() : "None");
  beardSelect.selected(showBeard ? beardImg?.src.split("/").pop() : "None");
}

// Create dropdowns and buttons for selecting images
function createUI() {
  earsSelect = createDropdown("ears", files.ears, 10, 410);
  headSelect = createDropdown("head", files.head, 10, 440);
  browsSelect = createDropdown("brows", files.brows, 10, 470, true);
  eyesSelect = createDropdown("eyes", files.eyes, 10, 500);
  nosesSelect = createDropdown("noses", files.noses, 10, 530);
  mouthSelect = createDropdown("mouths", files.mouths, 10, 560);
  hairSelect = createDropdown("hair", files.hair, 10, 590, true);
  beardSelect = createDropdown("facialhair", files.facialhair, 10, 620, true);

  // Create Randomize Button
  randomizeButton = createButton("Randomize");
  randomizeButton.position(10, 650);
  randomizeButton.mousePressed(loadRandomImages);
}

// Helper function to create dropdowns
function createDropdown(label, options, x, y, includeNone = false) {
  let select = createSelect();
  select.position(x, y);
  if (includeNone) select.option("None");
  options.forEach(img => select.option(img));
  select.changed(() => {
    if (label === "brows") {
      showBrows = select.value() !== "None";
      browsImg = showBrows ? loadImage("images/" + select.value()) : null;
    } else if (label === "hair") {
      showHair = select.value() !== "None";
      hairImg = showHair ? loadImage("images/" + select.value()) : null;
    } else if (label === "facialhair") {
      showBeard = select.value() !== "None";
      beardImg = showBeard ? loadImage("images/" + select.value()) : null;
    } else {
      window[label + "Img"] = loadImage("images/" + select.value());
    }
  });
  return select;
}
