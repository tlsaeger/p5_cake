let img;
let predictions = [];
let facemesh;
let input, emoji, emojiInput, generateButton, emojiSizeInput, fontSelector,fontSizeInput, colorPicker;
let selectedPoints = [
  { label: "Nose Tip", pos: 4, key: 0 },
  { label: "Nose Bridge", pos: 6, key: 1 },
  { label: "Right Nostril Bulge", pos: 48, key: 2 },
  { label: "Left Nostril Bulge", pos: 278, key: 3 },
  { label: "R Nostril Base", pos: 99, key: 4 },
  { label: "L Nostril Base", pos: 328, key: 5 },
  { label: "Right Eybrow End", pos: 124, key: 6 },
  { label: "Left Eybrow End", pos: 383, key: 7 },
  { label: "Right Eyebrow Middle", pos: 52, key: 8 },
  { label: "Left Eyebrow Middle", pos: 282, key: 9 },
  { label: "Right Eyelid Upper", pos: 159, key: 10 },
  { label: "Left Eyelid Upper", pos: 386, key: 11 },
  { label: "Right Eyelid Lower", pos: 145, key: 12 },
  { label: "Left Eyelid Lower", pos: 374, key: 13 },
  { label: "Middle Lip Upper", pos: 0, key: 14 },
  { label: "R Upper Bend", pos: 39, key: 15 },
  { label: "L Upper Bend", pos: 269, key: 16 },
  { label: "Right Ear", pos: 234, key: 17 },
  { label: "Left Ear", pos: 454, key: 18 },
  { label: "Lower Lip", pos: 17, key: 19 },
  { label: "Right Mouth Corner", pos: 76, key: 20 },
  { label: "Left Mouth Corner", pos: 306, key: 21 },
  { label: "Forehead", pos: 10, key: 22 },
  { label: "Center Chin", pos: 199, key: 23 },
  { label: "Right Orbital Lower", pos: 50, key: 24 },
  { label: "Left Orbital Lower", pos: 280, key: 25 },
  { label: "Right Lower Chin", pos: 32, key: 26 },
  { label: "Left Lower Chin", pos: 262, key: 27 },
  { label: "Right Upper Chin", pos: 210, key: 28 },
  { label: "Left Upper Chin", pos: 430, key: 29 },
  // { label: "gn", pos: 152 },
  // { label: "lgo", pos: 136 },
  // { label: "rgo", pos: 365 },
  // { label: "lsbal", pos: 60 },
  // { label: "rsbal", pos: 290 },
  // { label: "sn", pos: 2 },
  // { label: "lal", pos: 129 },
  // { label: "ral", pos: 358 },
  // { label: "lcph", pos: 39 },
  // { label: "rcph", pos: 269 },
  // { label: "sto", pos: 14 },
  // { label: "lps", pos: 158 },
  // { label: "lpi", pos: 144 },
  // { label: "rpi", pos: 373 },
  // { label: "rps", pos: 385 },
  // { label: "lex", pos: 33 },
  // { label: "len", pos: 133 },
  // { label: "ren", pos: 362 },
  // { label: "rex", pos: 263 },
];
const selectFonts = [
  { label: "Arial", key: 0 },
  { label: "Arial Black", key: 8 },
  { label: "Bookman", key: 10 },
  { label: "Comic Sans MS", key: 6 },
  { label: "Courier New", key: 3 },
  { label: "Garamond", key: 9 },
  { label: "Georgia", key: 4 },
  { label: "Impact", key: 7 },
  { label: "Palatino", key: 5 },
  { label: "Tahoma", key: 11 },
  { label: "Times New Roman", key: 1 },
  { label: "Trebuchet MS", key: 12 },
  { label: "Verdana", key: 2 },
];
// const selectedMeaures = [
//   { label1: "Nose Bridge", pos1: 6, label2: "Nose Tip", pos2: 4 },
//   { label1: "Middle Lip Upper", pos1: 0, label2: "Lower Lip", pos2: 17 },
//   { label1: "R Eyelid Upper", pos1: 159, label2: "R Eyelid Lower", pos2: 374 },
//   { label1: "L Eyelid Upper", pos1: 386, label2: "L Eyelid Lower", pos2: 145 },
//   { label1: "Nose Tip", pos1: 4, label2: "Middle Lip Upper", pos2: 0 },
//   { label1: "sn", pos1: 2, label2: "sto", pos2: 14 },
//   { label1: "ps", pos1: 158, label2: "pi", pos2: 373 },
//   { label1: "sbal", pos1: 60, label2: "is", pos2: 0 },
//   { label1: "is", pos1: 0, label2: "sto", pos2: 14 },
//   { label1: "sto", pos1: 14, label2: "li", pos2: 17 },
//   { label1: "tn", pos1: 151, label2: "n", pos2: 6 },
//   { label1: "Forehead", pos1: 10, label2: "Nose Bridge", pos2: 6 },
//   { label1: "Nose Tip", pos1: 4, label2: "Chin", pos2: 199 },
//   { label1: "Nose Bridge", pos1: 6, label2: "Chin", pos2: 199 },
//   { label1: "Forehead", pos1: 10, label2: "Chin", pos2: 199 },
// ];
//Setup the canvas and initiate the webcam and Facemesh
function setup() {
  // if (Cookies.get('modified_values') !== undefined) {
  //   selectedPoints = JSON.parse(Cookies.get('modified_values'));
  // }
  createCanvas(4000, 6000);
  input = createFileInput(handleFile);
  input.position(40, 30);

  textSize(15);
  text("choose emoji:", 210, 75);
  emojiInput = createInput("🥸");
  emojiInput.position(210, 80);
  text("emoji-size:", 210, 115);
  emojiSizeInput = createInput("48");
  emojiSizeInput.position(210, 120);

  text("text-size:", 40, 115);
  fontSizeInput = createInput("48");
  fontSizeInput.position(40, 120);
  text("text-color:", 40, 155);
  colorPicker = createColorPicker('#000000')
  colorPicker.position(40,160);

  generateButton = createButton("GENERATE IMAGE");
  generateButton.position(40, 290);
  generateButton.mousePressed(generateImage);
  generateButton.attribute("disabled", "");

  createSelection();
  createFontSelection();
}

function createSelection() {
  let select = createSelect();
  select.position(40, 200);
  select.option("Please select facial feature:");
  for (let i = 0; i < selectedPoints.length; i++) {
    select.option(selectedPoints[i].key + ": " + selectedPoints[i].label);
  }
  select.changed(function () {
    let choosenNumber = select.value();
    choosenNumber = choosenNumber.substring(0, 2);
    if (choosenNumber.substring(1) == ":") {
      choosenNumber = choosenNumber.substring(0, 1);
      console.log(choosenNumber);
    }

    facialFeatureText = createInput(selectedPoints[choosenNumber].label);
    facialFeatureText.position(40, 225);

    facialFeatureButton = createButton("Change Value");
    facialFeatureButton.position(40, 250);
    facialFeatureButton.mousePressed(function () {
      selectedPoints[choosenNumber].label = facialFeatureText.value();
      Cookies.set('modified_values', JSON.stringify(selectedPoints))
      createSelection();
    });
  });
}

function createFontSelection(){
  fontSelector = createSelect();
  fontSelector.position(40, 80);
  text('select font:',40, 75);
  for(let i = 0; i < selectFonts.length; i++){
    fontSelector.option(selectFonts[i].label);
  }
}

function generateImage() {
  fill(colorPicker.value())
  textFont(fontSelector.value())
  // img = createImg("4000x6000_face.jpg", imageReady);
  // img.hide();
  textAlign(CENTER,CENTER);
  imageReady();
}

function handleFile(file) {
  print(file);
  if (file.type === "image") {
    img = createImg(file.data, function () {
      generateButton.removeAttribute("disabled");
    });
    img.hide();
  } else {
    img = null;
  }
}
function imageReady() {
  facemesh = ml5.facemesh(function () {
    facemesh.predict(img);
  });
  facemesh.on("predict", (results) => {
    predictions = results;
    image(img, 0, 0, width, height);
    noStroke();
    drawKeypoints();
    textAlign(CENTER);
    noLoop();
    // saveCanvas("myCanvas", "jpg");
  });
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    for (let j = 0; j < keypoints.length; j += 1) {
      let [x, y] = keypoints[j];
      fill(0,255,0);
      textSize(20)
      push();
      fill(0,120,0);
      ellipse(x, y, 10, 10);
      pop();
      text(j, x, y);
    }
  }
}

function keyPressed() {
  if (keyCode === 80) {
    saveCanvas("myCanvas", "jpg");
  }
}
