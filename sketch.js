let files;

let earsImg, headImg, browsImg, eyesImg, nosesImg, mouthImg, hairImg, beardImg;
let earsSelect, headSelect, browsSelect, eyesSelect, nosesSelect, mouthSelect, hairSelect, beardSelect;
let showBeard, showBrows, showHair;

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

// Load random images initially
function loadRandomImages() {
  earsImg = loadImage("images/" + random(files.ears));
  headImg = loadImage("images/" + random(files.head));
  eyesImg = loadImage("images/" + random(files.eyes));
  nosesImg = loadImage("images/" + random(files.noses));
  mouthImg = loadImage("images/" + random(files.mouths));

  // Randomly determine if brows, hair, or beard should appear
  showBrows = random() < 0.9;
  browsImg = showBrows ? loadImage("images/" + random(files.brows)) : null;

  showHair = random() < 0.9;
  hairImg = showHair ? loadImage("images/" + random(files.hair)) : null;

  showBeard = random() < 0.25;
  beardImg = showBeard ? loadImage("images/" + random(files.facialhair)) : null;

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

// Create dropdowns for selecting images
function createUI() {
  earsSelect = createDropdown("ears", files.ears, 10, 410);
  headSelect = createDropdown("head", files.head, 10, 440);
  browsSelect = createDropdown("brows", files.brows, 10, 470, true);
  eyesSelect = createDropdown("eyes", files.eyes, 10, 500);
  nosesSelect = createDropdown("noses", files.noses, 10, 530);
  mouthSelect = createDropdown("mouths", files.mouths, 10, 560);
  hairSelect = createDropdown("hair", files.hair, 10, 590, true);
  beardSelect = createDropdown("facialhair", files.facialhair, 10, 620, true);
}

// Helper function to create dropdowns
function createDropdown(label, options, x, y, includeNone = false) {
  let select = createSelect();
  select.position(x, y);
  
  if (includeNone) select.option("None"); // Add "None" option where needed
  
  options.forEach(img => select.option(img));
  
  select.changed(() => {
    let selected = select.value();
    if (label === "brows") {
      showBrows = selected !== "None";
      browsImg = showBrows ? loadImage("images/" + selected) : null;
    } else if (label === "hair") {
      showHair = selected !== "None";
      hairImg = showHair ? loadImage("images/" + selected) : null;
    } else if (label === "facialhair") {
      showBeard = selected !== "None";
      beardImg = showBeard ? loadImage("images/" + selected) : null;
    } else {
      window[label + "Img"] = loadImage("images/" + selected);
    }
  });

  return select;
}
