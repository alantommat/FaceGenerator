let files;
let earsImg, headImg, browsImg, eyesImg, nosesImg, mouthImg, hairImg, beardImg;
let earsSelect, headSelect, browsSelect, eyesSelect, nosesSelect, mouthSelect, hairSelect, beardSelect;
let showBeard = false, showBrows = true, showHair = true;

// Store the selected filenames separately
let selectedImages = {
  ears: null, head: null, brows: null, eyes: null, noses: null, mouth: null, hair: null, beard: null
};

let scaleSlider; // The scale slider
let canvasSize = 400; // Initial canvas size

function preload() {
  files = loadJSON("images/image-files.json", () => {
    createUI(); // Create UI elements after JSON loads
    loadRandomImages(); // Load initial random images
  });
}

function setup() {
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  background(255);

  // Get the scale factor from the slider
  let scaleFactor = scaleSlider.value();

  // Calculate the draw size for images
  let drawSize = canvasSize * scaleFactor;

  // Draw images and scale them to fit within the canvas
  if (earsImg) image(earsImg, 0, 0, drawSize, drawSize);
  if (headImg) image(headImg, 0, 0, drawSize, drawSize);
  if (showBrows && browsImg) image(browsImg, 0, 0, drawSize, drawSize);
  if (eyesImg) image(eyesImg, 0, 0, drawSize, drawSize);
  if (nosesImg) image(nosesImg, 0, 0, drawSize, drawSize);
  if (mouthImg) image(mouthImg, 0, 0, drawSize, drawSize);
  if (showHair && hairImg) image(hairImg, 0, 0, drawSize, drawSize);
  if (showBeard && beardImg) image(beardImg, 0, 0, drawSize, drawSize);
}

// Load random images initially
function loadRandomImages() {
  selectedImages.ears = random(files.ears);
  selectedImages.head = random(files.head);
  selectedImages.eyes = random(files.eyes);
  selectedImages.noses = random(files.noses);
  selectedImages.mouth = random(files.mouths);

  // Randomly decide if brows, hair, or beard should appear
  showBrows = random() < 0.9;
  selectedImages.brows = showBrows ? random(files.brows) : "None";

  showHair = random() < 0.9;
  selectedImages.hair = showHair ? random(files.hair) : "None";

  showBeard = random() < 0.25;
  selectedImages.beard = showBeard ? random(files.facialhair) : "None";

  // Load images
  earsImg = loadImage("images/" + selectedImages.ears);
  headImg = loadImage("images/" + selectedImages.head);
  eyesImg = loadImage("images/" + selectedImages.eyes);
  nosesImg = loadImage("images/" + selectedImages.noses);
  mouthImg = loadImage("images/" + selectedImages.mouth);

  // Load brows, hair, and beard images only if not "None"
  browsImg = selectedImages.brows !== "None" ? loadImage("images/" + selectedImages.brows) : null;
  hairImg = selectedImages.hair !== "None" ? loadImage("images/" + selectedImages.hair) : null;
  beardImg = selectedImages.beard !== "None" ? loadImage("images/" + selectedImages.beard) : null;

  // Update dropdown selections
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

  // Create the scale slider
  scaleSlider = createSlider(0.05, 5, 1, 0.05); // Min, Max, Default, Step
  scaleSlider.position(10, 680);
  scaleSlider.input(updateCanvasSize); // Update canvas size on slider change
}

// Helper function to create dropdowns
function createDropdown(label, options, x, y, includeNone = false) {
  let select = createSelect();
  select.position(x, y);

  if (includeNone) select.option("None"); // Add "None" option where needed

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
    } else if (label === "ears") {
      earsImg = selected !== "None" ? loadImage("images/" + selected) : null;
    } else if (label === "head") {
      headImg = selected !== "None" ? loadImage("images/" + selected) : null;
    } else if (label === "eyes") {
      eyesImg = selected !== "None" ? loadImage("images/" + selected) : null;
    } else if (label === "noses") {
      nosesImg = selected !== "None" ? loadImage("images/" + selected) : null;
    } else if (label === "mouths") {
      mouthImg = selected !== "None" ? loadImage("images/" + selected) : null;
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

// Update the canvas size based on slider input
function updateCanvasSize() {
  canvasSize = 400 * scaleSlider.value(); // Adjust canvas size based on slider
  resizeCanvas(canvasSize, canvasSize); // Resize the canvas
}
