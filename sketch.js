let img, video;
let predictions = [];
let facemesh;
// let emojiData;
let input,
  emojiInput,
  generateButton,
  emojiSizeInput,
  fontSelector,
  fontSizeInput,
  colorPicker,
  emojiWheel;
let emoji = "🧠";


function setup() {
createCanvas(200,200)
video = CreateCapture(VIDEO);
}
function draw(){}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    for (let j = 0; j < selectedPoints.length; j++) {
      let [x, y] = keypoints[selectedPoints[j].pos];
      push();
      textSize(parseInt(emojiSizeInput.value()));
      text(emoji, x, y);
      pop();
      push();
      textSize(parseInt(fontSizeInput.value()));
      if (selectedPoints[j].label.length > 15) {
        let broken = selectedPoints[j].label.replace(/\s/, "\n");
        text(broken, x, y - 80);
      } else {
        text(selectedPoints[j].label, x, y - 60);
      }
    }
  }
}

// function keyPressed() {
//   if (keyCode === 80) {
//     saveCanvas("myCanvas", "jpg");
//   }
// }
