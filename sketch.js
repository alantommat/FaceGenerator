let files;
let earsImg, headImg, browsImg, eyesImg, nosesImg, mouthImg, hairImg, beardImg;
let earsSelect, headSelect, browsSelect, eyesSelect, nosesSelect, mouthSelect, hairSelect, beardSelect;
let showBeard = false, showBrows = true, showHair = true;
let sizeSlider, canvasSize = 400;

// Store the selected filenames separately
let selectedImages = {
  ears: null, head: null, brows: null, eyes: null, noses: null, mouth: null, hair: null, beard: null
};

function preload() {
  files = loadJSON("images/image-files.json", () => {
    createUI();
    loadRandomImages();
  });
}

function setup() {
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  background(255);
  resizeCanvas(canvasSize, canvasSize); // Resize the canvas dynamically

  if (earsImg) image(earsImg, 0, 0, canvasSize, canvasSize);
  if (headImg) image(headImg, 0, 0, canvasSize, canvasSize);
  if (showBrows && browsImg) image(browsImg, 0, 0, canvasSize, canvasSize);
  if (eyesImg) image(eyesImg, 0, 0, canvasSize, canvasSize);
  if (nosesImg) image(nosesImg, 0, 0, canvasSize, canvasSize);
  if (mouthImg) image(mouthImg, 0, 0, canvasSize, canvasSize);
  if (showHair && hairImg) image(hairImg, 0, 0, canvasSize, canvasSize);
  if (showBeard && beardImg) image(beardImg, 0, 0, canvasSize, canvasSize);
}

// Load random images initially
function loadRandomImages() {
  selectedImages.ears = random(files.ears);
  selectedImages.head = random(files.head);
  selectedImages.eyes = random(files.eyes);
  selectedImages.noses = random(files.noses);
  selectedImages.mouth = random(files.mouths);

  showBrows = random() < 0.9;
  selectedImages.brows = showBrows ? random(files.brows) : "None";

  showHair = random() < 0.9;
  selectedImages.hair = showHair ? random(files.hair) : "None";

  showBeard = random() < 0.25;
  selectedImages.beard = showBeard ? random(files.facialhair) : "None";

  earsImg = loadImage("images/" + selectedImages.ears);
  headImg = loadImage("images/" + selectedImages.head);
  eyesImg = loadImage("images/" + selectedImages.eyes);
  nosesImg = loadImage("images/" + selectedImages.noses);
  mouthImg = loadImage("images/" + selectedImages.mouth);
  browsImg = selectedImages.brows !== "None" ? loadImage("images/" + selectedImages.brows) : null;
  hairImg = selectedImages.hair !== "None" ? loadImage("images/" + selectedImages.hair) : null;
  beardImg = selectedImages.beard !== "None" ? loadImage("images/" + selectedImages.beard) : null;

  updateDropdowns();
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

  // Add "Randomize" button
  let randomizeBtn = createButton("Randomize");
  randomizeBtn.position(10, 650);
  randomizeBtn.mousePressed(loadRandomImages);

  // Add size slider
  sizeSlider = createSlider(200, 2000, 400, 50);
  sizeSlider.position(10, 680);
  sizeSlider.input(() => {
    canvasSize = sizeSlider.value();
  });
}

// Helper function to create dropdowns
function createDropdown(label, options, x, y, includeNone = false) {
  let select = createSelect();
  select.position(x, y);

  if (includeNone) select.option("None");

  options.forEach(img => select.option(img));

  select.changed(() => {
    let selected = select.value();
    selectedImages[label] = selected;

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

// Update dropdowns after randomization
function updateDropdowns() {
  earsSelect.selected(selectedImages.ears);
  headSelect.selected(selectedImages.head);
  eyesSelect.selected(selectedImages.eyes);
  nosesSelect.selected(selectedImages.noses);
  mouthSelect.selected(selectedImages.mouth);
  browsSelect.selected(selectedImages.brows !== "None" ? selectedImages.brows : "None");
  hairSelect.selected(selectedImages.hair !== "None" ? selectedImages.hair : "None");
  beardSelect.selected(selectedImages.beard !== "None" ? selectedImages.beard : "None");
}
